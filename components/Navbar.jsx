'use client'
import Link from 'next/link';
 

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul  >
        <li  >
          <Link href="/add-student">Add Student</Link>
        </li>
        <li   >
          <Link href="/view-students">View Students</Link>

        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
