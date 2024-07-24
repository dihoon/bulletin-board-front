import { useEffect, useRef } from 'react';

interface Props {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect: () => void;
}

const useIntersectionObserver = (props: Props) => {
  const { root, rootMargin, threshold, onIntersect } = props;

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [props]);

  return observerRef;
};

export default useIntersectionObserver;
