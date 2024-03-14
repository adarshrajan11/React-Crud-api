import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function AddProduct() {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
  })
  const navigate = useNavigate()
  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Retrieve user data from sessionStorage
    const userData = sessionStorage.getItem('token')
    const token = userData ? userData : null

    if (!token) {
      alert('No user or token found.')
      return
    }

    try {
      // Make a POST request to add a product with Authorization header
      const response = await axios.post(
        'http://192.95.51.55:4060/products',
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log('Product added successfully:', response.data)
      navigate('/dashboard')

      // Clear the form after successful submission
      setProductData({
        name: '',
        price: '',
        description: '',
      })
    } catch (error) {
      console.error('Error adding product:', error.response.data)
    }
  }

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-3xl font-bold mb-4'>Add Product</h1>

      <form onSubmit={handleSubmit} className='max-w-md'>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700'>
            Product Name:
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={productData.name}
            onChange={handleInputChange}
            className='w-full px-3 py-2 border rounded-md shadow-xl'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='price' className='block text-gray-700'>
            Product Price:
          </label>
          <input
            type='number'
            id='price'
            name='price'
            value={productData.price}
            onChange={handleInputChange}
            className='w-full px-3 py-2 border rounded-md shadow-xl'
            required
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='description' className='block text-gray-700'>
            Product Description:
          </label>
          <textarea
            id='description'
            name='description'
            value={productData.description}
            onChange={handleInputChange}
            className='w-full px-3 py-2 border rounded-md shadow-xl'
            required
          />
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-md'
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct
