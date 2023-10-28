import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Accommadation from "./Accommadation";


import Header from "../components/Header";
import Booked from "../components/Booked";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [active, setActive] = useState(1);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }
  return (
    <>
    <Header/>
      <div className="p-3 px-5 pt-16 md:pt-28">
        <ul className="flex gap-4 justify-center items-center">
          <button
            onClick={() => setActive(1)}
            className={
              active === 1
                ? "bg-red-600 text-white p-1 text-xs md:text-base font-semibold rounded-full px-2"
                : "p-1 font-semibold bg-white rounded-full px-2 text-xs md:text-base"
            }
          >
            My Profile
          </button>
          <button
            onClick={() => setActive(2)}
            className={
              active === 2
                ? "bg-red-600 text-white p-1 font-semibold rounded-full px-2 text-xs md:text-base"
                : "p-1 font-semibold bg-white rounded-full px-2 text-xs md:text-base"
            }
          >
            My Booking
          </button>
          <button
            onClick={() => setActive(3)}
            className={
              active === 3
                ? "bg-red-600 text-white p-1 font-semibold rounded-full px-2 text-xs md:text-base"
                : "p-1 font-semibold bg-white rounded-full px-2 text-xs md:text-base"
            }
          >
            My Accommadation
          </button>
        </ul>
        <div className="items-center">
          {active === 1 && (
            <div className="w-[30%] flex flex-col items-center justify-center gap-2 mt-9 mx-auto">
              <p className="font-semibold ">
                Logged in as {user.name} ({user.email})
              </p>
              <button onClick={onLogout} className="bg-red-600 text-white rounded-full w-full font-bold p-1">Logout</button>
            </div>
          )}
          {active === 2 && (
           <Booked/>
          )}
          {
            active === 3 && (
              <Accommadation/>
            )
          }
        </div>
      </div>
    </>
  );
}

export default Profile;
