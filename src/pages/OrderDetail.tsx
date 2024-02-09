import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Card from "../component/Card";
import DeleteModal from "../component/DeleteModal";
import toast from "react-hot-toast";

const OrderDetail = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [orderData, setOrderData] = useState();

  const { id } = useParams();
  const router = useNavigate();

  const getOrderData = async () => {
    await axios
      .get(`${import.meta.env.VITE_APP_API_URL}/orders/${id}`)
      .then((res) => {
        console.log(res.data);
        setOrderData(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveOrder = async () => {
    console.log("cancel order: ", id);
    await axios
      .delete(`${import.meta.env.VITE_APP_API_URL}/orders/${id}`)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        router("/");
      })
      .catch((er) => console.error(er));
  };

  useEffect(() => {
    getOrderData();
  }, []);

  return (
    <div>
      <button
        className="border rounded-md  px-6 py-1"
        onClick={() => router(-1)}
      >
        Back
      </button>
      <div className="font-bold text-2xl mb-12">User Order Detail Info</div>
      <div className="mt-20 mx-4 md:mx-0">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div>
              <h2 className="text-2xl">
                Total Price:{" "}
                <span className="font-bold">{orderData?.price}</span>
              </h2>
              <h3 className="text-2xl">
                Order ID:{" "}
                <span className="font-bold">{orderData?.orderID}</span>
              </h3>
              <h3 className="text-2xl">
                Books:{" "}
                <span className="font-bold">
                  {orderData?.books?.length} books
                </span>
              </h3>
            </div>
            <div>
              <button
                onClick={() => setDeleteModal(!deleteModal)}
                className="bg-red-300 px-6 py-2 rounded-md"
              >
                Cancel Order
              </button>
            </div>
          </div>
          <div className="w-full mt-4 gap-4 grid grid-cols-1 md:grid-cols-3">
            {orderData?.books &&
              orderData?.books?.map((book) => (
                <Card data={book} enableCart={false} />
              ))}
          </div>
        </div>
      </div>

      {deleteModal && (
        <DeleteModal
          handleCancelOrder={handleRemoveOrder}
          handleCancel={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default OrderDetail;
