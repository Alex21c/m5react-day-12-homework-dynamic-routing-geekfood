import {Link} from'react-router-dom'
export default function Navbar(){
  return (
    <nav className='bg-lime-800 p-[2rem] rounded-tl-md rounded-tr-md flex gap-[1rem]'>

      <Link to="/" className='underline hover:text-yellow-100 transition text-[1.5rem] font-medium'>Home</Link>
      <Link to="#" className='underline hover:text-yellow-100 transition text-[1.5rem] font-medium'>About</Link>
      <Link to="#" className='underline hover:text-yellow-100 transition text-[1.5rem] font-medium'>Contact Us</Link>
    </nav>
  );
}