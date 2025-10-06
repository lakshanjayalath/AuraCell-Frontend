import React from 'react'

export default function ProductCard(props) {
    const product = props.product;
    return (
        <div className="w-[300px] h-[430px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 m-3 flex flex-col overflow-hidden group border border-gray-100">
            
            {/* Product Image */}
            <div className="relative w-full h-[250px] overflow-hidden rounded-t-2xl">
                <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={product.images[0]}
                    alt={product.name}
                />
                {product.labelledPrice > product.price && (
                    <span className="absolute top-3 left-3 bg-accent text-white text-xs font-semibold px-2 py-1 rounded-md">
                        Sale
                    </span>
                )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between flex-1 p-4">
                <div>
                    <h1 className="text-lg font-semibold text-secondary truncate">{product.name}</h1>

                    {product.labelledPrice > product.price ? (
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-gray-400 line-through">
                                LKR {product.labelledPrice.toFixed(2)}
                            </p>
                            <p className="text-lg font-bold text-accent">
                                LKR {product.price.toFixed(2)}
                            </p>
                        </div>
                    ) : (
                        <p className="text-lg font-bold text-accent mt-1">
                            LKR {product.price.toFixed(2)}
                        </p>
                    )}

                    <div className="mt-2 text-sm text-gray-500">
                        <p className="truncate">{product.productID}</p>
                        <p className="capitalize">{product.category}</p>
                    </div>
                </div>

                {/* View Button */}
                <button className="w-full h-[38px] mt-4 border border-accent text-accent font-medium rounded-xl hover:bg-accent hover:text-white transition-all duration-300">
                    View Product
                </button>
            </div>
        </div>
    )
}
