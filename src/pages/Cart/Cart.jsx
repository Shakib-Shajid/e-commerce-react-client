import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";

const Cart = () => {
    const { user, loading } = useContext(AuthContext);

    const [carts, setCarts] = useState([]);

    if (loading) {
        return <span className="loading loading-bars loading-lg"></span>
    }

    axios.get(`http://localhost:5000/carts?email=${user.email}`)
        .then(data => {
            setCarts(data.data)
            console.log(data.data)
        })

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Delete</th>
                            <th></th>
                        </tr>
                    </thead>
                    {
                        carts.map(cart=>

                        <tbody key={cart._id}>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{cart.name}</div>
                                            {/* <div className="text-sm opacity-50">United States</div> */}
                                        </div>
                                    </div>
                                </td>
                                {/*<td>
                                     Zemlak, Daniel and Leannon
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td> */}
                                <td>${cart.price}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">X</button>
                                </th>
                            </tr>

                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default Cart;