'use client'
import "react";
import { useState } from 'react'
import mockEvents from '../../db.json'
import Hero from './components/Hero'
import { Search, CalendarDays, MapPin, CircleDollarSign, UsersRound } from 'lucide-react';


export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const eventsArray = Array.isArray(mockEvents) ? mockEvents : (mockEvents.events || []);

  const filteredEvents = eventsArray.filter((event: any) => {
    if (!event || !event.title) return false;
    return event.title.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
  })

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

        <div className="search-input flex flex-col md:flex-row md:items-end gap-4 md:gap-5 max-w-[900px] mb-8 md:mb-10 w-full">

          <div className="relative flex-1 flex flex-col gap-[6px]">
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

          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 flex-1 w-full">
            <label htmlFor="select-category" className="flex flex-col gap-[6px] flex-1 text-[#334155] text-sm font-semibold"> 
              Все категории
              <select name="category" id="select-category" className="w-full p-3 rounded-lg border border-[#CBD5E1] bg-white text-[#0F172A] text-[15px] cursor-pointer outline-none focus:border-[#2563EB] transition-colors">
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
            
            <label htmlFor="select-near" className="flex flex-col gap-[6px] flex-1 text-[#334155] text-sm font-semibold">
              Сортировка
              <select name="near" id="select-near" className="w-full p-3 rounded-lg border border-[#CBD5E1] bg-white text-[#0F172A] text-[15px] cursor-pointer outline-none focus:border-[#2563EB] transition-colors">
                <option value="soon">Сначала ближайшие</option>
              </select>
            </label>
          </div>
        </div>

        <h2 className="text-[#0F172A] text-xl sm:text-2xl font-bold mb-5 text-center sm:text-left">
          Ближайшие мероприятия
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEvents.map((event: any) => (
            
            <div key={event.id} className="card-container flex flex-col w-full rounded-xl border border-[#E2E8F0] overflow-hidden bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
              <div className="img-container relative w-full h-44 sm:h-40 bg-[#F1F5F9]">
                <img 
                  src={event.imageUrl || "https://unsplash.com"} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
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
                
                <button className="w-full mt-3 bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white h-11 rounded-lg font-semibold transition-colors">
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
