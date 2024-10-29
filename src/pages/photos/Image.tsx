import { Link } from 'react-router-dom';
import { UnsplashImage } from '../../Types';

const GalleryImage = ({ image }: { image: UnsplashImage }) => {
	return (
		<Link to={`/photos/${image.id}`}>
			<div className="relative m-1 h-fit">
				<img
					src={image.urls.small}
					alt={
						image.alt_description ? image.alt_description : image.id
					}
				/>
				<p className="absolute bottom-4 right-4 font-mono text-white bg-black/50 px-1 block">
					{image.user.name}
				</p>
			</div>
		</Link>
	);
};

export default GalleryImage;
