'use client';

import { useState } from 'react';
import { Image } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* заголовок страницы */}
      <h1 className="text-[#0F172A] text-3xl font-bold mb-2 ">Сздайте мероприятие</h1>
      <p className="text-[#64748B] mb-8">Расскажите о вашем мероприятии, чтобы привлечь участников</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Левый блок с описанием */}
        <div className="lg:col-span-2 space-y-6">

          {/* Название мероприятия */}
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#2563EB]"
            />
          </div>

          {/* Описание */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Описание <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Расскажите, о чем ваше мероприятие, что ждет участников..."
                required
                maxLength={1000}
                rows={5}
                className="w-full px-4 py-3 pb-8 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 resize-y"
              />
              <span className="absolute bottom-3 right-3 text-xs text-gray-400">
                {formData.description?.length || 0}/1000
              </span>
            </div>
          </div>

          {/* Дата и время (в одну строку) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Дата и время <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 opacity-0 hidden sm:block">Время</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-gray-600"
              />
            </div>
          </div>

          {/* Адрес */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Адрес <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Например, Москва, ул. Покровка, 47"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
            />
          </div>

          {/* Категория, Цена, Количество мест */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Категория <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
              >
                <option value="">Выберите категорию</option>
                <option value="concert">Концерт</option>
                <option value="exhibition">Выставка</option>
                <option value="sport">Спорт</option>
              </select>
            </div>
            {/* цена билетов  */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Цена билета <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Например, 500"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
              />
            </div>
            {/* количество мест */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Количество мест <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                placeholder="Например, 100"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
              />
            </div>
          </div>

        </div>

        {/* правый блок с фотографиями  */}

        {/* добавление изображения */}
        <div className="space-y-2">
          <label className="block  text[#0F172A]text-sm font-semibold mb-2">
            Изображение мероприятия <span className="text-red-500">*</span>
          </label>

          <label className="flex flex-col items-center justify-center h-90 px-6 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Image className="w-8 h-8" />
              </div>
              <p className="text-base font-semibold text-[#64748B] mb-1">Загрузите изображение</p>
              <p className="text-sm text-[#64748B] mb-2">Перетащите файл сюда или нажмите для выбора</p>
              <p className="text-xs text-[#64748B]">JPG, PNG, до 5 МБ</p>
            </div>
            <input type="file" name="image" accept="image/png, image/jpeg" className="hidden" />
          </label>
        </div>

      </form>

      {/* панель с кнопкамми */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-100">
        <button type="button" className="text-blue-600 font-medium hover:underline flex items-center gap-2 ">
          ← Отмена
        </button>
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
          Создать мероприятие
        </button>
      </div>
    </div>
  );
}
