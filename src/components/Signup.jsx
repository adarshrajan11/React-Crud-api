import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint for user registration
      const response = await axios.post(
        'http://192.95.51.55:4060/user/register',
        formData
      )

      setFormData({
        name: '',
        email: '',
        password: '',
      })
      alert(response.data.message)
      console.log('Registration success!', response.data)
    } catch (error) {
      // Handle error, e.g., show error message to the user
      console.error('Registration failed:', error.response.data)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <form onSubmit={handleSubmit} className='w-full max-w-sm'>
        <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>

        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700'>
            Name:
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-md'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-md'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700'>
            Password:
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-md'
            required
          />
        </div>

        <button
          type='submit'
          className='bg-green-500 text-white px-4 py-2 rounded-md'
        >
          Sign Up
        </button>

        <p className='mt-4'>
          Already have an account?{' '}
          <Link to='/' className='text-blue-500'>
            Login here
          </Link>
          .
        </p>
      </form>
    </div>
  )
}

export default Signup
