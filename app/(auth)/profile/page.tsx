"use client";
import { useAuth } from "@/components/provider/user-provider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaClipboard, FaEdit, FaGithub, FaLinkedin } from "react-icons/fa";
import { LogoutAccount } from "@/actions/Auth";
import Notofy from "@/components/shared/Notofy";

const Profile = () => {
  const { user, loading } = useAuth();
  const [mounted, setmounted] = useState(false);
  useEffect(() => {
    setmounted(true);
  }, []);

  const UrlCopied = (JobUrl: string) => {
    navigator.clipboard.writeText(JobUrl);
    Notofy("Url Copied");
  };

  if (!mounted) {
    return null;
  }
  return (
    <div className="flex h-[90vh] mt-6  py-4  flex-col gap-3 text-black items-center sm:w-3/4 w-full mx-auto justify-start py-20 px-3">
      <div className="sm:w-[200px] sm:h-[200px] w-[100px] h-[100px] rounded-full relative">
        <Image
          src={user?.photo ? user?.photo : "/Avatar.png"}
          alt="No IMage"
          className="w-full h-full rounded-full object-cover"
          width={"200"}
          height={"200"}
        />
      </div>
      <div className="flex w-full items-center justify-center ">
        <div className="flex flex-col gap-1 items-center justify-center">
          <span className="sm:text-6xl text-4xl capitalize font-bold text-[#3087d8] ">
            {user?.username}
          </span>
          <span className="text-xs sm:text-base text-stone-700">
            {user?.email}
          </span>
        </div>
      </div>
      <div className="flex w-full text-black gap-3 items-center ">
        <span className="text-lg font-semibold">{user?.first_name}</span>
        <span className="text-lg font-semibold">{user?.last_name}</span>
      </div>
      <div className="flex w-full text-black gap-3 items-center ">
        {user?.linked_in_url && (
          <Link href={user?.linked_in_url} target="_blank">
            <Button className="sm:px-8 px-4 flex bg-[#3087d8] duration-700 text-white hover:text-[#3087d8] hover:bg-white gap-2 items-center py-3 sm:py-6 drop-shadow-md rounded-full ">
              {" "}
              <span className="sm:text-xl text-base font-semibold">
                LinkedIn
              </span>
              <FaLinkedin className="sm:text-xl text-base font-semibold" />
            </Button>
          </Link>
        )}
        {user?.github_url && (
          <Link href={user?.github_url} target="_blank">
            <Button
              className="sm:px-8 px-4  bg-black duration-700 hover:bg-white hover:text-black
             text-white flex gap-2 items-center drop-shadow-md py-3 sm:py-6 rounded-full "
            >
              <span className="text-base sm:text-xl font-semibold">
                Github{" "}
              </span>
              <FaGithub
                size={20}
                className="text-base sm:text-xl font-semibold"
              />
            </Button>
          </Link>
        )}
      </div>

      <div className="flex w-full mt-4 text-black gap-3 items-center ">
        {user?.resume && (
          <div className="dark:bg-slate-900 bg-slate-50/10 text-white px-5 py-2 rounded-md flex gap-2 items-center">
            <span className="text-base ">
              {user.resume?.length > 30
                ? user.resume.slice(0, 29) + "..."
                : user?.resume}
            </span>
            <FaClipboard
              className="text-white text-base cursor-pointer"
              onClick={() => {
                if (user.resume) {
                  UrlCopied(user.resume);
                }
              }}
            />
          </div>
        )}
      </div>

      <div className="flex w-full text-black gap-3 items-center mt-6 ">
        <Button
          variant={"default"}
          className="bg-[#3087d8] text-white hover:text-[#3087d8] sm:px-8 px-4 sm:py-6 py-3 rounded-full"
          onClick={() => {
            LogoutAccount();
            Notofy("Logged Out")
          }}
        >
          <span className="text-base sm:text-lg  font-semibold">Logout</span>
        </Button>
        <Link href={"/profile/update"}>
          <Button
            className="sm:px-8 px-4 bg-green-600 duration-700 hover:bg-green-600/70 hover:text-white
             text-white flex gap-2 items-center drop-shadow-md sm:py-6 py-3 rounded-full "
          >
            <span className="text-base sm:text-lg font-semibold">Update </span>
            <FaEdit className="text-base " />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
