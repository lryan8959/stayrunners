"use client";

import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import axios from "axios";

const Page = () => {
  const [myRooms, setMyRooms] = useState([]);

  const getMyRooms = async () => {
    const res = await axios.get("http://194.163.45.154:3120/rooms", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });
    if (res?.data?.data) {
      setMyRooms(res.data.data);
    }
  };

  useEffect(() => {
    getMyRooms();
  }, []);

  return (
    <div className="bg-slate-50 grainy-light">
      <MaxWidthWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            margin: "16px 0px",
          }}
        >
          <div>
            <Link
              href="/localhost/room/add"
              className={buttonVariants({
                size: "sm",
                className: "sm:flex items-center gap-1",
              })}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Add Room
            </Link>
          </div>
        </div>
        <div className="card-container py-4">
          {myRooms?.length > 0 ? (
            myRooms.map((item) => (
              <div key={item?._id}>
                <Card>
                  <div>
                    <img
                      src={`http://194.163.45.154:3120/uploads/${item?.pic_urls[0]}`}
                      alt="room"
                      height={300}
                    />
                  </div>
                  <CardHeader>
                    <CardDescription>{item?.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p
                      className={`text-sm ${
                        item?.available ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item?.available ? "Available" : "Not Available"}
                    </p>
                    <div className="flex">
                      <p className="text-sm mr-2 text-gray-500">
                        Minimum price per night:
                      </p>
                      <p className="text-sm">{item?.min_price_per_night}</p>
                    </div>
                    <div className="flex">
                      <p className="text-sm mr-2 text-gray-500">
                        Payment Option:
                      </p>
                      <p className="text-sm">{item?.payment_option}</p>
                    </div>
                    <div className="flex">
                      <p className="text-sm mr-2 text-gray-500">City:</p>
                      <p className="text-sm">{item?.city?.city_name}</p>
                    </div>
                    <div className="flex">
                      <p className="text-sm mr-2 text-gray-500">Billing:</p>
                      <p className="text-sm">{item?.billing}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : (
            <p>Data not Found</p>
          )}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
