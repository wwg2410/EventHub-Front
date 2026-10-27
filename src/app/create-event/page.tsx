
"use client";

import { useState } from "react";
import { Image, X } from "lucide-react";
import Link from "next/link";

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    address: "",
    category: "",
    price: "",
    seats: "",
    image: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setMessage("");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Введите название мероприятия";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Название должно содержать минимум 3 символа";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Введите описание мероприятия";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Описание должно содержать минимум 10 символов";
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayString = `${year}-${month}-${day}`;

    if (!formData.date) {
      newErrors.date = "Выберите дату мероприятия";
    } else if (formData.date < todayString) {
      newErrors.date = "Дата не может быть в прошлом";
    }

    if (!formData.time) {
      newErrors.time = "Выберите время мероприятия";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Введите адрес мероприятия";
    } else if (formData.address.trim().length < 3) {
      newErrors.address = "Адрес слишком короткий";
    }

    if (formData.price.trim() === "") {
      newErrors.price = "Введите цену билета";
    } else if (
      !Number.isFinite(Number(formData.price)) ||
      Number(formData.price) < 0 ||
      Number(formData.price) > 10000000
    ) {
      newErrors.price = "Цена должна быть от 0 до 10 000 000";
    }

    if (formData.seats.trim() === "") {
      newErrors.seats = "Введите количество мест";
    } else if (
      !Number.isInteger(Number(formData.seats)) ||
      Number(formData.seats) < 1 ||
      Number(formData.seats) > 1000000
    ) {
      newErrors.seats = "Количество мест должно быть от 1 до 1 000 000";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Добавьте ссылку на изображение";
    } else {
      try {
        const url = new URL(formData.image);

        if (url.protocol !== "http:" && url.protocol !== "https:") {
          newErrors.image = "Ссылка должна начинаться с http:// или https://";
        }
      } catch {
        newErrors.image = "Введите корректную ссылку на изображение";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreateEvent = () => {
    setMessage("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setMessage(
      "Все поля заполнены правильно! Создание мероприятия пока не подключено.",
    );
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));

    setMessage("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-[#0F172A] text-3xl font-bold mb-2">
        Создайте мероприятие
      </h1>

      <p className="text-[#64748B] mb-8">
        Расскажите о вашем мероприятии, чтобы привлечь участников
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Левая часть */}
        <div className="lg:col-span-2 space-y-6">
          {/* Название */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Название мероприятия <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Например, Летний джаз"
              maxLength={100}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#2563EB]"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
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
                placeholder="Расскажите о вашем мероприятии..."
                maxLength={1000}
                rows={5}
                className="w-full px-4 py-3 pb-8 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#2563EB] resize-y"
              />

              <span className="absolute bottom-3 right-3 text-xs text-[#64748B]">
                {formData.description.length}/1000
              </span>
            </div>

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Дата и время */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Дата <span className="text-red-500">*</span>
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#2563EB] text-gray-600"
              />

              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Время <span className="text-red-500">*</span>
              </label>

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#2563EB] text-gray-600"
              />

              {errors.time && (
                <p className="text-red-500 text-sm mt-1">{errors.time}</p>
              )}
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
              placeholder="Укажите адрес мероприятия"
              maxLength={255}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#2563EB]"
            />

            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Категория, цена и места */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Категория
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#2563EB]"
              >
                <option value="">Выберите категорию</option>
                <option value="concert">Театр и шоу</option>
                <option value="cinema">Кино</option>
                <option value="exhibition">Выставки и искусство</option>
                <option value="education">Образование и лекции</option>
                <option value="business">Бизнес и нетворкинг</option>
                <option value="sport">Спорт и активный отдых</option>
                <option value="gastronomy">Гастрономия</option>
                <option value="family">Для детей и семьи</option>
                <option value="party">Вечеринки и ночная жизнь</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Цена билета <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="500"
                min="0"
                max="10000000"
                step="0.01"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#2563EB]"
              />

              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Количество мест <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                placeholder="100"
                min="1"
                max="1000000"
                step="1"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#2563EB]"
              />

              {errors.seats && (
                <p className="text-red-500 text-sm mt-1">{errors.seats}</p>
              )}
            </div>
          </div>
        </div>

        {/* Изображение */}
        <div className="space-y-2">
          <label className="block text-[#0F172A] text-sm font-semibold mb-2">
            Изображение мероприятия <span className="text-red-500">*</span>
          </label>

          <div className="relative flex flex-col items-center justify-center min-h-[380px] px-6 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50 overflow-hidden">
            {formData.image ? (
              <>
                <img
                  src={formData.image}
                  alt="Изображение мероприятия"
                  onError={() =>
                    setErrors((prev) => ({
                      ...prev,
                      image: "Не удалось загрузить изображение по этой ссылке",
                    }))
                  }
                  onLoad={() =>
                    setErrors((prev) => ({
                      ...prev,
                      image: "",
                    }))
                  }
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors z-10"
                  title="Удалить картинку"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center text-center w-full">
                <div className="w-16 h-16 mb-4 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <Image className="w-8 h-8" />
                </div>

                <p className="text-base font-semibold text-[#64748B] mb-1">
                  Добавьте изображение
                </p>

                <p className="text-sm text-[#64748B] mb-4">
                  Вставьте ссылку на картинку
                </p>

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  maxLength={2048}
                  className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#2563EB]"
                />
              </div>
            )}
          </div>

          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        {/* Кнопки */}
        <div className="lg:col-span-3 mt-4 pt-6 border-t border-gray-100">
          {message && (
            <p className="text-green-600 text-sm mb-4">{message}</p>
          )}

          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-[#2563EB] font-medium hover:underline flex items-center gap-2"
            >
              ← Отмена
            </Link>

            <button
              type="button"
              onClick={handleCreateEvent}
              className="px-6 py-3 bg-[#2563EB] text-white font-medium rounded-xl hover:bg-[#1D4ED8] transition-colors"
            >
              Создать мероприятие
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
