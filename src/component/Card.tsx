import React from "react";
import { MdAddShoppingCart } from "react-icons/md";

interface IData {
  price: number;
  title: string;
  writer: string;
  cover_image: string;
}
interface ICardProp {
  data: IData;
  enableCart: boolean;
  handleLink?: () => void;
  handleCart?: (e: any) => void;
}

const Card = ({
  data,
  handleLink,
  enableCart = true,
  handleCart,
}: ICardProp) => {
  return (
    <div
      onClick={handleLink}
      className="w-full !overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-lg hover:cursor-pointer "
    >
      <img
        className="object-cover w-full h-80 hover:scale-105 ease-in-out transition-all"
        src="https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
        alt="avatar"
      />

      <div className="py-5 text-start pl-4 relative">
        <span className="absolute right-1 -top-4 ring-2 ring-transparent w-10 h-10 flex justify-center items-center text-xs bg-white rounded-full">
          {data?.price?.toFixed(2)}
        </span>
        {enableCart && (
          <button
            onClick={() => handleCart(data)}
            className="absolute bottom-4 right-3"
          >
            <MdAddShoppingCart size={22} color="#000" />
          </button>
        )}
        <a
          href="#"
          className="block text-xl font-bold text-gray-800"
          tabIndex={0}
          role="link"
        >
          {data?.title}
        </a>
        <span className="text-sm text-gray-700">
          {data?.writer}
        </span>
        <div>
          <small className="border-0 rounded-2xl bg-blue-500 px-4 py-0.5 text-xs text-white">{data.tags}</small>
        </div>
      </div>
    </div>
  );
};

export default Card;
