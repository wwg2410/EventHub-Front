'use client';

import { useState } from 'react';

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    address: '',
    category: '',
    price: '',
    seats: '',
    image: null,
  });


const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // тут обработка отправки формы, например, отправка данных на сервер
    console.log(formData);
  }

return (
<div className="max-w-7xl mx-auto px-8 py-10">
      <h1 className="text-4xl font-extrabold mb-2">Создать мероприятие</h1>
      <p className="text-gray-500 mb-8">Расскажите о вашем мероприятии, чтобы привлечь участников</p>

<form onSubmit={handleSubmit} className="space-y-6">
        {/* Поле названия */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Название мероприятия <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Например, Летний джаз в Саду «Эрмитаж»"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
          />
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition"
        >
          Создать мероприятие
        </button>
      </form>





      </div>
  );
  
}
