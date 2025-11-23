import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader';
import ImageSlider from '../components/ImageSlider';

export default function ProductOverview() {
  const params = useParams();

  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/api/products/" + params.id).then(
      (res) => {
        setProduct(res.data);
        setStatus("Success");
      }
    ).catch(
      () => {
        toast.error("Failed to load product details");
        setStatus("Error");
      }
    )
  }, [])

  return (
    <div className='w-full h-[calc(100vh-100px)] text-secondary'>
      {
        status == "loading" && <Loader />
      }
      {
        status == "Success" && (
          <div className='w-full h-full flex'>
            <div className='w-[50%] h-full flex justify-center items-center'>
              <ImageSlider images={product.images} />
            </div>
            <div className='w-[50%] h-full flex flex-col items-center gap-4 p-10'>
              <span>{product.productID}</span>
              <h1 className='text-2xl font-bold text-center'>
                {product.name}
                {
                  product.altNames.map(
                    (name, index) => {
                      return (
                        <span key={index} className='text-sm font-normal text-secondary/70'>{" | " + name}</span>
                      )
                    }
                  )
                }
              </h1>
              <p className='mt-[30px] text-justify'>{product.description}</p>
              {/* category */}
              <span className=' text-gray-500 italic'>Category: {product.category}</span>
              {/* price */}
              {product.labelledPrice > product.price ? (
                <div className='flex items-center gap-4'>
                  <span className='text-gray-400 line-through text-lg'>LKR {product.labelledPrice.toFixed(2)}</span>
                  <span className='text-lg font-bold'>LKR {product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className='text-lg font-bold'>LKR {product.price.toFixed(2)}</span>
              )}
              <div className='w-full h-[40px] flex gap-4 mt-[60px]'>
                <button className='w-[50%] h-full bg-accent text-white font-semibold hover:bg-accent/80'>Add to Cart</button>
                <div className='w-[50%] h-full border-2 border-accent text-accent font-semibold flex justify-center items-center rounded-md'>Buy Now
                </div>
              </div>
            </div>
          </div>
        )
      }
      {
        status == "Error" && <div className='text-red-600'>Failed to load product details</div>
      }
    </div>
  )
}
