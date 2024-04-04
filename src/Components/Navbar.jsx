import {Link} from'react-router-dom'
export default function Navbar(){
  return (
    <nav id='headerNav' className='bg-yellow-300 p-[2rem] rounded-md flex gap-[1rem] justify-center text-slate-900'>

      <Link to="/" className='underline hover:text-white transition text-[1.5rem] font-medium'>Home</Link>
      <Link to="https://www.linkedin.com/in/alex21c/" className='underline hover:text-white transition text-[1.5rem] font-medium'>About</Link>
      <Link to="https://www.linkedin.com/in/alex21c/" className='underline hover:text-white transition text-[1.5rem] font-medium'>Contact Us</Link>
    </nav>
  );
}