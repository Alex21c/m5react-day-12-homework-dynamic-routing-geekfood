import {Link} from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState, Suspense} from 'react';
import PaginationMaterialUI from './PaginationMaterialUI';
import SuccessAndErrorMsg from './SuccessAndErrorMsg';
import loaderImg from '../Assests/Images/loader.png'
// let CustomImg = React.lazy(()=> import('./CustomImg'));
const REACT_APP_API_THE_VEGAN_RECIPES_DB = process.env.REACT_APP_API_THE_VEGAN_RECIPES_DB;


export default function Homepage(){
  

  // console.log(REACT_APP_API_THE_VEGAN_RECIPES_DB);
  // some helper functions states
    let [currentPage, updateCurrentPage] = useState(1);
    let [stateTotalNoOfPages, updateStateTotalNoOfPages] = useState(1);
    let [stateLoaderImageHidden, updateStateLoaderImageHidden] = useState(true);
    let [stateSuccessAndErrorMsg, updateStateSuccessAndErrorMsg] = useState({
      style: {
        Success: "text-green-300 text-[1.5rem]",
        Error: "text-red-300 text-[1.5rem]"
      },
      msgType: "Success",
      msg: "",
      displayNone: 'displayNone'        
    
  });

  // setting state to store fetched api data    
    let [stateListOfProducts, updateListOfProducts] = useState([]);
    let [statePaginationListProducts, updateStatePaginationListProducts] = useState ([]);
    let paginationSliceBegin = 0, paginationSliceEnd = 24;
  // initial lodaing of products
    useEffect(()=>{
      makeAPICall();
    },[]);

    useEffect(()=>{
      // now selectin only first 9
      updateStateTotalNoOfPages(Math.floor(stateListOfProducts.length/24));
      console.log(stateTotalNoOfPages);
      updateStatePaginationListProducts(stateListOfProducts.slice(paginationSliceBegin, paginationSliceEnd));
    }, [stateListOfProducts]);

    useEffect(()=>{
      console.log('hi hi hi');
      paginationSliceEnd = currentPage * 24;
      paginationSliceBegin = paginationSliceEnd - 24;
      updateStatePaginationListProducts(stateListOfProducts.slice(paginationSliceBegin,  paginationSliceEnd));
    }, [currentPage]);
    // function Loading(){
    //   return <img  src={loaderImg} alt="Loading..." />
    // }
    

  // some helper functions 
    function showLoaderImage(){
      updateStateLoaderImageHidden(false);
    }
    function hideLoaderImage(){
      updateStateLoaderImageHidden(true);
    }
    function showError(error){
      updateStateSuccessAndErrorMsg(previousState=>{
        return {
          ...previousState,
          msgType: 'Error',
          msg : error, 
          displayNone: ''
        }
      });
    }
    function hideError(){
      updateStateSuccessAndErrorMsg(previousState=>{
        return {
          ...previousState,
          displayNone: 'displayNone'
        }
      });
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
        hideError(); // if any
      // throw new Error(`hi there i'm test error`);
      // return ;

      // const response = await axios.request(options);
      // console.log(response.data);
      // updateListOfProducts(response.data);
      updateListOfProducts(require('../apiData.json'));


      hideLoaderImage();
    } catch (error) {
      showError('Failed to fetch products, please try again later!');
      console.log(error);
    }    
  }

  return (
    <div className='flex flex-col items-center'>

      <div className=' grid grid-cols-3 '>
        {
          statePaginationListProducts.map((item, idx)=>{
            return (
                <Link to={`products/${item.id}`}  key={item.id}>
              <div data-id={item.id} className=' flex flex-col gap-[1rem] p-[2rem]'> 
                <div className='w-[20rem] h-[20rem] shadow-md shadow-green-300 rounded-md overflow-hidden'>
                                                      
                    {/* <img src={loaderImg} className='w-[100%] h-[100%]' onLoad={(event)=>{event.target.src=item.image}} /> */}
                    {/* <img src={loaderImg} className='w-[100%] h-[100%]' onLoad={(event)=>{event.target.src=item.image}} /> */}
                    <img src={item.image} className='w-[100%] h-[100%]' />
                  
                                    
                </div>
                  <h2>{item.title}</h2>
              </div>
                </Link>
            )
          })
        }

      </div>

      <div id='wrapperLoaderImage' className={`${stateLoaderImageHidden ? "displayNone" : "" } w-[25rem] h-[20rem]  m-[2rem]  self-center`}>
        <img src={require('../Assests/Images/loader.png')} className=" object-none  rounded-xl shadow-yellow-300 shadow-2xl  w-[100%] h-[100%]"/>
      </div>  
      <SuccessAndErrorMsg  stateSuccessAndErrorMsg={stateSuccessAndErrorMsg}/>   
        
      {
        stateListOfProducts.length>0 && 
        <PaginationMaterialUI stateTotalNoOfPages={stateTotalNoOfPages} updateCurrentPage={updateCurrentPage}/>
      }

      

    </div>



  );
}