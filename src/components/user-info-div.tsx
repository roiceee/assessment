import UserInfo from "@/interface/user-info";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

interface UserInfoDivProps {
  isEditing: boolean;
  unedit: () => void;
  saveUserInfo: (userInfo: UserInfo) => Promise<UserInfo>;
  getUserInfo: () => Promise<UserInfo>;
}

function UserInfoDiv({
  isEditing,
  saveUserInfo,
  getUserInfo,
  unedit,
}: UserInfoDivProps) {
  const [userinfoState, setUserinfoState] = useState<UserInfo>({
    about: "",
    phoneNumber: "",
  });

  const inputHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    
      if (e.target.id === "about") {
        if (e.target.value.length > 20) {
          return;
        }
      }
      if (e.target.id === "phoneNumber") {
        const regex = /^\d{0,11}$/;
        if (!regex.test(e.target.value)) {
          return;
        }
      }
      setUserinfoState((prevState) => {
        return {
          ...prevState,
          [e.target.id]: e.target.value,
        };
      });
    },
    []
  );

  const getUserInfoHandler = useCallback(async () => {
    const userInfo = await getUserInfo();
    if (!userInfo) {
      return;
    }
    setUserinfoState(userInfo);
  }, [getUserInfo]);

  const saveUserInfoHandler = useCallback(async () => {
    const userInfo = await saveUserInfo(userinfoState);
    if (!userInfo) {
      return;
    }

    setUserinfoState(userInfo);
  }, [saveUserInfo, userinfoState]);

  const saveHandler = useCallback(() => {
    saveUserInfoHandler();
    unedit();
  }, [saveUserInfoHandler, unedit]);

  useEffect(() => {
    getUserInfoHandler();
  }, [getUserInfoHandler, isEditing]);

  return (
    <>
      {!isEditing && (
        <div>
          <div className=" overflow-auto">Nickname: {userinfoState.about}</div>
          <div>Phone number: {userinfoState.phoneNumber}</div>
        </div>
      )}
      {isEditing && (
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Nickname</span>
            </label>
            <input
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={userinfoState.about}
              id="about"
              onChange={inputHandler}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={userinfoState.phoneNumber}
              id="phoneNumber"
              onChange={inputHandler}
            />
          </div>
          <div>
            <button
              className="btn btn-primary btn-wide mt-6"
              onClick={saveHandler}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UserInfoDiv;
