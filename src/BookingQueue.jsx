import { useState } from "react";
import io from "socket.io-client";

export default function BookingQueue() {
  const [ticketInfo, setTicketInfo] = useState({});
  const socket = io("http://localhost:3000");
  // (mocking) fetch shop list isOpen information when login
  const shopData = {
    id: 1,
    name: "Aroi",
  };

  // (mocking) fetch user information when login
  const userData = {
    id: 2,
    name: "John",
  };

  const selectShop = () => {
    socket.emit("join_room", shopData.name);
  };

  // booking infomation send socket.id and customer name
  const booking = () => {
    //axios.post("/user/booking")
    socket.emit("booking", {
      userId: userData.id,
      name: userData.name,
      shopName: shopData.name,
    });
  };

  //
  const cancel = () => {
    //axios.post("/user/cancel")
    socket.emit("cancel", {
      userId: userData.id,
      name: userData.name,
      shopName: shopData.name,
    });
  };

  socket.on("ticket", (data) => {
    // console.log(data);
    setTicketInfo(data);
  });

  return (
    <div>
      <h1>Booking Queue</h1>

      <p>Your current queue number is: {ticketInfo.qNumber}</p>
      <p>Name: {ticketInfo.name}</p>

      {/* can only select DB_shops isOpen : true */}
      <button onClick={selectShop}>Select Shop</button>

      {/* create reservation in db and return Q ticket info */}
      <button onClick={booking}>Booking</button>

      <button onClick={cancel}>Cancel Queue</button>
    </div>
  );
}
