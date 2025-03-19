import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuditState {
  currentStep: number;
}

const initialState: AuditState = {
  currentStep: 1,
};

const auditSlice = createSlice({
  name: "audit",
  initialState,
  reducers: {
    updateStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
  },
});

export const { updateStep } = auditSlice.actions;

export default auditSlice.reducer;
