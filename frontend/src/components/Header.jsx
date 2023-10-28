import React from "react";
import { BsSearch } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="fixed h-[50px] w-full md:h-[90px] flex justify-between items-center p-4 bg-white shadow shadow-black md:px-8">
      <Link to="/">
        <div className="flex gap-3 items-center">
          <img
            className="h-[20px] md:h-[30px]"
            src="https://icon-library.com/images/room-icon/room-icon-2.jpg"
            alt="/"
          />
          <h1 className="text-xl md:text-3xl font-bold">HUB</h1>
        </div>
      </Link>
      <div className="hidden md:flex gap-2 items-center rounded-full shadow shadow-black border p-2">
        <p className="font-semibold border-r-2 px-2">Any week</p>
        <p className="font-semibold border-r-2 px-2">Any Where</p>
        <p className="font-semibold border-r-2 px-2">Add Guest</p>
        <p className="bg-red-600 p-2 rounded-full text-white ">
          <BsSearch />
        </p>
      </div>
      <Link to={user ? "/profile" : "/login"}>
        <div className="flex rounded-full shadow shadow-black p-1 md:p-2 gap-1 items-center">
          <HiMenu size={20} />
          <BsPersonCircle size={20} />
          <h1 className="text-sm md:text-base font-semibold">{user && user.name}</h1>
        </div>
      </Link>
    </div>
  );
}

export default Header;
