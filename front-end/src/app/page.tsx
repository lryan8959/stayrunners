"use client";

import React, { useState } from "react";
import { Icons } from "@/components/Icons";
import axios, { AxiosResponse } from "axios";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatPrice } from "@/lib/utils";
import { RadioGroup } from "@headlessui/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { FINISHES, CITIES, MATERIALS } from "@/validators/option-validator";
import {
  isEmpty,
  isNumber,
  isValidEmail,
  isValidName,
  isValidPrice,
} from "@/utils/validation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [bidData, setBidData] = useState({
    name: "",
    email: "",
    city: "",
    beds: "",
    people: "",
    nights: "",
    price_willing_to_pay: "",
    special_instructions: "",
  });

  const [dataErrors, setDataErrors] = useState({
    name: "",
    email: "",
    city: "",
    beds: "",
    people: "",
    nights: "",
    price_willing_to_pay: "",
    special_instructions: "",
  });

  const [options, setOptions] = useState<{
    city: (typeof CITIES.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    city: CITIES.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const isPending = false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "price_willing_to_pay" && !isValidPrice(value) && value !== "")
      return;
    if (
      (name === "beds" || name === "people" || name === "nights") &&
      !isNumber(value) &&
      value !== ""
    )
      return;
    setBidData({ ...bidData, [name]: value });
  };

  const handleClick = async () => {
    setBidData(() => {
      return {
        ...bidData,
        city: options.city.value,
      };
    });
    setDataErrors(() => {
      return {
        name: "",
        email: "",
        city: "",
        beds: "",
        people: "",
        nights: "",
        price_willing_to_pay: "",
        special_instructions: "",
      };
    });

    let hasError = false;

    if (!isValidName(bidData?.name)) {
      toast.error("Please enter a valid name");
      setDataErrors(() => {
        return {
          ...dataErrors,
          name: "Please enter a valid name",
        };
      });
      hasError = true;
    }

    if (!isValidName(bidData?.name)) {
      toast.error("Please enter a valid name");
      setDataErrors(() => {
        return {
          ...dataErrors,
          name: "Please enter a valid name",
        };
      });
      hasError = true;
    }

    if (!isValidEmail(bidData?.email)) {
      toast.error("Please enter a valid email");
      setDataErrors(() => {
        return {
          ...dataErrors,
          email: "Please enter a valid email",
        };
      });
      hasError = true;
    }
    if (isEmpty(bidData?.city)) {
      toast.error("Please select a city");
      setDataErrors(() => {
        return {
          ...dataErrors,
          city: "Please select a city",
        };
      });
      hasError = true;
    }

    if (isEmpty(bidData?.beds)) {
      toast.error("Please enter a valid no of beds");
      setDataErrors(() => {
        return {
          ...dataErrors,
          beds: "Please enter a valid no of beds",
        };
      });
      hasError = true;
    }

    if (isEmpty(bidData?.people)) {
      toast.error("Please enter a valid no of people");
      setDataErrors(() => {
        return {
          ...dataErrors,
          people: "Please enter a valid no of people",
        };
      });
      hasError = true;
    }

    if (isEmpty(bidData?.nights)) {
      toast.error("Please enter a valid no of nights");
      setDataErrors(() => {
        return {
          ...dataErrors,
          nights: "Please enter a valid no of nights",
        };
      });
      hasError = true;
    }

    if (isEmpty(bidData?.price_willing_to_pay)) {
      toast.error("Please enter a valid price");
      setDataErrors(() => {
        return {
          ...dataErrors,
          price_willing_to_pay: "Please enter a valid price",
        };
      });
      hasError = true;
    }

    if (isEmpty(bidData?.special_instructions)) {
      toast.error("Please enter special instructions");
      setDataErrors(() => {
        return {
          ...dataErrors,
          special_instructions: "Please enter special instructions",
        };
      });
      hasError = true;
    } else {
      try {
        const res: AxiosResponse = await axios.post(
          "http://194.163.45.154:3120/customers/create-bid",
          bidData
        );
        if (res.status === 201) {
          toast.success("Bid has been created successfully");
          router.push("/order/success");
        }
      } catch (err: any) {
        const errMsg = Array.isArray(err.response.data.message)
          ? err.response.data.message[0]
          : err.response.data.message;
        toast.error(errMsg);
      }
    }
  };

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
                          <Label
                            className={`${dataErrors?.name && "text-red-600"}`}
                          >
                            Name
                          </Label>
                          <Input
                            name="name"
                            className={`${
                              dataErrors?.name && "border-red-600"
                            }`}
                            type="text"
                            value={bidData?.name}
                            onChange={handleChange}
                          />
                          {dataErrors?.name && (
                            <p className="text-red-600 text-xs italic">
                              {dataErrors?.name}
                            </p>
                          )}
                        </div>

                        <div className="relative flex flex-col gap-1 w-full">
                          <Label
                            className={`${dataErrors?.email && "text-red-600"}`}
                          >
                            Email
                          </Label>
                          <Input
                            name="email"
                            className={`${
                              dataErrors?.email && "border-red-600"
                            }`}
                            type="email"
                            value={bidData?.email}
                            onChange={handleChange}
                          />
                          {dataErrors?.email && (
                            <p className="text-red-600 text-xs italic">
                              {dataErrors?.email}
                            </p>
                          )}
                        </div>

                        <div className="relative flex flex-col gap-1 w-full">
                          <Label
                            className={`${dataErrors?.city && "text-red-600"}`}
                          >
                            City
                          </Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between"
                              >
                                {options.city.label}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {CITIES.options.map((city) => (
                                <DropdownMenuItem
                                  key={city.label}
                                  className={cn(
                                    "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                                    {
                                      "bg-zinc-100":
                                        city.label === options.city.label,
                                    }
                                  )}
                                  onClick={() => {
                                    setOptions((prev) => ({ ...prev, city }));
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      city.label === options.city.label
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {city.label}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                          {dataErrors?.city && (
                            <p className="text-red-600 text-xs italic">
                              {dataErrors?.city}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <div className="relative flex flex-col gap-1 w-full">
                            <Label
                              className={`${
                                dataErrors?.beds && "text-red-600"
                              }`}
                            >
                              How many beds?
                            </Label>
                            <Input
                              name="beds"
                              className={`${
                                dataErrors?.beds && "border-red-600"
                              }`}
                              type="beds"
                              value={bidData?.beds}
                              onChange={handleChange}
                            />
                            {dataErrors?.beds && (
                              <p className="text-red-600 text-xs italic">
                                {dataErrors?.beds}
                              </p>
                            )}
                          </div>

                          <div className="relative flex flex-col gap-1 w-full">
                            <Label
                              className={`${
                                dataErrors?.people && "text-red-600"
                              }`}
                            >
                              How many people?
                            </Label>
                            <Input
                              name="people"
                              className={`${
                                dataErrors?.people && "border-red-600"
                              }`}
                              type="people"
                              value={bidData?.people}
                              onChange={handleChange}
                            />
                            {dataErrors?.people && (
                              <p className="text-red-600 text-xs italic">
                                {dataErrors?.people}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="relative flex flex-col gap-1 w-full">
                          <Label
                            className={`${
                              dataErrors?.nights && "text-red-600"
                            }`}
                          >
                            How many nights?
                          </Label>
                          <Input
                            name="nights"
                            className={`${
                              dataErrors?.nights && "border-red-600"
                            }`}
                            type="nights"
                            value={bidData?.nights}
                            onChange={handleChange}
                          />
                          {dataErrors?.nights && (
                            <p className="text-red-600 text-xs italic">
                              {dataErrors?.nights}
                            </p>
                          )}
                        </div>

                        <div className="relative flex flex-col gap-1 w-full">
                          <Label
                            className={`${
                              dataErrors?.price_willing_to_pay && "text-red-600"
                            }`}
                          >
                            Price willing to pay?
                          </Label>
                          <Input
                            name="price_willing_to_pay"
                            className={`${
                              dataErrors?.price_willing_to_pay &&
                              "border-red-600"
                            }`}
                            type="price_willing_to_pay"
                            value={bidData?.price_willing_to_pay}
                            onChange={handleChange}
                          />
                          {dataErrors?.price_willing_to_pay && (
                            <p className="text-red-600 text-xs italic">
                              {dataErrors?.price_willing_to_pay}
                            </p>
                          )}
                        </div>

                        <div className="relative flex flex-col gap-1 w-full">
                          <Label
                            className={`${
                              dataErrors?.special_instructions && "text-red-600"
                            }`}
                          >
                            Special Instructions of Amenities
                          </Label>
                          <Input
                            name="special_instructions"
                            className={`${
                              dataErrors?.special_instructions &&
                              "border-red-600"
                            }`}
                            type="special_instructions"
                            value={bidData?.special_instructions}
                            onChange={handleChange}
                          />
                          {dataErrors?.special_instructions && (
                            <p className="text-red-600 text-xs italic">
                              {dataErrors?.special_instructions}
                            </p>
                          )}
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
                        onClick={handleClick}
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
