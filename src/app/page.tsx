"use client";
import LogoutButton from "@/components/logout-button";
import SignInButton from "@/components/signin-button";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import image from "public/space.jpg";
import editImage from "public/edit.svg";
import UserInfoDiv from "@/components/user-info-div";
import { useState } from "react";
import UserInfo from "@/interface/user-info";

export default function Home() {
  const auth = useAuth0();
  const [isEditing, setIsEditing] = useState(false);
  

  const auth0 = useAuth0();

  const edit = () => {
    if (isEditing) {
      return;
    }
    setIsEditing(true);
  };

  const unedit = () => {
    if (!isEditing) {
      return;
    }
    setIsEditing(false);
  };

  const getUserInfoState = async () => {
    try {
      const token = await auth0.getAccessTokenSilently();
      const response = await fetch(`${process.env.NEXT_PUBLIC_RESOURCE_SERVER}/api/userinfo/get`, {
        method: "GET",
        headers: {
          "CORS": "Access-Control-Allow-Origin",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const saveUserInfoState = async (userInfoState: UserInfo) => {
    const token = await auth0.getAccessTokenSilently();
    const response = await fetch(`${process.env.NEXT_PUBLIC_RESOURCE_SERVER}/api/userinfo/save`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userInfoState),
    });
    if (response.status !== 200) {
      return;
    }
    const data = await response.json();
    return data;
  };

  return (
    <main
      className="flex min-h-screen justify-center md:justify-end items-center"
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
              <Image
                className=" my-0 hover:scale-125"
                src={editImage}
                alt="edit icon"
                onClick={edit}
              />
            </div>
            <hr className="my-1" />
            <div className="mb-4">
              <UserInfoDiv
                isEditing={isEditing}
                getUserInfo={getUserInfoState}
                saveUserInfo={saveUserInfoState}
                unedit={unedit}
              />
            </div>
            <div className="mt-12">
              <LogoutButton />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
