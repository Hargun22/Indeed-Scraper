import React from "react";
import { fetchJobsInPage } from "./redux/jobSlice";
import { useAppDispatch } from "./redux/store";

const Home = () => {
  const [title, setTitle] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const dispatch = useAppDispatch();
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchJobsInPage({ title, location, keywords, page: 1 }));
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="flex justify-center m-10">
        <h1 className="text-4xl md:text-8xl font-bold">Indeed Scraper</h1>
      </div>
      <div>
        <form
          id="search-form"
          action=""
          method="POST"
          className="flex mt-10 justify-evenly flex-wrap"
          onSubmit={formSubmit}
        >
          <input
            className="min-w-[30%] p-3 md:p-5 rounded-full m-1"
            type="text"
            name="title"
            placeholder="Job Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="min-w-[30%] p-3 md:p-5 rounded-full m-1"
            type="text"
            name="location"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            className="min-w-[30%] p-3 md:p-5 rounded-full m-1"
            type="text"
            name="keywords"
            placeholder="Keywords, Ex. HTML,React,Node"
            onChange={(e) => setKeywords(e.target.value.split(","))}
          />
        </form>
        <div className="flex justify-center my-2">
          <button
            form="search-form"
            type="submit"
            className="bg-green-300 px-8 py-3 md:px-12 md:py-5 rounded-full m-1"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
