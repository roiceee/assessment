"use client";
import LogoutButton from "@/components/logout-button";
import SignInButton from "@/components/signin-button";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import image from "public/space.jpg";
import editImage from "public/edit.svg";

export default function Home() {
  const auth = useAuth0();

  return (
    <main
      className="flex min-h-screen w-screen justify-center md:justify-end items-center"
      style={{
        backgroundImage: `url('${image.src}')`,
        backgroundSize: "cover",
      }}
    >
      <section className="p-12 lg:p-48 m-2 ">
        {auth.isLoading && <div>Loading...</div>}

        {!auth.isLoading && !auth.isAuthenticated && (
          <div className="prose text-center">
            <h1>You need to sign in to continue.</h1>
            <div>
              <SignInButton />
            </div>
          </div>
        )}

        {auth.isAuthenticated && (
          <div className="prose">
            <div>
              <Image
                src={auth.user!.picture === undefined ? "" : auth.user!.picture}
                alt="Profile picture"
                height={50}
                width={50}
                className="rounded-md"
              />
            </div>
            <h1>
              Hi!{" "}
              {auth.user?.given_name === undefined
                ? "User"
                : auth.user?.given_name}
            </h1>
            <div className=" flex items-center gap-2">
              <h3 className="my-0">User Information</h3>
              <Image className=" my-0" src={editImage} alt="edit icon"/>
            </div>
            <hr className="my-1" />
            <div className="mb-4">
              <div>About me:</div>
              <div>Phone number:</div>
            </div>
            <div>
              <LogoutButton />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
