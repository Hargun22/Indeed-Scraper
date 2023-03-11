import { RotatingLines } from "react-loader-spinner";
import { selectJobs, selectLoading } from "./redux/jobSlice";
import { useAppSelector } from "./redux/store";

const Jobs = () => {
  const allJobs = useAppSelector(selectJobs);
  const loading = useAppSelector(selectLoading);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <h1 className="text-4xl m-5 font-bold">Your Jobs</h1>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <RotatingLines
            strokeColor="black"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <div className="flex justify-evenly flex-wrap">
          {allJobs.map((job) => (
            <div
              key={job.url}
              className="flex flex-col justify-start bg-gray-300 p-8 m-2 rounded-[30px] gap-3 md:max-w-[40%]"
            >
              <a href={job.url} target="_blank" rel="noreferrer">
                <h1 className="text-2xl font-bold">{job.title}</h1>
              </a>
              <h2 className="text-md">{job.company}</h2>
              <h3>{job.location}</h3>
              <p>{job.summary}</p>
              <h4 className="text-sm">{job.date}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
