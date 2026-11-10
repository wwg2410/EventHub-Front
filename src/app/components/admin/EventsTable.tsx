"use client";

import { useMemo, useState } from "react";
import { Search, Filter, ChevronDown, Edit3, Trash2 } from "lucide-react";

export type EventStatus = "Опубликовано" | "На модерации" | "Черновик";

export type EventItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  status: EventStatus;
};

const categories = [
  "Все категории",
  "Фестивали",
  "Образование",
  "Концерты",
  "Спорт",
  "Маркет",
];

const statusStyles: Record<EventStatus, string> = {
  Опубликовано: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "На модерации": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Черновик: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

interface EventsTableProps {
  events: EventItem[];
  onEdit: (event: EventItem) => void;
  onDelete: (event: EventItem) => void;
}

export default function EventsTable({ events, onEdit, onDelete }: EventsTableProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("ru");
    return events.filter((event) => {
      const matchesSearch = event.title.toLocaleLowerCase("ru").includes(query);
      const matchesCategory = category === categories[0] || event.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [events, search, category]);

  return (
    <div role="tabpanel" className="mt-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative min-w-0 flex-1 lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию"
              className="h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 sm:min-w-52">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-10 pr-9 text-sm outline-hidden focus:border-blue-500"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
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
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Мероприятие</th>
                <th className="px-4 py-4">Категория</th>
                <th className="px-4 py-4">Дата</th>
                <th className="px-4 py-4">Автор</th>
                <th className="px-4 py-4">Статус</th>
                <th className="px-5 py-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEvents.map((event) => (
                <EventRow key={event.id} event={event} onEdit={onEdit} onDelete={onDelete} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-slate-100 md:hidden">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <p className="px-5 py-12 text-center text-sm text-slate-500">Мероприятия не найдены.</p>
        )}
      </div>
    </div>
  );
}

function EventRow({ event, onEdit, onDelete }: { event: EventItem; onEdit: (ev: EventItem) => void; onDelete: (ev: EventItem) => void }) {
  return (
    <tr className="transition-colors hover:bg-slate-50/70">
      <td className="max-w-[260px] px-5 py-4 font-semibold text-slate-900">{event.title}</td>
      <td className="px-4 py-4 text-slate-600">{event.category}</td>
      <td className="whitespace-nowrap px-4 py-4 text-slate-600">{event.date}</td>
      <td className="px-4 py-4 text-slate-600">{event.author}</td>
      <td className="px-4 py-4"><StatusBadge status={event.status} /></td>
      <td className="px-5 py-4"><Actions event={event} onEdit={onEdit} onDelete={onDelete} /></td>
    </tr>
  );
}

function EventCard({ event, onEdit, onDelete }: { event: EventItem; onEdit: (ev: EventItem) => void; onDelete: (ev: EventItem) => void }) {
  return (
    <article className="p-4">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-semibold leading-6 text-slate-900">{event.title}</h2>
        <StatusBadge status={event.status} />
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <dt className="text-slate-400">Категория</dt>
          <dd className="mt-0.5 text-slate-700">{event.category}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Дата</dt>
          <dd className="mt-0.5 text-slate-700">{event.date}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Автор</dt>
          <dd className="mt-0.5 text-slate-700">{event.author}</dd>
        </div>
      </dl>
      <div className="mt-4 border-t border-slate-100 pt-3">
        <Actions event={event} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: EventStatus }) {
  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

function Actions({ event, onEdit, onDelete }: { event: EventItem; onEdit: (ev: EventItem) => void; onDelete: (ev: EventItem) => void }) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-1">
      <button type="button" onClick={() => onEdit(event)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700">
        <Edit3 className="h-3.5 w-3.5" /> Редактировать
      </button>
      <button type="button" onClick={() => onDelete(event)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-700">
        <Trash2 className="h-3.5 w-3.5" /> Удалить
      </button>
    </div>
  );
}
