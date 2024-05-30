const StudentPhoto = ({ photoUrl, altText }) => {
    return (
      <>
        {photoUrl ? (
          <img
            className="photo"
            src={`http://localhost:1337${photoUrl}`}
            alt={altText}
            width="50"
          />
        ) : (
          <p>No Photo Available</p>
        )}
      </>
    );
  };
  
  export default StudentPhoto;
  