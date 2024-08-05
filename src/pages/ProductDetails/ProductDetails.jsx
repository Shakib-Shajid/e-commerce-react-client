import axios from "axios";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const ProductDetails = () => {

    const { user, loading } = useContext(AuthContext)

    let params = useParams();
    const { id } = params;
    // console.log(id);
    const [sproduct, setSproduct] = useState([]);

    const url = `http://localhost:5000/product/${id}`

    axios.get(url)
        .then(data => {
            setSproduct(data.data)
        })

    // const [carts, setCarts] = useState([])

    const handleCart = () => {
        const name = sproduct.name;
        const price = sproduct.price;
        const img = sproduct.img;
        const email = user.email;
        const pid = sproduct._id;

        const cart = { name, price, img, email, pid }

        axios.post('http://localhost:5000/carts', cart)
            .then(data => {
                // setCarts(data.data)
                console.log(data.status)
                if (data.status === 200) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }
            }
            )
    }



    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    return (
        <div className="flex gap-3 flex-col lg:flex-row relative p-4 lg:p-0">
            <img src={sproduct.img} alt="" className="h-80 rounded-2xl" />
            <div className="p-4 border-red-600 border-2 rounded-xl">
                <h2 className="text-xl md:text-4xl font-bold">{sproduct.name}</h2>
                <p className="text-base md:text-lg w-full my-2 md:w-2/3">{sproduct.desc}</p>
                <p className="text-base md:text-lg font-bold">Price: ${sproduct.price}</p>
                <div className="flex gap-3 mt-5 md:mt-20">
                    <button className="btn btn-warning w-2/5" onClick={handleCart}>Add to Cart</button>
                    <Link to={`/cart/${sproduct._id}`} className="btn btn-error w-2/5">Purchase</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;