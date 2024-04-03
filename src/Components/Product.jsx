import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useState } from "react";
export default function Product(){
  const {productId} = useParams();
  let [stateProduct, udpateStateProduct] = useState({});

  console.log('this is product page...', productId);

  function fetchProductFromAPI(){
    let product = require('../sampleProductData.json');
    udpateStateProduct(product);
    // console.log(product, product.method);


  }

  useEffect(()=>{
    fetchProductFromAPI();
  }, [])


  useEffect(()=>{
    console.log(stateProduct.method)
  }, [stateProduct]);
  
  return (
    <div className='mt-[2rem] pt-[1rem] border-2 border-slate-200 p-[2rem] w-[70rem]  m-auto rounded-md  text-[1.2rem] text-slate-200'>
      <Navbar/>

      
      <div className="flex flex-col gap-[1rem] bg-lime-950 p-[2rem]">
        <h2 className="smallCaps text-[2rem] font-semibold mt-[1rem]">Product #{productId} {stateProduct.title}</h2>
        <div className="flex gap-[1rem]">
          <div className="w-[40%] rounded-xl overflow-hidden">
            <img className="w-[100%] h-[100%] object-cover" src={stateProduct.image} alt={`Image ${stateProduct.title}`}/>
          </div>
          <dl className="flex flex-col gap-[1rem] w-[60%]">
            <div>
              <dt className="bg-green-300 text-slate-900 font-semibold px-[1rem] py-[.3rem]">Description</dt>
              <dd>{stateProduct.description}</dd>
            </div>
            <div>
              <dt className="bg-green-300 text-slate-900 font-semibold px-[1rem] py-[.3rem]">Ingredients</dt>
              <dd>{stateProduct.ingredients}</dd>
            </div>
            <div>
              <dt className="bg-green-300 text-slate-900 font-semibold px-[1rem] py-[.3rem]">Method</dt>
              {
                stateProduct?.method && stateProduct.method.map((item, key)=>{
                  let [step, data] = Object.entries(item)[0];
                  // console.log(step, data);                
                  return <dd><strong>{step}:</strong> {data}</dd>
                })
              }
              
            </div>

          </dl>
        </div>
      </div>


      
    </div>
  );
}