import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import PhotoGalleryPage from './pages/photos/Page';
import ImageDetails from './pages/details/Page';

import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<PhotoGalleryPage />} />
						<Route path="photos" element={<PhotoGalleryPage />} />
						<Route path="photos/:id" element={<ImageDetails />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
