import { useDispatch, useSelector } from 'react-redux';
import ApiService, { Response } from '../../lib/ApiService';
import { useEffect } from 'react';
import { IRoot } from '../../Redux/types';
import { IUser, setUser } from '../../Redux/Slices/UserSlice';

const useAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: IRoot) => state.user);

    useEffect(() => {
        if (!user.id)
            updateUser();
    }, []);

    const updateUser = async () => {
        const res = await ApiService.get<Response<IUser>>('/auth/me', {
            protected: true,
        });
        dispatch(setUser(res.data.data));
    };
    const login = async (username: string, password: string) => { 
        const res = await ApiService.post<Response<{ user: IUser, token:string }>>('users/login/', {
            username,
            password,
        });
        dispatch(setUser({
            ...res.data.data.user,
            token:res.data.data.token
        }));
        return res.data;
    }
    const logout = () => { 
        dispatch(setUser({
            id: "",
            username: "",
            email: "",
            phone: "",
            role: "",
            token:""
        }));
    }
    return { user, updateUser, login,logout };
    
};

export default useAuth;