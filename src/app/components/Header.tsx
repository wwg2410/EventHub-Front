"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, UserRound, LogOut, Settings, LayoutDashboard, CalendarPlus, UserPlus, Menu, X } from "lucide-react";

const navigation = [
  { label: "Главная", href: "/" },
  { label: "Мероприятия", href: "/events" },
  { label: "О проекте", href: "/about" },
];


const placeholderTexts = [
  "Поиск рок-концертов...",
  "События на этих выходных...",
  "Куда сходить сегодня вечером?...",
  "Выставки и мастер-классы...",
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  interface UserType {
    role: "ADMIN" | "USER";
    name: string;
  }

  const user = null as any; 

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "ADMIN";
  const handleLogout = () => {
  localStorage.removeItem("token"); 
  window.location.href = "/"; 
};



  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState("");
  
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = placeholderTexts[placeholderIndex];
    
    const type = () => {
      if (!isDeleting) {
        setCurrentPlaceholder(fullText.substring(0, currentPlaceholder.length + 1));
        if (currentPlaceholder === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2500); 
        } else {
          timer = setTimeout(type, 80); 
        }
      } else {
        setCurrentPlaceholder(fullText.substring(0, currentPlaceholder.length - 1));
        if (currentPlaceholder === "") {
          setIsDeleting(false);
          setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
        } else {
          timer = setTimeout(type, 40);
        }
      }
    };

    timer = setTimeout(type, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [currentPlaceholder, isDeleting, placeholderIndex]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="border-b border-slate-100 bg-white sticky top-0 z-50">
      <div className="mx-auto flex min-h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="EventHub — на главную"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
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
        <nav aria-label="Основная навигация" className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-5 text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive
                    ? "text-blue-600 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-blue-600"
                    : "text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[200px] sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentPlaceholder}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-1.5 pl-9 pr-4 text-sm text-slate-900 outline-hidden transition-all focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600"
            />
          </form>
          <div className="relative border-l border-slate-100 pl-3 sm:pl-4" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex min-w-[90px] sm:min-w-[110px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 sm:px-4 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-blue-700"
            >
              <UserRound size={16} />
              <span className="hidden sm:inline">{isLoggedIn ? "Профиль" : "Войти"}</span>
              <span className="sm:hidden">{isLoggedIn ? "Проф." : "Вход"}</span>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-100 bg-white p-1 shadow-lg z-50">
                {!isLoggedIn ? (
                  <>
                    <div className="p-2">
                      <Link
                        href="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                      >
                        <UserPlus size={14} />
                        Создать аккаунт
                      </Link>
                    </div>

                    <hr className="my-1 border-slate-100" />
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <UserRound size={16} className="text-slate-400" />
                      Войти
                    </Link>
                    <Link
                      href="/login?role=admin" 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50"
                    >
                      <LayoutDashboard size={16} className="text-slate-400" />
                      Админ-панель
                    </Link>
                  </>
                ) : (
 
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <UserRound size={16} className="text-slate-400" />
                      Мой профиль
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin-panel"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        <LayoutDashboard size={16} className="text-slate-400" />
                        Админ-панель
                      </Link>
                    )}
                    <Link
                      href="/create-event"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <CalendarPlus size={16} className="text-slate-400" />
                      Создать событие
                    </Link>
                                        <Link
                      href="/profile/settings"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <Settings size={16} className="text-slate-400" />
                      Настройки
                    </Link>
                    
                    <hr className="my-1 border-slate-100" />
                    
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Выйти
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-50 md:hidden"
            aria-label="Переключить меню"
          >
            {isMobileNavOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>
      {isMobileNavOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 shadow-inner md:hidden">
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileNavOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                  pathname === item.href ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}


