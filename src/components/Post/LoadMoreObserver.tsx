import { useEffect } from "react";

interface LoadMoreObserverProps {
  hasMore: boolean;
  isLoading: boolean;
  onIntersect: () => void;
  bottomRef: React.RefObject<HTMLDivElement>;
}

const LoadMoreObserver: React.FC<LoadMoreObserverProps> = ({
  hasMore,
  isLoading,
  onIntersect,
  bottomRef,
}) => {
  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onIntersect(); // 페이지 증가 로직 호출
        }
      },
      { threshold: 1.0 } // 하단이 완전히 보일 때만 트리거
    );

    observer.observe(bottomRef.current);

    return () => {
      observer.disconnect(); // 컴포넌트 언마운트 시 Observer 해제
    };
  }, [hasMore, isLoading, bottomRef, onIntersect]);

  return <div ref={bottomRef} style={{ height: "1px" }} />;
};

export default LoadMoreObserver;
