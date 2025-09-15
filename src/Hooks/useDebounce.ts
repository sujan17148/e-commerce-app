import { useEffect, useState } from "react";
export default function useDebounce(value:string,delay:number=500){
    const [debouncedValue,setDebouncedValue]=useState<string>("")
    useEffect(()=>{
      let timeOutId=setTimeout(() => {
         setDebouncedValue(value)
      }, delay);
      return ()=>clearTimeout(timeOutId)
    },[value])
    return {debouncedValue,setDebouncedValue} as const
}