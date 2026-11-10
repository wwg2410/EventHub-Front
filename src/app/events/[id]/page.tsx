"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  CircleDollarSign,
  Users,
  UserRound,
  ShieldCheck,
  Ticket,
} from "lucide-react";

interface IEventDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  address: string;
  price: number | string;
  capacity: number;
  image: string;
  user?: {
    name: string;
    email: string;
  };
}

export default function EventDetail() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<IEventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (!params?.id) return;
    
    fetch(`http://localhost:8080/events/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Мероприятие не найдено");
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params?.id]);

  const handleRegistration = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Пожалуйста, войдите в аккаунт, чтобы записаться на мероприятие!");
      router.push("/login");
      return;
    }
    setRegistered(true);
  };

  const formatDateTime = (dateStr: string | undefined) => {
    if (!dateStr) return "Дата уточняется";
    try {
      const options: Intl.DateTimeFormatOptions = { 
        day: "numeric", 
        month: "long", 
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      };
      return new Date(dateStr).toLocaleDateString("ru-RU", options);
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-600">
        Загрузка информации о мероприятии...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 gap-4 text-gray-900">
        <p className="text-xl font-semibold">Мероприятие не найдено или было удалено</p>
        <button onClick={() => router.push("/")} className="text-blue-600 hover:underline">
          Вернуться на главную
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 sm:px-8 sm:py-8">
      <button onClick={() => router.back()} className="text-blue-600 font-semibold mb-6 flex items-center gap-1 hover:underline">
        ← Назад
      </button>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-7 lg:grid-cols-[1.65fr_1fr] lg:gap-12">
        <section className="min-w-0">
          <div className="overflow-hidden rounded-xl bg-gray-100">
            <img
              src={event.image || "/placeholder.png"}
              alt={event.title}
              className="h-64 w-full object-cover sm:h-96 lg:h-[490px]"
              onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
            />
          </div>

          <div className="mt-7 rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-5 text-2xl font-bold sm:text-3xl">
              О мероприятии
            </h2>

            <div className="space-y-4 text-base leading-7 text-gray-600 sm:text-lg whitespace-pre-line">
              <p>{event.description}</p>
            </div>
          </div>
        </section>

        <aside className="min-w-0">
          <span className="inline-block rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            {event.category || "Фестивали"}
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {event.title}
          </h1>

          <div className="mt-7 space-y-5">
            <InfoRow icon={<CalendarDays />}>
              {formatDateTime(event.date)}
            </InfoRow>

            <InfoRow icon={<MapPin />}>
              <div>
                <p>{event.address}</p>
                <a
                  href={`https://google.com{encodeURIComponent(event.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-blue-600 hover:underline"
                >
                  Показать на карте
                </a>
              </div>
            </InfoRow>

            <InfoRow icon={<CircleDollarSign />}>
              {Number(event.price) === 0 ? "Бесплатно" : `${Number(event.price).toLocaleString("ru-RU")} ₽`}
            </InfoRow>

            <InfoRow icon={<Users />}>
              Доступно мест: {event.capacity}
            </InfoRow>

            <InfoRow icon={<UserRound />}>
              <div>
                <p className="font-medium text-gray-800">{event.user?.name || "Не указан"}</p>
                <p className="text-sm text-gray-500">Организатор</p>
              </div>
            </InfoRow>
          </div>

          <button
            type="button"
            onClick={handleRegistration}
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
