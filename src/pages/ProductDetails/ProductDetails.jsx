import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {

    let params = useParams();
    const { id } = params;
    // console.log(id);
    const [sproduct, setSproduct] = useState([]);

    const url = `http://localhost:5000/product/${id}`

    axios.get(url)
        .then(data => {
            setSproduct(data.data)
        })



    return (
        <div className="flex gap-3 flex-col lg:flex-row relative p-4 lg:p-0">
            <img src={sproduct.img} alt="" className="h-80 rounded-2xl" />
            <div className="p-4 border-red-600 border-2 rounded-xl">
                <h2 className="text-xl md:text-4xl font-bold">{sproduct.name}</h2>
                <p className="text-base md:text-lg w-full my-2 md:w-2/3">{sproduct.desc}</p>
                <p className="text-base md:text-lg font-bold">Price: ${sproduct.price}</p>
                <button className="btn btn-success w-full mt-5 md:mt-20">Purchase</button>
            </div>
        </div>
    );
};

export default ProductDetails;