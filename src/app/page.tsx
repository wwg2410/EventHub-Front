'use client'

import { useState } from 'react'
import Link from 'next/link' // Импортируем нативный компонент Link
import mockEvents from '../../db.json'
import Hero from './components/Hero'
import { Search, CalendarDays, MapPin, CircleDollarSign, UsersRound } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const eventsArray = Array.isArray(mockEvents) ? mockEvents : (mockEvents.events || []);
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortOption, setSortOption] = useState('date-ask')
  
  const filteredEvents = eventsArray.filter((event: any) => {
    if (!event) return false 

    const matchesSearch = event.title 
    ? event.title.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
    : false;
    const matchesCategory = selectedCategory === '' ? true: event.category === selectedCategory;
    return matchesSearch && matchesCategory
  })

  const sortedEvents = [...filteredEvents].sort((a:any, b:any) => {
    if (sortOption === 'price-ask') {
      return Number(a.price) - Number(b.price)
    }
    if (sortOption === 'price-desc') {
      return Number(b.price) - Number(a.price);
    }
    if (sortOption === 'seats-desk' ) {
      return Number(b.seats) - Number(a.seats);
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] font-sans">
      <Hero />

      <main className="p-4 sm:p-6 md:p-[30px_20px] max-w-[1200px] mx-auto w-full box-border flex-1">
        
        <div className="mb-6 md:mb-[30px] text-center sm:text-left">
          <h1 className="text-[#0F172A] text-2xl sm:text-3xl md:text-[32px] font-extrabold mb-2 m-[0_0_8px_0]">
            Афиша мероприятий
          </h1>
          <h2 className="text-[#64748B] text-base sm:text-lg font-normal m-0">
            Открывайте интересные события рядом с вами
          </h2>
        </div>

        <div className="search-input flex flex-col md:flex-row md:items-end gap-4 md:gap-5 mb-8 md:mb-10 w-full">
          <div className="relative md:flex-1 flex flex-col gap-[6px]">
            <span className="text-[#334155] text-sm font-semibold">Название</span>
            <div className="relative">
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
              />
              <input
                value={searchQuery}
                type="text"
                placeholder="Поиск мероприятий по названию...."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-[12px_12px_12px_42px] text-[15px] rounded-lg border border-[#CBD5E1] box-border text-[#0F172A] bg-white outline-none focus:border-[#2563EB] transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 md:flex-1 w-full">
            <label htmlFor="select-category" className="flex flex-col gap-[6px] flex-1 text-[#334155] text-sm font-semibold"> 
              Все категории
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} name="category" id="select-category" className="w-full p-3 rounded-lg border border-[#CBD5E1] bg-white text-[#0F172A] text-[15px] cursor-pointer outline-none focus:border-[#2563EB] transition-colors">
                <option value="">Все категории</option>
                <option value="concert">Театр и шоу</option>
                <option value="cinema">Кино</option>
                <option value="exhibition">Выставки и искусство</option>
                <option value="education">Образование и лекции</option>
                <option value="business">Бизнес и нетворкинг</option>
                <option value="sport">Спорт и activeный отдых</option>
                <option value="gastronomy">Гастрономия</option>
                <option value="family">Для детей и семьи</option>
                <option value="party">Вечеринки и ночная жизнь</option>
              </select>
            </label>
            
            <label htmlFor="select-near" className="flex flex-col gap-[6px] flex-1 text-[#334155] text-sm font-semibold">
              Сортировка
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} name="near" id="select-near" className="w-full p-3 rounded-lg border border-[#CBD5E1] bg-white text-[#0F172A] text-[15px] cursor-pointer outline-none focus:border-[#2563EB] transition-colors">
                <option value="date-ask">Сначала ближайшие</option>
                <option value="price-ask">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
                <option value="seats-desk">Много мест</option>
              </select>
            </label>
          </div>
        </div>

        <h2 className="text-[#0F172A] text-xl sm:text-2xl font-bold mb-5 text-center sm:text-left">
          Ближайшие мероприятия
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedEvents.map((event: any) => (
            
            /* ИСПРАВЛЕНО ТУТ: Карточка теперь обернута в компонент Link для 100% срабатывания перехода */
            <Link 
              key={event.id} 
              href={`/events/${event.id}`}
              className="card-container flex flex-col w-full rounded-xl border border-[#E2E8F0] overflow-hidden bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-[#2563EB]/30 active:scale-[0.98]"
            >
              <div className="img-container relative w-full h-44 sm:h-40 bg-[#F1F5F9] overflow-hidden">
                <img 
                  src={event.imageUrl || "https://unsplash.com"} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 bg-[#b5cae6] p-[6px_10px] rounded-md text-[11px] font-bold text-[#2563EB] shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                  {event.category === 'concert' ? 'Концерт' : event.category === 'exhibition' ? 'Выставка' : event.category === 'sport' ? 'Спорт' : event.category}
                </span>
              </div>
              
              <div className="card-main flex flex-col p-4 gap-[10px] flex-grow">
                <h3 className="m-0 text-base font-bold text-[#0F172A] min-h-[44px] line-clamp-2 overflow-hidden leading-[1.4]">
                  {event.title}
                </h3>
                
                <div className="flex items-center gap-2 text-[#475569] text-[13px]">
                  <CalendarDays size={15} className="text-[#2563EB] shrink-0" />
                  <span>{event.date} в {event.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-[#475569] text-[13px]">
                  <MapPin size={15} className="text-[#2563EB] shrink-0" />
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">{event.address}</span>
                </div>
                
                <div className="flex items-center gap-2 text-[#475569] text-[13px]">
                  <CircleDollarSign size={15} className="text-[#2563EB] shrink-0" />
                  <span className="font-bold text-[#0F172A] text-sm">
                    {event.price === 0 || event.price === '0' ? 'Бесплатно' : `${event.price} ₽`}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-[#64748B] text-xs mt-auto pt-2 border-t border-[#F1F5F9]">
                  <UsersRound size={14} className="text-[#64748B] shrink-0" /> 
                  <span>Осталось мест: <strong className="text-[#0F172A]">{event.seats}</strong></span>
                </div>
                
                {/* Кнопка теперь просто стилизованный div, так как за переход отвечает верхний Link */}
                <div className="w-full mt-3 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white h-11 rounded-lg font-semibold flex items-center justify-center transition-colors">
                  Подробнее
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
