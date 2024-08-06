import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
    const { user, loading } = useContext(AuthContext);

    const [carts, setCarts] = useState([]);



    // show products
    axios.get(`http://localhost:5000/carts?email=${user.email}`)
        .then(data => {
            setCarts(data.data)
        })

    // delete a product
    const handleDelete = _id => {
        // axios.delete(`http://localhost:5000/carts/${_id}`)
        // .then(data => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/carts/${_id}`)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

        //     }
        // )
    }

    if (loading) {
        return <span className="loading loading-bars loading-lg"></span>
    }


    return (
        <div className="max-w-4xl mx-auto">
            <table className="table border-red-600 border-2 text-lg">
                {/* head */}
                <thead>
                    <tr className="text-xl text-black">
                        <th>Product</th>
                        <th>Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                {
                    carts.map(cart =>

                        <tbody key={cart._id}>
                            <tr>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={cart.img}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            {/* <Link to={${`/`}}></Link> */}
                                            <div className="font-bold">{cart.name}</div>
                                        </div>
                                    </div>
                                </td>

                                <td>${cart.price}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => handleDelete(cart._id)}>X</button>
                                </td>
                            </tr>

                        </tbody>
                    )}

                <tfoot className="text-base font-medium">
                    <tr className=" text-black">
                        <th>Products: {carts.length}</th>
                        <th>Price: $510</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default Cart;