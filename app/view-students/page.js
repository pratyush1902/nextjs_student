'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import StudentList from '../../components/StudentList';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const response = await axios.get('http://localhost:1337/api/students');
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Student List</h1>
      <StudentList students={students} fetchStudents={fetchStudents} />
    </div>
  );
};

export default ViewStudents;
