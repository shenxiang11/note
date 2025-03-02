import {useIntersectionObserver} from "@uidotdev/usehooks";
import {useEffect, useRef} from "react";

type LoadMoreProps = {
  children: React.ReactNode;
  fetchMore: () => Promise<unknown>;
};

export const LoadMore: React.FC<LoadMoreProps> = ({
  children,
  fetchMore,
}) => {
  const isLoading = useRef(false);
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (entry && entry?.isIntersecting && !isLoading.current) {
      isLoading.current = true;
      fetchMore().finally(() => {
        isLoading.current = false;
      });
    }
  }, [entry]);

  return (
    <div>
      {children}
      <div className="h-1" ref={ref} />
    </div>
  );
}
