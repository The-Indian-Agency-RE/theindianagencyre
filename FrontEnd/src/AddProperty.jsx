import React, { useState } from 'react';
import API from './api';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post('/properties', formData)
      .then(() => {
        alert('Property added successfully!');
        setFormData({ title: '', price: '', location: '', description: '', image: '' });
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to add property. Make sure you are logged in.');
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h2>Add Property</h2>
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
      <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
      <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddProperty;
