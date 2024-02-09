import axios from "axios";
import Header from "../component/Nav/Header";
import { Outlet } from "react-router-dom";
import { decodeJWT } from "../utils/fetaure";
import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { useCartStore } from "../store/cartStore";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";

interface Book {
  cover_image: string;
  id: number;
  price: number;
  tags: string;
  title: string;
  writer: string;
}

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const { setUserPoint } = useStore();
  const { cart, removeOne, clearCart } = useCartStore();

  const getUser = async () => {
    const _token = localStorage.getItem("_token");
    console.log("====================================");
    console.log(_token);
    console.log("====================================");
    if (_token) {
      const { username } = decodeJWT(_token);
      setUser(username);
      axios
        .get(`http://localhost:3000/user/${username.id}`, {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUserPoint(res.data?.data?.points);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      window.location.href = "/auth/login";
    }
  };

  const handleRemoveOne = (item: any) => {
    console.log("====================================");
    console.log("remove's item", item);
    console.log("====================================");
    removeOne(item);
  };

  const handleOrder = async () => {
    console.log("ordering...", cart);
    const total_result = {
      price: totalPrice(cart),
      userId: user?.id,
      books: [...cart],
    };
    await axios
      .post(`${import.meta.env.VITE_APP_API_URL}/orders`, total_result)
      .then((res) => {
        console.log(res.data);
        toast.success("Order successfully");
        getUser();
        clearCart();
        setIsOpen(false);
      })
      .catch((er) => {
        er?.response?.data?.message.forEach((e) => {
          toast.error(e);
        });
      });
  };

  const totalPrice = (arr: Array<Book>) => {
    return arr.reduce((sum: number, book: Book) => sum + book.price, 0);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="w-full relative">
        <Header handleOpenCart={() => setIsOpen(!isOpen)} />
        <main className="mt-40">
          <div className="max-w-7xl mx-auto mt-20">
            <Outlet />
          </div>
          {isOpen && (
            <div className="absolute z-[60] top-0 h-screen right-0 bg-red-300">
              <div
                id="drawer-example"
                className="fixed top-0 right-0 h-screen p-4 overflow-y-auto transition-transform bg-white w-80"
                aria-labelledby="drawer-label"
              >
                <h5
                  id="drawer-label"
                  className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
                >
                  <svg
                    className="w-4 h-4 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  Shopping Cart
                </h5>
                <button
                  type="button"
                  data-drawer-hide="drawer-example"
                  aria-controls="drawer-example"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close menu</span>
                </button>
                <div>
                  {cart.map((item) => (
                    <div className="relative border flex items-center gap-3 h-24 shadow-sm">
                      <button
                        onClick={() => handleRemoveOne(item)}
                        className="absolute top-2 right-2"
                      >
                        <MdCancel />
                      </button>
                      <div className="h-20 overflow-hidden">
                        <img
                          className="object-cover"
                          src={item?.cover_image}
                          alt={item.title}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="font-bold">{item?.title}</span>
                        <small className="font-semibold">{item?.price}</small>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-20 grid grid-cols-2 gap-4">
                  <button
                    onClick={()=> clearCart()}
                    disabled={cart.length === 0}
                    className="disabled:opacity-45 disabled:pointer-events-none px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Remove All
                  </button>
                  <button
                    onClick={handleOrder}
                    disabled={cart.length === 0}
                    className="disabled:opacity-45 disabled:pointer-events-none inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Order{" "}
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default MainLayout;
