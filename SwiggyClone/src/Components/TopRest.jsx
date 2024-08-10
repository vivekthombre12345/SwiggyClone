import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
// import { FaStar } from "react-icons/fa";
import Card from "./Card";
function TopRest(){

    const [restaurants,setRestaurants]=useState([]);
    const [slide,setSlide]=useState(0);
    

    const fetchRestaurants= async ()=>{
        const response = await fetch("http://localhost:5000/restaurantsChains");
        const Rdata = await response.json();
        setRestaurants(Rdata);
    }

    useEffect(
        ()=>{
            fetchRestaurants();
        },[]
    )

    const nextSlide1 = ()=>{
        
        if(restaurants.length-4===slide) return false;
        setSlide(slide+2)
    }
    const prevSlide1 = ()=>{
        if(slide===0) return false
        setSlide(slide-2)
    }
    return (
        <div className="w-[1200px] mx-auto">
             <div className="flex justify-between pt-6">
                    <span className=" font-extrabold text-xl">Top Restaurants chains in Pune</span>

                    <div className="flex justify-between w-[90px] mr-8">
                        <button  onClick={prevSlide1}  className="w-[40px] h-[40px] bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"><GoArrowLeft/></button>
                        <button  onClick={nextSlide1} className="w-[40px] h-[40px] bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"><GoArrowRight/></button>
                    </div>

            </div>

        <div className="flex  items-center  pb-[40px] overflow-hidden border-b-2 border-gray-200 mt-5 ">

            {
                restaurants.map(
                    (rest,index)=>{
                        return <Card {...rest} key={index} slide={slide}/>
                    }
                )
            }
        </div>
        
        </div>
    )
}
export default TopRest;