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

// import { useState, useEffect, useCallback, RefObject, SetStateAction, Dispatch } from "react";

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

// export default function useIntersectionObserver(
// 	onIntersect: OnIntersectCallback,
// 	option: UseIntersectionObserverProps = defaultOption
// ): [RefObject<HTMLDivElement>, React.Dispatch<React.SetStateAction<null>>] {
// 	const [ref, setRef] = useState<HTMLDivElement | null>(null);

// 	const checkIntersection = useCallback(
// 		([entry]: IntersectionObserverEntry[], obserber: IntersectionObserver) => {
// 			if (entry.isIntersecting) {
// 				onIntersect(entry, obserber);
// 			}
// 		},
// 		[onIntersect]
// 	);

// 	useEffect(() => {
// 		let observer: IntersectionObserver | null = null;

// 		if (ref) {
// 			observer = new IntersectionObserver(checkIntersection, {
// 				...defaultOption,
// 				...option,
// 			});
// 			observer.observe(ref);
// 		}

// 		return () => {
// 			observer?.disconnect();
// 		};
// 	}, [ref, option.root, option.rootMargin, option.threshold, checkIntersection]);

// 	return [ref, setRef];
// }
