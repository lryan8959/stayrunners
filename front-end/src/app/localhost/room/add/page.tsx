"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CITIES, PAYMENT_OPTIONS } from "@/validators/option-validator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { isValidPrice } from "@/utils/validation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IFormInput {
  min_price_per_night: number;
  payment_option: number;
  pictures: FileList;
}

const Page: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const [images, setImages] = useState<string[]>([]);

  const [roomData, setRoomData] = useState({
    min_price_per_night: "",
    payment_option: "",
    city: "",
    billing: "",
    description: "",
  });

  const [dataErrors, setDataErrors] = useState({
    min_price_per_night: "",
    payment_option: "",
    city: "",
    billing: "",
    description: "",
  });

  const [options, setOptions] = useState<{
    city: (typeof CITIES.options)[number];
    payment_option: (typeof PAYMENT_OPTIONS.options)[number];
  }>({
    city: CITIES.options[0],
    payment_option: PAYMENT_OPTIONS.options[0],
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setRoomData(() => {
      return {
        min_price_per_night: roomData.min_price_per_night,
        payment_option: options.payment_option.value,
        city: options.city.value,
        billing: roomData.billing,
        description: roomData.description,
      };
    });
    setDataErrors(() => {
      return {
        min_price_per_night: roomData.min_price_per_night
          ? ""
          : "Min Price per Night is required",
        payment_option: roomData.payment_option
          ? ""
          : "Payment option is required",
        city: roomData.city ? "" : "City is required",
        billing: roomData.billing ? "" : "Billing is required",
        description: roomData.description ? "" : "Description is required",
      };
    });

    var formData = new FormData();
    formData.append("min_price_per_night", roomData.min_price_per_night);
    formData.append("payment_option", roomData.payment_option);
    formData.append("city", roomData.city);
    formData.append("billing", roomData.billing);
    formData.append("description", roomData.description);
    Array.from(data.pictures).forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res: AxiosResponse = await axios.post(
        "http://194.163.45.154:3120/rooms",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      if (res.status === 201) {
        toast.success("Room has been added successfully");
        router.push("/localhost/home");
      }
    } catch (err: any) {
      const errMsg = Array.isArray(err.response.data.message)
        ? err.response.data.message[0]
        : err.response.data.message;
      toast.success(errMsg);
    }
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "min_price_per_night" && !isValidPrice(value) && value !== "")
      return;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => prevImages.concat(fileArray));
      Array.from(files).map((file) => URL.revokeObjectURL(file.toString()));
    }
  };

  return (
    <div className="bg-slate-50 grainy-light">
      <MaxWidthWrapper>
        <div className="w-full flex justify-center py-4">
          <div className="w-full md:max-w-xl col-span-full lg:col-span-1 flex flex-col bg-white shadow-md rounded-md">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-8 pb-12 pt-12">
                <h2 className="tracking-tight font-bold text-3xl">Add Room</h2>

                <div className="w-full h-px bg-zinc-200 my-6" />

                <div className="relative mt-4 h-full flex flex-col justify-between">
                  <div className="flex flex-col gap-6">
                    <div className="relative flex flex-col gap-1 w-full">
                      <Label
                        className={`${
                          dataErrors?.min_price_per_night && "text-red-600"
                        }`}
                      >
                        Min Price per Night
                      </Label>
                      <Input
                        name="min_price_per_night"
                        className={`${
                          dataErrors?.min_price_per_night && "border-red-600"
                        }`}
                        type="number"
                        value={roomData?.min_price_per_night}
                        onChange={handleChange}
                      />
                      {dataErrors?.min_price_per_night && (
                        <p className="text-red-600 text-xs italic">
                          {dataErrors?.min_price_per_night}
                        </p>
                      )}
                    </div>

                    <div className="relative flex flex-col gap-1 w-full">
                      <Label
                        className={`${
                          dataErrors?.payment_option && "text-red-600"
                        }`}
                      >
                        Payment Option
                      </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                          >
                            {options.payment_option.label}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                          {PAYMENT_OPTIONS.options.map((payment_option) => (
                            <DropdownMenuItem
                              key={payment_option.label}
                              className={cn(
                                "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                                {
                                  "bg-zinc-100":
                                    payment_option.label ===
                                    options.payment_option.label,
                                }
                              )}
                              onClick={() => {
                                setOptions((prev) => ({
                                  ...prev,
                                  payment_option,
                                }));
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  payment_option.label ===
                                    options.payment_option.label
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {payment_option.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      {dataErrors?.payment_option && (
                        <p className="text-red-600 text-xs italic">
                          {dataErrors?.payment_option}
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

                    <div className="relative flex flex-col gap-1 w-full">
                      <Label
                        className={`${dataErrors?.city && "text-red-600"}`}
                      >
                        Billing
                      </Label>
                      <Input
                        name="billing"
                        className={`${dataErrors?.billing && "border-red-600"}`}
                        type="text"
                        value={roomData?.billing}
                        onChange={handleChange}
                      />
                      {dataErrors?.billing && (
                        <p className="text-red-600 text-xs italic">
                          {dataErrors?.billing}
                        </p>
                      )}
                    </div>

                    <div className="relative flex flex-col gap-1 w-full">
                      <Label
                        className={`${
                          dataErrors?.description && "text-red-600"
                        }`}
                      >
                        Description of Room
                      </Label>
                      <Input
                        name="description"
                        className={`${
                          dataErrors?.description && "border-red-600"
                        }`}
                        type="text"
                        value={roomData?.description}
                        onChange={handleChange}
                      />
                      {dataErrors?.description && (
                        <p className="text-red-600 text-xs italic">
                          {dataErrors?.description}
                        </p>
                      )}
                    </div>

                    <div className="relative flex flex-col gap-1 w-full">
                      <div>
                        <Label>Upload Pictures</Label>
                        <Input
                          id="pictures"
                          {...register("pictures", {
                            required: "Pictures are required",
                          })}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                        />
                        {errors.pictures && (
                          <p className="text-red-600 text-xs italic">
                            {errors.pictures.message}
                          </p>
                        )}
                      </div>

                      <div className="image-preview image-container">
                        {images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Uploaded Preview ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full px-8 bg-white pb-12 rounded-md">
                <div className="w-full h-full flex justify-end items-center">
                  <div className="w-full flex justify-center gap-6 items-center">
                    <Button type="submit" size="sm" className="text-sm px-10">
                      save
                    </Button>
                    <Link href={"/localhost/home"}>
                      <Button
                        size="sm"
                        className="text-sm px-10 bg-gray-400 hover:bg-red-600"
                      >
                        cancel
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
