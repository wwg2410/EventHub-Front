'use client'
import "react";
import { useState } from 'react'
import mockEvents from '../../db.json'
import { Search, CalendarDays, MapPin, CircleDollarSign, UsersRound } from 'lucide-react';


export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const eventsArray = Array.isArray(mockEvents) ? mockEvents : (mockEvents.events || []);

  const filteredEvents = eventsArray.filter((event: any) => {
    if (!event || !event.title) return false;
    return event.title.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
  })

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      backgroundColor: '#FAFAFA',
      fontFamily: 'system-ui, sans-serif'
    }}>
  
      <main style={{ 
        padding: '30px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        width: '100%',
        boxSizing: 'border-box',
        flex: '1' 
      }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#0F172A', fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0' }}>Афиша мероприятий</h1>
          <h2 style={{ color: '#64748B', fontSize: '18px', fontWeight: '400', margin: '0' }}>Открывайте интересные события рядом с вами</h2>
        </div>

        <div className="search-input" style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          gap: '20px', 
          maxWidth: '900px', 
          marginBottom: '40px',
          width: '100%'
        }}>

          <div style={{ position: 'relative', flex: '3', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ color: '#334155', fontSize: '14px', fontWeight: '600' }}>Название</span>
            <div style={{ position: 'relative' }}>
              <Search 
                size={18} 
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94A3B8',
                  pointerEvents: 'none' 
                }} 
              />
              <input
                value={searchQuery}
                type="text"
                placeholder="Поиск мероприятий по названию...."
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 42px', 
                  fontSize: '15px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  boxSizing: 'border-box',
                  color: '#0F172A',
                  backgroundColor: '#FFFFFF',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <label htmlFor="select-category" style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1', color: '#334155', fontSize: '14px', fontWeight: '600' }}> 
            Все категории
            <select name="category" id="select-category" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#0F172A', fontSize: '15px', cursor: 'pointer', outline: 'none', width: '250px' }}>
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
          <label htmlFor="select-near" style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: '1', color: '#334155', fontSize: '14px', fontWeight: '600' }}>
            Сортировка
            <select name="near" id="select-near" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', color: '#0F172A', fontSize: '15px', cursor: 'pointer', outline: 'none', width: '250px' }}>
              <option value="soon">Сначала ближайшие</option>
            </select>
          </label>
        </div>

        <h2 style={{ color: '#0F172A', fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>Ближайшие мероприятия</h2>
        <div className='grid' style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '24px' }}>
          {filteredEvents.map((event: any) => (
            
            /* Карточка */
            <div key={event.id} className='card-container' style={{ display: 'flex', flexDirection: 'column', width: '100%', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', backgroundColor: '#FFFFFF', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ position: 'relative', width: '100%', height: '160px', backgroundColor: '#F1F5F9' }} className="img-container">
                <img 
                  src={event.imageUrl || "https://unsplash.com"} 
                  alt={event.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{ position: 'absolute', bottom: '12px', left: '12px', backgroundColor: '#b5cae6', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', color: '#2563EB', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  {event.category === 'concert' ? 'Концерт' : event.category === 'exhibition' ? 'Выставка' : event.category === 'sport' ? 'Спорт' : event.category}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '10px' }} className='card-main'>
                
                <h3 style={{ margin: '0', fontSize: '16px', fontWeight: '700', color: '#0F172A', minHeight: '44px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                  {event.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '13px' }}>
                  <CalendarDays size={15} style={{ color: '#2563EB', flexShrink: 0 }} />
                  <span>{event.date} в {event.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '13px' }}>
                  <MapPin size={15} style={{ color: '#2563EB', flexShrink: 0 }} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.address}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '13px' }}>
                  <CircleDollarSign size={15} style={{ color: '#2563EB', flexShrink: 0 }} />
                  <span style={{ fontWeight: '700', color: '#0F172A', fontSize: '14px' }}>
                    {event.price === 0 || event.price === '0' ? 'Бесплатно' : `${event.price} ₽`}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '12px', marginTop: '4px', paddingTop: '8px', borderTop: '1px solid #F1F5F9' }}>
                  <UsersRound size={14} style={{ color: '#64748B', flexShrink: 0 }} /> 
                  <span>Осталось мест: <strong style={{ color: '#0F172A' }}>{event.seats}</strong></span>
                </div>
                <button style={{backgroundColor: '#2563EB', borderRadius: '8px', color: '#FFFFFF', height: '44px', padding: '10px 20px 12px 24px', fontWeight:'600'}}>Подробнее</button>

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
