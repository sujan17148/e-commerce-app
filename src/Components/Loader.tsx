import { Player } from "@lottiefiles/react-lottie-player";
import loaderAnimation from "../assets/loading.json";

export default function Loader({ className }:{className?:string}) {
  return (
    <div className={`flex justify-center items-center flex-col ${className}`}>
      <Player
        autoplay
        loop
        src={loaderAnimation}
      />
    </div>
  );
}