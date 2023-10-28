import React, { useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getPlaceById, reset } from "../features/place/placeSlice";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import Header from "../components/Header";

function PlacesInfo() {
  const { item } = useSelector((state) => state.place);
  const id = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaceById(id));
    return () => {
      dispatch(reset())
    }
   
  }, [dispatch, id]);

  return (
    <>
    <Header/>
      <div className="p-8 px-16 flex flex-col gap-5 pt-14 md:pt-28">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl md:text-3xl font-bold">{item.title}</h1>
          <p className="flex gap-1 font-semibold items-center">
            <FaLocationDot /> {item.address}
          </p>
          <div className="grid grid-cols-[2fr_1fr] gap-1 rounded-3xl overflow-hidden">
            <div>
              {item.photos?.[0] && (
                <img
                  className=" aspect-square object-cover"
                  src={"http://localhost:5000/uploads/" + item.photos[0]}
                  alt="hoome"
                />
              )}
            </div>
            <div className="overflow-hidden">
              {item.photos?.[1] && (
                <img
                  className=" aspect-square object-cover"
                  src={"http://localhost:5000/uploads/" + item.photos[1]}
                  alt="hoome"
                />
              )}
              <div className="overflow-hidden">
                {item.photos?.[2] && (
                  <img
                    className=" aspect-square object-cover top-1"
                    src={"http://localhost:5000/uploads/" + item.photos[2]}
                    alt="hoome"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:grid grid-cols-3 gap-2">
          <div className="col-span-2 flex flex-col gap-1">
            <h1 className="text-xl font-bold">Description</h1>
            <p className="text-gray-500 font-semibold">{item.description}</p>
            <p className="font-semibold">Check-In: {item.checkIn}</p>
            <p className="font-semibold">Check-out: {item.checkOut}</p>
            <p className="font-semibold">
              Max number of guests: {item.maxGuests}
            </p>
          </div>
          <BookingWidget item={item}/>
        </div>
        <div className="p-3 bg-white rounded-lg flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Extra Info</h1>
          <p>{item.extraInfo}</p>
        </div>
      </div>
    </>
  );
}

export default PlacesInfo;
