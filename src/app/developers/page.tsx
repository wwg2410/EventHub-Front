'use client'

import { GitBranch, Code2, Terminal } from 'lucide-react'

const developers = [
  {
    id: 1,
    name: 'Адильхан',
    role: 'Fullstack Developer',
    avatar: '../../adilhan.jpeg',
    github: 'https://github.com',
    sectionTitle: 'Разработка личного кабинета: страница «Мои мероприятия»',
    contribution: [
      'Новый функционал: Создал единый хаб для управления событиями с удобным переключением вкладок («Созданные мной» и «Я записан»).',
      'Управление контентом: Реализовал интерактивные сценарии редактирования и удаления карточек через всплывающие модальные окна.',
      'Архитектурный подход: Разработал систему гибких, повторно используемых компонентов (UI Kit), что ускорило верстку приложения и исключило дублирование кода.',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 2,
    name: 'Акылай',
    role: 'Frontend Developer',
    avatar: '../../akylai.jpeg',
    github: 'https://github.com',
    sectionTitle: 'Разработка ключевых интерфейсов и административной панели',
    contribution: [
      'Главный экран (Hero Section): Создала эффектную главную секцию с динамической сменой изображений, интерактивными элементами и фокусом на конверсию.',
      'Панель администратора (Admin Panel): Разработала интерфейс управления пользователями для удобного мониторинга и контроля данных.',
      'Адаптивность и UX: Реализовала 100% отзывую верстку, которая идеально отображается на любых устройствах — от смартфонов до десктопов.',
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 3,
    name: 'Бектемир',
    role: 'Frontend Developer',
    avatar: '../../bektemir.jpeg',
    github: 'https://github.com',
    sectionTitle: 'Разработка навигации, администрирования и UX-логики проекта',
    contribution: [
      'Панель управления (Admin Panel): Разработал интерфейс администратора для мониторинга мероприятий, реализовал систему вкладок и элементов управления контентом.',
      'Поиск и фильтрация: Интегрировал логику мгновенного поиска событий по названию и сортировки по категориям, что значительно улучшило пользовательский опыт (UX).',
      'Сквозной интерфейс сайта: Сверстал базовую анатомию платформы — глобальные компоненты Header и Footer, а также кастомную страницу ошибки (404 Page).',
      'Командное взаимодействие и QA: Активно занимался поиском и устранением багов (debugging), отладкой интерфейса и управлением версиями проекта в Git.',
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'CSS', 'GitHub'],
  },
  {
    id: 4,
    name: 'Самир',
    role: 'Tech Lead & Frontend Developer',
    avatar: '../../samir.jpeg',
    github: 'https://github.com',
    sectionTitle: 'Архитектура проекта и разработка ключевых пользовательских сценариев',
    contribution: [
      'Инициализация и сборка (Tech Lead): С нуля развернул и сконфигурировал архитектуру проекта. Объединил разрозненные наработки команды в целостную, стабильную и масштабируемую систему.',
      'Генерация контента (Страница /create-event): Спроектировал и полностью реализовал интуитивный пользовательский сценарий для создания и публикации новых мероприятий.',
      'Дизайн-система и качество: Сверстал адаптивный интерфейс на Tailwind CSS и настроил строгие правила валидации кода (ESLint), обеспечив чистоту кодовой базы и единый визуальный стиль.',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'ESLint'],
  },
  {
    id: 5,
    name: 'Эсенгул',
    role: 'Frontend Developer',
    avatar: '../../esengul.jpeg',
    github: 'https://github.com',
    sectionTitle: 'Разработка детальных интерфейсов и навигационной логики',
    contribution: [
      'Страница мероприятия: Разработала полноценную и информативную страницу конкретного события, собрав воедино весь ключевой контент для пользователей.',
      'Оптимизация навигации: Успешно связала главный экран с детальным описанием, активировав и настроив интерактивную кнопку «Подробнее».',
      'Улучшение User Journey: Обеспечила бесшовный и понятный переход пользователя от первого знакомства с событием на главной странице к изучению его деталей.',
    ],
    techStack: ['React', 'Next.js', 'JavaScript', 'CSS'],
  },
  {
    id: 6,
    name: 'Санжар',
    role: 'Fullstack Strong Developer',
    avatar: '../../sanjar.jpeg',
    github: 'https://github.com',
    sectionTitle: 'Проектирование базы данных, Backend-архитектуры и систем безопасности',
    contribution: [
      'Серверная логика и Безопасность (NestJS): Разработал надежную backend-систему авторизации и регистрации. Интегрировал шифрование паролей через bcrypt и защиту маршрутов с помощью JWT-токенов.',
      'Архитектура данных (PostgreSQL & Prisma ORM): Спроектировал структуру БД, настроил уникальные модели пользователей и миграции, обеспечив отказоустойчивое хранение информации.',
      'Клиентская интеграция (Next.js & API): Создал интерфейсы для входа и регистрации на фронтенде, настроил валидацию форм, обработку ошибок и бесшовную связь с сервером через HTTP-запросы (fetch).',
      'Документирование: Интегрировал интерактивную спецификацию Swagger для удобного тестирования и прозрачного взаимодействия с API всей команды.',
    ],
    techStack: ['NestJS', 'Next.js', 'PostgreSQL', 'Prisma ORM', 'TypeScript', 'JWT', 'Swagger'],
  },
]

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans p-4 sm:p-8 md:p-12">
      <div className="max-w-[1240px] mx-auto w-full">
        
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-[#0F172A] text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">
            Наша команда разработки
          </h1>
          <p className="text-[#64748B] text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed">
            Люди, которые спроектировали, сверстали и запустили платформу EventHub. Наш вклад, зоны ответственности и технологии.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {developers.map((dev) => (
            <div 
              key={dev.id}
              className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col sm:flex-row md:flex-col lg:flex-row transition-all duration-300 hover:shadow-md hover:border-[#2563EB]/20"
            >
             
              <div className="sm:w-[220px] md:w-full lg:w-[220px] bg-[#F8FAFC] border-b sm:border-b-0 md:border-b lg:border-b-0 sm:border-r md:border-r-0 lg:border-r border-[#E2E8F0] p-6 flex flex-col items-center justify-between text-center shrink-0">
                <div className="flex flex-col items-center w-full">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-200 mb-4 relative">
                    <img 
                      src={dev.avatar} 
                      alt={dev.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://dicebear.com{dev.name}` 
                      }}
                    />
                  </div>
                  
                  <h3 className="text-[#0F172A] text-xl font-bold leading-snug mb-1">
                    {dev.name}
                  </h3>
                  
                  <span className="text-[#2563EB] text-xs font-bold px-3 py-1 bg-[#2563EB]/10 rounded-full tracking-wide">
                    {dev.role}
                  </span>
                </div>

            
                <a 
                  href={dev.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#2563EB] transition-colors"
                >
                  <GitBranch size={16} />
                  <span>GitHub профиль</span>
                </a>
              </div>

              <div className="p-6 sm:p-8 md:p-6 lg:p-8 flex flex-col gap-5 flex-grow">
                
                <div>
                  <span className="text-xs text-[#94A3B8] font-bold uppercase tracking-wider block mb-1">
                    Основное направление
                  </span>
                  <h4 className="text-[#0F172A] text-base font-bold leading-snug">
                    {dev.sectionTitle}
                  </h4>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Заменили значок выполненных задач на Code2 */}
                  <h5 className="text-[#0F172A] text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b border-[#F1F5F9] pb-2">
                    <Code2 size={16} className="text-[#2563EB]" />
                    Выполненные задачи:
                  </h5>
                  <ul className="flex flex-col gap-3">
                    {dev.contribution.map((item, index) => {
                      const parts = item.split(': ')
                      const hasLabel = parts.length > 1

                      return (
                                               <li key={index} className="flex items-start gap-3 text-sm text-[#475569] leading-relaxed">
                          <span className="text-[#2563EB] font-bold mt-0.5 shrink-0">•</span>
                          <span>
                            {hasLabel ? (
                              <>
                                <strong className="text-[#0F172A]">{parts[0]}:</strong>
                                {' '}{parts.slice(1).join(': ')}
                              </>
                            ) : (
                              item
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className="mt-auto pt-4 border-t border-[#F1F5F9]">
                  <span className="text-[#64748B] text-xs font-bold uppercase tracking-wider block mb-2">
                    Используемый стек:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dev.techStack.map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-[#F1F5F9] text-[#334155] px-2.5 py-1 rounded-md text-xs font-semibold border border-[#E2E8F0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
