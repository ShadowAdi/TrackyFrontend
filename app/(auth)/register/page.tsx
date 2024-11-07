"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
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
import { RegisterAccount } from "@/actions/Auth";
import Link from "next/link";
import Notofy from "@/components/shared/Notofy";
import axios from "axios";

const registerFormSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .min(6, { message: "Email must be at least 6 characters." }),
  password: z
    .string()
    .min(3, { message: "Password must be greater than 3 characters." }),
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

const Register = () => {
  const formMethods = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      first_name: "",
      last_name: "",
      github_url: "",
      linked_in_url: "",
      photo: "",
      resume: "",
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

  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    RegisterAccount(values);
    Notofy("Registedred the account");
  };

  return (
    <div className=" my-auto mt-6 w-full h-2/3 mx-auto py-7   ">
      {/* Use FormProvider to provide context to the form fields */}
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="space-y-8  w-2/3 mx-auto"
        >
          <div className="flex justify-between gap-6">
            <FormField
              control={formMethods.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-[#3087d8]">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black placeholder:text-stone-600"
                      placeholder="shadowshukla@gmail.com"
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
            <FormField
              control={formMethods.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-[#3087d8]">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black placeholder:text-stone-600 "
                      type="password"
                      placeholder="*****"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-black">
                    This is your password for login.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between gap-6">
            <FormField
              control={formMethods.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-[#3087d8]">First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black placeholder:text-stone-600 "
                      placeholder="Adi"
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
                      placeholder="Shukla"
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
          <div className="flex justify-between gap-6">
            <FormField
              control={formMethods.control}
              name="linked_in_url"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-[#3087d8]">LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black placeholder:text-stone-600 "
                      placeholder="https://linkedin.com"
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
                      placeholder="https://github.com"
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
                    placeholder="Aditay"
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
                <FormLabel className="text-[#3087d8]">Profile Photo</FormLabel>
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
                    placeholder="https://resume.com"
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
          <span className="text-black  mx-auto block my-3 text-lg">
            Already Have An Account?{" "}
            <Link href={"/login"} className=" text-[#3087d8] underline">
              Login
            </Link>
          </span>
        </form>
      </FormProvider>
    </div>
  );
};

export default Register;
