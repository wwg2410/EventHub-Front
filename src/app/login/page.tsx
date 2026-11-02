// "use client";

// import { useState } from "react";
// import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
// import { ILogin, IMessage } from "@/types/event";
// import { useRouter } from "next/navigation";
// import { LoginUser } from "./api/login";
// import { useAuth } from "../context/AuthContext";
// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuth();
//   const [userData, setUserData] = useState<ILogin>({
//     password: "",
//     email: "",
//   });
//   const [message, setMessage] = useState<IMessage>({
//     text: "",
//     color: "",
//   });

//   function showMessage(text: string, color: string) {
//     setMessage({ text: text, color: color });
//     setTimeout(() => {
//       setMessage({ text: "", color: "" });
//     }, 2000);
//   }
//   const [showPassword, setShowPassword] = useState(false);

// async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//   e.preventDefault();

//   if (!userData.email || !userData.password) {
//     showMessage("Заполните пустые поля", "red");
//     return;
//   }

//   try {
//     const result = await LoginUser(userData);

//     if (result && result.token && result.user) {
//         login(result.token, result.user);
//     }

//     if (result.user?.role === "ADMIN") {
//       router.push("/admin-panel");
//     } else {
//       router.push("/");
//     }
//   } catch (error) {
//     showMessage(
//       error instanceof Error ? error.message : "Ошибка входа",
//       "red"
//     );
//   }
// }

//   const inputClass =
//     "w-full rounded-lg border border-gray-300 bg-white py-3 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10";

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
//       <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg sm:p-10">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//             Вход
//           </h1>

//           <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
//             Войдите в свой аккаунт, чтобы управлять мероприятиями и покупать
//             билеты
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label
//               htmlFor="email"
//               className="mb-2 block text-sm font-medium text-gray-700"
//             >
//               Электронная почта
//             </label>

//             <div className="relative">
//               <Mail
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />

//               <input
//                 id="email"
//                 type="email"
//                 placeholder="example@mail.com"
//                 value={userData.email}
//                 onChange={(e) =>
//                   setUserData({ ...userData, email: e.target.value })
//                 }
//                 autoComplete="email"
//                 required
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="mb-2 block text-sm font-medium text-gray-700"
//             >
//               Пароль
//             </label>

//             <div className="relative">
//               <LockKeyhole
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />

//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Минимум 6 символов"
//                 value={userData.password}
//                 onChange={(e) =>
//                   setUserData({ ...userData, password: e.target.value })
//                 }
//                 autoComplete="new-password"
//                 minLength={6}
//                 required
//                 className={`${inputClass} pr-11`}
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-900"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
//           >
//             Войти
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-500">
//           Нету аккаунта?{" "}
//           <a
//             href="/register"
//             className="font-semibold text-blue-600 underline-offset-4 hover:underline"
//           >
//             Регистрация
//           </a>
//         </p>
//         <p
//           className="text-center mt-3 font-semibold"
//           style={{ color: message.color }}
//         >
//           {message.text}
//         </p>
//       </div>
//     </main>
//   );
// }
"use client";

import { useState } from "react";
import { Mail, LockKeyhole, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { ILogin, IMessage } from "@/types/event";
import { useRouter } from "next/navigation";
import { LoginUser } from "./api/login";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [userData, setUserData] = useState<ILogin>({
    password: "",
    email: "",
  });
  
  const [message, setMessage] = useState<IMessage>({
    text: "",
    color: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function showMessage(text: string, color: string) {
    setMessage({ text: text, color: color });
    setTimeout(() => {
      setMessage({ text: "", color: "" });
    }, 2000);
  }

  // Быстрый вход администратора
  const handleQuickAdminLogin = () => {
    const adminCredentials = {
      email: "admin@mail.com", 
      password: "adminpassword", 
    };
    
    // Обновляем поля формы визуально
    setUserData(adminCredentials);

    // Передаем данные админа НАПРЯМУЮ, минуя асинхронный стейт React
    processLogin(adminCredentials);
  };

  // Единая функция авторизации
  async function processLogin(credentials: ILogin) {
    if (!credentials.email || !credentials.password) {
      showMessage("Заполните пустые поля", "red");
      return;
    }

    try {
      // Отправляем на сервер актуальные credentials (аргумент функции)
      const result = await LoginUser(credentials);
      const token = result.access_token;

      // Запрашиваем профиль для проверки роли
      const profileRes = await fetch("http://localhost:8080/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!profileRes.ok) {
        throw new Error("Не удалось загрузить профиль пользователя");
      }

      const user = await profileRes.json();

      if (token && user) {
        login(token, user);
      }

      // Редирект в зависимости от роли из базы данных
      if (user?.role === "ADMIN") {
        router.push("/admin-panel");
      } else {
        router.push("/");
      }
    } catch (error) {
      showMessage(
        error instanceof Error ? error.message : "Ошибка входа",
        "red"
      );
    }
  }

  // Отправка обычной формы пользователем
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await processLogin(userData);
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white py-3 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Вход
          </h1>

          <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
            Войдите в свой аккаунт, чтобы управлять мероприятиями и покупать билеты
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Минимум 6 symbols"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                autoComplete="current-password"
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

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Войти
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-white px-6 text-gray-400">Или</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleQuickAdminLogin}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50/50 px-4 py-3 font-semibold text-blue-600 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
        >
          <ShieldCheck size={18} />
          Войти как Администратор
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Нету аккаунта?{" "}
          <a
            href="/register"
            className="font-semibold text-blue-600 underline-offset-4 hover:underline"
          >
            Регистрация
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
