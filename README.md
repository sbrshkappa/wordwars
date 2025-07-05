# WordWars 🃏

A real-time multiplayer card game built with Next.js, TypeScript, and WebSockets where players compete to build words and outmaneuver their opponents.

## 🎮 Game Overview

WordWars is a strategic card game where players:
- **Build words** using letter cards from their hand
- **Use master cards** to assign any letter to create powerful combinations
- **Extend existing words** to score more points
- **Challenge opponents** to verify word validity
- **Compete in real-time** with live multiplayer support

## ✨ Features

- **Real-time Multiplayer**: Play with friends over WebSocket connections
- **Master Cards**: Special cards that can represent any letter
- **Word Extension**: Build upon existing words on the board
- **Dictionary Validation**: Real-time word checking with caching
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Turn-based Gameplay**: Strategic card management and timing
- **Live Synchronization**: Real-time game state updates across all players

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Socket.IO Client** - Real-time communication
- **Framer Motion** - Smooth animations

### Backend
- **Express.js** - Web server framework
- **Socket.IO** - Real-time WebSocket server
- **Node.js** - JavaScript runtime

### Deployment
- **Railway** - Full-stack hosting platform
- **Environment Variables** - Dynamic configuration
- **Multi-service Architecture** - Separate frontend and backend services

### Shared
- **Game Logic** - Shared between frontend and backend
- **Type Definitions** - Consistent data structures

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wordwars.git
   cd wordwars
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Configure WebSocket connection (Development)**
   
   For local development, the WebSocket service automatically uses `localhost:3001`.
   For LAN testing, update the server URL in `frontend/src/utils/websocketService.ts`:
   ```typescript
   const serverUrl = 'http://YOUR_LOCAL_IP:3001';
   ```

### Running the Application

1. **Start the WebSocket server**
   ```bash
   cd server
   npm start
   ```
   Server runs on `http://localhost:3001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

## 🎯 How to Play

### Game Setup
1. Enter your player name
2. Create a new game or join an existing one using a game ID
3. Wait for other players to join

### Gameplay
- **Draw cards** to build your hand
- **Select cards** by clicking or using keyboard input
- **Build words** by selecting letter cards in sequence
- **Use master cards** to assign any letter
- **Extend words** by building upon existing words on the board
- **Challenge opponents** if you suspect an invalid word
- **Score points** for each valid word played

### Card Types
- **Letter Cards**: Standard cards with specific letters
- **Master Cards**: Can represent any letter when played
- **Special Cards**: Provide unique abilities and strategies

## 🌐 Multiplayer Setup

### Local Network (LAN)
1. Find your local IP address:
   ```bash
   # macOS/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows
   ipconfig | findstr "IPv4"
   ```

2. Update the WebSocket URL in `frontend/src/utils/websocketService.ts`:
   ```typescript
   const serverUrl = 'http://YOUR_LOCAL_IP:3001';
   ```

3. Share the game ID with other players on your network

### Internet Deployment
The app is configured for deployment on **Railway**, which hosts both frontend and backend services.

#### Railway Deployment (Recommended)
1. **Create a Railway account** at [railway.app](https://railway.app)
2. **Connect your GitHub repository** to Railway
3. **Deploy automatically** - Railway will detect the project structure and deploy both services
4. **Set environment variables** (if needed):
   - `FRONTEND_URL`: Your frontend service URL
   - `NEXT_PUBLIC_BACKEND_URL`: Your backend service URL

#### Alternative Deployment Options
- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Backend**: Render, Heroku, or DigitalOcean

## 📁 Project Structure

```
wordwars/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # React components
│   │   ├── shared/          # Shared game logic and types
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── server/                  # Express.js WebSocket server
│   ├── server.js           # Main server file
│   └── package.json
├── package.json             # Root package.json for Railway deployment
├── railway.json             # Railway deployment configuration
├── railway.toml             # Railway service definitions
├── .gitignore
└── README.md
```

## 🎨 Customization

### Adding New Cards
1. Update card definitions in `frontend/src/shared/types/game.ts`
2. Add card logic in `frontend/src/shared/gameLogic.ts`
3. Update UI components to handle new card types

### Modifying Game Rules
1. Edit game logic in `frontend/src/shared/gameLogic.ts`
2. Update scoring system and turn management
3. Modify validation rules as needed

## 🐛 Troubleshooting

### Common Issues

**WebSocket Connection Failed**
- Check if the server is running on port 3001
- Verify the IP address in `websocketService.ts` (for LAN testing)
- Ensure firewall allows connections on port 3001
- For production: Check environment variables `NEXT_PUBLIC_BACKEND_URL`

**Game Not Syncing Between Players**
- Check WebSocket connection status
- Verify all players are using the same game ID
- Check browser console for error messages

**Build Errors**
- Clear `node_modules` and reinstall dependencies
- Check TypeScript configuration
- Verify all import paths are correct

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Next.js and Socket.IO
- Inspired by classic word-building card games
- Thanks to the open-source community for amazing tools and libraries

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review the game logic and WebSocket implementation

---

**Happy gaming! 🎮✨** 