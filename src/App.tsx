import './App.css';
import Navbar from './components/ui/NavBar';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Profile from './pages/profile';
import Home from './pages/home';
import AllUsers from './pages/AllUsers';
import SearchBook from './pages/SearchBooks';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from './components/ui/toaster';

function App() {
	return (
		<>
			
				<GoogleOAuthProvider
					clientId={import.meta.env.VITE_GOOGLE_CLIENT_SECRET}
				>
					<Navbar />
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/Profile' element={<Profile />} />
						<Route path='/all-users' element={<AllUsers />} />
						<Route path='/search' element={<SearchBook />} />
						<Route path='/' element={<Home />} />
				</Routes>
				<Toaster/>
				</GoogleOAuthProvider>
			
		</>
	);
}

export default App;
