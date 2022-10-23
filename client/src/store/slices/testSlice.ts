import { ITest } from 'src/types/ITest';
import { createSlice } from '@reduxjs/toolkit';

interface AuthorizationState {
  createTestModal:boolean;
  tests:ITest[] | null;
}

const initialState:AuthorizationState = {
  createTestModal: false,
  tests: [{
    id: '1',
    status: false,
    name: 'test1',
    questions: [
      {
        id: '1',
        body: {
          question: 'your Name?',
          answers: ['Mike', 'Liko', 'Sakura', 'Vardan'],
          correctAnswerId: 1,
        },
      },
      {
        id: '2',
        body: {
          question: 'your SurName?',
          answers: ['asd', 'Likosg', 'Sakgsga', 'Vsgars'],
          correctAnswerId: 2,
        },
      },
    ],
  }],
};

const TestSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    changeTestModal: (state, action) => {
      state.createTestModal = action.payload;
    },
  },
});

const { actions, reducer } = TestSlice;

export default reducer;

export const {
  changeTestModal,
} = actions;
