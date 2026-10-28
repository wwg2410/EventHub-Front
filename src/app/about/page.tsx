import Link from "next/link";
import { Calendar, ShieldCheck, Zap, Users } from "lucide-react";

const features = [
  {
    icon: <Calendar className="h-6 w-6 text-blue-600" />,
    title: "Актуальная афиша",
    description: "Ежедневно обновляемый список концертов, выставок, фестивалей и мастер-классов вашего города."
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-600" />,
    title: "Быстрый поиск",
    description: "Удобная система фильтрации и умный встроенный поиск помогут найти событие за пару кликов."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
    title: "Надежные организаторы",
    description: "Мы тщательно проверяем каждое мероприятие перед публикацией для вашей безопасности."
  }
];

const team = [
  {
    name: "Константин",
    role: "Lead Developer / Product Owner",
    avatar: "К"
  },
  {
    name: "Алексей",
    role: "Backend Engineer",
    avatar: "А"
  }
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Главный блок / Секция Intro */}
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          О проекте <span className="text-blue-600">EventHub</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          <strong className="text-slate-900 font-semibold">EventHub</strong> — это современный навигатор по городской культуре и развлечениям. Наша цель — объединить организаторов крутых событий и активных жителей в единую, удобную экосистему. Мы избавляем от необходимости искать анонсы в десятках разных каналов и соцсетей.
        </p>
      </div>

      {/* Секция преимуществ / Особенности */}
      <div className="mt-16 border-t border-slate-100 pt-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Почему выбирают нас</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="rounded-xl border border-slate-100 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Команда разработки */}
      <div className="mt-16 border-t border-slate-100 pt-12">
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Команда проекта</h2>
        </div>
        <p className="mt-2 text-sm text-slate-500">Люди, которые создают и развивают платформу каждый день.</p>
        
        <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-2xl">
          {team.map((member, index) => (
            <div key={index} className="flex items-center gap-4 rounded-xl border border-slate-100 p-4 bg-white">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {member.avatar}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{member.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Призыв к действию (CTA) */}
      <div className="mt-16 rounded-2xl bg-slate-50 p-8 text-center sm:p-12">
        <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">Готовы найти своё идеальное событие?</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
          Переходите к нашей афише прямо сейчас и выбирайте, куда отправиться сегодня вечером.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/events"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-blue-700"
          >
            Смотреть мероприятия
          </Link>
        </div>
      </div>

    </main>
  );
}
