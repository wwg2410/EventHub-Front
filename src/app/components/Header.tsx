"use client";

import Link from "next/link";
import { Search, UserRound } from "lucide-react";

const navigation = [
  { label: "Главная", href: "/" },
  // TODO: подключить маршрут списка мероприятий, когда он будет добавлен.
  { label: "Мероприятия", href: "/events" },
  { label: "Мои мероприятия", href: "/my-events" }, // ← добавить
  // TODO: подключить страницу разработчиков, когда она будет добавлена.
  { label: "Разработчики", href: "/developers" },
];

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-80"
          aria-label="EventHub — на главную"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm">
            EH
          </span>
          <span>
            <span className="block text-xl font-bold tracking-tight text-slate-900">
              Event<span className="text-blue-600">Hub</span>
            </span>
            <span className="hidden text-xs text-slate-500 sm:block">
              События вашего города
            </span>
          </span>
        </Link>
        <nav
          aria-label="Основная навигация"
          className="hidden items-center gap-6 sm:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-5 text-sm font-medium transition-colors hover:text-blue-600 ${
                item.href === "/events"
                  ? "text-blue-600 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-blue-600"
                  : "text-slate-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4 sm:gap-3 sm:pl-6">
          <Link
            href="/events"
            aria-label="Поиск мероприятий"
            className="hidden rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-blue-600 sm:block"
          >
            <Search size={18} strokeWidth={1.8} />
          </Link>
          {/* TODO: заменить временные ссылки на маршруты авторизации после их добавления. */}
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600 sm:px-4"
          >
            Войти
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 sm:px-4"
          >
            Регистрация
          </Link>

          <Link
            href="/profile"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-blue-400/30 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/35 active:translate-y-0 active:scale-95"
          >
            <span className="absolute inset-0 translate-x-[-120%] bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
            <UserRound
              size={18}
              className="relative transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110"
            />
            <span className="relative">Профиль</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
