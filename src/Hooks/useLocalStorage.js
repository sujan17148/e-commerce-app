import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialData=null) {
  const [storageData, setStorageData] = useState(() => {
    const data=localStorage.getItem(key);
    return data? JSON.parse(data): initialData
  });
  useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(storageData))
   },[key,storageData])
   return {storageData,setStorageData}
}
