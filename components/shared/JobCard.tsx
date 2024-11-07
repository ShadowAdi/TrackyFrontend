"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteJob, JobInterface } from "@/actions/Jobs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";
import Link from "next/link";
import Notofy from "./Notofy";

const JobCard = ({ job }: { job: JobInterface }) => {
  const UrlCopied = (JobUrl: string | undefined) => {
    if (JobUrl !== undefined) {
      navigator.clipboard.writeText(JobUrl);
      Notofy("Url Copied");
    }
  };

  const statusMapping: { [key: string]: { label: string; color: string } } = {
    AP: {
      label: "Applied",
      color: "bg-blue-200/70 rounded-md mt-2 cursor-pointer",
    },
    AC: {
      label: "Accepted",
      color: "bg-green-200/70 rounded-md mt-2 cursor-pointer",
    },
    ASG: {
      label: "Assignment Given",
      color: "bg-yellow-200/70 rounded-md mt-2 cursor-pointer",
    },
    RJ: {
      label: "Rejected",
      color: "bg-red-200/70 rounded-md mt-2 cursor-pointer",
    },
    AD: {
      label: "Assignment Done",
      color: "bg-purple-200/70 rounded-md mt-2 cursor-pointer",
    },
    IV: {
      label: "Interview",
      color: "bg-indigo-200/70 rounded-md mt-2 cursor-pointer",
    },
  };

  const { label, color } = statusMapping[job.status] || {
    label: job.status,
    color: "bg-gray-200",
  };

  return (
    <Card className="bg-slate-50 text-black border-none  overflow-x-hidden drop-shadow-2xl rounded-xl">
      <CardHeader>
        <CardTitle className="text-[#3087d8] text-2xl">{job.title}</CardTitle>
        <CardDescription>
          {job.description && job.description.length > 30
            ? job.description.slice(0, 29) + "..."
            : job.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex justify-between w-full sm:flex-row flex-col items-start sm:items-center">
          <p>Applied on Date - {job.date_applied}</p>
          <p>Company - {job.company}</p>
        </div>
        <div className="bg-slate-500/30 px-3 py-2 cursor-pointer rounded-md overflow-x-hidden flex gap-2 items-center">
          {job.job_url && (
            <span
              onClick={() => {
                UrlCopied(job.job_url);
              }}
              className="text-base text-stone-700"
            >
              {job.job_url.length > 35
                ? job.job_url.slice(0, 30) + "..."
                : job.job_url}
            </span>
          )}
        </div>
        <div className="flex justify-between sm:flex-row flex-col gap-3 items-start sm:items-center">
          <span className={`px-2 py-1 rounded-base ${color}`}>
            Status - {label}
          </span>
          <div className="flex gap-3">
            {job.id !== undefined && (
              <Link href={`Job/${job.id}/update`}>
                <Button
                  className="bg-[#3087d8] hover:bg-[#3087d8]/90 flex items-center justify-center"
                  size={"icon"}
                >
                  <FaEdit className="text-base text-stone-900" />
                </Button>
              </Link>
            )}
            <Button
              onClick={() => {
                job.id !== undefined && DeleteJob(job.id);
                Notofy("Delete The Job");
              }}
              className="bg-[#d85430] hover:bg-[#d85430]/90 flex items-center justify-center"
              size={"icon"}
            >
              <FaTrash className="text-base text-stone-900" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
