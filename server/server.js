const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://192.168.86.208:3000",
      process.env.FRONTEND_URL || "http://localhost:3000"
    ],
    methods: ["GET", "POST"]
  }
});

// Serve static files from the Next.js build
app.use(express.static(path.join(__dirname, 'out')));

// Store active games
const games = new Map();

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle player joining a game
  socket.on('joinGame', (data) => {
    const { gameId, playerName } = data;
    console.log(`Player ${playerName} (${socket.id}) joining game ${gameId}`);

    // Join the socket room for this game
    socket.join(gameId);

    // Store player info
    socket.gameId = gameId;
    socket.playerName = playerName;

    // Initialize game if it doesn't exist
    if (!games.has(gameId)) {
      games.set(gameId, {
        id: gameId,
        players: [],
        gameState: null,
        status: 'waiting' // waiting, playing, finished
      });
    }

    const game = games.get(gameId);
    
    // Add player to game
    const player = {
      id: socket.id,
      name: playerName,
      socketId: socket.id,
      playerId: `player_${game.players.length}` // Assign unique player ID
    };
    
    console.log(`Adding player: ${playerName} with playerId: ${player.playerId}, socketId: ${socket.id}`);

    // Check if player already exists
    const existingPlayerIndex = game.players.findIndex(p => p.name === playerName);
    if (existingPlayerIndex === -1) {
      game.players.push(player);
    } else {
      // Update existing player's socket ID
      game.players[existingPlayerIndex].socketId = socket.id;
    }

    // Notify all players in the game about the new player
    io.to(gameId).emit('playerJoined', {
      player,
      allPlayers: game.players
    });
    
    // Also send a separate event with the complete player list to ensure everyone has the right info
    io.to(gameId).emit('playerListUpdate', {
      allPlayers: game.players
    });

    // Send current game state to the new player
    if (game.gameState) {
      socket.emit('gameStateUpdate', game.gameState);
    } else if (game.players.length === 1) {
      // Only send firstPlayerJoined to the actual first player
      socket.emit('firstPlayerJoined', { gameId });
    }

    console.log(`Game ${gameId} now has ${game.players.length} players`);
  });

  // Handle game state updates
  socket.on('gameStateUpdate', (gameState) => {
    const gameId = socket.gameId;
    if (!gameId || !games.has(gameId)) return;

    const game = games.get(gameId);
    game.gameState = gameState;

    // Log the number of played words
    console.log(`Game state updated for game ${gameId}`);
    console.log(`- Played words count: ${gameState.playedWords ? gameState.playedWords.length : 0}`);
    console.log(`- Players in room: ${game.players.length}`);
    console.log(`- Broadcasting to ${game.players.length - 1} other players`);

    // Broadcast the update to all other players in the game
    socket.to(gameId).emit('gameStateUpdate', gameState);
    
    // Also send the update back to the sender to confirm it was received
    socket.emit('gameStateUpdate', gameState);
  });

  // Handle player disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    const gameId = socket.gameId;
    if (gameId && games.has(gameId)) {
      const game = games.get(gameId);
      
      // Remove player from game
      game.players = game.players.filter(p => p.socketId !== socket.id);
      
      // Notify other players
      socket.to(gameId).emit('playerLeft', {
        playerId: socket.id,
        allPlayers: game.players
      });

      // Clean up empty games
      if (game.players.length === 0) {
        games.delete(gameId);
        console.log(`Game ${gameId} deleted (no players left)`);
      } else {
        console.log(`Game ${gameId} now has ${game.players.length} players`);
      }
    }
  });

  // Handle chat messages (optional feature)
  socket.on('chatMessage', (message) => {
    const gameId = socket.gameId;
    if (!gameId) return;

    const chatData = {
      playerId: socket.id,
      playerName: socket.playerName,
      message: message,
      timestamp: new Date().toISOString()
    };

    io.to(gameId).emit('chatMessage', chatData);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    activeGames: games.size,
    totalPlayers: Array.from(games.values()).reduce((sum, game) => sum + game.players.length, 0)
  });
});

// Serve the main app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
}); 