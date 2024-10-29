export type UnsplashImage = {
	id: string;
	created_at: string;
	updated_at: string;
	width: number;
	height: number; 
	description: string | null;
    alt_description: string | null;
	user: {
		username: string;
		name: string;
		instagram_username: string | null | undefined;
		twitter_username: string | null | undefined;
		profile_image: {
			small: string;
			medium: string;
			large: string;
		};
		links: {
			html: string;
		};
	};
	urls: {
		raw: string;
		full: string;
		regular: string;
		small: string;
		thumb: string;
	};
	links: {
		self: string;
		html: string;
		download: string | undefined;
		download_location: string | undefined;
	};
};
