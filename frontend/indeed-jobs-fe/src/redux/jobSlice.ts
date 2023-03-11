import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

import { Job } from "../models/Job";

export interface JobState {
  allJobs: Job[];
  loading: boolean;
}

type SearchType = {
  title: string;
  location: string;
  keywords: string[];
};

type SearchWithPageType = SearchType & { page: number };

const SCRAPER_URL = "http://127.0.0.1:5002/";

const initialState: JobState = { allJobs: [], loading: false };

export const fetchAllJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (searchInput: SearchType) => {
    const response = await axios.post(SCRAPER_URL, searchInput);
    return response.data;
  }
);

export const fetchJobsInPage = createAsyncThunk(
  "jobs/fetchJobsInPage",
  async (searchInput: SearchWithPageType) => {
    const { title, location, keywords, page } = searchInput;
    const response = await axios.post(`${SCRAPER_URL}${page}`, {
      title,
      location,
      keywords,
    });
    return response.data;
  }
);

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllJobs.fulfilled, (state, action) => {
      state.allJobs = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllJobs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchJobsInPage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchJobsInPage.fulfilled, (state, action) => {
      state.allJobs = action.payload;
      state.loading = false;
    });
  },
});

export const selectJobs = (state: RootState) => state.jobs.allJobs;

export const selectLoading = (state: RootState) => state.jobs.loading;

export default jobSlice.reducer;
