import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key:string, initialData:T) {
  const [value, setValue] = useState<T>(() => {
    const data=localStorage.getItem(key);
    return data? JSON.parse(data): initialData
  });
  useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(value))
   },[key,value])
   return [value,setValue] as const
}
