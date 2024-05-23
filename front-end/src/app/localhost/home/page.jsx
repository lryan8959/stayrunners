import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

const Page = () => {
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
        <div className="card-container">
          <div>
            <Card>
              <div>
                <img
                  src={"/images/aesthetic-room-decor.jpg"}
                  alt="room"
                  height={300}
                />
              </div>
              <CardHeader>
                <CardDescription>Room Description</CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm">Avail/ Not Available</p>
                <p className="text-sm">Minimum Price per night</p>
                <p className="text-sm">Payment Options</p>
                <p className="text-sm">City</p>
                <p className="text-sm">Billing</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <div>
                <img
                  src={"/images/aesthetic-room-decor.jpg"}
                  alt="room"
                  height={300}
                />
              </div>
              <CardHeader>
                <CardDescription>Room Description</CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm">Avail/ Not Available</p>
                <p className="text-sm">Minimum Price per night</p>
                <p className="text-sm">Payment Options</p>
                <p className="text-sm">City</p>
                <p className="text-sm">Billing</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <div>
                <img
                  src={"/images/aesthetic-room-decor.jpg"}
                  alt="room"
                  height={300}
                />
              </div>
              <CardHeader>
                <CardDescription>Room Description</CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm">Avail/ Not Available</p>
                <p className="text-sm">Minimum Price per night</p>
                <p className="text-sm">Payment Options</p>
                <p className="text-sm">City</p>
                <p className="text-sm">Billing</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
