'use client'
import { useState } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [Name, setName] = useState('');
  const [Phoneno, setPhoneNumber] = useState('');
  const [DateOfJoning, setDateOfJoining] = useState('');
  const [Photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('data', JSON.stringify({ Name, Phoneno, DateOfJoning }));
    if (Photo) formData.append('files.Photo', Photo);

    try {
      await axios.post('https://strapi3-7mfu.onrender.com/api/students', formData);
      alert('Student added successfully!');
      setName('');
      setPhoneNumber('');
      setDateOfJoining('');
      setPhoto(null);
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add Student</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={Phoneno}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="date"
          value={DateOfJoning}
          onChange={(e) => setDateOfJoining(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
