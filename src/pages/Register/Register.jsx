import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const Register = () => {

    const { signIn } = useContext(AuthContext);

    const handleSignIn = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const cpassword = form.cpassword.value;

        signIn(email, password)
            .then(result => {
                updateProfile(result.user, {
                    displayName: name, 
                    // photoURL: "https://example.com/jane-q-user/profile.jpg"
                  })

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Account Created Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
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
                <h3 className="text-xl md:text-3xl font-bold text-center mt-5">Registration Form</h3>
                <form className="card-body" onSubmit={handleSignIn}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Full Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input type="password" name="cpassword" placeholder="Confirm Password" className="input input-bordered" required />
                    </div>


                    <div className="form-control mt-6">
                        <input type="submit" value="Sign Up" className="btn btn-primary" />
                    </div>
                    <small>Already have an account? <span className="font-bold"><Link to="/login" className="text-blue-700 text-bold">Click Here</Link></span></small>
                </form>
            </div>
        </div>
    );
};

export default Register;