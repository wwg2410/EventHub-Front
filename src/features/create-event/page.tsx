"use client";
// переделал
import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, X } from "lucide-react";
import Link from "next/link";
import { createEvent } from "./api/create-event";
// константа для максимального размера изображения в байтах (5 МБ)
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const categories = [
  ["concert", "Театр и шоу"],
  ["cinema", "Кино"],
  ["exhibition", "Выставки и искусство"],
  ["education", "Образование и лекции"],
  ["business", "Бизнес и нетворкинг"],
  ["sport", "Спорт и активный отдых"],
  ["gastronomy", "Гастрономия"],
  ["family", "Для детей и семьи"],
  ["party", "Вечеринки и ночная жизнь"],
] as const;

// обязательные поля для создания мероприятия
interface FormData {
  title: string;
  description: string;
  date: string;
  time: string;
  address: string;
  category: string;
  price: string;
  seats: string;
}

const initialFormData: FormData = {
  title: "",
  description: "",
  date: "",
  time: "",
  address: "",
  category: "",
  price: "",
  seats: "",
};

const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-blue-600/20";
// эксплортируем страницу с формой создания мероприятия 
export default function CreateEventPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const minDate = today.toISOString().slice(0, 10);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setError("");
    setMessage("");
  };

  // только изображения JPG и PNG, размер не более 5 МБ
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Можно загружать только изображения JPG или PNG");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Размер изображения не должен превышать 5 МБ");
      event.target.value = "";
      return;
    }

    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
    setMessage("");
  };

  const handleRemoveImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview("");
    setError("");
    setMessage("");
  };
// загрузка изображения на Cloudinary и получение URL
  const uploadImage = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error(
        "Не настроены Cloudinary Cloud Name и Upload Preset. Проверьте .env.local",
      );
    }
// создание FormData для отправки изображения на Cloudinary
    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", uploadPreset);
    body.append("folder", "eventhub/events");

    // фетч запрос для изображения 
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body },
    );
    const result: unknown = await response.json();

    if (!response.ok) {
      const uploadError =
        typeof result === "object" &&
        result !== null &&
        "error" in result &&
        typeof result.error === "object" &&
        result.error !== null &&
        "message" in result.error &&
        typeof result.error.message === "string"
          ? result.error.message
          : "Не удалось загрузить изображение";
      throw new Error(uploadError);
    }

    if (
      typeof result !== "object" ||
      result === null ||
      !("secure_url" in result) ||
      typeof result.secure_url !== "string"
    ) {
      throw new Error("Cloudinary не вернул ссылку на изображение");
    }

    return result.secure_url;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!imageFile) {
      setError("Добавьте изображение мероприятия");
      return;
    }

    const price = Number(formData.price);
    const seats = Number(formData.seats);
    if (!Number.isFinite(price) || price < 0 || price > 10_000_000) {
      setError("Цена должна быть от 0 до 10 000 000");
      return;
    }
    if (!Number.isInteger(seats) || seats < 1 || seats > 1_000_000) {
      setError("Количество мест должно быть от 1 до 1 000 000");
      return;
    }
// загрузка изображения и создание мероприятия
    setIsLoading(true);
    try {
      const imageUrl = await uploadImage(imageFile);
      await createEvent({
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: `${formData.date}T${formData.time}`,
        address: formData.address.trim(),
        category: formData.category,
        price,
        capacity: seats,
        image: imageUrl,
      });

      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setFormData(initialFormData);
      setImageFile(null);
      setImagePreview("");
      setMessage("Мероприятие успешно создано!");
    } catch (submitError: unknown) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Произошла ошибка при создании мероприятия",
      );
    } finally {
      setIsLoading(false);
    }
  };
// отрисовка формы создания мероприятия с полями и кнопками
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-[#0F172A]">
        Создайте мероприятие
      </h1>
      <p className="mb-8 text-[#64748B]">
        Расскажите о вашем мероприятии, чтобы привлечь участников
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        <div className="space-y-6 lg:col-span-2">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-semibold">
              Название мероприятия <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Например, Летний джаз"
              minLength={3}
              maxLength={100}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold"
            >
              Описание <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Расскажите о вашем мероприятии..."
                minLength={10}
                maxLength={1000}
                rows={5}
                required
                className={`${inputClass} resize-y pb-8`}
              />
              <span className="absolute bottom-3 right-3 text-xs text-[#64748B]">
                {formData.description.length}/1000
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="date" className="mb-2 block text-sm font-semibold">
                Дата <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={minDate}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="time" className="mb-2 block text-sm font-semibold">
                Время <span className="text-red-500">*</span>
              </label>
              <input
                id="time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-semibold"
            >
              Адрес <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Укажите адрес мероприятия"
              minLength={3}
              maxLength={255}
              required
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold"
              >
                Категория <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={`${inputClass} bg-white`}
              >
                <option value="">Выберите категорию</option>
                {categories.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="price" className="mb-2 block text-sm font-semibold">
                Цена билета <span className="text-red-500">*</span>
              </label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="500"
                min="0"
                max="10000000"
                step="0.01"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="seats" className="mb-2 block text-sm font-semibold">
                Количество мест <span className="text-red-500">*</span>
              </label>
              <input
                id="seats"
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                placeholder="100"
                min="1"
                max="1000000"
                step="1"
                required
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <span className="mb-2 block text-sm font-semibold text-[#0F172A]">
            Изображение мероприятия <span className="text-red-500">*</span>
          </span>
          <div className="relative flex min-h-[380px] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 px-6">
            {imagePreview ? (
              <>
                <Image
                  src={imagePreview}
                  alt="Превью мероприятия"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isLoading}
                  className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                  aria-label="Удалить изображение"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            ) : (
              <label className="absolute inset-0 flex h-full w-full cursor-pointer flex-col items-center justify-center text-center">
                <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB]">
                  <ImageIcon aria-hidden="true" className="h-8 w-8" />
                </span>
                <span className="mb-1 text-base font-semibold text-[#64748B]">
                  Нажмите для загрузки изображения
                </span>
                <span className="text-sm text-[#64748B]">PNG, JPG до 5 МБ</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleImageChange}
                  disabled={isLoading}
                  className="sr-only"
                />
              </label>
            )}
          </div>
        </div>

        <div className="mt-4 border-t border-gray-100 pt-6 lg:col-span-3">
          {error && (
            <p role="alert" className="mb-4 text-sm text-red-600">
              {error}
            </p>
          )}
          {message && (
            <p role="status" className="mb-4 text-sm text-green-600">
              {message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-[#2563EB] hover:underline"
            >
              ← Отмена
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-[#2563EB] px-6 py-3 font-medium text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isLoading ? "Создание..." : "Создать мероприятие"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
