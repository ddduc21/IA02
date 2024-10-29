import GalleryImage from './Image';
import { UnsplashImage } from '../../Types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const Gallery = () => {
	const [images, setImages] = useState<UnsplashImage[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const { isPending, error, data } = useQuery({
		queryKey: ['photos', currentPage],
		queryFn: () =>
			fetch(
				`https://api.unsplash.com/photos/?client_id=H73BXj4EXpnpJoI2AiqZI1e7I7uN7Wg0Yxts34HJ_YQ&page=${currentPage}`
			).then<UnsplashImage[] | { errors : string[] } >((res) => res.json()),
		staleTime: 60 * 60 * 1000,
	});

	const handleScroll = () => {
		if (
			document.body.scrollHeight - 100 <
			window.scrollY + window.innerHeight
		) {
			if (!error && !isPending && Array.isArray(data)) {
				setCurrentPage(currentPage + 1);
			}
		}
	};

	function debounce(func: () => void, delay: number) {
		let timeoutId: number;
		return function () {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(() => {
				func();
			}, delay);
		};
	}

	window.addEventListener('scroll', debounce(handleScroll, 500));

	useEffect(() => {
		if (!isPending && data) {
			setImages((images) => {
				if (Array.isArray(data)) {
					const newImages = [...images, ...data];
					return newImages;
				}
				return images;
			});
		}
	}, [currentPage, isPending, data]);

	let errorMessage = "";

	if (error) {
		errorMessage = error.message;
	}
	else if (!Array.isArray(data) && data?.errors[0] === "Forbidden") {
		errorMessage = "There is no more image";
	}

	return (
		<div>
			<div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
				{images.map((image) => (
					<GalleryImage key={image.id} image={image} />
				))}
			</div>
			<div>{isPending ? "Loading..." : ""}</div>
			<div>{errorMessage ? errorMessage : ""}</div>
		</div>
	);
};

export default Gallery;
