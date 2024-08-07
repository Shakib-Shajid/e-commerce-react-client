import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
    const { user, loading } = useContext(AuthContext);

    const [carts, setCarts] = useState([]);


    // show products
    const url = `http://localhost:5000/carts?email=${user.email}`
    useEffect(() => {
        axios.get(url, { withCredentials: true })
            .then(data => {
                setCarts(data.data)
            })
    }, [url])

    // delete a product
    const handleDelete = _id => {
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
    }



    if (loading) {
        return <span className="loading loading-bars loading-lg"></span>
    }


    return (
        <div className="max-w-4xl mx-auto flex gap-10">
            <div className="rounded-xl my-4 p-4 w-full md:w-1/3">
                <div className='mt-5'>
                    {/* <img src={user.photoURL} className="max-w-sm rounded-lg shadow-2xl" alt="" /> */}
                    <div className="bg-white overflow-hidden shadow rounded-lg border">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                User Profile
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                This is some information about the user.
                            </p>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-gray-200">
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Name
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {user.displayName}
                                    </dd>
                                </div>
                                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Email
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {user.email}
                                    </dd>
                                </div>

                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table text-lg w-3/4">
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
                                                    alt={cart.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <Link className="font-bold" to={`/product/${cart.pid}`}>{cart.name}</Link>
                                        </div>
                                    </div>
                                </td>

                                <td id="price">{cart.price}</td>
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
                        <Link to='/' className="btn btn-success text-white">Payment</Link>

                    </tr>
                </tfoot>
            </table>
        </div >
    );
};

export default Cart;