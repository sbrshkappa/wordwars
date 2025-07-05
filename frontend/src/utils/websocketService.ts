import { io, Socket } from "socket.io-client";

const getSocketUrl = () => {
  // Use environment variable for production, fallback to local development
  if (typeof window !== "undefined") {
    // In production, this will be set by Railway
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
    return backendUrl;
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