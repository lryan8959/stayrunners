"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Page = () => {
  const { toast } = useToast();
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();

  const [options, setOptions] = useState<{
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

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
                  <p className="text-sm text-gray-500">Suniel Shetty</p>
                </div>
                <div className="border rounded-md p-4 mb-6">
                  <h3 className="text-sm font-bold">Email</h3>
                  <p className="text-sm text-gray-500">shetty33@gmail.com</p>
                </div>
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-bold">Password</h3>
                  <p className="text-sm text-gray-500">abc@123</p>
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
                <p className="text-sm text-gray-500 mb-6">Description of the Room</p>
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
