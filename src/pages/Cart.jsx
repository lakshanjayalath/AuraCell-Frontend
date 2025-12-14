import React, { useState } from "react";
import { addToCart, getTotal, loadCart } from "../utils/cart";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState(loadCart());

    return (
        <div className="w-full min-h-screen bg-primary flex flex-col pt-6 items-center">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-xl flex flex-col gap-4 px-3">

                {cart.map((item, index) => (
                    <div
                        key={index}
                        className="w-full bg-amber-50 rounded-lg shadow-sm flex flex-col lg:flex-row relative items-center p-4 lg:p-3"
                    >
                        {/* Delete Button */}
                        <button
                            className="absolute top-2 right-2 text-red-500 text-2xl rounded-full hover:bg-red-500 hover:text-white p-1"
                            onClick={() => {
                                addToCart(item, -item.quantity);
                                setCart(loadCart());
                            }}
                        >
                            <BiTrash />
                        </button>

                        {/* Image */}
                        <img
                            src={item.image}
                            alt=""
                            className="w-28 h-28 lg:h-24 lg:w-24 rounded-md object-cover"
                        />

                        {/* Product Info */}
                        <div className="flex flex-col flex-1 text-center lg:text-left pl-0 lg:pl-3 mt-3 lg:mt-0">
                            <h1 className="font-bold text-base sm:text-lg">{item.name}</h1>
                            <h1 className="font-semibold text-sm sm:text-base">{item.productID}</h1>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-row lg:flex-col items-center justify-center gap-2 py-3 lg:py-0">
                            <CiCircleChevUp
                                className="text-3xl cursor-pointer"
                                onClick={() => {
                                    addToCart(item, 1);
                                    setCart(loadCart());
                                }}
                            />
                            <span className="font-semibold text-3xl sm:text-4xl">
                                {item.quantity}
                            </span>
                            <CiCircleChevDown
                                className="text-3xl cursor-pointer"
                                onClick={() => {
                                    addToCart(item, -1);
                                    setCart(loadCart());
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

                {/* Total + Checkout */}
                <div className="w-full bg-white flex flex-col-reverse lg:flex-row items-center justify-between p-4 rounded-lg shadow-sm">
                    <Link
                        state={cart}
                        to="/checkout"
                        className="bg-accent w-full lg:w-auto text-center text-white px-6 py-3 rounded-md hover:bg-accent/80 transition"
                    >
                        Proceed to Checkout
                    </Link>

                    <span className="font-semibold text-accent text-xl sm:text-2xl mt-3 lg:mt-0">
                        Total: LKR {getTotal().toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}
