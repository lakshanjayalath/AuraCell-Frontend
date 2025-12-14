import React, { useState } from "react";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();

    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [cart, setCart] = useState(location.state);

    function getTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }

    async function purchaseCart() {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("Please login to place an order");
            navigate("/login");
            return;
        }
        try {
            const items = [];

            for (let i = 0; i < cart.length; i++) {
                items.push({
                    productID: cart[i].productID,
                    quantity: cart[i].quantity,
                });
            }

            await axios.post(
                import.meta.env.VITE_API_URL + "/api/orders",
                {
                    address: address,
                    customerName: name == "" ? null : name,
                    items: items,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Order placed successfully");
        } catch (error) {
            toast.error("Failed to place order");
            console.error(error);

            if (error.response && error.response.status == 400) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <div className="w-full min-h-screen bg-primary flex flex-col pt-6 items-center">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-xl flex flex-col gap-4 px-3">

                {cart.map((item, index) => (
                    <div
                        key={index}
                        className="w-full bg-amber-50 rounded-lg shadow-sm flex flex-col lg:flex-row relative items-center p-4 lg:p-3"
                    >
                        {/* Delete button */}
                        <button
                            className="absolute top-2 right-2 text-red-500 text-2xl rounded-full hover:bg-red-500 hover:text-white p-1"
                            onClick={() => { }}
                        >
                            <BiTrash />
                        </button>

                        {/* Image */}
                        <img
                            src={item.image}
                            alt=""
                            className="w-28 h-28 lg:w-24 lg:h-24 rounded-md object-cover"
                        />

                        {/* Product Info */}
                        <div className="flex flex-col flex-1 text-center lg:text-left pl-0 lg:pl-3 mt-3 lg:mt-0">
                            <h1 className="font-bold text-base sm:text-lg">
                                {item.name}
                            </h1>
                            <h1 className="font-semibold text-sm sm:text-base">
                                {item.productID}
                            </h1>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-row lg:flex-col items-center justify-center gap-2 py-3 lg:py-0">
                            <CiCircleChevUp
                                className="text-3xl cursor-pointer"
                                onClick={() => {
                                    const newCart = [...cart];
                                    newCart[index].quantity += 1;
                                    setCart(newCart);
                                }}
                            />

                            <span className="font-semibold text-3xl sm:text-4xl">
                                {item.quantity}
                            </span>

                            <CiCircleChevDown
                                className="text-3xl cursor-pointer"
                                onClick={() => {
                                    const newCart = [...cart];
                                    if (newCart[index].quantity > 1) {
                                        newCart[index].quantity -= 1;
                                    }
                                    setCart(newCart);
                                }}
                            />
                        </div>

                        {/* Pricing */}
                        <div className="flex flex-col items-center lg:items-end w-full lg:w-auto mt-2 lg:mt-0">
                            {item.labelledPrice > item.price && (
                                <span className="text-secondary line-through text-sm sm:text-base">
                                    LKR {item.labelledPrice.toFixed(2)}
                                </span>
                            )}
                            <span className="font-semibold text-accent text-xl sm:text-2xl">
                                LKR {item.price.toFixed(2)}
                            </span>
                        </div>
                    </div>
                ))}

                <div className="w-full border lg:w-full  bg-white flex flex-col    items-center relative">
                    <div className="w-full  h-full flex  justify-between items-center p-4">
                        <label
                            htmlFor="name"
                            className="text-sm text-secondary mr-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-[400px] h-[50px] border border-secondary rounded-md px-3 text-center"
                        />
                    </div>
                    <div className="w-full  h-full flex  justify-between items-center p-4">
                        <label
                            htmlFor="address"
                            className="text-sm text-secondary mr-2"
                        >
                            Shipping Address
                        </label>
                        <textarea
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-[400px] h-[150px] border border-secondary rounded-md px-3 text-center"
                        />
                    </div>
                </div>

                {/* Total + Order button */}
                <div className="w-full bg-white flex flex-col-reverse lg:flex-row items-center justify-between p-4 rounded-lg shadow-sm">
                    <button
                        to="/checkout"
                        onClick={purchaseCart}
                        className="bg-accent w-full lg:w-auto text-center text-white px-6 py-3 rounded-md hover:bg-accent/80 transition"
                    >
                        Order
                    </button>

                    <span className="font-semibold text-accent text-xl sm:text-2xl mt-3 lg:mt-0">
                        Total: LKR {getTotal().toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}
