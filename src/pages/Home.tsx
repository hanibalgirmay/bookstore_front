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
import InfiniteScrollingList from "../component/InfiniteScroll";

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
      .get(
        `${import.meta.env.VITE_APP_API_URL}/book?page=${page}&limit=${limit}`
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
        `${
          import.meta.env.VITE_APP_API_URL
        }/book?page=${page}&limit=${limit}&searchTitle=${w.search}`
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
        `${
          import.meta.env.VITE_APP_API_URL
        }/book?page=${page}&limit=${limit}&${queryParams.toString()}`
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

  const fetchMoreData = () => {
    // Simulated delay to mimic API call
    setTimeout(() => {
      // Call the function to fetch more data
      getBooks();
    }, 1000);
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
      <InfiniteScrollingList
        handleShoppingCart={handleShoppingCart}
        fetchMoreData={fetchMoreData}
        hasMore={hasMore}
      />
    </>
  );
};

export default Home;
