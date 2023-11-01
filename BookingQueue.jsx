import { useState } from "react";
import io from "socket.io-client";

export default function BookingQueue() {
  const [clientId, setClientId] = useState(null);
  const [currentQueueNumber, setCurrentQueueNumber] = useState(null);

  const connectToServer = () => {
    const socket = io("http://localhost:3000");

    socket.on("client id", (id) => {
      // Store the client ID locally.
      setClientId(id);
    });

    socket.on("current queue number", (queueNumber) => {
      // Set the current queue number.
      setCurrentQueueNumber(queueNumber);
    });

    const button = document.querySelector("button");
    button.addEventListener("click", () => {
      socket.emit("booking req");
    });
  };

  // Request the current queue number from the server.
  connectToServer();

  return (
    <div>
      <h1>Booking Queue</h1>

      <p>Your current queue number is: {currentQueueNumber}</p>
      <button>Booking</button>
    </div>
  );
}
