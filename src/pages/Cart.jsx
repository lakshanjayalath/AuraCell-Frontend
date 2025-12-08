import React, { useState } from "react";
import { addToCart, getTotal, loadCart } from "../utils/cart";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Cart() {

    const [cart, setCart] = useState(loadCart())

    return (
        <div className="w-full h-[calc(100vh-100px)] bg-primary flex flex-col pt-[25px] items-center">
            <div className="w-[400px] lg:w-[600px] flex flex-col gap-4">
                {cart.map((item, index) => {
                    return (
                        <div key={index} className="w-full h-[120px] bg-amber-50 flex relative items-center p-3 lg:p-0">
                            <button className="absolute  text-red-500 right-[-40px] text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px] font-bold" onClick={
                                () => {
                                    addToCart(item, -item.quantity)
                                    setCart(loadCart())
                                }
                            } ><BiTrash /></button>
                            <img
                                src={item.image}
                                alt=""
                                className="h-[100px] lg:h-full aspect-square object-cover"
                            />
                            <div className="w-[200px] h-full flex flex-col pl-[5px] pt-[10px]">
                                <h1 className="font-bold text-lg w-full text-wrap">
                                    {item.name}
                                </h1>
                                <h1 className="font-bold text-lg ">{item.productID}</h1>
                            </div>
                            <div className="w-[100px] h-full flex flex-col justify-center items-center">
                                <CiCircleChevUp
                                    className="text-3xl"
                                    onClick={() => {
                                        addToCart(item, 1)
                                        setCart(loadCart())
                                    }}
                                />
                                <span className="font-semibold text-4xl">{item.quantity}</span>
                                <CiCircleChevDown className="text-3xl" onClick={() => {
                                    addToCart(item, -1)
                                    setCart(loadCart())
                                }} />
                            </div>
                            <div className="w-full lg:w-[180px] lg:h-full items-center justify-center  flex flex-row lg:flex-col">
                                {
                                    item.labelledPrice > item.price &&
                                    <span className="text-secondary lg:w-full   text-center  lg:text-right line-through text-lg pr-[10px] lg:mt-[20px]">LKR {item.labelledPrice.toFixed(2)}</span>
                                }
                                <span className="font-semibold text-accent  lg:w-full text-center  lg:text-right text-2xl pr-[10px] lg:mt-[5px]">LKR {item.price.toFixed(2)}</span>
                            </div>
                        </div>
                    );
                })}
                <div className="w-full h-[120px] bg-amber-50 flex justify-end items-center">
                    <Link state={cart} to="/checkout" className="absolute left-0 bg-accent text-white px-6 py-3  ml-[20px] hover:bg-accent/80">Proceed to Checkout</Link>
                    <div className="h-[50px]">
                        <span className="font-semibold text-accent lg:w-full text-center   lg:text-right text-2xl p-0 lg:pr-[10px] mt-[5px]">Total: LKR {getTotal().toFixed(2)} </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
