import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="card w-full md:w-2/4">
                <h3 className="text-xl md:text-3xl font-bold text-center mt-5">Login Form</h3>
                <form className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                    <small>Do not have an account? <span className="font-bold"><Link to="/register" className="text-blue-700 text-bold">Click Here</Link></span></small>
                </form>
            </div>
        </div>
    );
};

export default Login;