"use client";

import { UserProps } from "@/components/provider/user-provider";
import axios from "axios";

export const RegisterAccount = async (User: UserProps) => {
  try {
    const res = await axios.post("https://trackybackend.vercel.app/api/register/", User);

    if (res.status === 200) {
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Error registering account:", error);
  }
};

interface LoginProps {
  email: string;
  password: string;
}

export const LoginAccount = async (User: LoginProps) => {
  try {
    console.log(User)
    const res = await axios.post("https://trackybackend.vercel.app/api/login/", User);
    localStorage.setItem("token", res.data.token);
    console.log(res.data.token)
    window.location.href="https://tracky-frontend.vercel.app/";
  } catch (error) {
    console.error("Error Logout account:", error);
  }
};

export const LogoutAccount = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      await axios
        .post("https://trackybackend.vercel.app/api/logout/", null, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data)
          localStorage.removeItem("token");
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    console.error("Error Login account:", error);
  }
};

export const UpdateAccount = async (
  User: UserProps,
  setUser: (user: UserProps | null) => void
) => {
  try {
    const token = localStorage.getItem("token");
    if (token && User.id) {
      await axios
        .put(`https://trackybackend.vercel.app/api/Update/${User?.id}/`, User, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          window.location.href = "/profile";
        });
    }
  } catch (error) {
    console.error("Error Updating account:", error);
  }
};
