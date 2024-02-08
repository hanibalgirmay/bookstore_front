import React, { ReactNode, useEffect, useRef } from "react";

interface InfiniteScrollProps {
  loadMore: () => void;
  scrollThreshold: number;
  isLoading: boolean;
  children: ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  scrollThreshold,
  isLoading,
  children,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: Array.from({ length: 100 }, (_, index) => (index + 1) / 100),
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        loadMore();
      }
    }, options);

    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }

    return () => {
      if (observer.current && sentinelRef.current) {
        observer.current.unobserve(sentinelRef.current);
      }
    };
  }, [isLoading, loadMore, scrollThreshold]);

  return (
    <div>
      {children}
      <div ref={sentinelRef}></div>
    </div>
  );
};

export default InfiniteScroll;
