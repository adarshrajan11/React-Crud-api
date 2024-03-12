import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom' // Import Link from react-router-dom

function Dashboard() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const userData = sessionStorage.getItem('token')
    const user = userData ? userData : null

    if (!user) {
      alert('No user or token found. ')
      return
    }

    // Make a GET request to fetch products with Authorization header
    axios
      .get('http://192.95.51.55:4060/products', {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
      })
  }, [])

  const handleDelete = async (id) => {
    const userData = sessionStorage.getItem('token')
    const user = userData ? userData : null

    try {
      // Delete the product
      await axios.delete(`http://192.95.51.55:4060/products/${id}`, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })

      // Fetch the updated list of products
      const updatedProducts = await axios.get(
        'http://192.95.51.55:4060/products',
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      )

      // Update the state with the new list of products
      setProducts(updatedProducts.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {/* Navbar */}
      <nav className='bg-blue-500 p-4'>
        <div className='container mx-auto flex justify-between items-center'>
          <Link to='/profile' className='text-white font-bold'>
            Profile
          </Link>
          <Link to='/add-data' className='text-white font-bold'>
            Add Product
          </Link>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className='container mx-auto mt-8'>
        <h1 className='text-3xl font-bold mb-4'>My Dashboard</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {products.map((product) => (
            <div key={product.id} className='bg-white p-4 rounded-md shadow-md'>
              <h2 className='text-xl font-semibold mb-2'>{product.name}</h2>
              <p className='text-gray-700'>{product.description}</p>
              <p className='mt-2 text-blue-500'>${product.price}</p>
              <button
                className='bg-red-500 text-white px-4 py-2 rounded-md mt-2'
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
