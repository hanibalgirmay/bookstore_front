import axios from "axios";
import React, { useEffect, useState } from "react";
import { decodeJWT } from "../utils/fetaure";
import Card from "../component/Card";
import { useNavigate } from "react-router-dom";
import { MdBrowseGallery, MdReadMore, MdShop } from "react-icons/md";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);

  const router = useNavigate();

  const getOrderData = async () => {
    const token = localStorage.getItem("_token");
    if (token) {
      const { username } = decodeJWT(token);
      await axios
        .get(`http://localhost:3000/orders/user/${username.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setOrderData(res.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <div>
      <div className="font-bold text-2xl mb-12">User Orders</div>
      {orderData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 md:mt-3 mx-3 md:mx-0">
          {orderData &&
            orderData?.map((item) => (
              <Card
                handleLink={() => router(`/orders/details/${item?.id}`)}
                enableCart={false}
                data={item}
              />
            ))}
        </div>
      )}
      <div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-bold">No Order Found</h2>
          <MdReadMore size={40} />
          <button className="border px-4 py-1 rounded-md" onClick={()=> router('/')}>Browse More</button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
