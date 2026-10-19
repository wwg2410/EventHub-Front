"use client";

import { useState } from "react";
import Modal from "./Modal";
import type { Event, EventFormData } from "@/types/event";

interface Props {
  event: Event;
  isSaving: boolean;
  error: string;
  onSave: (values: EventFormData) => void;
  onClose: () => void;
}

const inputStyle = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm";

export default function EditEventModal({
  event,
  isSaving,
  error,
  onSave,
  onClose,
}: Props) {
  const [form, setForm] = useState({
    title: event.title,
    description: event.description,
    date: event.date ? event.date.split("T")[0] : "",
    time: event.time,
    address: event.address,
    category: event.category,
    price: String(event.price),
    seats: String(event.seats),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      price: Number(form.price),
      seats: Number(form.seats),
    });
  };

  return (
    <Modal title="Редактировать мероприятие" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Название</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className={inputStyle}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Описание</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className={inputStyle}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Дата</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Время</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className={inputStyle}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Адрес</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className={inputStyle}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Категория</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Цена</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              min="0"
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Мест</label>
            <input
              type="number"
              name="seats"
              value={form.seats}
              onChange={handleChange}
              min="1"
              className={inputStyle}
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </form>
    </Modal>
  );
}