import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loginStatus: false,
    id: null,
    role: null,
    isInitialized: false, // 서버를 통해 상태 확인이 끝났는지에 대한 여부
};

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        login(state, action) {
            const { userId, role } = action.payload;
            state.loginStatus = true;
            state.id = userId;
            state.role = role;
            state.isInitialized = true;
        },
        logout(state) {
            state.loginStatus = false;
            state.id = null;
            state.role = null;
            state.isInitialized = true;
        },
    },
});

export const { login, logout } = memberSlice.actions;
export default memberSlice.reducer;