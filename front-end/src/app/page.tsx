"use client";

import React, { useState } from "react";
import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import { Reviews } from "@/components/Reviews";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatPrice } from "@/lib/utils";
import { RadioGroup } from "@headlessui/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check, Star, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { BASE_PRICE } from "@/config/products";
import { FINISHES, MODELS, MATERIALS } from "@/validators/option-validator";

export default function Home() {
  const [options, setOptions] = useState<{
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const isPending = false;

  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-1 xl:pt-1 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-2xl md:text-3xl lg:text-4xl">
                Book a{" "}
                <span className="bg-green-600 px-2 text-white">Room</span>{" "}
                through LAST MINUTE LOCAL HOST
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Discover your ideal stay with our easy room booking service.{" "}
                <span className="font-semibold">Get the best rates </span>
                and instant confirmation for your perfect getaway.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Air Conditioning
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />5 year
                    In-Room Safe
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Private Bathroom with Toiletries
                  </li>
                </div>
              </ul>

              <div className="mt-20 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex flex-col justify-between items-center md:items-start">
                  <p className="mb-4">Have rooms to sell last minute?</p>
                  <Link
                    href="/localhost/signup"
                    className={buttonVariants({
                      size: "sm",
                      className: "sm:flex items-center gap-1",
                    })}
                  >
                    Become a local host
                  </Link>

                  <p className="text-xs mt-4">
                    A rented space is better than an empty space
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative w-full md:max-w-xl">
              <div className="w-full col-span-full lg:col-span-1 flex flex-col bg-white shadow-md">
                <ScrollArea className="relative flex-1 overflow-auto">
                  <div
                    aria-hidden="true"
                    className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
                  />

                  <div className="px-8 pb-12 pt-8">
                    <h2 className="tracking-tight font-bold text-3xl">
                      Bid for Room
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

                        <div className="flex gap-2">
                          <div className="relative flex flex-col gap-1 w-full">
                            <Label>How many beds?</Label>
                            <Input />
                          </div>

                          <div className="relative flex flex-col gap-1 w-full">
                            <Label>How many people?</Label>
                            <Input />
                          </div>
                        </div>

                        <div className="relative flex flex-col gap-1 w-full">
                          <Label>How many nights?</Label>
                          <Input />
                        </div>

                        <div className="relative flex flex-col gap-1 w-full">
                          <Label>Price willing to pay?</Label>
                          <Input />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                <div className="w-full px-8 h-16 bg-white">
                  <div className="h-px w-full bg-zinc-200" />
                  <div className="w-full h-full flex justify-end items-center">
                    <div className="w-full flex gap-6 items-center">
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
                        className="w-full"
                      >
                        Create a bid
                        <ArrowRight className="h-4 w-4 ml-1.5 inline" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
