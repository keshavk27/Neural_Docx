import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {clearAuthError,} from "../../features/auth/authSlice.js";
import {loginThunk,getProfileThunk,} from "../../features/auth/authThunk.js";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {register,handleSubmit,formState: {errors,},} = useForm();
    const {isLoading,error,isAuthenticated,} = useSelector((state) => state.auth);


    // Login Submit
    const onSubmit = async (data) => {
        const result = await dispatch(loginThunk(data));
        if (loginThunk.fulfilled.match(result)) 
        {
            const profileResult = await dispatch(getProfileThunk());
            if (getProfileThunk.fulfilled.match(profileResult)) 
            {
                toast.success("Login successful.");
                navigate("/");
            }
        }
    };


    // Show Backend Errors
    useEffect(() => {

        if (error) 
        {
            toast.error(error);
            dispatch(clearAuthError());
        }

    }, [error, dispatch]);


    // Already Logged In
    useEffect(() => {
        if (isAuthenticated) 
        {
            navigate("/");
        }

    }, [isAuthenticated, navigate]);

    return (
       <>
                <h1 className="mb-6 text-center text-3xl font-bold">
                    Login
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" >
                    {/* Email */}
                    <div>

                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <input type="email" placeholder="Enter your email" className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                            {...register(
                                "email",
                                {
                                    required: "Email is required.",
                                }
                            )}
                        />

                        {
                            errors.email && ( <p className="mt-1 text-sm text-red-500">{errors.email.message}</p> )
                        }

                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block font-medium">
                            Password
                        </label>

                        <input type="password" placeholder="Enter your password" className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                            {...register(
                                "password",
                                {
                                    required: "Password is required.",
                                }
                            )}
                        />

                        {
                            errors.password && (<p className="mt-1 text-sm text-red-500">{errors.password.message} </p>)
                        }

                    </div>

                    {/* Button */}
                    <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
                        {
                            isLoading
                                ? "Logging In..."
                                : "Login"
                        }

                    </button>

                </form>
                <p className="mt-6 text-center text-sm">
                    Don't have an account?
                    <Link to="/register" className="ml-2 font-semibold text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
        </>
            
    );
};
export default Login;