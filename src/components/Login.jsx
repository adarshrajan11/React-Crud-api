import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://192.95.51.55:4060/user/login',
        formData
      )

      console.log('Login success!', response.data)

      if (response.data.status) {
        sessionStorage.setItem('user', JSON.stringify(response.data.data))
        sessionStorage.setItem('token', response.data.token)
        navigate('/dashboard')
      }
    } catch (error) {
      // Handle error, e.g., show error message to the user
      console.error('Login failed:', error.response.data)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <form onSubmit={handleSubmit} className='w-full max-w-sm'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>

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
            className='w-full px-3 py-2 border rounded-md shadow-xl'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700 shadow-md'>
            Password:
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-md shadow-xl'
            required
          />
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-md'
        >
          Login
        </button>

        <p className='mt-4'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-blue-500'>
            Sign up here
          </Link>
          .
        </p>
      </form>
    </div>
  )
}

export default Login
