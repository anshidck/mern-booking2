import React from "react";
import { MdDelete } from 'react-icons/md'
import { useDispatch } from "react-redux";
import { deletePlace, getPlaceByUser } from "../features/place/placeSlice";

function Simple({ item }) {
  const dispatch = useDispatch()
  const handleDelete = (id) => {
    dispatch(deletePlace(id))
    dispatch(getPlaceByUser())
  }
  return (
    <>  
        <div className="w-full md:grid grid-cols-4 p-3 bg-white rounded gap-4">
          <img
            className="col-span-1 w-full object-cover"
            src={`http://localhost:5000/uploads/${
              item.photos && item.photos[0]
            }`}
            alt="asd"
          />
          <div className="w-full col-span-3">
            <div className="flex justify-between">
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <button onClick={() => handleDelete(item._id)} className="hidden md:block text-red-700"><MdDelete size={23}/></button>
            </div>
            <p className="text-xl text-gray-600">{item.description}</p>
            <p>$: {item.price}</p>
            <p>Guests: {item.maxGuests}</p>
          </div>
          <button className="flex w-full justify-center bg-red-700 text-white p-1 font-bold">delete</button>      
        </div>
    </>
  );
}

export default Simple;
