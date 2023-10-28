import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPlaces, fetchAll, getPlaceByUser } from '../features/place/placeSlice' 
import PhotosUploader from "./PhotosUploader";
import Perks from "./Perks";

function PlaceForm({ set }) {
  const [addedphotos, setAddedPhotos] = useState([]);
  const [addedperks, setPerks] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    photos: "",
    description: "",
    perks: "",
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: "",
    price: "",
  });

  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, message, isSuccess } = useSelector((state) => state.place);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message, isSuccess, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (addedphotos.length >= 3) {
      const placeData = {
        title,
        address,
        photos: addedphotos,
        description,
        perks: addedperks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      };
      dispatch(createPlaces(placeData));
      toast.success("New Place Added");
      set(1)
      dispatch(getPlaceByUser())
    } else {
      toast.error("Please add at least 3 photos before submitting.");
    }
  };

  return (
    <div className="p-4 w-full md:w-[60%] mx-auto ">
      <div className="border-4 border-red-700 rounded p-6 flex flex-col gap-5">
        <h1 className="font-bold text-3xl md:text-6xl flex gap-1 justify-center items-center">
          Add your Place
        </h1>
        <form
          onSubmit={onSubmit}
          className="w-full flex flex-col gap-3 items-center p-3"
        >
          <input
            value={title}
            name="title"
            onChange={onChange}
            className="w-[80%] md:w-[50%] p-3 rounded-sm border outline-teal-700"
            type="text"
            placeholder="Enter Your Hotal Name"
          />
          <input
            value={address}
            name="address"
            onChange={onChange}
            className="w-[80%] md:w-[50%] p-3 rounded-sm border outline-teal-700"
            type="text"
            placeholder="Address.."
          />
          <div className="mx-auto">
          <PhotosUploader addedPhotos={addedphotos} onChange={setAddedPhotos}/>
          </div>
          <input
            value={description}
            name="description"
            onChange={onChange}
            className="w-[80%] md:w-[50%] p-3 rounded-sm border outline-teal-700"
            type="text"
            placeholder="Description"
          />
          <Perks selected={addedperks} onChange={setPerks}/>
          <input
            value={extraInfo}
            name="extraInfo"
            onChange={onChange}
            className="w-[80%] md:w-[50%] p-3 rounded-sm border outline-teal-700"
            type="text"
            placeholder="Extra Info...."
          />
          <div className="flex">
          <input
            value={checkIn}
            name="checkIn"
            onChange={onChange}
            className="w-[80%] md:w-[50%] p-3 rounded-sm border outline-teal-700"
            type="number"
            placeholder="ChekIn"
          />
          <input
            value={checkOut}
            name="checkOut"
            onChange={onChange}
            className="w-[80%] md:w-[50%] p-3 rounded-sm border outline-teal-700"
            type="number"
            placeholder="CheckOut"
          />
          </div>
          <input
            value={maxGuests}
            name="maxGuests"
            onChange={onChange}
            className="w-[80%] md:w-[50%] p-3 rounded-sm border outline-teal-700"
            type="number"
            placeholder="Maximum Guests"
          />
          <input
            value={price}
            name="price"
            onChange={onChange}
            className="w-[80%] md:w-[50%] p-3 rounded-sm border outline-teal-700"
            type="number"
            placeholder="Price"
          />
          <button
            type="submit"
            className="w-[80%] md:w-[50%] p-3 bg-red-600 text-white rounded-sm font-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default PlaceForm;
