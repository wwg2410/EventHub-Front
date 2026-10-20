"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Edit3,
  Filter,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";

type EventStatus = "Опубликовано" | "На модерации" | "Черновик";

type EventItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  status: EventStatus;
};

const initialEvents: EventItem[] = [
  {
    id: 1,
    title: "Фестиваль городских историй",
    category: "Фестивали",
    date: "24 мая 2026",
    author: "Анна Петрова",
    status: "Опубликовано",
  },
  {
    id: 2,
    title: "Открытая лекция о дизайне",
    category: "Образование",
    date: "31 мая 2026",
    author: "Илья Смирнов",
    status: "На модерации",
  },
  {
    id: 3,
    title: "Вечер живой музыки",
    category: "Концерты",
    date: "7 июня 2026",
    author: "Мария Орлова",
    status: "Опубликовано",
  },
  {
    id: 4,
    title: "Забег в центре города",
    category: "Спорт",
    date: "14 июня 2026",
    author: "Дмитрий Волков",
    status: "Черновик",
  },
  {
    id: 5,
    title: "Маркет локальных брендов",
    category: "Маркет",
    date: "21 июня 2026",
    author: "Ольга Ким",
    status: "Опубликовано",
  },
];

const categories = ["Все категории", "Фестивали", "Образование", "Концерты", "Спорт", "Маркет"];

