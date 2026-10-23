"use client";

import { useState } from "react";

import { IMessage, IUser } from "@/types/event";
import { RegisterUser } from "./api/register";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import { Mail } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<IUser>({
    name: "",
    password: "",
    email: "",
    confirmPass: "",
  });
  const [message, setMessage] = useState<IMessage>({
    text: "",
    color: "",
  });

  function showMessage(text: string, color: string) {
    setMessage({ text: text, color: color });
    setTimeout(() => {
      setMessage({ text: "", color: "" });
    }, 2000);
  }
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.confirmPass
    ) {
      showMessage("Заполните пустые поля", "red");
      return;
    }

    if (userData.password.length < 6 || userData.confirmPass.length < 6) {
      showMessage("Пароль не может быть меньшее 6 символов", "red");
      return;
    }

    if (userData.password !== userData.confirmPass) {
      showMessage("Пароли не совпадают", "red");
      return;
    }

    const newUser: IUser = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    showMessage("Регистрация прошла успешна!", "green");
    await RegisterUser(newUser);
    setUserData({ name: "", email: "", password: "", confirmPass: "" });
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white py-3 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg sm:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Регистрация
          </h1>

          <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
            Создайте аккаунт, чтобы находить интересные мероприятия и быть в
            курсе событий рядом с вами
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Имя
            </label>

            <div className="relative">
              <UserRound
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="name"
                type="text"
                placeholder="Введите ваше имя"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                autoComplete="name"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Электронная почта
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                autoComplete="email"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Пароль
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Минимум 6 символов"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                autoComplete="new-password"
                minLength={6}
                required
                className={`${inputClass} pr-11`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-900"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Подтвердите пароль
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Повторите пароль"
                value={userData.confirmPass}
                onChange={(e) =>
                  setUserData({ ...userData, confirmPass: e.target.value })
                }
                autoComplete="new-password"
                minLength={6}
                required
                className={`${inputClass} pr-11`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Скрыть пароль" : "Показать пароль"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-900"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Создать аккаунт
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Уже есть аккаунт?{" "}
          <a
            href="/login"
            className="font-semibold text-blue-600 underline-offset-4 hover:underline"
          >
            Войти
          </a>
        </p>
        <p
          className="text-center mt-3 font-semibold"
          style={{ color: message.color }}
        >
          {message.text}
        </p>
      </div>
    </main>
  );
}
