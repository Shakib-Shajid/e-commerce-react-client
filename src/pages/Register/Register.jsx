import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="card w-full md:w-2/4">
                <h3 className="text-xl md:text-3xl font-bold text-center mt-5">Registration Form</h3>
                <form className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input type="text" placeholder="Full Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="Confirm Password" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Sign Up</button>
                    </div>
                    <small>Already have an account? <span className="font-bold"><Link to="/register" className="text-blue-700 text-bold">Click Here</Link></span></small>
                </form>
            </div>
        </div>
    );
};

export default Register;