
import { ILogin } from "@/types/event";

export async function LoginUser(data: ILogin) {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  console.log("Ответ backend:", result);

  if (!response.ok) {
    throw new Error(
      Array.isArray(result.message)
        ? result.message.join(", ")
        : result.message || "Ошибка входа"
    );
  }

  console.log("Токен:", result.access_token);

  if (!result.access_token) {
    throw new Error("Backend не вернул access_token");
  }

  localStorage.setItem("token", result.access_token);

  console.log("Сохранённый токен:", localStorage.getItem("token"));

  return result;
}
