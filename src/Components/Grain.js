import React from "react";

export default function Grain({
  grains,
  index,
  incrementGrainQuantity,
  decrementGrainQuantity,
  handleBuyGrain,
}) {
  return (
    <div className="grain-container ">
      <section className="text-gray-400 bg-gray-800 body-font overflow-hidden">
        <h1 className="text-[#f0b802] text-center m-5 text-lg">Available Grains</h1>
        {grains.map((grain, index) => (
          <div
            className="container px-5 py-24 mx-auto rounded-lg shadow-lg bg-gray-900"
            style={{
              marginTop: '60px',
              '@media (min-width: 406px)': {
                marginTop: '0px',
              },
            }}
            key={index}
          >
            <div className="lg:w-4/5 mx-auto flex flex-wrap overflow-hidden">
              {/* Image */}
              <img
                alt="ecommerce"
                className=" lg:w-1/2 w-full lg:h-auto h-full object-cover object-center rounded hover:scale-105 duration-1000"
                src={grain.image}
              />

              {/* Product details */}
              <div className=" lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  BRAND NAME
                </h2>
                <h1 className="text-white family-[Quicksand, serif] text-3xl title-font font-medium mb-1">
                  {grain.name}
                </h1>

                {/* Ratings */}
                <div className="flex mb-4">
                  <span className="flex items-center">
                    {/* Rating Stars */}
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="ml-3">4 Reviews</span>
                  </span>
                </div>

                {/* Price */}
                <p className="leading-relaxed">₹{grain.price * grain.quantity}</p>

                {/* Quantity Controls */}
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => incrementGrainQuantity(index)}
                      className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none rounded"
                    >
                      Add item
                    </button>
                    <button className="border-2 border-gray-800 ml-1 bg-gray-700 rounded w-6 h-6 focus:outline-none">
                      {grain.quantity}
                    </button>
                    <button
                      type="button"
                      onClick={() => decrementGrainQuantity(index)}
                      className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none rounded"
                    >
                      Remove item
                    </button>
                  </div>
                </div>

                {/* Total Amount and Buttons */}
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-white">
                    Total amount ₹{grain.price * grain.quantity}
                  </span>
                  <button
                    onClick={() => handleBuyGrain(index)}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add to Cart
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          
          </div>
        ))}
       
      </section>
    </div>
  );
}
