import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
function Category(){

    const [Category,setCategory]=useState([]);
    
    const [slide,setSlide]=useState(0);

    const fetchCategory= async ()=>{
        const response = await fetch("http://localhost:5000/Category");
        const Cdata = await response.json();
        setCategory(Cdata);
    }

   

    const prevSlide= () =>{
        if(slide===0) return false
        setSlide(slide-2);
    }

    const nextSlide= () =>{
        if(slide===Category.length-8) return false
        setSlide(slide+2);
    }

    useEffect(
        ()=>{
            fetchCategory();
        },[]
    )
    return(
       <div className="w-[1200px] mx-auto">
        <div className="flex justify-between pt-5  ">
            <span className=" font-bold text-xl">Whats on your mind?</span>
            <div className="flex justify-between w-[90px] mr-8">
                <div onClick={prevSlide} className="w-[40px] h-[40px] bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"><GoArrowLeft/></div>
                <div onClick={nextSlide} className="w-[40px] h-[40px] bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"><GoArrowRight/></div>
            </div>

        </div>
        <div className="flex  items-center overflow-hidden  pb-[40px] border-b-2 border-gray-200">
            {
                Category.map(
                    (cat,index)=>{
                        return <>
                            <div className=" flex-col w-[150px]  shrink-0 duration-500 relative flex items-center  "style={{
                                transform:`translateX(-${slide*150}px)`}} key={index}>
                            <div className="flex items-center justify-center h-[180px]">
                                <img src={"images/"+cat.image} alt="" />
                            </div>
                            <div className=" text-[16px] text-gray-800 font-semibold">{cat.path}</div>
                            </div>
                        </>
                    }
                )
            }

        </div>

       
       </div>
    )
}export default Category;