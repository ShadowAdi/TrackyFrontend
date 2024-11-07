"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/provider/user-provider";
import { UpdateAccount } from "@/actions/Auth";
import Notofy from "@/components/shared/Notofy";
import axios from "axios";

const userFormSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(6, { message: "Email must be at least 6 characters." }),
  username: z
    .string()
    .min(3, { message: "Username must be more than 3 characters." }),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  github_url: z
    .string()
    .url("Please enter a valid GitHub URL.")
    .or(z.literal("")) // Allows empty strings without error
    .optional(),
  linked_in_url: z
    .string()
    .url("Please enter a valid LinkedIn URL.")
    .or(z.literal("")) // Allows empty strings without error
    .optional(),
  photo: z
    .string()
    .url("Please enter a valid Profile URL.")
    .or(z.literal("")) // Allows empty strings without error
    .optional(),
  resume: z
    .string()
    .url("Please enter a valid Drive URL or another valid URL.")
    .or(z.literal("")) // Allows empty strings without error
    .optional(),
});

const UpdateProfile = () => {
  const { user, loading, setUser } = useAuth();
  const formMethods = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: user?.email || "",
      username: user?.username || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      github_url: user?.github_url || "",
      linked_in_url: user?.linked_in_url || "",
      photo: user?.photo || "",
      resume: user?.resume || "",
    },
  });

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "trackey"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/shadowaditya/image/upload`,
        formData
      ); // Replace with your Cloudinary cloud name
      const imageUrl = response.data.secure_url;
      formMethods.setValue("photo", imageUrl);
      Notofy("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      Notofy("Image upload failed.");
    }
  };

  const onSubmit = (values: z.infer<typeof userFormSchema>) => {
    if (user?.id) {
      UpdateAccount({ ...values, id: user.id }, setUser);
      Notofy("Account has been updated");
    } else {
      console.log("User id not given");
      Notofy("User id not found");
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 text-black items-center sm:w-3/4 w-full mx-auto justify-center">
      <div className=" my-auto mt-6 w-full h-2/3 mx-auto py-7   ">
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="sm:space-y-8 space-y-2  sm:w-2/3 w-full mx-auto px-4"
          >
            <div className="flex sm:flex-row flex-col  justify-between gap-3 sm:gap-6">
              <FormField
                control={formMethods.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-[#3087d8]">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black placeholder:text-stone-600"
                        placeholder={
                          user?.email ? user?.email : "shadow@gmail.com"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-black">
                      Enter your email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex sm:flex-row flex-col  justify-between gap-3 sm:gap-6">
              <FormField
                control={formMethods.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-[#3087d8]">First Name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black placeholder:text-stone-600 "
                        placeholder={user?.first_name ? user.first_name : "Adi"}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-black">
                      Enter your First Name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-[#3087d8]">Lastname</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black placeholder:text-stone-600 "
                        type="text"
                        placeholder={
                          user?.last_name ? user.last_name : "Shukla"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-black">
                      This is your LastName
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex sm:flex-row flex-col  justify-between gap-3 sm:gap-6">
              <FormField
                control={formMethods.control}
                name="linked_in_url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-[#3087d8]">LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black placeholder:text-stone-600 "
                        placeholder={
                          user?.linked_in_url
                            ? user?.linked_in_url
                            : "http://linkedin.com"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-black">
                      Enter your Url.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="github_url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-[#3087d8]">Github Url</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="text-black placeholder:text-stone-600 "
                        placeholder={
                          user?.github_url
                            ? user?.github_url
                            : "http://github.com"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-black">
                      This is your Gthub Url
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={formMethods.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#3087d8]">Username</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black placeholder:text-stone-600 "
                      type="text"
                      placeholder={user?.username}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-black">
                    This is your Username
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formMethods.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#3087d8]">
                    Profile Photo
                  </FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleImageUpload(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription className="text-black">
                    Upload your Profile Photo
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#3087d8]">Resume</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black placeholder:text-stone-600 "
                      type="text"
                      placeholder={
                        user?.resume ? user?.resume : "http://resume.com"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-black">
                    This is your Resume
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size={"lg"}
              type="submit"
              className="bg-[#3087d8] hover:bg-white hover:text-[#3087d8] 
             text-white px-6 py-3 rounded-full"
            >
              <span className="text-xl font-bold ">Submit</span>
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default UpdateProfile;
