import React, { useEffect } from "react";
import Booking from "./Booking";
import { useDispatch, useSelector } from "react-redux";
import { getBookingByUser } from "../features/booking/bookingSlice";

function Booked() {
  const { bookings } = useSelector((state) => state.booking);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookingByUser());
  }, [dispatch]);
  return (
    <div>
      {bookings.length > 0 ? (
        <div className="p-3 flex flex-col gap-3">
          {bookings &&
            bookings.map((item) => (
              <Booking
                item={item.place}
                booking={item}
                key={item._id}
              />
            ))}
        </div>
      ) : (
        <p className="mt-10 font-bold text-lg text-center">No Booking</p>
      )}
    </div>
  );
}

export default Booked;
