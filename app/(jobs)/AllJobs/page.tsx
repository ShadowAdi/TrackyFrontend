"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/provider/user-provider";
import { GetAllJobs, JobInterface } from "@/actions/Jobs";
import { Skeleton } from "@/components/ui/skeleton";
import JobCard from "@/components/shared/JobCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AllJobs = () => {
  const { user, loading } = useAuth();
  const [jobs, setJobs] = useState<JobInterface[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!loading && user) {
        const data = await GetAllJobs(user, loading);
        if (data) {
          setJobs(data);
        }
      }
    };
    fetchJobs();
  }, [loading, user]);

  return (
    <div className="text-black flex px-4 py-4 flex-col items-start gap-10 justify-center">
      <h1 className="text-[#3087d8] text-4xl block mx-auto text-center font-bold">
        All Jobs
      </h1>

      {/* Loading State with Skeleton */}
      {loading ? (
        <div className="flex w-full flex-col gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between gap-5 w-full">
              <Skeleton className="w-1/2 h-[100px] rounded-lg" />
              <Skeleton className="w-1/2 h-[100px] rounded-lg" />
            </div>
          ))}
        </div>
      ) : jobs.length > 0 ? (
        /* Grid layout for JobCards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {jobs.map((job, i) => (
            <JobCard key={i} job={job} />
          ))}
        </div>
      ) : (
        /* No Job Found Message */
        <div className="flex gap-4 flex-col">
          <h1 className="text-black text-xl font-bold">No Job Found</h1>
          <div className="flex gap-4 items-center">
            <h1 className="text-[#3087d8] text-xl font-bold">Create Job- </h1>
            <Link href={"/Create"}>
              <Button
                className="rounded-full px-6 bg-[#3087d8] text-white hover:bg-white 
              hover:text-[#3087d8]"
              >
                <span className="text-xl font-bold">Create Job</span>
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Create Job Button (if not loading) */}
      {!loading && jobs.length !== 0 && (
        <div className="flex gap-4 items-center">
          <h1 className="text-[#3087d8] text-base sm:text-xl font-bold">
            Create Job-{" "}
          </h1>
          <Link href={"/Create"}>
            <Button className="rounded-full px-6 bg-[#3087d8] text-white hover:bg-white hover:text-[#3087d8]">
              <span className="text-xl font-bold">Create Job</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AllJobs;
