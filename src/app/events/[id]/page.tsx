"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation"; 
import mockEvents from "../../../../db.json";
import {
  CalendarDays,
  MapPin,
  CircleDollarSign,
  Users,
  UserRound,
  ShieldCheck,
  Ticket,
  ArrowLeft,
} from "lucide-react";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter(); 
  const [registered, setRegistered] = useState(false);

  const eventsArray = Array.isArray(mockEvents) ? mockEvents : (mockEvents.events || []);
  

  const currentEvent = eventsArray.find((e: any) => String(e.id) === params.id);

  if (!currentEvent) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-gray-800">Мероприятие не найдено</h2>
        <button 
          onClick={() => router.push("/")} 
          className="mt-4 text-blue-600 hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Вернуться к афише
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 sm:px-8 sm:py-8 font-sans">
      
    
      <button 
        onClick={() => router.push("/")}
        className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 mb-6 transition-colors"
      >
        <ArrowLeft size={18} /> Назад к афише
      </button>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-7 lg:grid-cols-[1.65fr_1fr] lg:gap-12">
        <section className="min-w-0">
        
          <div className="overflow-hidden rounded-xl bg-gray-200 shadow-sm">
            <img
              src={currentEvent.imageUrl || "https://unsplash.com"}
              alt={currentEvent.title}
              className="h-64 w-full object-cover sm:h-96 lg:h-[490px]"
            />
          </div>

          <div className="mt-7 rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-5 text-2xl font-bold sm:text-3xl">
              О мероприятии
            </h2>

            <div className="space-y-4 text-base leading-7 text-gray-600 sm:text-lg">
              <p>
                Приглашаем вас на событие <strong>«{currentEvent.title}»</strong>! 
                Это отличный шанс провести время с пользой, получить массу ярких эмоций 
                и познакомиться с единомышленниками.
              </p>
              <p>
                Организаторы подготовили насыщенную программу. Не упустите возможность 
                стать частью этого события — количество мест строго ограничено!
              </p>
            </div>
          </div>
        </section>

        <aside className="min-w-0">
          <span className="inline-block rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 capitalize">
            {currentEvent.category === 'concert' ? 'Концерт' : currentEvent.category === 'exhibition' ? 'Выставка' : currentEvent.category === 'sport' ? 'Спорт' : currentEvent.category || 'Событие'}
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl text-[#102447]">
            {currentEvent.title}
          </h1>

          <div className="mt-7 space-y-5">
            <InfoRow icon={<CalendarDays />}>
              {currentEvent.date} {currentEvent.time ? `в ${currentEvent.time}` : ''}
            </InfoRow>

            <InfoRow icon={<MapPin />}>
              <div>
                <p>{currentEvent.address}</p>
                <a
                  href={`https://google.com{encodeURIComponent(currentEvent.address || "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-blue-600 hover:underline text-sm font-medium"
                >
                  Показать на карте
                </a>
              </div>
            </InfoRow>

            <InfoRow icon={<CircleDollarSign />}>
              {currentEvent.price === 0 || currentEvent.price === '0' 
                ? 'Бесплатно' 
                : `${Number(currentEvent.price).toLocaleString("ru-RU")} ₽`
              }
            </InfoRow>

            <InfoRow icon={<Users />}>
              Осталось мест: <strong className="text-gray-900">{currentEvent.seats}</strong>
            </InfoRow>

            <InfoRow icon={<UserRound />}>
              <div>
                <p className="font-medium text-gray-800">
                  {currentEvent.organizer || "EventHub Организатор"}
                </p>
                <p className="text-sm text-gray-500">Организатор</p>
              </div>
            </InfoRow>
          </div>

          <button
            type="button"
            onClick={() => setRegistered(true)}
            disabled={registered || Number(currentEvent.seats) <= 0}
            className="mt-9 flex min-h-16 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-green-600 shadow-md hover:shadow-lg"
          >
            {Number(currentEvent.seats) <= 0 ? (
              "Мест больше нет"
            ) : registered ? (
              <>
                <Ticket size={22} />
                Вы записаны!
              </>
            ) : (
              "Записаться"
            )}
          </button>

          {registered && (
            <p
              role="status"
              className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-800 font-semibold"
            >
              Поздравляем! Вы успешно записались. Электронный билет сохранен.
            </p>
          )}

          <div className="mt-6 flex items-start gap-3 text-sm leading-6 text-gray-500">
            <ShieldCheck className="mt-0.5 h-7 w-7 shrink-0 text-green-600" />
            <p>
              Ваши данные защищены. Запись поможет организатору 
              вовремя подготовить посадочные места и раздаточные материалы.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

type InfoRowProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

function InfoRow({ icon, children }: InfoRowProps) {
  return (
    <div className="flex items-start gap-4 text-base text-gray-600 sm:text-lg">
      <span className="mt-0.5 shrink-0 text-blue-600 [&>svg]:h-6 [&>svg]:w-6">
        {icon}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
