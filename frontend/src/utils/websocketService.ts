import { io, Socket } from "socket.io-client";

const getSocketUrl = () => {
  // Use your local IP address here for LAN testing
  // e.g., 'http://192.168.1.100:3001'
  // Fallback to localhost for development
  if (typeof window !== "undefined") {
    return "http://192.168.86.208:3001"; // Your computer's local IP
  }
  return "";
};

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(getSocketUrl());
  }
  return socket;
} 