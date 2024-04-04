import axios from "axios";
import { useParams } from "react-router-dom";
import SuccessAndErrorMsg, {showError, hideError, useStateSuccessAndErrorMsg} from "./SuccessAndErrorMsg";
import LoaderImg, {useStateLoaderImage, showLoaderImage, hideLoaderImage} from "./LoaderImg";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useState } from "react";
import './Product.css';

const REACT_APP_API_THE_VEGAN_RECIPES_DB = process.env.REACT_APP_API_THE_VEGAN_RECIPES_DB;

export default function Product(){
  const {productId} = useParams();
  let [stateProduct, udpateStateProduct] = useState({});
  let [stateSuccessAndErrorMsg, updateStateSuccessAndErrorMsg] = useStateSuccessAndErrorMsg();
  let [stateLoaderImageHidden, updateStateLoaderImageHidden] = useStateLoaderImage();

  //console.log('this is product page...', productId);

  function fetchLocalProduct(){
    let product = require('../sampleProductData.json');
    udpateStateProduct(product);
  }

  async function fetchProductFromAPI(productId){
    // showError('hi', updateStateSuccessAndErrorMsg);
    // showLoaderImage(updateStateLoaderImageHidden);
    // return;
    // let product = require('../sampleProductData.json');
    // //console.log('making api call, fetching: ' + productId);
    // udpateStateProduct(product);
    // //console.log(product, product.method);
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
        showLoaderImage(updateStateLoaderImageHidden);
        hideError(updateStateSuccessAndErrorMsg); // if any
        // //console.log('what is this')
      // throw new Error(`hi there i'm test error`);
      // return ;

      const response = await axios.request(options);
      //console.log(response.data);
      // updateListOfProducts(response.data);
      udpateStateProduct(response.data);
      


      hideLoaderImage(updateStateLoaderImageHidden);
    } catch (error) {
      
      //console.log(error);
      showError('Failed to fetch products, please try again later!', updateStateSuccessAndErrorMsg);
    }    

  }
  

  useEffect(()=>{
    fetchProductFromAPI(productId);
    // fetchLocalProduct();
  }, [])


  // useEffect(()=>{
  //   //console.log(stateProduct.method)
  // }, [stateProduct]);
  
  return (
    <div id='wrapperProduct' className='mt-[2rem] pt-[1rem] border-2 border-slate-200 p-[2rem] w-[70rem]  m-auto rounded-md  text-[1.2rem] text-slate-200'>
      <Navbar/>
      <LoaderImg stateLoaderImageHidden={stateLoaderImageHidden}/>
      <SuccessAndErrorMsg  stateSuccessAndErrorMsg={stateSuccessAndErrorMsg}/> 
      {

        stateProduct?.id  && 
        <div className="wrapperInnerProduct flex flex-col gap-[1rem]  p-[2rem]">
          <h2 className="smallCaps text-[2rem] font-semibold mt-[1rem]">Product #{productId} {stateProduct.title}</h2>
          <div className="">

            <dl className=" flex flex-col gap-[1rem] ">
              <div className="wrapperProdudctImgAndDescPlusIngredients flex  gap-[1rem]">
                <div className="wrapperDescriptionAndIngredients w-[60%] flex flex-col gap-[1rem]">
                  <div>
                    <dt className="bg-green-300 text-slate-900 font-semibold px-[1rem] py-[.3rem]">Description</dt>
                    <dd>{stateProduct.description}</dd>
                  </div>
                  <div>
                    <dt className="bg-green-300 text-slate-900 font-semibold px-[1rem] py-[.3rem]">Ingredients</dt>
                    <dd>{stateProduct.ingredients}</dd>
                  </div>
                </div>
                <div className="productImage rounded-md overflow-hidden w-[40%] max-h-[25rem]">              
                    <img className="w-[100%] h-[100%] object-cover" src={stateProduct.image} alt={`Image ${stateProduct.title}`}/>                  
                </div>
              </div>


              <div>
                <dt className="bg-green-300 text-slate-900 font-semibold px-[1rem] py-[.3rem]">Method</dt>
                {
                  stateProduct?.method && stateProduct.method.map((item, key)=>{
                    let [step, data] = Object.entries(item)[0];
                    // //console.log(step, data);                
                    return <dd key={key}><strong>{step}:</strong> {data}</dd>
                  })
                }
                
              </div>

            </dl>
          </div>
        </div>
      }
      


      
    </div>
  );
}