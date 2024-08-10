import { useEffect, useState } from "react";

const useProduct = () => {

    const [services, setServices] = useState([]);

    useEffect(()=>{
        fetch('')
        .then(res=>res.data)
        .then(data=>setServices(data))
    },[])

    return services;
   
};

export default useProduct;