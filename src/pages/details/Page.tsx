import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

interface DetailsImage {
	id: string;
	errors?: string[] | undefined;
	description?: string | undefined;
	urls: {
		full: string;
	};
	user: {
		name: string;
		links: {
			html: string;
		};
	};
}

const ImageDetails = () => {
	const { id } = useParams();
	const { isPending, error, data } = useQuery({
		queryKey: ['details', id],
		queryFn: () =>
			fetch(
				`https://api.unsplash.com/photos/${id}?client_id=H73BXj4EXpnpJoI2AiqZI1e7I7uN7Wg0Yxts34HJ_YQ`
			).then<DetailsImage>((res) => res.json()),
		staleTime: 60 * 60 * 1000,
	});

	if (isPending) {
		return <div className="text-center">Loading</div>;
	}

	if (error) {
		return <div className="text-center">{error.message}</div>;
	}

	if (data?.errors) {
		return <div className="text-center">Unable to load page</div>;
	}

	return (
		<div className='flex flex-col justify-start content-start'>
			<img src={data.urls.full} />
			<h1>{data.description ? data.description : 'No title'}</h1>
			<p>{data.description ? data.description : 'No description'}</p>
			<p>Author: {data.user.name}</p>
		</div>
	);
};

export default ImageDetails;
