import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProductDetails = () => {
    const { user, loading } = useContext(AuthContext);
    const params = useParams();
    const [isDisabled, setIsDisabled] = useState(false);
    const [carts, setCarts] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            const url = `/carts?email=${user.email}`;
            axiosSecure.get(url)
                .then((response) => {
                    setCarts(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching carts:", error);
                });
        }
    }, [user.email, axiosSecure]);

    useEffect(() => {
        if (carts.some(cart => cart.pid === params.id)) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [carts, params.id]);

    const sproduct = useLoaderData();

    const handleCart = () => {
        const { name, price, img, _id } = sproduct;
        const cart = {
            name,
            price,
            img,
            email: user.email,
            pid: _id,
        };

        axios.post('http://localhost:5000/carts', cart)
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Product added to cart!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
                console.error("Error adding to cart:", error);
            });
    };

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div className="flex gap-3 flex-col lg:flex-row relative p-4 lg:p-0">
            <img src={sproduct.img} alt="" className="h-80 rounded-2xl" />
            <div className="p-4 border-red-600 border-2 rounded-xl">
                <h2 className="text-xl md:text-4xl font-bold">{sproduct.name}</h2>
                <p className="text-base md:text-lg w-full my-2 md:w-2/3">{sproduct.desc}</p>
                <p className="text-base md:text-lg font-bold">Price: ${sproduct.price}</p>
                <div className="flex gap-3 mt-5 md:mt-20">
                    <button
                        className="btn btn-warning w-2/5"
                        onClick={handleCart}
                        disabled={isDisabled}
                    >
                        {isDisabled ? "Already in Cart" : "Add to Cart"}
                    </button>
                    <Link to={`/cart/${sproduct._id}`} className="btn btn-error w-2/5">Purchase</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
