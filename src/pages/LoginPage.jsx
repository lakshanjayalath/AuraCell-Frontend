import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { use, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            axios.post(import.meta.env.VITE_API_URL + "/api/users/google-login", {
                token: response.access_token
            }).then((res) => {
                localStorage.setItem("token", res.data.token)
                const user = res.data.user;
                if (user.role == "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }).catch((err) => {
                console.error("Google login failed:", err);
                toast.error("Google login failed. Please try again.");
            });
        }
    });

    async function login() {
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/api/users/login",
                {
                    email: email,
                    password: password,
                }
            );

            localStorage.setItem("token", response.data.token);
            toast.success("Login successful");
            const user = response.data.user;
            if (user.role == 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (e) {
            console.log("Login failed", e);
            toast.error("Login failed. Please check your credentials.");
        }

    }

    return (
        <div className="w-full h-screen bg-[url('/login-bg.jpg')] bg-cover bg-center flex">
            {/* Left side overlay for gradient */}
            <div className="hidden w-1/2 h-full bg-gradient-to-r from-secondary/70 to-transparent lg:flex items-center justify-center">
                <h1 className="text-5xl font-bold text-primary drop-shadow-lg">
                    ShopEase
                </h1>
            </div>

            {/* Right side login form */}
            <div className="w-full md:w-1/2 min-h-screen flex justify-center items-center px-4">
                <div className="w-full max-w-[480px] p-6 sm:p-8 md:p-10 bg-primary/10 backdrop-blur-xl shadow-2xl rounded-2xl flex flex-col items-center gap-5 border border-white/20">

                    <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                        Welcome Back
                    </h2>

                    <p className="text-xs sm:text-sm text-primary/80 text-center">
                        Login to continue shopping smart with ShopEase
                    </p>

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 sm:h-12 px-4 rounded-lg bg-white/90 text-secondary focus:outline-none focus:ring-2 focus:ring-accent shadow-md"
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-11 sm:h-12 px-4 rounded-lg bg-white/90 text-secondary focus:outline-none focus:ring-2 focus:ring-accent shadow-md"
                    />

                    {/* Login Button */}
                    <button
                        onClick={login}
                        className="w-full h-11 sm:h-12 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all shadow-lg"
                    >
                        Login
                    </button>

                    <button
                        onClick={googleLogin}
                        className="w-full h-11 rounded-xl bg-accent text-white font-semibold shadow-lg shadow-accent/20 hover:brightness-110 active:scale-[0.99] transition"
                    >
                        Google Login
                    </button>

                    {/* Links */}
                    <div className="flex justify-between w-full text-xs sm:text-sm text-primary/80 mt-1">
                        <Link to="/forget-password" className="hover:text-accent">
                            Forgot Password?
                        </Link>
                        <Link to="/register" className="hover:text-accent">
                            Create Account
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
