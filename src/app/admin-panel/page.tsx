"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { CalendarDays, Users, Trash2, X } from "lucide-react";
import EventsTable from "../components/admin/EventsTable";
import UsersTable from "../components/admin/UsersTable";
import type { EventItem } from "../components/admin/EventsTable";
import type { UserItem } from "../components/admin/UsersTable";

const API_BASE_URL = "http://localhost:8080"; 

export default function AdminPanelPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"events" | "users">("events");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);

  const [eventToDelete, setEventToDelete] = useState<EventItem | null>(null);
  const [eventToEdit, setEventToEdit] = useState<EventItem | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "ADMIN") {
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/events/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setEvents(await res.json());
    } catch (err) {
      console.error("Ошибка загрузки мероприятий:", err);
    }
  };

  
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setUsers(await res.json());
    } catch (err) {
      console.error("Ошибка загрузки пользователей:", err);
    }
  };

  useEffect(() => {
    if (user && user.role === "ADMIN") {
      fetchEvents();
      fetchUsers();
    }
  }, [user]);


  async function deleteEvent() {
    if (!eventToDelete) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/events/delete/${eventToDelete.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setEventToDelete(null);
        fetchEvents(); 
      }
    } catch (err) {
      console.error("Ошибка удаления мероприятия:", err);
    }
  }

  
  async function saveEdit() {
    if (!eventToEdit || !editTitle.trim()) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/events/update/${eventToEdit.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: editTitle.trim() }),
      });
      if (res.ok) {
        setEventToEdit(null);
        fetchEvents(); 
      }
    } catch (err) {
      console.error("Ошибка обновления названия:", err);
    }
  }

  if (loading || !user || user.role !== "ADMIN") {
    return <div className="flex h-screen items-center justify-center text-sm text-slate-500">Проверка прав доступа...</div>;
  }

  return (
    <section className="min-h-screen flex-1 bg-slate-50">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">EventHub</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Админ-панель</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">Управляйте мероприятиями и пользователями сервиса.</p>
        </div>

        <div className="mt-8 border-b border-slate-200">
          <div className="flex gap-6" role="tablist" aria-label="Разделы admin-панели">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "events"}
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${activeTab === "events" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
            >
              <CalendarDays className="h-4 w-4" /> Мероприятия
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "users"}
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${activeTab === "users" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
            >
              <Users className="h-4 w-4" /> Пользователи
            </button>
          </div>
        </div>

        {activeTab === "events" ? (
          <EventsTable 
            events={events} 
            onEdit={(ev) => { setEventToEdit(ev); setEditTitle(ev.title); }} 
            onDelete={setEventToDelete} 
          />
        ) : (
          <UsersTable users={users} />
        )}
      </div>

      {eventToDelete && (
        <Dialog onClose={() => setEventToDelete(null)}>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Trash2 className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-slate-900">Удалить мероприятие?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">«{eventToDelete.title}» будет безвозвратно удалено из базы данных.</p>
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setEventToDelete(null)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Отмена</button>
            <button type="button" onClick={deleteEvent} className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Удалить</button>
          </div>
        </Dialog>
      )}

      {eventToEdit && (
        <Dialog onClose={() => setEventToEdit(null)}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Редактировать мероприятие</h2>
            <button type="button" onClick={() => setEventToEdit(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700"><X className="h-5 w-5" /></button>
          </div>
          <label htmlFor="edit-event-title" className="mt-5 block text-sm font-semibold text-slate-700">Название</label>
          <input id="edit-event-title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-hidden" />
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setEventToEdit(null)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Отмена</button>
            <button type="button" onClick={saveEdit} disabled={!editTitle.trim()} className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">Сохранить</button>
          </div>
        </Dialog>
      )}
    </section>
  );
}

function Dialog({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" onMouseDown={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}