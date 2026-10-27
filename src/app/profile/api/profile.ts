import { IUser } from "@/types/event";

export async function GetProfile(): Promise<IUser> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Ты не авторизован");
  }

  const response = await fetch("http://localhost:8080/auth/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Ошибка при получении профиля");
  }

  return result;
}