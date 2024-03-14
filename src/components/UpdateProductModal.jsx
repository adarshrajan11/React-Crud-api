import React from 'react'

function UpdateProductModal({ product, onClose, onUpdate }) {
  const [updatedName, setUpdatedName] = React.useState(product.name)
  const [updatedDescription, setUpdatedDescription] = React.useState(
    product.description
  )
  const [updatedPrice, setUpdatedPrice] = React.useState(product.price)

  const handleSubmit = () => {
    // Here you can send an update request to your backend
    // For simplicity, I'm just calling the onUpdate function with updated values
    onUpdate(product._id, {
      name: updatedName,
      description: updatedDescription,
      price: updatedPrice,
    })
    onClose()
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='z-50 bg-white p-6 rounded-lg max-w-md'>
        <span
          className='absolute top-0 right-0 p-2 cursor-pointer'
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className='text-xl font-bold mb-4'>Update Product</h2>
        <label className='block mb-2'>Name:</label>
        <input
          type='text'
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          className='w-full border rounded-md py-2 px-3 mb-3'
        />
        <label className='block mb-2'>Description:</label>
        <textarea
          value={updatedDescription}
          onChange={(e) => setUpdatedDescription(e.target.value)}
          className='w-full border rounded-md py-2 px-3 mb-3'
        />
        <label className='block mb-2'>Price:</label>
        <input
          type='number'
          value={updatedPrice}
          onChange={(e) => setUpdatedPrice(e.target.value)}
          className='w-full border rounded-md py-2 px-3 mb-3'
        />
        <button
          onClick={handleSubmit}
          className='bg-blue-500 text-white px-4 py-2 rounded-md'
        >
          Update
        </button>
      </div>
    </div>
  )
}

export default UpdateProductModal
