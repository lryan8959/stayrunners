"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import axios, { AxiosResponse } from "axios";
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
import {
  ArrowRight,
  Check,
  Star,
  ChevronsUpDown,
  ClipboardType,
} from "lucide-react";
import { isValidName, isValidEmail } from "../../../utils/validation";
import { setUserDataInLocalStorage } from "../../../utils/storage";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FINISHES, CITIES, MATERIALS } from "@/validators/option-validator";

const Page = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();
  const [localhost, setLocalHost] = useState({
    name: "",
    email: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    city: "",
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

  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalHost({ ...localhost, [name]: value });
  };

  const handleClick = async () => {
    setLocalHost({ ...localhost, city: options.city.value });
    setErrors({
      name: "",
      email: "",
      city: "",
    });

    let hasError = false;

    if (!isValidName(localhost?.name)) {
      toast.error("Please enter a valid name");
      setErrors({
        ...errors,
        name: "Please enter a valid name",
      });
      hasError = true;
    } else if (!isValidEmail(localhost?.email)) {
      toast.error("Please enter a valid email");
      setErrors({
        ...errors,
        email: "Please enter a valid email",
      });
      hasError = true;
    } else if (
      localhost?.city === "" ||
      localhost?.city === undefined ||
      localhost?.city === null
    ) {
      toast.error("Please select a valid city");
      setErrors({
        ...errors,
        city: "Please select a valid city",
      });
      hasError = true;
    } else {
      try {
        const res: AxiosResponse = await axios.post(
          "http://194.163.45.154:3120/localhosts",
          localhost
        );
        if (res.status === 201) {
          const userData = {
            name: localhost?.name,
            email: localhost?.email,
            city: localhost?.city,
            id: res?.data?.data?._id,
            code_verified: res?.data?.data?.code_verified,
            password: "",
          };
          setUserDataInLocalStorage(userData);
          if (!res?.data?.code_verified) {
            router.push("/localhost/verify");
          } else {
            toast.success("You are already verified");
            router.push("/login");
          }
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
                    <Label className={`${errors?.name && "text-red-600"}`}>
                      Name
                    </Label>
                    <Input
                      name="name"
                      className={`${errors?.name && "border-red-600"}`}
                      type="text"
                      value={localhost?.name}
                      onChange={handleChange}
                    />
                    {errors?.name && (
                      <p className="text-red-600 text-xs italic">
                        {errors?.name}
                      </p>
                    )}
                  </div>

                  <div className="relative flex flex-col gap-1 w-full">
                    <Label className={`${errors?.email && "text-red-600"}`}>
                      Email
                    </Label>
                    <Input
                      name="email"
                      className={`${errors?.email && "text-red-600"}`}
                      type="email"
                      value={localhost?.email}
                      onChange={handleChange}
                    />
                    {errors?.email && (
                      <p className="text-red-600 text-xs italic">
                        {errors?.email}
                      </p>
                    )}
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
                  onClick={handleClick}
                  size="sm"
                  className="text-sm"
                >
                  Submit for Verification Email
                </Button>
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
