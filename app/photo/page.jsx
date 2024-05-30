'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentPhoto from '@/components/StudentPhoto';
 

const Photos = () => {
  const [Photo, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/students?populate=*');
      const photoData = response.data.data.map((student) => ({
        id: student.id,
        url: student.attributes.Photo?.data?.attributes?.url,
        name: student.attributes.Name,
      }));
      setPhotos(photoData);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Student Photos</h2>
      <div className="photosGrid">
        {Photo.map((Photo) => (
          <div key={Photo.id} className="photoItem">
            <StudentPhoto photoUrl={Photo.url} altText={Photo.name} />
            {/* <StudentPhoto/> */}
            <p>{Photo.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
