"use client";

import React from "react";
import { useAuth, UserProps } from "../provider/user-provider";
import { Button } from "../ui/button";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { LogoutAccount } from "@/actions/Auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Notofy from "./Notofy";

const Navbar = () => {
  const { user, loading }: { user: UserProps | null; loading: boolean } =
    useAuth();
  return (
    <nav
      className="sm:w-[96%] w-full mx-auto border-b text-black border-stone-800
     flex justify-between items-center  py-4 sm:px-6 px-3"
    >
      <Link href={"/"}>
        <span className="sm:text-4xl text-2xl font-bold text-[#3087d8]">
          Tracky
        </span>
      </Link>
      {loading ? (
        <Button variant={"ghost"}>
          <FaSpinner className="animate-spin text-xl"></FaSpinner>
        </Button>
      ) : (
        <>
          {user ? (
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center">
                <Link className="flex gap-3 items-center" href={"/profile"}>
                  <h1 className="text-base sm:text-xl font-bold">
                    Hii, {user?.username}
                  </h1>
                  {user.photo && (
                    <Avatar className="sm:h-16 hidden sm:block sm:w-16 h-8 w-8 cursor-pointer">
                      <AvatarImage src={user.photo} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  )}
                </Link>
              </div>

              <Button
                variant={"default"}
                className="bg-[#3087d8] text-white hover:text-[#3087d8] px-3 py-2 sm:px-7 sm:py-5 rounded-full"
                onClick={() => {
                  LogoutAccount();
                  Notofy("Logout");
                }}
              >
                <span className="text-base sm:text-lg  font-semibold">
                  Logout
                </span>
              </Button>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link href={"/login"}>
                <Button
                  className="text-base hover:bg-[#3087d8] border-none rounded-3xl"
                  size={"lg"}
                  variant={"default"}
                >
                  <span className=" text-base font-semibold">Login</span>
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button
                  className="text-base hover:bg-[#3087d8] border-none rounded-3xl"
                  size={"lg"}
                  variant={"secondary"}
                >
                  <span className=" text-base font-semibold">Register</span>
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
