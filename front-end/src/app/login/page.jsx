"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check, Star, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FINISHES, MODELS, MATERIALS } from "@/validators/option-validator";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();

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
              <h2 className="tracking-tight font-bold text-3xl">
                Login Last Minute Local Host
              </h2>

              <div className="w-full h-px bg-zinc-200 my-6" />

              <div className="relative mt-4 h-full flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                  <div className="relative flex flex-col gap-1 w-full">
                    <Label>Email</Label>
                    <Input />
                  </div>

                  <div className="relative flex flex-col gap-1 w-full">
                    <Label>Password</Label>
                    <Input type="password" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="w-full px-8 bg-white pb-12 rounded-md">
            <div className="w-full h-full flex justify-end items-center">
              <div className="w-full flex justify-center gap-6 items-center">
                {/* <p className="font-medium whitespace-nowrap">
              {formatPrice(
                (BASE_PRICE +
                  options.finish.price +
                  options.material.price) /
                  100
              )}
            </p> */}
                <Button
                  disabled={isPending}
                  onClick={() => console.log("click")}
                  size="sm"
                  className="text-sm px-10"
                >
                  Login
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center py-2">
              <p className="text-sm mr-2">Forgot password? </p>
              <p className="text-sm text-blue-700 cursor-pointer underline">
                Click here
              </p>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
