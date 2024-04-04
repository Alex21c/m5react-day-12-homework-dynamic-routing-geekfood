
import { useRouteError } from "react-router-dom";

export default function NotFound() {
  let error= useRouteError();
  //console.log(error);
  return (
    <div className='mt-[2rem] pt-[1rem] border-2 border-slate-200 p-[2rem] w-[70rem]  m-auto rounded-md  text-[1.2rem] text-slate-200'>
        <h2 className="text-[2rem] font-semibold">{`${error.status} ${error.statusText} !`}</h2>
      
    </div>
  );
}

