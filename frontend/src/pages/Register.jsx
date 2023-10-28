import React from 'react'
import { BsFillPersonFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user,  isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user ) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }


  return (
    <div className='flex flex-col items-center gap-2 w-full mt-20'>
        <h1 className='font-bold text-6xl flex gap-1 justify-center items-center'><BsFillPersonFill /> REGISTER</h1>
        <p className='font-semibold text-red-600'>Please register to countinue</p>
        <form onSubmit={onSubmit} className='w-full flex flex-col gap-3 items-center p-3' >
          <input value={name} name='name' onChange={onChange} className='w-[80%] md:w-[50%] p-3 rounded-sm' type="text" placeholder='Enter Your Name'/>
          <input value={email} name='email' onChange={onChange} className='w-[80%] md:w-[50%] p-3 rounded-sm' type="email" placeholder='Enter Your Email'/>
          <input value={password} name='password' onChange={onChange} className='w-[80%] md:w-[50%] p-3 rounded-sm' type="password" placeholder='Enter Your Password'/>
          <input value={password2} name='password2' onChange={onChange} className='w-[80%] md:w-[50%] p-3 rounded-sm' type="password" placeholder='Confirm Password'/>
          <button type='submit' className='w-[80%] md:w-[50%] p-3 bg-red-600 text-white rounded-sm font-bold'>Submit</button>
        </form>
       <p> Already have an account? <Link to='/login' className='text-red-600'>login</Link></p>
    </div>
  )
}

export default Register