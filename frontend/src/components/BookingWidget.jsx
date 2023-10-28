import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { differenceInCalendarDays } from "date-fns";
import { createBooking } from "../features/booking/bookingSlice";
import { useNavigate } from "react-router-dom";

function BookingWidget({ item }) {
  const [checkin,setCheckIn] = useState('');
  const [checkout,setCheckOut] = useState('');
  const [formData, setFormData] = useState({
    place: '',
    checkIn: '',
    checkOut: '',
    name: '',
    phone: '',
    price:''
  })

  const { place, checkIn, checkOut, name, phone, price } = formData
  
  let numberOfNights = 0;
  if (checkin && checkout) {
    numberOfNights = differenceInCalendarDays(new Date(checkout), new Date(checkin));
  }


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      place: item._id,
      checkIn: checkin,
      checkOut: checkout,
      name,
      phone,
      price: item.price * numberOfNights
    }

    dispatch(createBooking(userData))
    navigate('/')

  }

  
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 items-center justify-center p-3 bg-white rounded-xl shadow-lg">
      <h1 className="text-xl font-bold">Price: ${item.price}/per night</h1>
      <div className="grid md:flex gap-2">
        <input
          required
          className="border border-gray-500 p-2 rounded font-semibold"
          type="date"
          value={checkin}
          onChange={(e) => setCheckIn(e.target.value)}
        />
        <input
          className="border border-gray-500 p-2 rounded font-semibold"
          type="date"
          value={checkout}
          onChange={(e) => setCheckOut(e.target.value)}
          required
        />
      </div>
      <div className="border border-gray-500 p-2 rounded font-semibold flex flex-col">
        <label htmlFor="250px">number of guests:</label>
        <input type="number" className="outline-none" />
        {numberOfNights > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
            <label>Your full name:</label>
            <input type="text"
                   name="name"
                   required
                   value={name}
                   onChange={onChange}/>
                   
            </div>
            <div className="flex flex-col gap-1">
            <label>Phone number:</label>
            <input type="tel"
                   name="phone"
                   value={phone}
                   onChange={onChange}
                   required/>
            </div>
          </div>
        )}
      </div>
      <button className="bg-red-600 text-white p-2 w-full rounded font-bold">
        Book this place
      </button>
    </form>
  );
}

export default BookingWidget;
