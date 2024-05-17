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
              <h2 className="tracking-tight font-bold text-3xl">
                Become a Last Minute Local Host
              </h2>

              <div className="w-full h-px bg-zinc-200 my-6" />

              <div className="relative mt-4 h-full flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                  <div className="relative flex flex-col gap-1 w-full">
                    <Label>Name</Label>
                    <Input />
                  </div>

                  <div className="relative flex flex-col gap-1 w-full">
                    <Label>Email</Label>
                    <Input />
                  </div>

                  <div className="relative flex flex-col gap-1 w-full">
                    <Label>City</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {options.model.label}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {MODELS.options.map((model) => (
                          <DropdownMenuItem
                            key={model.label}
                            className={cn(
                              "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                              {
                                "bg-zinc-100":
                                  model.label === options.model.label,
                              }
                            )}
                            onClick={() => {
                              setOptions((prev) => ({ ...prev, model }));
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                model.label === options.model.label
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {model.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                <Link href="/localhost/verify">
                  <Button
                    disabled={isPending}
                    onClick={() => console.log("click")}
                    size="sm"
                    className="text-sm"
                  >
                    Submit for Verification Email
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <p className="text-xs mt-4">
                A rented space is better than an empty space
              </p>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
