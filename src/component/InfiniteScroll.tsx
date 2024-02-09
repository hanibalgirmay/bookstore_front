import axios from "axios";
import React, { ReactNode, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useStore } from "../store/store";
import Card from "./Card";

interface InfiniteScrollingListProps {
  fetchMoreData: () => void;
  hasMore: boolean;
  handleShoppingCart: (res: any) => void;
}

const InfiniteScrollingList: React.FC<InfiniteScrollingListProps> = ({
  fetchMoreData,
  handleShoppingCart,
  hasMore,
}) => {
  const { setBooks, setIsLoading, setHasMore, books, limit, page, isLoading } = useStore();

  const fetchData = async () => {
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

  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchData();
  }, []);


  return (
    <InfiniteScroll
      dataLength={books.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
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
  );
};

export default InfiniteScrollingList;
