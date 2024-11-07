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
import { LoginAccount } from "@/actions/Auth";
import Link from "next/link";
import Notofy from "@/components/shared/Notofy";

const loginFormSchema = z.object({
  email: z.string().min(6, {
    message: "Email must be at least 6 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be greater than 3 characters.",
  }),
});

const Login = () => {
  const formMethods = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    LoginAccount(values);
    Notofy("LoggiedIn The Account")
  };

  return (
    <div className=" my-auto mt-6 w-full h-2/3 mx-auto">
      {/* Use FormProvider to provide context to the form fields */}
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="space-y-8 w-2/3 mx-auto"
        >
          <FormField
            control={formMethods.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#3087d8]">Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-black  "
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
              <FormItem>
                <FormLabel className="text-[#3087d8]">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="text-black  "
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
          <Button
            size={"lg"}
            type="submit"
            className="bg-[#3087d8] hover:bg-white hover:text-[#3087d8] 
             text-white px-6 py-3 rounded-full"
          >
            <span className="text-xl font-bold ">Submit</span>
          </Button>
          <span className="text-black  mx-auto block my-3 text-lg">
            Don{"'"}t Have An Account?{" "}
            <Link href={"/register"} className=" text-[#3087d8] underline">
              Register
            </Link>
          </span>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
