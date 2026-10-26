"use client";

import { useState } from "react";
import {
  CalendarDays,
  MapPin,
  CircleDollarSign,
  Users,
  UserRound,
  ShieldCheck,
  Ticket,
} from "lucide-react";

const event = {
  title: "Летний джаз в Саду «Эрмитаж»",
  category: "Концерт",
  date: "12 июн. 2027, 19:00",
  location: "Москва, ул. Каретный Ряд, 3",
  price: 1200,
  availableSeats: 48,
  totalSeats: 200,
  organizer: "Jazz Garden Events",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg5vweqSWhRvkuQ8YmrxJuTJywL4Ieh6cKgpjXsq3YsKshb0WAqYxvBEb&s=10",
};

export default function Event() {
  const [registered, setRegistered] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 sm:px-8 sm:py-8">
      <button className="text-[blue] "> назад</button>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-7 lg:grid-cols-[1.65fr_1fr] lg:gap-12">
        <section className="min-w-0">
          <div className="overflow-hidden rounded-xl">
            <img
              src={event.image}
              alt="Концерт под открытым небом"
              className="h-64 w-full object-cover sm:h-96 lg:h-[490px]"
            />
          </div>

          <div className="mt-7 rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-5 text-2xl font-bold sm:text-3xl">
              О мероприятии
            </h2>

            <div className="space-y-4 text-base leading-7 text-gray-600 sm:text-lg">
              <p>
                Приглашаем вас на незабываемый вечер живого джаза под открытым
                небом! Летний джаз в Саду «Эрмитаж» — это атмосфера свободы,
                вдохновения и прекрасной музыки. Вас ждут выступления
                талантливых музыкантов, уютная сцена в зелёном саду и особая
                летняя атмосфера Москвы.
              </p>

              <p>
                Возьмите с собой друзей, хорошее настроение и насладитесь живым
                звуком в одном из самых красивых садов столицы!
              </p>
            </div>
          </div>
        </section>

        <aside className="min-w-0">
          <span className="inline-block rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            {event.category}
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {event.title}
          </h1>

          <div className="mt-7 space-y-5">
            <InfoRow icon={<CalendarDays />}>{event.date}</InfoRow>

            <InfoRow icon={<MapPin />}>
              <div>
                <p>{event.location}</p>
                <a
                  href="https://maps.google.com/?q=Сад+Эрмитаж+Москва"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-blue-600 hover:underline"
                >
                  Показать на карте
                </a>
              </div>
            </InfoRow>

            <InfoRow icon={<CircleDollarSign />}>
              от {event.price.toLocaleString("ru-RU")} ₽
            </InfoRow>

            <InfoRow icon={<Users />}>
              Осталось {event.availableSeats} мест из {event.totalSeats}
            </InfoRow>

            <InfoRow icon={<UserRound />}>
              <div>
                <p className="font-medium text-gray-800">{event.organizer}</p>
                <p className="text-sm text-gray-500">Организатор</p>
              </div>
            </InfoRow>
          </div>

          <button
            type="button"
            onClick={() => setRegistered(true)}
            disabled={registered}
            className="mt-9 flex min-h-16 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-green-600"
          >
            {registered ? (
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
              className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-800"
            >
              Вы записались на мероприятие.
            </p>
          )}

          <div className="mt-6 flex items-start gap-3 text-sm leading-6 text-gray-500">
            <ShieldCheck className="mt-0.5 h-7 w-7 shrink-0" />
            <p>
              Ваши данные защищены. Запись поможет организатору подготовить
              мероприятие.
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
      <span className="mt-0.5 shrink-0 text-gray-500 [&>svg]:h-7 [&>svg]:w-7">
        {icon}
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
