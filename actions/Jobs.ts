"use client";

import { UserProps } from "@/components/provider/user-provider";
import axios from "axios";

export interface JobInterface {
  id?: number;
  title: string;
  description?: string;
  date_applied: string; // Expecting a string in "YYYY-MM-DD" format
  company: string;
  status: "AP" | "AC" | "ASG" | "RJ" | "AD" | "IV"; // Define possible status values as a union type
  job_url?: string;
  posted_by?: number;
}

// Fetches all jobs and returns an array of JobInterface
export const GetAllJobs = async (
  user: UserProps,
  loading: boolean
): Promise<JobInterface[] | undefined> => {
  if (!loading && user) {
    const res = await axios.get(
      `http://127.0.0.1:8000/jobs/All/?user_id=${user.id}`
    );
    return res.data as JobInterface[];
  }
  return undefined;
};

// Fetches a single job by ID and returns a JobInterface
export const GetJob = async (id: number): Promise<JobInterface | null> => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/jobs/Single/${id}/`);
    return res.data as JobInterface;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const CreateNewJob = async (user: UserProps, data: JobInterface) => {
  const token = localStorage.getItem("token");
  if (user && token) {
    try {
      data["posted_by"] = user?.id;
       await axios.post(`http://127.0.0.1:8000/jobs/Create/`, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      }).then((res)=>{
        window.location.href='/AllJobs'

      })
    } catch (error) {
      console.log(error);
    }
  }
};

export const UpdateJob = async (
  id: number,
  data: JobInterface
): Promise<JobInterface | null> => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.put(
        `http://127.0.0.1:8000/jobs/UpdateDelete/${id}/`,
        data,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      window.location.href = "/AllJobs";

      return res.data as JobInterface;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const DeleteJob = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.delete(
        `http://127.0.0.1:8000/jobs/UpdateDelete/${id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      window.location.href = "/AllJobs";
    }
  } catch (error) {
    console.log(error);
  }
};
