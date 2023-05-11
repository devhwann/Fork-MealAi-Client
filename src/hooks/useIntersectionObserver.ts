import { useEffect, useState } from "react";

interface UseIntersectionObserverProps {
	root?: null;
	rootMargin?: string;
	threshold?: number;
	onIntersect: IntersectionObserverCallback;
}

export default function useIntersectionObserver({
	root,
	rootMargin = "0px",
	threshold = 0.5,
	onIntersect,
}: UseIntersectionObserverProps) {
	const [ref, setRef] = useState<HTMLElement | null | undefined>(null);

	useEffect(() => {
		if (!ref) return;

		const observer: IntersectionObserver = new IntersectionObserver(onIntersect, { root, rootMargin, threshold });
		observer.observe(ref);

		return () => observer.unobserve(ref);
	}, [onIntersect, root, rootMargin, ref, threshold]);

	return { setRef };
}

// import { useState, useEffect, useCallback, RefObject } from "react";

// interface UseIntersectionObserverProps {
// 	root?: HTMLElement | null;
// 	rootMargin?: string;
// 	threshold?: number | number[];
// }

// type OnIntersectCallback = (entry: IntersectionObserverEntry, observe: IntersectionObserver) => void;

// const defaultOption: UseIntersectionObserverProps = {
// 	root: null,
// 	threshold: 0.5,
// 	rootMargin: "0px",
// };

// export default function UseIntersectionObserver(
// 	onIntersect: OnIntersectCallback,
// 	option: UseIntersectionObserverProps = defaultOption) : [RefObject<HTMLDivElement>, React.Dispatch<React.SetStateAction<null>] {

// 	}

// );
