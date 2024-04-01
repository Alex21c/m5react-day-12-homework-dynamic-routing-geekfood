import axios from 'axios';
import { useEffect, useState } from 'react';
import PaginationMaterialUI from './PaginationMaterialUI';
const REACT_APP_API_THE_VEGAN_RECIPES_DB = process.env.REACT_APP_API_THE_VEGAN_RECIPES_DB;

export default function Homepage(){
  console.log(REACT_APP_API_THE_VEGAN_RECIPES_DB);
  // some helper functions states
    let [stateLoaderImageHidden, updateStateLoaderImageHidden] = useState(true);

  // setting state to store fetched api data    
    let [stateListOfProducts, updateListOfProducts] = useState([]);
    let [statePaginationListProducts, updateStatePaginationListProducts] = useState ([]);

  // initial lodaing of products
    useEffect(()=>{
      makeAPICall();
    },[]);

  // some helper functions 
    function showLoaderImage(){
      updateStateLoaderImageHidden(false);
    }
    function hideLoaderImage(){
      updateStateLoaderImageHidden(true);
    }

  // makeAPICall();
  async function makeAPICall(productId=null){
    let requestURL = "https://the-vegan-recipes-db.p.rapidapi.com";
    const options = {
      method: 'GET',
      url: productId ? `${requestURL}/${productId}` : requestURL,
      headers: {
        'X-RapidAPI-Key': REACT_APP_API_THE_VEGAN_RECIPES_DB,
        'X-RapidAPI-Host': 'the-vegan-recipes-db.p.rapidapi.com'
      }
    };
    
    try {
      // show loader image
        showLoaderImage();


      return ;

      const response = await axios.request(options);
      console.log(response.data);
      updateListOfProducts(response.data);

      // now selectin only first 9
      updateStatePaginationListProducts(stateListOfProducts.slice(0,9));
    } catch (error) {
      console.error(error);
    }    
  }

  return (
    <div className='flex flex-col items-center'>

      <div className=' grid grid-cols-3 '>
        {
          statePaginationListProducts.map((item, idx)=>{
            return (
              <div key={item.id} data-id={item.id} className=' flex flex-col gap-[1rem] p-[2rem]'> 
                <div className='w-[20rem] h-[20rem] shadow-md shadow-green-300 rounded-md overflow-hidden'>
                  <img src={item.image} className='w-[100%] h-[100%]' />
                </div>
                <h2>{item.title}</h2>
              </div>
            )
          })
        }

      </div>
      <div id='wrapperLoaderImage' className={`${stateLoaderImageHidden ? "displayNone" : "" } w-[25rem] h-[20rem]  m-[2rem]  self-center`}>
        <img src={require('../Assests/Images/loader.png')} className=" object-none  rounded-xl shadow-yellow-300 shadow-2xl  w-[100%] h-[100%]"/>
      </div>  
        
      {
        stateListOfProducts.length>0 && 
        <PaginationMaterialUI />
      }

      

    </div>



  );
}