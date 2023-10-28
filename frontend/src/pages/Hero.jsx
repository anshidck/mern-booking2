import React, { useEffect } from 'react'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAll } from '../features/place/placeSlice'
import Header from '../components/Header'

function Hero() {
  const { places } = useSelector((state) => state.place)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAll())
  },[dispatch])

  return (
    <>
    <Header/>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4 gap-5 pt-14 md:pt-28'>
        {places && places.map((item) => (
          <Card item={ item } key={item._id}/>
        ))}
    </div>
    </>
  )
}

export default Hero