"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { getTokenn } from "@/utils/storage";
import { useRouter } from "next/navigation";

const  Navbar = async () => {
  const router = useRouter();
  let IsUser;
  //console.log("win",window);
  const ttoken = getTokenn();
  console.log("get token from Storage: ", ttoken);
  
 // const ttoken = null || undefined;
//const ttoken ="shauguajsckajhiubdkjsdjbc";
 // console.log("token get from Local storage",ttoken);
  if(ttoken){
    IsUser = true;
    router.push("/localhost/home");
  }
  else{
    IsUser = false;

  }
  //console.log("Is user in navbar ",IsUser);
  
  // const token = localStorage.getItem("jwtToken");
  // console.log("tokeen",token);
  
  // if (!token) {
  //   user = false;
  // }
  // else{
  //   user =true;
  // }
//console.log("user t/f",user);

  const isAdmin = false;

  return (
    <nav className="sticky z-[100] h-20 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-20 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold text-xl">
            Last Minute<span className="text-green-600 ml-2">Booking</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {IsUser ? (
              <>
                <Link
                  href="/logout"
                  className={buttonVariants({
                    size: "lg",
                    variant: "ghost",
                    className: "font-bold ",
                  })}
                >
                  Logout
                </Link>
                {/* {isAdmin ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null} */}
                {/* <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Become a local host
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link> */}
              </>
            ) : (
              <>

                <Link
                  href="/login"
                  className={buttonVariants({
                    size: "lg",
                    variant: "ghost",
                    className: "font-bold",
                  })}
                >
                  Login
                </Link>


                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                <Link
                  href="/localhost/signup"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Become a local host
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
