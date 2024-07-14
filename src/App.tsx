
import './App.css';
import Navbar from './components/ui/NavBar';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Profile from './pages/profile';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/Profile' element={<Profile />} />

			</Routes>
		</>
	);
}

export default App;
