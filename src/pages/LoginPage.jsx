import axios from "axios";
import React, { use, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
            <div className="w-1/2 h-full bg-gradient-to-r from-secondary/70 to-transparent flex items-center justify-center">
                <h1 className="text-5xl font-bold text-primary drop-shadow-lg">
                    ShopEase
                </h1>
            </div>

            {/* Right side login form */}
            <div className="w-1/2 h-full flex justify-center items-center">
                <div className="w-[480px] p-10 bg-primary/10 backdrop-blur-xl shadow-2xl rounded-2xl flex flex-col justify-center items-center gap-6 border border-white/20">
                    <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
                    <p className="text-sm text-primary/80 mb-4">
                        Login to continue shopping smart with ShopEase
                    </p>

                    {/* Email input */}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 px-4 rounded-lg bg-white/90 text-secondary focus:outline-none focus:ring-2 focus:ring-accent shadow-md"
                    />

                    {/* Password input */}
                    <input
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 px-4 rounded-lg bg-white/90 text-secondary focus:outline-none focus:ring-2 focus:ring-accent shadow-md"
                    />

                    {/* Login button */}
                    <button
                        onClick={login}
                        className="w-full h-12 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all shadow-lg"
                    >
                        Login
                    </button>

                    {/* Extra links */}
                    <div className="flex justify-between w-full text-sm text-primary/80 mt-2">
                        <a href="#" className="hover:text-accent">
                            Forgot Password?
                        </a>
                        <a href="#" className="hover:text-accent">
                            Create Account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
