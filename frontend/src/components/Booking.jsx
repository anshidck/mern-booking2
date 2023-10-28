import React from "react";

function Booking({ item, booking }) {

  if (!item || !item.photos || item.photos.length === 0) {
    return <div className="text-red-600">Item data is missing or incomplete.</div>;
  }

  return (
    <div className="md:grid grid-cols-4 p-3 bg-white rounded gap-4">
      <img
        className="col-span-1 w-full object-cover"
        src={`http://localhost:5000/uploads/${item.photos[0]}`}
        alt="asd"
      />
      <div className="col-span-3">
        <h1 className="text-2xl font-bold">{item.title}</h1>
        <p className="text-xl text-gray-600">{item.description}</p>
        <p>$: {booking.price}</p>
        <p>Check In: {new Date(booking.checkIn).toLocaleDateString()}</p>
        <p>Check Out: {new Date(booking.checkOut).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default Booking;
