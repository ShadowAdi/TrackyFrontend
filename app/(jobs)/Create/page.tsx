"use client";
import React from "react";
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
import { CreateNewJob } from "@/actions/Jobs";
import { useAuth } from "@/components/provider/user-provider";
import { useToast } from "@/hooks/use-toast";
import Notofy from "@/components/shared/Notofy";
import { Textarea } from "@/components/ui/textarea";

// Define the schema
const createJobSchema = z.object({
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

type CreateJobFormData = z.infer<typeof createJobSchema>;

const STATUS_CHOICES = [
  { value: "AP", label: "Applied" },
  { value: "AC", label: "Accepted" },
  { value: "ASG", label: "Assignment Given" },
  { value: "RJ", label: "Rejected" },
  { value: "AD", label: "Assignment Done" },
  { value: "IV", label: "Interview" },
];

const CreateJob = () => {
  const { user, loading } = useAuth();
  const formMethods = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      company: "",
      date_applied: new Date().toISOString().split("T")[0], // Set as string in "YYYY-MM-DD" format
      description: "",
      job_url: "",
      status: "AP",
      title: "",
    },
  });

  const { handleSubmit, control } = formMethods;

  const onSubmit = (data: CreateJobFormData) => {
    const formattedData = {
      ...data,
      date_applied: data.date_applied, // Convert to "YYYY-MM-DD" format
    };
    if (user && formattedData) {
      CreateNewJob(user, formattedData);
      Notofy("Created the job");
    }
  };
  return (
    <div className="my-auto mt-6 w-full h-2/3 mx-auto py-7">
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 sm:w-2/3 w-full px-3 mx-auto"
        >
          {/* Title Input */}
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#3087d8]">Title</FormLabel>
                <FormControl>
                  <Input
                    className="text-black placeholder:text-stone-600"
                    placeholder="Job Title"
                    {...field}
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
              <FormItem>
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

          {/* Date Applied Input */}
          <FormField
            control={formMethods.control}
            name="date_applied"
            render={({ field }) => (
              <FormItem>
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

          {/* Status Dropdown */}
          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FormItem>
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

          {/* Company Input */}
          <FormField
            control={control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#3087d8]">Company</FormLabel>
                <FormControl>
                  <Input
                    className="text-black placeholder:text-stone-600"
                    placeholder="Company"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job URL Input */}
          <FormField
            control={control}
            name="job_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#3087d8]">Job URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    className="text-black placeholder:text-stone-600"
                    placeholder="https://example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            size={"lg"}
            type="submit"
            className="bg-[#3087d8] hover:bg-white hover:text-[#3087d8] text-white px-6 py-3 rounded-full"
          >
            <span className="text-xl font-bold">Submit</span>
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateJob;
