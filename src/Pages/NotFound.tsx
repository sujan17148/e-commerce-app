import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import NotFoundAnimation from "../assets/404 Animation.json";

export default function NotFound() {
  const navigate=useNavigate()
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
       <Player loop autoplay src={NotFoundAnimation} className="w-full min-h-[50dvh] animate-pulse"/>
       <button onClick={()=>navigate(-1)} className="custom-button bg-accent">Go Back</button>
    </div>
  );
}
