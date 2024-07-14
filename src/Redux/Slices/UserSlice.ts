import { createSlice } from "@reduxjs/toolkit";
export interface IUser {
    id: string;
    username: string;
    email: string;
    phone: string;
    role: string;
    address:string;
    token:string
}

const initialState: IUser = {
    id: "",
    username: "",
    email: "",
    phone: "",
    role: "",
    address:"",
    token:""
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        clearUser: () => {
            return initialState;
        },
    },
});

export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;
