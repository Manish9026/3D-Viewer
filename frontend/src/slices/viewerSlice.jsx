import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modelFile:{
    url:"",
    extension:"",
  },
  cameraState: {},
};

const viewerSlice = createSlice({
  name: "viewer",
  initialState,
  reducers: {
    setModelUrl: (state, {payload}) => {
      state.modelFile.url = payload?.url;
      state.modelFile.extension = payload?.extension;
    },
    setCameraState: (state, action) => {
      state.cameraState = action.payload;
    },
  },
});

export const { setModelUrl, setCameraState } = viewerSlice.actions;
export default viewerSlice.reducer;