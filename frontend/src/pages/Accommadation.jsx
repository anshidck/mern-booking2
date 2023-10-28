import React, { useEffect, useState } from 'react'
import PlaceForm from '../components/PlaceForm'
import { useDispatch, useSelector } from 'react-redux'
import Simple from '../components/Simple'
import { getPlaceByUser } from '../features/place/placeSlice'

function Accommadation() {
    const [active, setActive] = useState(1)
    const { items } = useSelector((state) => state.place)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPlaceByUser())
    },[dispatch])

    return (
        <>
            {active === 1 && (
                <div className='flex flex-col gap-2 mt-5 w-full'>
                    <button onClick={() => setActive(2)} className='bg-red-700 text-white flex items-center p-1 justify-center w-full font-bold rounded'>+Add places</button>
                   { items && items.map((item) => (
                    <Simple key={item._id} item={item} />
                ))}
                </div>
            )}
            {active === 2 && <PlaceForm  set={setActive}/>}
        </>
    )
}

export default Accommadation;
