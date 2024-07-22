import { Server } from "socket.io";

export function initiateSocketServer(server: any) {
  let io = new Server(server, { cors: { origin: "*" } });
  io.on("connection", (socket: any) => {
    console.log("User has been connected!");

    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on("disconnect", () => {
      console.log(`Socket Server Disconnected.`);
    });
  });
  return io;
}
