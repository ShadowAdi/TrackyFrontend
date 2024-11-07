"use client";

import { UserProps } from "@/components/provider/user-provider";
import axios from "axios";

export const RegisterAccount = async (User: UserProps) => {
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/register/", User);

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
    const res = await axios.post("http://127.0.0.1:8000/api/login/", User);
    localStorage.setItem("token", res.data.token);
    window.location.href="/";
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
        .post("http://127.0.0.1:8000/api/logout/", null, {
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
    console.log(User);
    const token = localStorage.getItem("token");
    if (token && User.id) {
      await axios
        .put(`http://127.0.0.1:8000/api/Update/${User?.id}/`, User, {
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
