"use client";
import { useAuth, UserProps } from "@/components/provider/user-provider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowCircleRight, FaSpinner } from "react-icons/fa";
export default function Home() {
  const { user, loading }: { user: UserProps | null; loading: Boolean } =
    useAuth();
  return (
    <main className="flex px-4 sm:flex-row flex-col sm:gap-4 gap-10  py-8 justify-between   h-1/2 my-6 mt-20 items-center  w-[96%] mx-auto">
      <div className="flex w-full  h-full    flex-col gap-3 flex-1   justify-between  items-start sm:items-start">
        <h1 className="sm:text-6xl text-4xl text-black font-bold  ">Keep, Track</h1>
        <h1 className="sm:text-6xl text-4xl text-black font-bold  ">
          of the <span className="text-[#3087d8]">Jobs</span>
        </h1>
        <h1 className="sm:text-6xl text-4xl text-black font-bold  ">
          And <span className="text-[#3087d8]">Internships</span>
        </h1>
        <h1 className="sm:text-6xl text-4xl text-black font-bold  ">You Applied.</h1>
        {loading ? (
          <>
            <Link href={"/register"}>
              <Button
                className=" bg-white hover:bg-[#3087d8] text-[#3087d8] hover:text-white mt-4 rounded-full  px-10 py-8 "
                size={"lg"}
              >
                <FaSpinner className=" text-2xl font-bold animate-spin " />
              </Button>
            </Link>
          </>
        ) : (
          <>
            {user ? (
              <>
                {" "}
                <Link href={"/AllJobs"}>
                  <Button
                    className=" bg-white hover:bg-[#3087d8] text-[#3087d8] hover:text-white mt-4 
                    rounded-full  px-10 py-8 "
                    size={"lg"}
                  >
                    <span className=" text-2xl font-bold  flex gap-3 items-center">
                      Jobs{" "}
                      <FaArrowCircleRight size={"64px"} className="text-3xl " />
                    </span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link href={"/register"}>
                  <Button
                    className=" bg-white hover:bg-[#3087d8]
                     text-[#3087d8] hover:text-white mt-4 rounded-full  px-10 py-8 "
                    size={"lg"}
                  >
                    <span className=" text-2xl font-bold ">
                      Create Your Account
                    </span>
                  </Button>
                </Link>
              </>
            )}
          </>
        )}
      </div>
      <div className=" flex-[0.7] items-center justify-center flex  relative z-10  min-h-[300px]">
        <Image
          width={"300"}
          height={"300"}
          className="w-full z-30 h-full object-cover cursor-pointer"
          src={"/Job.png"}
          alt="No Image"
        />
      </div>
    </main>
  );
}
