import './App.css';
import './Assests/fontAwesomeProIcons/fontAwesomeIcons.css';
import Homepage from './Components/Homepage';
import PaginationMaterialUI from './Components/PaginationMaterialUI';
import Navbar from './Components/Navbar';
import './Components/Navbar.css'
function App() {

  return (
    <div id='wrapperHomepage'  className='mt-[2rem] pt-[1rem] border-2 border-slate-200 p-[2rem] w-[70rem]  m-auto rounded-md  text-[1.2rem] text-slate-200'>
      <Navbar/>
      <Homepage />
      
    </div>
  );
}

export default App;
