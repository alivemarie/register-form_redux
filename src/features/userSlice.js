import {createSlice} from "@reduxjs/toolkit"; // я так понимаю это некий слой абстракции

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        signUp: (state, action) => {
            state.user = action.payload;
        }
    }
    });

export const { signUp } = userSlice.actions;
// export const selectUser = (state) => state.user.user;
// хук нужен будет для определения залогинен пользователь или нет

export default userSlice.reducer;
