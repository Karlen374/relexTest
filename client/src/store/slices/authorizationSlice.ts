import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useAuthorizationServices from 'src/services/useAuthorizationService';
import { IRegisteredUser } from 'src/types/IRegisteredUsers';
import { ITestResultData } from 'src/types/ITestResultData';
import { IUser } from 'src/types/IUser';
import { IUserSignInData } from 'src/types/IUserSignInData';
import { IUserSignUpData } from 'src/types/IUserSignUpData';

interface IAlertMessage{
  text: string;
  alert: 'error' | 'info' | 'success'| 'warning';
}

interface AuthorizationState {
  signUpModal:boolean;
  signInModal:boolean;
  registeredUserData:IUser | null;
  registeredUsers:IRegisteredUser[] | null;
  alertStatus:boolean;
  alertMessage:IAlertMessage
}

const initialState:AuthorizationState = {
  signUpModal: false,
  signInModal: false,
  registeredUserData: null,
  registeredUsers: null,
  alertStatus: false,
  alertMessage: {
    text: '',
    alert: 'success',
  },
};

export const signIn = createAsyncThunk(
  'authorization/signIn',
  async (data:IUserSignInData) => {
    const { signInUser } = useAuthorizationServices();
    const response = await signInUser(data);
    return response;
  },
);
export const signUp = createAsyncThunk(
  'authorization/signUp',
  async (data:IUserSignUpData) => {
    const { signUpUser } = useAuthorizationServices();
    const response = await signUpUser(data);
    return response;
  },
);
export const getUsers = createAsyncThunk(
  'authorization/getUsers',
  async () => {
    const { getAllUsers } = useAuthorizationServices();
    const response = await getAllUsers();
    return response;
  },
);
export const addResult = createAsyncThunk(
  'authorization/addResult',
  async (testResult :ITestResultData) => {
    const { addTestResult } = useAuthorizationServices();
    const response = await addTestResult(testResult);
    return response;
  },
);
const AuthorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.signUpModal = true;
      state.signInModal = false;
    },
    closeSignUpModal: (state) => {
      state.signUpModal = false;
    },
    openSignInModal: (state) => {
      state.signInModal = true;
      state.signUpModal = false;
    },
    closeSignInModal: (state) => {
      state.signInModal = false;
    },
    closeAlertModal: (state) => {
      state.alertStatus = false;
    },
    signOut: (state) => {
      state.registeredUserData = null;
      localStorage.removeItem('registeredUserData');
    },
    getRegisteredUserData: (state, action) => {
      state.registeredUserData = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.registeredUserData = action.payload;
        localStorage.setItem('registeredUserData', JSON.stringify(action.payload));
      })
      .addCase(addResult.fulfilled, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: 'Тест успешно отправлен', alert: 'success' };
      })
      .addCase(addResult.rejected, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: 'что то пошло не так перезагрузите страницу', alert: 'error' };
      })
      .addCase(signIn.rejected, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: 'Введен неверный логин или пароль', alert: 'error' };
      })
      .addCase(signUp.fulfilled, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: 'Регистрация прошла успешно ', alert: 'success' };
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.registeredUsers = action.payload;
      })
      .addCase(signUp.rejected, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: 'что то пошло не так', alert: 'error' };
      });
  },
});

const { actions, reducer } = AuthorizationSlice;

export default reducer;

export const {
  openSignUpModal,
  closeSignUpModal,
  openSignInModal,
  closeSignInModal,
  signOut,
  getRegisteredUserData,
  closeAlertModal,
} = actions;
