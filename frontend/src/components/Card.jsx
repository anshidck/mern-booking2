import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPlaceById } from "../features/place/placeSlice";

function Card({ item }) {
  const dispatch = useDispatch();
  const handleItem = (item) => {
    dispatch(getPlaceById(item));
  };
  return (
    <Link onClick={() => handleItem(item._id)} to={`/info/${item._id}`}>
      <div className="flex flex-col gap-2 p-2">
        <img
          className="rounded-xl max-h-[280px] object-cover"
          src={"http://localhost:5000/uploads/" + item.photos[0]}
          alt=""
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">{item.address}</h1>
          <p className="font-semibold text-gray-500">
            {item.description}
          </p>
          <p className="font-bold text-xl">${item.price} per night</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
