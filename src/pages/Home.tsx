/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import { useStore } from "../store/store";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useCartStore } from "../store/cartStore";
import { Navigate } from "react-router-dom";
import {
  MdFilter,
  MdFilter5,
  MdFilterAlt,
  MdOutlineFilter5,
  MdSearch,
} from "react-icons/md";
import { FormProvider, useForm } from "react-hook-form";
import { CInput, CProvider } from "../component/form";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    setBooks,
    setHasMore,
    setIsLoading,
    setPage,
    limit,
    page,
    books,
    isLoading,
    hasMore,
  } = useStore();

  const methods = useForm();
  const { setCart, cart } = useCartStore();

  /**
   * @description
   */
  const getBooks = async () => {
    await axios
      .get(`http://localhost:3000/book?page=${page}&limit=${limit}`)
      .then((res) => {
        console.log(res.data);
        const newBooks = res.data?.data;
        setBooks(newBooks);

        if (res.data.data.length === 0) {
          setHasMore(false);
        }
      })
      .catch((er) => console.log(er));
  };

  const fetchMoreData = () => {
    //@ts-ignore
    setPage((prevPage: number) => prevPage + 1);
  };

  const handleShoppingCart = (res: any) => {
    //setIsOpen(!isOpen);
    console.log("data", res);

    setCart(res);
  };

  const handleSearch = async (w: any) => {
    console.log("search value:", w);
    setBooks([]);
    setPage(0);
    await axios
      .get(
        `http://localhost:3000/book?page=${page}&limit=${limit}&searchTitle=${w.search}`
      )
      .then((res) => {
        console.log(res.data);
        const newBooks = res.data?.data;
        setBooks(newBooks);

        if (res.data.data.length === 0) {
          setHasMore(false);
        }
      })
      .catch((er) => console.log(er));
  };

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      <Navigate to={"/auth/login"} />;
    }
  }, []);

  return (
    <>
      <div className="mb-10 flex gap-5 justify-end items-center">
        <FormProvider {...methods}>
          <CProvider handleFormSubmit={methods.handleSubmit(handleSearch)}>
            <div className="flex gap-2 items-center">
              <input
                id={"search"}
                className={`invalid:shake2 mt-6 w-full rounded-lg border-[1.5px] border-graydark/50 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input`}
                type={"search"}
                placeholder={"Search book..."}
                {...methods.register("search")}
                aria-label={"search"}
              />
              <button
                type="submit"
                className="mt-6 border px-3 py-3 rounded-md"
              >
                <MdSearch size={26} />
              </button>
            </div>
          </CProvider>
        </FormProvider>
        <button className="mt-6 border px-3 py-3 rounded-md">
          <MdFilterAlt size={26} />
        </button>
      </div>
      <InfiniteScroll
        dataLength={books?.length}
        next={fetchMoreData}
        className="!overflow-hidden h-full w-full"
        hasMore={hasMore} 
        loader={
          <div className="flex justify-center mt-20">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
        endMessage={<p>No more data to load.</p>}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-3">
          {books &&
            books?.map((item) => (
              <Card
                enableCart={true}
                key={item?.id}
                handleCart={handleShoppingCart}
                data={item}
              />
            ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Home;
