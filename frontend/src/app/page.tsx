'use client';

import { useState, useEffect, useRef } from 'react';
import { startGame } from '@/shared/gameLogic';
import { GameState } from '@/shared/types/game';
import { getSocket } from '@/utils/websocketService';
import GameBoard from '@/components/GameBoard';

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [gameId, setGameId] = useState<string>('');

  const [connectedPlayers, setConnectedPlayers] = useState<string[]>([]);
  const [myPlayerId, setMyPlayerId] = useState<string>('');
  const playerNameRef = useRef<string>('');
  const myPlayerIdRef = useRef<string>('');

  // Get socket connection
  const socket = getSocket();

  // Set up WebSocket event listeners
  useEffect(() => {
    // Listen for game state updates from other players
    socket.on('gameStateUpdate', (updatedGameState: GameState) => {
      // If we don't have a player ID yet, try to find ourselves in the game state
      if (!myPlayerId && !myPlayerIdRef.current) {
        const currentPlayerName = playerNameRef.current || playerName || (socket as unknown as { myPlayerName?: string }).myPlayerName;
        const myPlayerInGameState = updatedGameState.players.find(p => p.name === currentPlayerName);
        if (myPlayerInGameState) {
          setMyPlayerId(myPlayerInGameState.id);
          myPlayerIdRef.current = myPlayerInGameState.id;
        }
      }
      
      setGameState(updatedGameState);
    });

    // Listen for player joining
    socket.on('playerJoined', (data: { player: { name: string; playerId: string }; allPlayers: { name: string; playerId: string }[] }) => {
      setConnectedPlayers(data.allPlayers.map(p => p.name));
      
      // Get the stored player name from the socket
      const storedPlayerName = (socket as unknown as { myPlayerName?: string }).myPlayerName;
      
      // Set our player ID if this is us
      const currentPlayerName = playerNameRef.current || playerName || storedPlayerName;
      if (data.player.name === currentPlayerName) {
        setMyPlayerId(data.player.playerId);
        myPlayerIdRef.current = data.player.playerId;
      }
      
      // Also check if we should set our player ID from the allPlayers list
      const myPlayerInList = data.allPlayers.find(p => p.name === currentPlayerName);
      if (myPlayerInList && !myPlayerId && !myPlayerIdRef.current) {
        setMyPlayerId(myPlayerInList.playerId);
        myPlayerIdRef.current = myPlayerInList.playerId;
      }
      
      // If this is the second player joining and we don't have a game state yet, create one
      if (data.allPlayers.length === 2 && !gameState) {
        const playerNames = data.allPlayers.map(p => p.name);
        const newGame = startGame(playerNames);
        setGameState(newGame);
        
        // Send the game state to the server so other players get it
        socket.emit('gameStateUpdate', newGame);
      }
      
      // If we have a game state and this is the second player, update the second player's name
      if (gameState && data.allPlayers.length === 2) {
        const secondPlayer = data.allPlayers.find(p => p.name !== playerName);
        if (secondPlayer) {
          const updatedGameState = {
            ...gameState,
            players: gameState.players.map((p, index) => {
              if (index === 1) {
                // Second player
                return {
                  ...p, 
                  name: secondPlayer.name, 
                  id: secondPlayer.playerId,
                  isCurrentTurn: false // Second player doesn't have turn initially
                };
              } else {
                // First player
                return {
                  ...p,
                  id: data.allPlayers[0].playerId, // Ensure first player has correct ID
                  isCurrentTurn: true // First player should have turn
                };
              }
            }),
            currentPlayerIndex: 0 // Ensure first player is current
          };
          setGameState(updatedGameState);
        }
      }
    });

    // Listen for player leaving
    socket.on('playerLeft', (data: { playerId: string; allPlayers: { name: string; playerId: string }[] }) => {
      console.log('Player left:', data.playerId);
      setConnectedPlayers(data.allPlayers.map(p => p.name));
    });

    // Listen for first player joined (to start the game)
    socket.on('firstPlayerJoined', () => {
      // Create a game with the current player and a placeholder for the second player
      const newGame = startGame([playerName, 'Waiting for player...']);
      setGameState(newGame);
      // Only set player ID if we don't already have one (this event only fires for the first player)
      if (!myPlayerId && !myPlayerIdRef.current) {
        setMyPlayerId('player_0');
        myPlayerIdRef.current = 'player_0';
      }
    });

    // Listen for player list updates
    socket.on('playerListUpdate', (data: { allPlayers: { name: string; playerId: string }[] }) => {
      // Get the stored player name from the socket
      const storedPlayerName = (socket as unknown as { myPlayerName?: string }).myPlayerName;
      const currentPlayerName = playerNameRef.current || playerName || storedPlayerName;
      
      // Find our player in the list and set our ID
      const myPlayerInList = data.allPlayers.find(p => p.name === currentPlayerName);
      
      if (myPlayerInList && myPlayerInList.playerId !== myPlayerId) {
        setMyPlayerId(myPlayerInList.playerId);
        myPlayerIdRef.current = myPlayerInList.playerId;
      }
    });

    // Clean up event listeners when component unmounts
    return () => {
      socket.off('gameStateUpdate');
      socket.off('playerJoined');
      socket.off('playerLeft');
      socket.off('firstPlayerJoined');
      socket.off('playerListUpdate');
    };
  }, [socket, gameState, myPlayerId, playerName]);

  const startNewGame = () => {
    if (isMultiplayer) {
      // Use existing game ID or generate a new one
      const newGameId = gameId || `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setGameId(newGameId);
      
      // Store the player name in the socket object for later reference
      (socket as unknown as { myPlayerName?: string }).myPlayerName = playerName;
      
      // Join the game room
      socket.emit('joinGame', {
        gameId: newGameId,
        playerName: playerName
      });
    } else {
      // Single player mode - create new game immediately
      const newGame = startGame([playerName, 'Computer']);
    setGameState(newGame);
    }
  };

  const handleCardSelect = (card: { letter: string }, playerId: string) => {
    console.log('Card selected:', card.letter, 'by player:', playerId);
  };

  const handlePlayWord = () => {
    console.log('Word played successfully!');
  };

  const handleDiscard = () => {
    console.log('Card discarded');
  };

  const handleDraw = () => {
    console.log('Card drawn');
  };

  const handleGameStateUpdate = (newGameState: GameState) => {
    setGameState(newGameState);
    
    // Send game state update to other players if in multiplayer
    if (isMultiplayer) {
      socket.emit('gameStateUpdate', newGameState);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-600">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 border-b border-white/20">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-4">
              <h1 className="text-xl sm:text-3xl font-bold text-white">
                🃏 WordWars
              </h1>
              <a 
                href="/test" 
                className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm"
              >
                🧪 Test
              </a>
            </div>
            
            {!gameState ? (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
                {/* Multiplayer Toggle */}
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <label className="text-white text-sm">Multiplayer:</label>
                  <input
                    type="checkbox"
                    checked={isMultiplayer}
                    onChange={(e) => setIsMultiplayer(e.target.checked)}
                    className="w-4 h-4"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => {
                      setPlayerName(e.target.value);
                      playerNameRef.current = e.target.value;
                    }}
                    placeholder="Your name"
                    className="px-3 py-2 border border-white/30 rounded-md bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                  />
                </div>
                
                {isMultiplayer && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={gameId}
                      onChange={(e) => setGameId(e.target.value)}
                      placeholder="Enter Game ID (leave empty to create new)"
                      className="px-3 py-2 border border-white/30 rounded-md bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                    />
                  </div>
                )}
                
                <button
                  onClick={startNewGame}
                  className="px-4 py-2 sm:px-6 sm:py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold text-sm"
                >
                  {isMultiplayer && gameId ? 'Join Game' : 'Start Game'}
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                <div className="text-white text-center sm:text-left">
                  <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-2 text-xs sm:text-sm">
                  <span className="font-semibold">Round {gameState.roundNumber}</span>
                    <span className="hidden sm:inline">•</span>
                  <span>Deck: {gameState.deck.length}</span>
                    <span className="hidden sm:inline">•</span>
                  <span>Discard: {gameState.discardPile.length}</span>
                    {isMultiplayer && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span>Players: {connectedPlayers.join(', ')}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Game ID: {gameId}</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setGameState(null)}
                  className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-xs sm:text-sm"
                >
                  New Game
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 min-h-0">
          {!gameState ? (
            <div className="h-full flex items-center justify-center p-4">
              <div className="text-center text-white max-w-sm">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Welcome to WordWars!</h2>
                <p className="text-base sm:text-lg mb-4 sm:mb-6">A digital version of the classic Lexicon card game</p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                  <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">How to Play:</h3>
                  <ul className="text-left space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <li>• Deal 10 cards to each player</li>
                    <li>• Form words with your cards to score points</li>
                    <li>• Discard and draw to get better cards</li>
                    <li>• First to empty their hand wins the round</li>
                    <li>• First to 100 points wins the game</li>
                  </ul>
                  {isMultiplayer && (
                    <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-500/20 rounded border border-blue-300/30">
                      <p className="text-blue-200 text-xs sm:text-sm">
                        🎮 <strong>Multiplayer Mode:</strong> Other players can join using the same game ID
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <GameBoard
              key={`${gameState.players.map(p => p.id).join('-')}-${myPlayerId}`}
              gameState={gameState}
              myPlayerId={myPlayerId || ''}
              onCardSelect={handleCardSelect}
              onPlayWord={handlePlayWord}
              onDiscard={handleDiscard}
              onDraw={handleDraw}
              onGameStateUpdate={handleGameStateUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
