import { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateStudentForm from './UpdateStudentForm';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://strapi3-7mfu.onrender.com/api/students?populate=*');
      setStudents(response.data.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student? Press enter to proceed.')) {
      try {
        await axios.delete(`https://strapi3-7mfu.onrender.com/api/students/${id}`);
        window.alert('Student deleted successfully!');
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleResetDays = async (id) => {
    if (window.confirm('Are you sure you want to reset the days to 30? Press enter to proceed.')) {
      try {
        await axios.put(`https://strapi3-7mfu.onrender.com/api/students/${id}`, {
          data: { DateOfJoning: new Date().toISOString().split('T')[0] }
        });
        window.alert('Days reset to 30 successfully!');
        fetchStudents();
      } catch (error) {
        console.error('Error resetting days:', error.response ? error.response.data : error.message);
      }
    }
  };

  const calculateDaysRemaining = (dateOfJoining) => {
    const joinDate = new Date(dateOfJoining);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return 30 - diffDays;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter(student =>
    student.attributes.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="title">Student List</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearch}
        className="searchInput"
      />
      <ul className="list">
        {filteredStudents.map((student) => {
          const daysRemaining = calculateDaysRemaining(student.attributes.DateOfJoning);
          const daysRemainingClass = daysRemaining < 5 ? 'days-remaining red' : 'days-remaining green';
          const photoUrl = student.attributes.Photo?.data?.attributes?.url;

          return (
            <li key={student.id} className="listItem">
              {editingStudent && editingStudent.id === student.id ? (
                <UpdateStudentForm
                  student={editingStudent}
                  onUpdate={() => {
                    fetchStudents();
                    setEditingStudent(null);
                  }}
                  onCancel={() => setEditingStudent(null)}
                />
              ) : (
                <>
                  {photoUrl ? (
                    <img
                      className="photo"
                      src={`https://strapi3-7mfu.onrender.com${photoUrl}`}
                      alt={student.attributes.Name}
                      width="250"
                      height="250"
                    />
                  ) : (
                    <p>No Photo Available</p>
                  )}
                  <div className="info">
                    <p>Name: {student.attributes.Name}</p>
                    <p>Phone Number: {student.attributes.Phoneno}</p>
                    <p>Date of Joining: {new Date(student.attributes.DateOfJoning).toLocaleDateString()}</p>
                    <div className={daysRemainingClass}>
                      Days Remaining: {daysRemaining}
                    </div>
                  </div>
                  <div className="buttons">
                    <button onClick={() => setEditingStudent(student)}>Edit</button>
                    <button onClick={() => handleDelete(student.id)}>Delete</button>
                    <button onClick={() => handleResetDays(student.id)}>Reset Days</button>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StudentList;
