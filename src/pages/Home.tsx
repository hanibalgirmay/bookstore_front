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
  MdClear,
  MdClearAll,
  MdFilter,
  MdFilter5,
  MdFilterAlt,
  MdOutlineFilter5,
  MdSearch,
} from "react-icons/md";
import { FormProvider, useForm } from "react-hook-form";
import { CInput, CProvider, CSelect } from "../component/form";
import Dropdown from "../component/DropDown";

const Home = () => {
  const {
    setBooks,
    setHasMore,
    setIsLoading,
    setPage,
    setLimit,
    resetBooks,
    limit,
    page,
    books,
    isLoading,
    filterOption,
    hasMore,
  } = useStore();

  const methods = useForm();
  const { setCart, cart } = useCartStore();

  /**
   * @description
   */
  const getBooks = async () => {
    setIsLoading(true);
    await axios
      .get(`${import.meta.env.VITE_APP_API_URL}/book?page=${page}&limit=${limit}`)
      .then((res) => {
        console.log(res.data);
        const newBooks = res.data?.data;
        setBooks(newBooks);

        if (res.data.data.length === 0) {
          setHasMore(false);
        }
      })
      .catch((er) => console.log(er))
      .finally(() => setIsLoading(false));
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
    resetBooks();
    setPage(0);
    //setIsLoading(true);
    await axios
      .get(
        `${import.meta.env.VITE_APP_API_URL}/book?page=${page}&limit=${limit}&searchTitle=${w.search}`
      )
      .then((res) => {
        console.log(res.data);
        const newBooks = res.data?.data;
        setBooks(newBooks);

        if (res.data.data.length === 0) {
          setHasMore(false);
        }
      })
      .catch((er) => console.log(er))
      .finally(() => setIsLoading(false));
  };
  const handleFilter = async (w: string[]) => {
    console.log("search value:", w);
    resetBooks();
    setPage(0);
    setIsLoading(true);
    // Convert the array of tags to a comma-separated string
    const tagsString = w.join(",");

    // Construct the query string
    const queryParams = new URLSearchParams({
      tags: tagsString,
    });
    await axios
      .get(
        `${import.meta.env.VITE_APP_API_URL}/book?page=${page}&limit=${limit}&${queryParams.toString()}`
      )
      .then((res) => {
        console.log(res.data);
        const newBooks = res.data?.data;
        setBooks(newBooks);

        if (res.data.data.length === 0) {
          setHasMore(false);
        }
      })
      .catch((er) => console.log(er))
      .finally(() => setIsLoading(false));
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

  useEffect(() => {
    if (methods.watch("limit")) {
      resetBooks();
      setLimit(Number(methods.watch("limit")));
      getBooks();
    }
  }, [methods.watch("limit")]);
  useEffect(() => {
    if (!methods.watch("search")?.length) {
      getBooks();
    }
  }, [methods.watch("search")]);

  return (
    <>
      <div className="mb-10 flex gap-5 justify-end items-center">
        <button
          className="mt-6 border px-3 py-3 rounded-md flex items-center"
          onClick={() => {
            methods.reset();
            getBooks();
          }}
        >
          <MdClear />
          Clear
        </button>
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
              <div className="mt-5">
                <CSelect
                  name="limit"
                  options={[5, 15, 25, 50].map((i) => {
                    return {
                      value: i,
                      name: `${i} per page`,
                    };
                  })}
                />
              </div>
            </div>
          </CProvider>
        </FormProvider>
        <Dropdown
          handleDropDownForm={(val) => handleFilter(val)}
          options={filterOption}
        />
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
          {books?.length === 0 && <p>No data found</p>}
          {isLoading && (
            <div
              style={{ background: "rgba(0,0,0,0.9)" }}
              className="z-50 fixed top-0 left-0 h-screen w-full flex items-center justify-center overflow-hidden"
            >
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900">
                loading...
              </div>
            </div>
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Home;
