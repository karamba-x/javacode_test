import { createSlice } from "@reduxjs/toolkit";

interface IModal {
  isOpen: boolean;
  taskId: number | null;
}

interface IUiState {
  modal: IModal;
}

const initialState: IUiState = {
  modal: {
    isOpen: false,
    taskId: null,
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modal.isOpen = true;
      state.modal.taskId = action.payload;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.taskId = null;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
