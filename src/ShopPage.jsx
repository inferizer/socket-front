import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function ShopPage() {
  const [bookingList, setBookingList] = useState([]);
  console.log(bookingList);
  const socket = io("http://localhost:3000");
  // (mocking) fetch shop information when login
  const shopData = {
    id: 1,
    name: "Aroi",
  };

  // (mocking) input onsite user information
  const userData = {
    id: 4,
    name: "Mary",
    mobile: "0815561233",
  };

  // open shop , axios update DB_shop isOpen: true
  const openShop = () => {
    // axios.patch("/vendor/open",id)
    socket.emit("join_room", shopData.name);
  };

  const bookingForCustomer = () => {
    socket.emit("booking for customer", {
      userId: userData.id,
      name: userData.name,
      shopName: shopData.name,
      mobile: userData.mobile,
    });
  };
  socket.on("ticket", (data) => {
    setBookingList((prev) => [...prev, data]);
    // setBookingList(...bookingList, { data });
  });

  socket.on("onsite queue", (data) => {
    setBookingList((prev) => [...prev, data]);
  });

  socket.on("cancel queue", (cancelInfo) => {
    console.log("---", cancelInfo.userId);

    setBookingList((prevList) => {
      const newBookingList = prevList.filter(
        (el) => el.Id != cancelInfo.userId
        // (el) => console.log("+++", el.id)
      );
      return newBookingList;
    });
  });

  return (
    <div>
      <h1>Shop Page</h1>
      {/* DB_shops isOpen : true  */}
      <button onClick={openShop}>Open Shop</button>

      <button onClick={bookingForCustomer}>Booking for customer</button>

      <p>Queue List</p>
      {bookingList.length > 0
        ? bookingList.map((el, index) => (
            <li key={index}>{`Name: ${el.name} || Queue:${el.qNumber} || Date:${
              el.date
            } || Time:${el.time} || Mobile:${
              el.mobile || "don't have phone number"
            }`}</li>
          ))
        : null}
    </div>
  );
}
