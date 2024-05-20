"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { toast } from "react-toastify";
import { Copy } from "lucide-react";
import { CopyCheck } from "lucide-react";
import {
  getUserDataFromLocalStorage,
  setUserDataInLocalStorage,
} from "../../../utils/storage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const Page = () => {
  const userData = getUserDataFromLocalStorage();
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();
  const [passwordCopied, setPasswordCopied] = useState(false);

  const handleCopy = (password: string) => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        setPasswordCopied(true);
        toast.success("Password copied to clipboard! Please save it securely.");
      })
      .catch(() => {
        toast.error("Failed to copy the password.");
      });
  };

  const [isPending, startTransition] = useTransition();

  return (
    <MaxWidthWrapper>
      <div className="w-full flex justify-center py-4">
        <div className="w-full md:max-w-xl col-span-full lg:col-span-1 flex flex-col bg-white shadow-md rounded-md">
          <ScrollArea className="relative flex-1 overflow-auto">
            <div
              aria-hidden="true"
              className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
            />

            <div className="px-8 pb-12 pt-12">
              <h2 className="tracking-tight font-bold text-xl">
                Welcome to Last Minute Local Host
              </h2>

              <div className="w-full h-px bg-zinc-200 my-6" />

              <div className="relative mt-4 h-full flex flex-col justify-between">
                <div className="border rounded-md p-4 mb-6">
                  <h3 className="text-sm font-bold">Name</h3>
                  <p className="text-sm text-gray-500">{userData?.name}</p>
                </div>
                <div className="border rounded-md p-4 mb-6">
                  <h3 className="text-sm font-bold">Email</h3>
                  <p className="text-sm text-gray-500">{userData?.email}</p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-bold">Password</h3>
                  <div className="flex text-gray-500 items-center">
                    <p className="text-sm mr-4">{userData?.password} </p>
                    {userData?.password && (
                      <button
                        style={{ fontSize: "5px" }}
                        onClick={() => handleCopy(userData?.password || "")}
                      >
                        {passwordCopied ? (
                          <CopyCheck
                            style={{
                              border: "1px solid hsl(142.1 76.2% 36.3%)",
                              padding: "2px",
                              borderRadius: "2px",
                            }}
                            size={20}
                          />
                        ) : (
                          <Copy size={18} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="w-full px-8 bg-white pb-6 rounded-md">
            <div className="w-full h-full flex justify-end items-center">
              <div className="w-full gap-6 items-center">
                {/* <p className="font-medium whitespace-nowrap">
              {formatPrice(
                (BASE_PRICE +
                  options.finish.price +
                  options.material.price) /
                  100
              )}
            </p> */}
                <p className="text-sm text-gray-500">Login to Upload Picture</p>
                <p className="text-sm text-gray-500 mb-6">
                  Description of the Room
                </p>
                <Button
                  disabled={isPending}
                  onClick={() => console.log("click")}
                  size="sm"
                  className="text-sm px-10"
                >
                  Login
                </Button>
                <p className="text-sm text-gray-500 mt-6">
                  You will get notifications To your email address Of any demand
                  for your room
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
