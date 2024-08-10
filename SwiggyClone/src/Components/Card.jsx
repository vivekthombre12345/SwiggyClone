import { FaStar } from "react-icons/fa";
function Card(props){
    return (
        <div style={{transform:`translateX(-${props.slide*300}px)`}} className="duration-500">
             <div className="w-[270px] shrink-0 duration-500 mx-[15px] group">
                            <div className="relative h-[180px] rounded-[15px] overflow-hidden w-full">
                                <img className="w-full h-full object-cover group-hover:scale-110 duration-150 " src={"images/"+props.image} alt="" />
                                <div className="image-overlay w-full h-full top-0 absolute flex items-end justify-around text-[20px] text-white font-extrabold">{props.offer}</div>
                            </div>
                            <span className="font-bold ">{props.title}</span><br/>
                            <div className="flex items-center gap-2"><FaStar className="inline h-[20px] p-1 w-[20px] rounded-full bg-green-700 text-white"/> <span className="font-bold"> {props.rating} . {props.maxTime}-{props.minTime} mins</span></div>
                            <span className="text-gray-500">{props.name}</span><br/>
                            <span className="text-gray-500">{props.place}</span><br/>
                        </div> 
        </div>
    )
}
export default Card;