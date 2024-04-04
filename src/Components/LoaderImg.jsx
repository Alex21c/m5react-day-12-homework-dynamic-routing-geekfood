import { useState } from 'react';

export default function loaderImg({stateLoaderImageHidden}){
  return(
    <div id='wrapperLoaderImage' className={`${stateLoaderImageHidden ? "displayNone" : "" } w-[25rem] h-[20rem]  m-[2rem]  self-center`}>
      <img src={require('../Assests/Images/loader.png')} className=" object-none  rounded-xl shadow-yellow-300 shadow-2xl  w-[100%] h-[100%]"/>
    </div>  
  );
}

export function showLoaderImage(updateStateLoaderImageHidden){
  updateStateLoaderImageHidden(false);
}
export function hideLoaderImage(updateStateLoaderImageHidden){
  updateStateLoaderImageHidden(true);
}

export function useStateLoaderImage(){
  let [stateLoaderImageHidden, updateStateLoaderImageHidden] = useState(true);
  return [stateLoaderImageHidden, updateStateLoaderImageHidden];
}
