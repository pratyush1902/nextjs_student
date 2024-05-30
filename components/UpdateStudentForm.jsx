import { useState } from 'react';
import axios from 'axios';

const UpdateStudentForm = ({ student, onUpdate, onCancel }) => {
  const [name, setName] = useState(student.attributes.Name);
  const [phoneNumber, setPhoneNumber] = useState(student.attributes.Phoneno);
  const [dateOfJoining, setDateOfJoining] = useState(student.attributes.DateOfJoning);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://strapi3-7mfu.onrender.com/api/students/${student.id}`, {
        data: {
          Name: name,
          Phoneno: phoneNumber,
          DateOfJoning: dateOfJoining
        }
      });
      window.alert('Student updated successfully!');
      onUpdate();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <input
        type="date"
        value={dateOfJoining}
        onChange={(e) => setDateOfJoining(e.target.value)}
        required
      />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default UpdateStudentForm;
