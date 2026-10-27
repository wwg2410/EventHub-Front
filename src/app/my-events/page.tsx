"use client";

import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import EditEventModal from "../components/EditEvents";
import DeleteEventModal from "../components/DeleteEvents";
import type { Event, EventFormData, MyEventsResponse } from "@/types/event";

type Tab = "created" | "registered";

const tabs: { id: Tab; label: string }[] = [
  { id: "created", label: "Созданные мной" },
  { id: "registered", label: "Я записан" },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}
export default function MyEventsPage() {
  const [tab, setTab] = useState<Tab>("created");
  const [data, setData] = useState<MyEventsResponse>({ created: [], registered: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState<Event | null>(null);
  const [deleting, setDeleting] = useState<Event | null>(null);
  const [busy, setBusy] = useState(false);
  const [modalError, setModalError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

fetch(`${API_URL}/users/me/events`, {
  headers: getAuthHeaders(),
  signal: controller.signal,
})
      .then((res) => {
        if (!res.ok) throw new Error("request failed");
        return res.json() as Promise<MyEventsResponse>;
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError("Не удалось загрузить мероприятия");
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const openEdit = (event: Event) => {
    setModalError("");
    setEditing(event);
  };

  const openDelete = (event: Event) => {
    setModalError("");
    setDeleting(event);
  };

  const handleSave = async (values: EventFormData) => {
    if (!editing) return;
    setBusy(true);
    setModalError("");
    try {
      const res = await fetch(`${API_URL}/events/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("request failed");
      const updated: Event = await res.json();
      setData((prev) => ({
        created: prev.created.map((e) => (e.id === updated.id ? updated : e)),
        registered: prev.registered.map((e) => (e.id === updated.id ? updated : e)),
      }));
      setEditing(null);
    } catch {
      setModalError("Не удалось сохранить изменения");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    setModalError("");
    try {
      const res = await fetch(`${API_URL}/events/${deleting.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("request failed");
      setData((prev) => ({
        created: prev.created.filter((e) => e.id !== deleting.id),
        registered: prev.registered.filter((e) => e.id !== deleting.id),
      }));
      setDeleting(null);
    } catch {
      setModalError("Не удалось удалить мероприятие");
    } finally {
      setBusy(false);
    }
  };

  const list = data[tab];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-1">Мои мероприятия</h1>
      <p className="text-gray-500 mb-6">Управляйте своими мероприятиями и записями</p>

      <div className="flex gap-4 border-b border-gray-200 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tab === t.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            {t.label} ({data[t.id].length})
          </button>
        ))}
      </div>

      {loading && <p className="text-gray-500 text-sm">Загрузка...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {!loading && !error && list.length === 0 && (
        <p className="text-gray-500 text-sm">
          {tab === "created"
            ? "Вы ещё не создали ни одного мероприятия."
            : "Вы пока никуда не записаны."}
        </p>
      )}

      <div className="space-y-4">
        {list.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={tab === "created" ? openEdit : undefined}
            onDelete={tab === "created" ? openDelete : undefined}
          />
        ))}
      </div>

      {editing && (
        <EditEventModal
          event={editing}
          isSaving={busy}
          error={modalError}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}

      {deleting && (
        <DeleteEventModal
          event={deleting}
          isDeleting={busy}
          error={modalError}
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </div>
  );
}