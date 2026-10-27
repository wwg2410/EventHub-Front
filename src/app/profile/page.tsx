"use client";

import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Pencil,
  Settings,
  Ticket,
  ShieldCheck,
  LogOut,
  Camera,
  ChevronRight,
} from "lucide-react";
import { GetProfile } from "./api/profile";
import type { IUser } from "@/types/event";

export default function ProfilePage() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await GetProfile();

        setUser(data);

        setForm({
          name: data.name,
          email: data.email,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ошибка загрузки профиля",
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleSave = () => {
    if (!user) return;

    setUser({
      ...user,
      name: form.name,
      email: form.email,
    });

    setEditing(false);
  };


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="rounded-xl bg-white p-6 shadow">Загрузка профиля...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-xl bg-white p-6 text-center shadow">
          <p className="text-red-600">{error || "Пользователь не найден"}</p>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="mt-4 rounded-xl bg-indigo-600 px-5 py-3 text-white"
          >
            Войти заново
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm text-slate-500">Главная / Личный кабинет</p>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Личный кабинет
          </h1>

          <p className="mt-2 text-slate-500">
            Управляйте своим профилем и мероприятиями
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col items-center border-b border-slate-100 pb-6">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <UserRound size={44} />

                <button
                  type="button"
                  aria-label="Изменить аватар"
                  className="absolute bottom-0 right-0 rounded-full bg-indigo-600 p-2 text-white shadow"
                >
                  <Camera size={15} />
                </button>
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">{user.email}</p>

              <span className="mt-3 flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                <ShieldCheck size={14} />
                Аккаунт активен
              </span>
            </div>

            <nav className="mt-5 space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                  activeTab === "profile"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <UserRound size={19} />
                Мой профиль
              </button>

              <button
                onClick={() => setActiveTab("events")}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                  activeTab === "events"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Ticket size={19} />
                Мои мероприятия
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                  activeTab === "settings"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Settings size={19} />
                Настройки
              </button>
            </nav>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="mt-5 flex w-full items-center gap-3 border-t border-slate-100 px-4 pt-5 text-sm font-medium text-red-600 hover:text-red-700"
            >
              <LogOut size={19} />
              Выйти из аккаунта
            </button>
          </aside>

          <section className="min-w-0">
            {activeTab === "profile" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Личная информация
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Ваши основные данные
                    </p>
                  </div>

                  {!editing && (
                    <button
                      onClick={() => {
                        setForm(user);
                        setEditing(true);
                      }}
                      className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Pencil size={16} />
                      Редактировать
                    </button>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      Полное имя
                    </label>

                    <div className="relative">
                      <UserRound
                        className="absolute left-3 top-3 text-slate-400"
                        size={19}
                      />
                      <input
                        value={editing ? form.name : user.name}
                        disabled={!editing}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-indigo-500 disabled:bg-slate-50 disabled:text-slate-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      Электронная почта
                    </label>

                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-3 text-slate-400"
                        size={19}
                      />
                      <input
                        type="email"
                        value={editing ? form.email : user.email}
                        disabled={!editing}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-indigo-500 disabled:bg-slate-50 disabled:text-slate-600"
                      />
                    </div>
                  </div>
                </div>

                {editing && (
                  <div className="mt-8 flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setForm(user);
                        setEditing(false);
                      }}
                      className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                      Отмена
                    </button>

                    <button
                      onClick={handleSave}
                      className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                      Сохранить изменения
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "events" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-slate-900">
                  Мои мероприятия
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Здесь будут отображаться мероприятия, на которые ты
                  зарегистрировался.
                </p>

                <div className="mt-8 rounded-xl border border-dashed border-slate-300 px-5 py-12 text-center">
                  <Ticket size={36} className="mx-auto text-slate-400" />
                  <h3 className="mt-4 font-semibold text-slate-800">
                    Пока нет мероприятий
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Найди интересное мероприятие и присоединяйся!
                  </p>

                  <a
                    href="/"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Найти мероприятия
                    <ChevronRight size={17} />
                  </a>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-slate-900">
                  Настройки аккаунта
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Здесь можно будет настроить безопасность и уведомления.
                </p>

                <div className="mt-6 flex items-center gap-4 rounded-xl border border-slate-200 p-4">
                  <ShieldCheck className="text-indigo-600" size={24} />
                  <div>
                    <h3 className="font-medium text-slate-800">Безопасность</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Управление доступом к аккаунту
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