const statusStyles: Record<EventStatus, string> = {
  Опубликовано: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "На модерации": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Черновик: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<"events" | "users">("events");
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [eventToDelete, setEventToDelete] = useState<EventItem | null>(null);
  const [eventToEdit, setEventToEdit] = useState<EventItem | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("ru");

    return events.filter((event) => {
      const matchesSearch = event.title.toLocaleLowerCase("ru").includes(normalizedSearch);
      const matchesCategory = category === categories[0] || event.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [category, events, search]);

  function openEdit(event: EventItem) {
    setEventToEdit(event);
    setEditTitle(event.title);
  }

  function saveEdit() {
    if (!eventToEdit || !editTitle.trim()) return;

    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === eventToEdit.id ? { ...event, title: editTitle.trim() } : event,
      ),
    );
    setEventToEdit(null);
  }

  function deleteEvent() {
    if (!eventToDelete) return;

    setEvents((currentEvents) => currentEvents.filter((event) => event.id !== eventToDelete.id));
    setEventToDelete(null);
  }

  return (
    <section className="flex-1 bg-slate-50">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">EventHub</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Админ-панель</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
              Управляйте мероприятиями и пользователями сервиса.
            </p>
          </div>
        </div>

        <div className="mt-8 border-b border-slate-200">
          <div className="flex gap-6" role="tablist" aria-label="Разделы админ-панели">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "events"}
              onClick={() => setActiveTab("events")}
              className={`relative flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${
                activeTab === "events" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Мероприятия
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "users"}
              onClick={() => setActiveTab("users")}
              className={`relative flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${
                activeTab === "users" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <Users className="h-4 w-4" aria-hidden="true" />
              Пользователи
            </button>
          </div>
        </div>

        {activeTab === "events" ? (
          <div role="tabpanel" aria-label="Мероприятия">
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative min-w-0 flex-1 lg:max-w-md">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <label htmlFor="event-search" className="sr-only">Поиск по названию</label>
                  <input
                    id="event-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Поиск по названию"
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative min-w-0 sm:min-w-52">
                    <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                    <label htmlFor="event-category" className="sr-only">Фильтр по категории</label>
                    <select
                      id="event-category"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-10 pr-9 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      {categories.map((item) => <option key={item}>{item}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  </div>
                  <span className="flex items-center justify-center rounded-lg bg-slate-50 px-4 text-sm text-slate-500">
                    Найдено: <strong className="ml-1 text-slate-700">{filteredEvents.length}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[780px] text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-5 py-4">Мероприятие</th><th className="px-4 py-4">Категория</th><th className="px-4 py-4">Дата</th><th className="px-4 py-4">Автор</th><th className="px-4 py-4">Статус</th><th className="px-5 py-4 text-right">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEvents.map((event) => <EventRow key={event.id} event={event} onEdit={openEdit} onDelete={setEventToDelete} />)}
                  </tbody>
                </table>
              </div>
              <div className="divide-y divide-slate-100 md:hidden">
                {filteredEvents.map((event) => <EventCard key={event.id} event={event} onEdit={openEdit} onDelete={setEventToDelete} />)}
              </div>
              {filteredEvents.length === 0 && <p className="px-5 py-12 text-center text-sm text-slate-500">Мероприятия не найдены. Попробуйте изменить запрос или фильтр.</p>}
            </div>
          </div>
        ) : (
          <div role="tabpanel" aria-label="Пользователи" className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Users className="h-5 w-5" aria-hidden="true" /></div>
              <div><h2 className="text-lg font-semibold text-slate-900">Пользователи</h2><p className="mt-1 text-sm leading-6 text-slate-500">Раздел подготовлен для подключения списка пользователей и управления ролями.</p><p className="mt-4 text-sm font-medium text-amber-700">Данные пользователей и управление ролями пока не подключены к API.</p></div>
            </div>
          </div>
        )}
      </div>

      {eventToDelete && (
        <Dialog onClose={() => setEventToDelete(null)}>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600"><Trash2 className="h-5 w-5" aria-hidden="true" /></div>
          <h2 className="mt-4 text-lg font-semibold text-slate-900">Удалить мероприятие?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">«{eventToDelete.title}» будет удалено из демо-списка. Действие нельзя отменить.</p>
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={() => setEventToDelete(null)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Отмена</button><button type="button" onClick={deleteEvent} className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Удалить</button></div>
        </Dialog>
      )}

      {eventToEdit && (
        <Dialog onClose={() => setEventToEdit(null)}>
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold text-slate-900">Редактировать мероприятие</h2><button type="button" onClick={() => setEventToEdit(null)} aria-label="Закрыть" className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700"><X className="h-5 w-5" /></button></div>
          <label htmlFor="edit-event-title" className="mt-5 block text-sm font-semibold text-slate-700">Название</label>
          <input id="edit-event-title" value={editTitle} onChange={(event) => setEditTitle(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={() => setEventToEdit(null)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Отмена</button><button type="button" onClick={saveEdit} disabled={!editTitle.trim()} className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">Сохранить</button></div>
        </Dialog>
      )}
    </section>
  );
}

function EventRow({ event, onEdit, onDelete }: { event: EventItem; onEdit: (event: EventItem) => void; onDelete: (event: EventItem) => void }) {
  return <tr className="transition-colors hover:bg-slate-50/70"><td className="max-w-[260px] px-5 py-4 font-semibold text-slate-900">{event.title}</td><td className="px-4 py-4 text-slate-600">{event.category}</td><td className="whitespace-nowrap px-4 py-4 text-slate-600">{event.date}</td><td className="px-4 py-4 text-slate-600">{event.author}</td><td className="px-4 py-4"><StatusBadge status={event.status} /></td><td className="px-5 py-4"><Actions event={event} onEdit={onEdit} onDelete={onDelete} /></td></tr>;
}

function EventCard({ event, onEdit, onDelete }: { event: EventItem; onEdit: (event: EventItem) => void; onDelete: (event: EventItem) => void }) {
  return <article className="p-4"><div className="flex items-start justify-between gap-3"><h2 className="font-semibold leading-6 text-slate-900">{event.title}</h2><StatusBadge status={event.status} /></div><dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm"><div><dt className="text-slate-400">Категория</dt><dd className="mt-0.5 text-slate-700">{event.category}</dd></div><div><dt className="text-slate-400">Дата</dt><dd className="mt-0.5 text-slate-700">{event.date}</dd></div><div><dt className="text-slate-400">Автор</dt><dd className="mt-0.5 text-slate-700">{event.author}</dd></div></dl><div className="mt-4 border-t border-slate-100 pt-3"><Actions event={event} onEdit={onEdit} onDelete={onDelete} /></div></article>;
}

function StatusBadge({ status }: { status: EventStatus }) { return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}>{status}</span>; }

function Actions({ event, onEdit, onDelete }: { event: EventItem; onEdit: (event: EventItem) => void; onDelete: (event: EventItem) => void }) {
  return <div className="flex items-center justify-end gap-1"><button type="button" onClick={() => onEdit(event)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"><Edit3 className="h-3.5 w-3.5" aria-hidden="true" />Редактировать</button><button type="button" onClick={() => onDelete(event)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-700"><Trash2 className="h-3.5 w-3.5" aria-hidden="true" />Удалить</button></div>;
}

function Dialog({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" role="presentation" onMouseDown={onClose}><div role="dialog" aria-modal="true" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onMouseDown={(event) => event.stopPropagation()}>{children}</div></div>;
}
