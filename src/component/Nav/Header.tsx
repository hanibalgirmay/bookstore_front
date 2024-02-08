import React, { useState } from "react";
import { MdLogout, MdPointOfSale } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";
import { GrMoney } from "react-icons/gr";
import { IoMdCart } from "react-icons/io";
import { useCartStore } from "../../store/cartStore";

interface IHeader {
  handleOpenCart: () => void;
}
const Header = ({ handleOpenCart }: IHeader) => {
  //const [isOpen, setIsOpen] = useState(false);

  const router = useNavigate();
  const { userPoint } = useStore();
  const { cart } = useCartStore();

  const handleLogout = () => {
    localStorage.removeItem("_token");
    router("/auth/login");
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl md:backdrop-blur-sm bg-opacity-100 md:bg-opacity-10 border border-gray-100">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link to="/">
              <span className="font-bold font-mono text-2xl uppercase">
                BookStore
              </span>
            </Link>

            <div className="flex lg:hidden">
              <button
                x-cloak
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                <svg
                  x-show="!isOpen"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>

                <svg
                  x-show="isOpen"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            x-cloak
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              <Link
                to="/orders"
                className="relative flex items-center border  font-bold gap-2 px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100"
              >
                Orders
              </Link>
              <Link
                to="#"
                className="relative flex items-center border  font-bold gap-2 px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100"
              >
                {userPoint} <GrMoney />
              </Link>
            </div>

            <div className="flex gap-4 items-center mt-4 lg:mt-0">
              <button
                onClick={handleOpenCart}
                type="button"
                className="relative border border-purple-300 px-4 py-1.5 rounded-md flex items-center focus:outline-none"
              >
                <IoMdCart />
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                  {cart.length}
                </div>
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="border border-purple-300  py-1 rounded-md flex items-center focus:outline-none"
              >
                <h3 className="mx-2 flex items-center gap-4 text-gray-700 dark:text-black ">
                  Hanibal <MdLogout />
                </h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
