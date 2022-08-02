import { createSlice } from "@reduxjs/toolkit";

/*
todo = {
    id: '', // unique value
    task: '',
    status: 'in progress' // ['in progress', 'completed']
}
*/

const initialState = {
  data: [],
};

/*
Redux Toolkit allows us to write "mutating" logic in reducers. It
doesn't actually mutate the state because it uses the Immer library,
which detects changes to a "draft state" and produces a brand new
immutable state based off those changes
*/

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.data.push(action.payload);
    },
    updateTodo: (state, action) => {
      state.data = state.data.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
    },
    deleteTodo: (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
