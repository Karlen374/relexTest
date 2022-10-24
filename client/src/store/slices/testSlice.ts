import { ITest, IQuestion } from 'src/types/ITest';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useTestServices from 'src/services/useTestService';

interface AuthorizationState {
  createTestModal:boolean;
  tests:ITest[] | null;
  selectedTest: ITest | null;
  questions: IQuestion[] | null;
  testPerformanceModal:boolean;
}

const initialState:AuthorizationState = {
  createTestModal: false,
  tests: null,
  selectedTest: null,
  questions: null,
  testPerformanceModal: false,
};

export const createTest = createAsyncThunk(
  'test/create',
  async (data:ITest) => {
    const { createNewTest } = useTestServices();
    const response = await createNewTest(data);
    return response;
  },
);
export const getAllTests = createAsyncThunk(
  'test/getAllTests',
  async () => {
    const { getTests } = useTestServices();
    const response = await getTests();
    return response;
  },
);
export const changeTestStatus = createAsyncThunk(
  'test/changeTestStatus',
  async (id:string) => {
    const { changeStatus } = useTestServices();
    const response = await changeStatus(id);
    return response;
  },
);

const TestSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    changeTestModal: (state, action) => {
      state.createTestModal = action.payload;
    },
    changeTestPerformanceModal: (state, action) => {
      state.testPerformanceModal = action.payload;
    },
    addQuestion: (state, action) => {
      if (state.questions) state.questions = [...state.questions, action.payload];
      else state.questions = [action.payload];
    },
    clearQuestions: (state) => {
      state.questions = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTest.fulfilled, (state, action) => {
        if (state.tests) state.tests = [...state.tests, action.payload];
        else state.tests = [action.payload];
      })
      .addCase(changeTestStatus.fulfilled, (state, action) => {
        if (state.tests) {
          state.tests = state.tests.map((item) => {
            if (item.id !== action.payload.id) return item;
            else return action.payload;
          });
        }
      })
      .addCase(getAllTests.fulfilled, (state, action) => {
        state.tests = action.payload;
      });
  },
});

const { actions, reducer } = TestSlice;

export default reducer;

export const {
  changeTestModal,
  addQuestion,
  clearQuestions,
  changeTestPerformanceModal,
} = actions;
