import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Card from "./Card";

function OnlineD() {

    const [restaurants, setRestaurants] = useState([]);
    const fetchRestaurants = async () => {
        const response = await fetch("http://localhost:5000/restaurantsChains");
        const Rdata = await response.json();
        setRestaurants(Rdata);
    }
    useEffect(
        () => {
            fetchRestaurants();
        }, []
    )


    const ref = useRef(null);
    const [isAtTop, setIsAtTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setIsAtTop(rect.top <= 0);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        };

    }, []);


    return (
        <>
            <div className="w-[1200px] mx-auto" ref={ref}>
                <div className="flex justify-between pt-6 ">
                    <span className=" font-extrabold text-xl">Restaurants in online Food Delivery in Pune </span>
                </div>
                <div className={isAtTop ? 'fixed top-0 bg-white z-[99999]' : ''}>
                    <div className="w-[1200px] mx-auto flex gap-3 p-4  ">
                        <div className="px-5 py-2 shadow rounded-full border border-gray-300">Filter</div>
                        <div className="px-5 py-2 shadow rounded-full border border-gray-300">Sort By <IoIosArrowDown className="inline" /></div>
                        <div className="px-5 py-2 shadow rounded-full border border-gray-300">Fast Delivery</div>
                    </div>
                </div>
                <div className=" grid grid-cols-4 gap-3 mt-10">
                    {
                        restaurants.map(
                            (data, index) => {
                                return <>
                                    <Card {...data} />
                                </>
                            }
                        )
                    }
                </div>
            </div>
        </>
    )
}
export default OnlineD;