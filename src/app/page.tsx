
'use client'

import { useState } from 'react'
import mockEvents from '../../db.json'
import Hero from './components/Hero'
import {
  Search,
  CalendarDays,
  MapPin,
  CircleDollarSign,
  UsersRound,
} from 'lucide-react'

type EventItem = {
  id: string | number
  title: string
  price?: number | string | null
  date?: string
  time?: string
  address?: string
  imageUrl?: string
  category?: string
  seats?: number | string | null
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortOrder, setSortOrder] = useState('soon')

  const eventsArray: EventItem[] = (
    Array.isArray(mockEvents)
      ? mockEvents
      : mockEvents.events || []
  ) as EventItem[]

  const filteredEvents = eventsArray
    .filter((event) => {
      if (!event || !event.title) return false

      const matchesTitle = event.title
        .toLowerCase()
        .trim()
        .includes(searchQuery.toLowerCase().trim())

      const matchesCategory =
        !selectedCategory || event.category === selectedCategory

      return matchesTitle && matchesCategory
    })
    .sort((a, b) => {
      if (sortOrder === 'price') {
        return Number(a.price || 0) - Number(b.price || 0)
      }

      if (sortOrder === 'title') {
        return String(a.title).localeCompare(String(b.title), 'ru')
      }

      return 0
    })

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] font-sans">
      <Hero />

      <main className="mx-auto box-border w-full max-w-[1200px] flex-1 p-4 sm:p-6 md:px-5 md:py-[30px]">
        <div className="mb-6 text-center sm:mb-[30px] sm:text-left">
          <h1 className="mb-2 text-2xl font-extrabold text-[#0F172A] sm:text-3xl md:text-[32px]">
            Афиша мероприятий
          </h1>

          <h2 className="text-base font-normal text-[#64748B] sm:text-lg">
            Открывайте интересные события рядом с вами
          </h2>
        </div>

        {/* Поиск и фильтры */}
        <div className="mb-8 flex w-full max-w-[900px] flex-col gap-4 md:mb-10 md:flex-row md:items-end md:gap-5">
          <div className="relative flex flex-1 flex-col gap-[6px]">
            <label
              htmlFor="event-search"
              className="text-sm font-semibold text-[#334155]"
            >
              Название
            </label>

            <div className="relative">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />

              <input
                id="event-search"
                type="text"
                value={searchQuery}
                placeholder="Поиск мероприятий по названию..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="box-border w-full rounded-lg border border-[#CBD5E1] bg-white p-[12px_12px_12px_42px] text-[15px] text-[#0F172A] outline-none transition-colors focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col gap-4 sm:flex-row md:gap-5">
            <label
              htmlFor="select-category"
              className="flex flex-1 flex-col gap-[6px] text-sm font-semibold text-[#334155]"
            >
              Категория

              <select
                id="select-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-[#CBD5E1] bg-white p-3 text-[15px] text-[#0F172A] outline-none focus:border-[#2563EB]"
              >
                <option value="">Все категории</option>
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
            </label>

            <label
              htmlFor="select-sort"
              className="flex flex-1 flex-col gap-[6px] text-sm font-semibold text-[#334155]"
            >
              Сортировка

              <select
                id="select-sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-[#CBD5E1] bg-white p-3 text-[15px] text-[#0F172A] outline-none focus:border-[#2563EB]"
              >
                <option value="soon">Сначала ближайшие</option>
                <option value="price">Сначала дешевле</option>
                <option value="title">По названию</option>
              </select>
            </label>
          </div>
        </div>

        {/* Карточки мероприятий */}
        <h2
          id="events"
          className="mb-5 text-center text-xl font-bold text-[#0F172A] sm:text-left sm:text-2xl"
        >
          Ближайшие мероприятия
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredEvents.map((event) => (
            <article
              key={event.id}
              className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-[transform,box-shadow,border-color] duration-300 ease-out hover:z-10 hover:scale-[1.03] hover:border-blue-200 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none"
            >
              {/* Изображение */}
              <div className="relative h-44 w-full shrink-0 overflow-hidden bg-[#F1F5F9] sm:h-40">
                <img
                  src={
                    event.imageUrl ||
                    'https://placehold.co/600x400?text=Event'
                  }
                  alt={event.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none"
                />

                <span className="absolute bottom-3 left-3 rounded-md bg-[#b5cae6] p-[6px_10px] text-[11px] font-bold text-[#2563EB] shadow-sm">
                  {event.category === 'concert'
                    ? 'Концерт'
                    : event.category === 'exhibition'
                      ? 'Выставка'
                      : event.category === 'sport'
                        ? 'Спорт'
                        : event.category === 'cinema'
                          ? 'Кино'
                          : event.category === 'education'
                            ? 'Образование'
                            : event.category === 'business'
                              ? 'Бизнес'
                              : event.category === 'gastronomy'
                                ? 'Гастрономия'
                                : event.category === 'family'
                                  ? 'Для семьи'
                                  : event.category === 'party'
                                    ? 'Вечеринка'
                                    : event.category}
                </span>
              </div>

              {/* Информация */}
              <div className="flex flex-1 flex-col gap-[10px] p-4">
                <h3 className="m-0 min-h-[44px] overflow-hidden text-ellipsis text-base font-bold leading-[1.4] text-[#0F172A] line-clamp-2">
                  {event.title}
                </h3>

                <div className="flex items-center gap-2 text-[13px] text-[#475569]">
                  <CalendarDays
                    size={15}
                    className="shrink-0 text-[#2563EB]"
                  />
                  <span>
                    {event.date}
                    {event.time ? ` в ${event.time}` : ''}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[13px] text-[#475569]">
                  <MapPin size={15} className="shrink-0 text-[#2563EB]" />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {event.address || 'Место уточняется'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[13px] text-[#475569]">
                  <CircleDollarSign
                    size={15}
                    className="shrink-0 text-[#2563EB]"
                  />

                  <span className="text-sm font-bold text-[#0F172A]">
                    {event.price === 0 || event.price === '0'
                      ? 'Бесплатно'
                      : event.price != null
                        ? `${event.price} ₽`
                        : 'Цена уточняется'}
                  </span>
                </div>

                <div className="mt-auto flex items-center gap-2 border-t border-[#F1F5F9] pt-2 text-xs text-[#64748B]">
                  <UsersRound
                    size={14}
                    className="shrink-0 text-[#64748B]"
                  />

                  <span>
                    Осталось мест:{' '}
                    <strong className="text-[#0F172A]">
                      {event.seats ?? 'Уточняется'}
                    </strong>
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-3 h-11 w-full rounded-lg bg-[#2563EB] font-semibold text-white transition-colors hover:bg-[#1D4ED8] active:bg-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  Подробнее
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <p className="py-10 text-center text-slate-500">
            Мероприятия не найдены. Попробуйте изменить поиск или категорию.
          </p>
        )}
      </main>
    </div>
  )
}
