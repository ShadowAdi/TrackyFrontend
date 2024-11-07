"use client";
import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobInterface, UpdateJob } from "@/actions/Jobs";
import { useToast } from "@/hooks/use-toast";
import Notofy from "./Notofy";
import { Textarea } from "../ui/textarea";

// Define the schema
const updateJobSchema = z.object({
  title: z.string().min(6, { message: "Title must be at least 6 characters." }),
  description: z.string().optional(),
  date_applied: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Invalid date format.",
  }), // expects a string in YYYY-MM-DD
  company: z.string(),
  status: z.enum(["AP", "AC", "ASG", "RJ", "AD", "IV"]),
  job_url: z
    .string()
    .url("Please enter a valid URL.")
    .or(z.literal("")) // Allows empty strings
    .optional(),
});

type UpdateJobFormData = z.infer<typeof updateJobSchema>;

const STATUS_CHOICES = [
  { value: "AP", label: "Applied" },
  { value: "AC", label: "Accepted" },
  { value: "ASG", label: "Assignment Given" },
  { value: "RJ", label: "Rejected" },
  { value: "AD", label: "Assignment Done" },
  { value: "IV", label: "Interview" },
];

const UpdateJobForm = ({ job }: { job: JobInterface }) => {
  const formMethods = useForm<UpdateJobFormData>({
    resolver: zodResolver(updateJobSchema),
    defaultValues: {
      company: job.company,
      date_applied: job.date_applied, // Set as string in "YYYY-MM-DD" format
      description: job.description,
      job_url: job.job_url,
      status: job.status,
      title: job.title,
    },
  });

  const { handleSubmit, control } = formMethods;

  const onSubmit = async (data: UpdateJobFormData) => {
    const formattedData = {
      ...data,
      date_applied: data.date_applied, // Convert to "YYYY-MM-DD" format
    };

    if (job.id && formattedData) {
      await UpdateJob(job.id, formattedData);
      Notofy("Job has been updated");
    }
  };

  return (
    <div className="my-auto mt-6 w-full h-2/3 mx-auto py-7">
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 sm:w-2/3 px-3 w-full mx-auto"
        >
          {/* Title Input */}
          <div className="flex sm:flex-row flex-col w-full justify-between items-center gap-3">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem className="sm:w-1/2 w-full">
                  <FormLabel className="text-[#3087d8]">Title</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black placeholder:text-stone-600"
                      placeholder="Enter title"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem className="sm:w-1/2 w-full">
                  <FormLabel className="text-[#3087d8]">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-black placeholder:text-stone-600"
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full justify-between sm:flex-row flex-col items-center gap-3">
            <FormField
              control={control}
              name="job_url"
              render={({ field }) => (
                <FormItem className="sm:w-1/2 w-full">
                  <FormLabel className="text-[#3087d8]">Job URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      className="text-black placeholder:text-stone-600"
                      placeholder={job.job_url}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company Input */}
            <FormField
              control={control}
              name="company"
              render={({ field }) => (
                <FormItem className="sm:w-1/2 w-full">
                  <FormLabel className="text-[#3087d8]">Company</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black placeholder:text-stone-600"
                      placeholder={job.company}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full justify-between sm:flex-row flex-col items-center gap-3">
            <FormField
              control={formMethods.control}
              name="date_applied"
              render={({ field }) => (
                <FormItem className="sm:w-1/2 w-full">
                  <FormLabel className="text-[#3087d8]">Date Applied</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="text-black  placeholder:text-stone-600"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem className="sm:w-1/2 w-full">
                  <FormLabel className="text-[#3087d8]">Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="text-black placeholder:text-stone-600">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_CHOICES.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            size={"lg"}
            type="submit"
            className="bg-[#3087d8] hover:bg-white hover:text-[#3087d8] text-white px-6 py-3 rounded-full"
          >
            <span className="text-xl font-bold">Update Job</span>
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default UpdateJobForm;
