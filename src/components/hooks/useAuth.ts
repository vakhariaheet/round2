import { useDispatch, useSelector } from 'react-redux';
import ApiService, { Response } from '../../lib/ApiService';
import { useEffect } from 'react';
import { IRoot } from '../../Redux/types';
import { IUser, setUser } from '../../Redux/Slices/UserSlice';
import { useNavigate } from 'react-router-dom';
export interface User {
	email: string;
	name: string;
	id: string;
}
export interface Tokens {
	access_token: string;
	refresh_token: string;
}
const useAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: IRoot) => state.user);
    const navigate =  useNavigate();
    useEffect(() => {
        if (!user.id)
            updateUser();
    }, []);

    const updateUser = async () => {
        const res = await ApiService.get<Response<IUser>>('/user/detail', {
            protected: true,
        });
        dispatch(setUser(res.data.data));
    };
    const login = async (username: string, password: string) => { 
        const res = await ApiService.post<Response<{ user: IUser, token:string }>>('users/login/', {
            username,
            password,
        });
        localStorage.setItem('token', res.data.data.token);
        dispatch(setUser({
            ...res.data.data.user,
            token:res.data.data.token
        }));
        return res.data;
    }
    const googleLogin = async (tokenResponse, options) => {
		try {
			const { data: GoogleLoginResp } = await ApiService.post<{
				data: {
					info: User;
					tokens: Tokens;
				};
			}>('/api/auth/google', {
				data: {
					accessToken: tokenResponse.access_token,
				},
			});
			if (GoogleLoginResp) {
				dispatch(setUser(GoogleLoginResp.data));
			}
		} catch (err) {
			if (options && options.onError) {
				options.onError(err);
			}
			throw err;
		}
	};
    const logout = () => { 
        dispatch(setUser({
            id: "",
            username: "",
            email: "",
            phone: "",
            role: "",
            address:"",
            token:""
        }));
        navigate('/login');
    }
    return { user, updateUser, login,logout };
    
};

export default useAuth;