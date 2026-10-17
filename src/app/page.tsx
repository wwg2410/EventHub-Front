'use client'
import  "react";
import { Search } from 'lucide-react';

export default function Page() {
  return (
    <main>
    <h1 style={{color:'#0F172A', fontSize: '32px', fontWeight: '900'}}>Афиша мероприятий</h1>
    <h2 style={{color:'#64748B', fontSize: '20px', fontWeight: '400' }}>Открывайте интересные события рядом с вами </h2>
    <div  className="search-input" style={{ position: 'relative', display: 'flex', width: '1200px', gap: "50px", justifyContent:'space-around' }}>
    <Search 
        size={18} 
        style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#999',
          pointerEvents: 'none' 
        }} 
      />
        <input
        type="text"
        placeholder="Поиск мероприятий по названию...."
        style={{
          width: '100%',
          padding: '10px 10px 10px 35px', 
          fontSize: '17px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          boxSizing: 'border-box'
        }}
      />
    <label htmlFor="select-category" className="category" > Все категории
       <select name="category" id="select-category">
        <option value="Театр и шоу"></option>
        <option value="Кино"></option>
        <option value="Выставки и искусство "></option>
        <option value="Образование и лекции "></option>
        <option value="Бизнес и нетворкинг"></option>
        <option value="Спорт и активный отдых "></option>
        <option value="Гастрономия"></option>
        <option value="Для детей и семьи"></option>
        <option value="Вечеринки и ночная жизнь"></option>
        </select>
    </label>
    <label htmlFor="select-near">Сначала ближайшие 
        <select name="near" id="select-near">
            <option value=""></option>
        </select>
    </label>
    </div>
    <h2>Ближайщие мероприятия</h2>
    </main>
  );
}
