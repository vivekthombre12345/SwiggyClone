import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CiDiscount1 } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { RiAdminLine } from "react-icons/ri";

function  Header(){
    
    
    const links=[
        {
            "icon":<CiSearch/>,
            "name":"search"
        },
        {
            "icon":<CiDiscount1/>,
            "name":"Dicount"
        },
        {
            "sup":"New",
            "name":"Offers"
        },
        {
            "icon":<IoIosHelpCircleOutline/>,
            "name":"Help"
        },
        {
            "icon":<RiAdminLine/>,
            "name":"Sign In"
        },
        {
            "icon":<CiShoppingCart/>,
            "name":"cart",
            "sup":0
        },
    ]

    const[toggle,setToggle]=useState(false);
    const showSideMenu=()=>{
        setToggle(true);
    }

    const hideSideMenu=()=>{
        setToggle(false);
        
    }


    return(
        <>
        <div className="black-overlay w-full h-full fixed top-0  duration-500" onClick={hideSideMenu} style={
            {
                visibility:toggle?'visible': 'hidden',
                zIndex:"99999",
            }}>

            <div className="w-[500px] bg-white h-full absolute  duration-500" onClick={(e)=>{e.stopPropagation()}} style={{
                left:toggle?'0%':'-500px',
            }}></div>
        </div>
        <header className="p-[15px] shadow-xl sticky top-0 bg-white w-full z-[999]">
            <div className="max-w-[1200px] mx-auto ">
              <div className="flex items-center">
              <div className="w-[30px]  inline-block mr-6">
                    <img src="images/logo.png" alt=""  className="w-full"/>                    
                </div>
                <div className="inline-block">
                <span className="text-bold underline hover:text-orange-500 cursor-pointer">Ratanda</span> Jodhpur,Rajastan,India<IoIosArrowDown className="inline-block text-orange-500 ml-2 cursor-pointer" onClick={showSideMenu}/>
                </div>
                <nav className="list-none flex gap-7 ml-auto font-semibold cursor-pointer">
                    {
                        links.map((link,index)=>{
                            return <li className="flex items-center gap-1 hover:text-orange-500">{link.icon}{link.name}<sup className="text-orange-500">{link.sup}</sup></li>
                        })
                    }                    
                </nav>
              </div>
            </div>
        </header>
        </>
    )
}
export default Header