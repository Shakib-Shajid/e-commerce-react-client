import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from '../../hooks/useAuth'

const Login = () => {

    const { loginUser } = useAuth();

    const location = useLocation()
    const navigate = useNavigate();

    const from = location.state || '/';

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                // const user = { email };
                // axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                axios.post('http://localhost:5000/jwt')
                    .then(res => {
                        console.log(res.data)
                        if (res.data.success) {
                            navigate(from, { replace: true })
                        }
                    })



            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: error.code,
                });
            });

    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="card w-full md:w-2/4">
                <h3 className="text-xl md:text-3xl font-bold text-center mt-5">Login Form</h3>
                <form className="card-body" onSubmit={handleLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                    <small>Do not have an account? <span className="font-bold"><Link to="/register" className="text-blue-700 text-bold">Click Here</Link></span></small>
                </form>
            </div>
        </div>
    );
};

export default Login;