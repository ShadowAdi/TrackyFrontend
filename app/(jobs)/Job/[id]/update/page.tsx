"use client";
import { GetJob, JobInterface } from "@/actions/Jobs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import UpdateJobForm from "@/components/shared/UpdateJobForm";

const UpdateJob = () => {
  const { id } = useParams();

  const [job, setJob] = useState<JobInterface | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetJob(Number(id));
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };
    fetchData();
  }, [id]); // Only add `id` as a dependency

  return (
    <div className="text-black flex flex-col items-center mt-4 justify-center">
      {job ? (
        <div className=" flex flex-col w-full items-center justify-center gap-8 py-6">
          <h1 className="sm:text-4xl text-xl font-bold text-[#3087d8] ">
            Update Job {job.title}
          </h1>
          <div className="flex flex-col w-full  mx-auto">
            <UpdateJobForm job={job} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center pt-8 justify-center gap-4 w-[80%] mx-auto">
          <Skeleton className="w-[300px] h-[30px] rounded-lg" />
          <div className="flex my-3 justify-between items-center gap-3 w-full">
            <Skeleton className="w-1/2 h-[40px] rounded-lg" />
            <Skeleton className="w-1/2 h-[40px] rounded-lg" />
          </div>
          <div className="flex my-3 justify-between items-center gap-3 w-full">
            <Skeleton className="w-1/2 h-[40px]  rounded-lg" />
            <Skeleton className="w-1/2  h-[40px] rounded-lg" />
          </div>
          <div className="flex my-3 justify-between items-center gap-3 w-full">
            <Skeleton className="w-1/2 h-[40px]  rounded-lg" />
            <Skeleton className="w-1/2  h-[40px] rounded-lg" />
          </div>
          <div className="flex my-3 justify-between items-center gap-3 w-full">
            <Skeleton className="w-1/2 h-[40px]  rounded-lg" />
            <Skeleton className="w-1/2  h-[40px] rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateJob;
