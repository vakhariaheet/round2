
import './App.css';
import Navbar from './components/ui/NavBar';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Profile from './pages/profile';
import Home from './pages/home';
import AllUsers from './pages/AllUsers';
import SearchBook from './pages/SearchBooks';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/Profile' element={<Profile />} />
				<Route path='/all-users' element={<AllUsers />} />
				<Route path='/search' element={<SearchBook />} />
				<Route path='/' element={<Home />} />
				
			</Routes>
		</>
	);
}

export default App;
