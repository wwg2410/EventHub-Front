import { GitBranch, Code2, Terminal } from 'lucide-react'

const developers = [
  {
    id: 1,
    name: 'Самир',
    role: 'Tech Lead & Frontend Developer',
    avatar: '../../samir.jpeg',
    github: 'https://github.com/wwg2410',
    sectionTitle: 'Архитектура проекта и разработка ключевых пользовательских сценариев',
    contribution: [
      'Инициализация и сборка (Tech Lead): С нуля развернул и сконфигурировал архитектуру проекта. Объединил разрозненные наработки команды в целостную, стабильную и масштабируемую систему.',
      'Генерация контента (Страница /create-event): Спроектировал и полностью реализовал интуитивный пользовательский сценарий для создания и публикации новых мероприятий.',
      'Дизайн-система и качество: Сверстал адаптивный интерфейс на Tailwind CSS и настроил строгие правила валидации кода (ESLint), обеспечив чистоту кодовой базы и единый визуальный стиль.',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'ESLint'],
  },
  {
    id: 2,
    name: 'Санжар',
    role: 'Fullstack Strong Developer',
    avatar: '../../sanjar.jpeg',
    github: 'https://github.com/legenda0123red-sys',
    sectionTitle: 'Проектирование базы данных, Backend-архитектуры и систем безопасности',
    contribution: [
      'Серверная логика и Безопасность (NestJS): Разработал надежную backend-систему авторизации и регистрации. Интегрировал шифрование паролей через bcrypt и защиту маршрутов с помощью JWT-токенов.',
      'Архитектура данных (PostgreSQL & Prisma ORM): Спроектировал структуру БД, настроил уникальные модели пользователей и миграции, обеспечив отказоустойчивое хранение информации.',
      'Клиентская интеграция (Next.js & API): Создал интерфейсы для входа и регистрации на фронтенде, настроил валидацию форм, обработку ошибок и бесшовную связь с сервером через HTTP-запросы (fetch).',
      'Документирование: Интегрировал интерактивную спецификацию Swagger для удобного тестирования и прозрачного взаимодействия с API всей команды.',
    ],
    techStack: ['NestJS', 'Next.js', 'PostgreSQL', 'Prisma ORM', 'TypeScript', 'JWT', 'Swagger'],
  },
  {
    id: 3,
    name: 'Эсенгул',
    role: 'Frontend Developer',
    avatar: '../../esengul.jpeg',
    github: 'https://github.com/esengul623',
    sectionTitle: 'Разработка детальных интерфейсов и навигационной логики',
    contribution: [
      'Страница мероприятия: Разработала полноценную и информативную страницу конкретного события, собрав воедино весь ключевой контент для пользователей.',
      'Оптимизация навигации: Успешно связала главный экран с детальным описанием, активировав и настроив интерактивную кнопку «Подробнее».',
      'Улучшение User Journey: Обеспечила бесшовный и понятный переход пользователя от первого знакомства с событием на главной странице к изучению его деталей.',
    ],
    techStack: ['React', 'Next.js', 'JavaScript', 'CSS'],
  },
  {
    id: 4,
    name: 'Акылай',
    role: 'Frontend Developer',
    avatar: '../../akylai.jpeg',
    github: 'https://github.com/zhyldyztentimish-gif',
    sectionTitle: 'Разработка ключевых интерфейсов и административной панели',
    contribution: [
      'Главный экран (Hero Section): Создала эффектную главную секцию с динамической сменой изображений, интерактивными элементами и фокусом на конверсию.',
      'Панель администратора (Admin Panel): Разработала интерфейс управления пользователями для удобного мониторинга и контроля данных.',
      'Адаптивность и UX: Реализовала 100% отзывую верстку, которая идеально отображается на любых устройствах — от смартфонов до десктопов.',
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 5,
    name: 'Адильхан',
    role: 'Fullstack Developer',
    avatar: '../../adilhan.jpeg',
    github: 'https://github.com/Neonpon1',
    sectionTitle: 'Разработка личного кабинета: страница «Мои мероприятия»',
    contribution: [
      'Новый функционал: Создал единый хаб для управления событиями с удобным переключением вкладок («Созданные мной» и «Я записан»).',
      'Управление контентом: Реализовал интерактивные сценарии редактирования и удаления карточек через всплывающие модальные окна.',
      'Архитектурный подход: Разработал систему гибких, повторно используемых компонентов (UI Kit), что ускорило верстку приложения и исключило дублирование кода.',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 6,
    name: 'Бектемир',
    role: 'Frontend Developer',
    avatar: '../../bektemir.jpeg',
    github: 'https://github.com/p1398490-prog',
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
    id: 7, 
    name: 'Асина', 
    role: 'Product Owner & Fullstack Developer',
    avatar: '../../asina.jpeg', 
    github: 'https://github.com/AizenCode-full', 
    sectionTitle: 'Управление продуктом, разработка ключевых страниц и бэкенд-интеграция',
    contribution: [
      'Управление и координация: Спроектировала рабочее пространство в FigJam, распределила задачи между участниками и описала документацию проекта, обеспечив слаженную работу команды.',
      'Разработка Главной страницы: Реализовала центральный интерфейс со списком мероприятий, включая вывод карточек (фото, инфо, цена), а также настроила сквозной поиск по названию и фильтрацию по категориям.',
      'Интеграция облачного хранилища и бэкенд: Настроила надежное сохранение изображений на Cloudinary, реализовала логику запросов к бэкенду для создания мероприятий и разработала административную панель.',
      'Финальная сборка и контент: Проверила и отладила весь проект перед релизом, а также сверстала информационные разделы «О проекте» и «Разработчики».',
    ],
    techStack: ['Product Management', 'FigJam', 'Cloudinary', 'Backend Requests', 'Admin Panel', 'Next.js', 'React'],
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {developers.map((dev, index) => {
            const isLast = index === developers.length - 1;
            return (
              <div 
                key={dev.id}
                className={`bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:shadow-md hover:border-[#2563EB]/20 ${
                  isLast ? 'md:col-span-2 md:max-w-[calc(50%-12px)] md:mx-auto w-full' : ''
                }`}
              >
               
                <div className="sm:w-[220px] bg-[#F8FAFC] border-b sm:border-b-0 sm:border-r border-[#E2E8F0] p-6 flex flex-col items-center justify-between text-center shrink-0">
                  <div className="flex flex-col items-center w-full">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-200 mb-4 relative">
                      <img 
                        src={dev.avatar} 
                        alt={dev.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-[#0F172A] text-lg font-bold">{dev.name}</h3>
                    <p className="text-[#2563EB] text-sm font-medium mt-1">{dev.role}</p>
                  </div>
                  
                  <div className="mt-6 w-full">
                    <a 
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-[#475569] bg-white border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="text-[#0F172A] text-base font-bold mb-4 flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-[#2563EB] shrink-0" />
                      <span className="leading-snug">{dev.sectionTitle}</span>
                    </h4>
                    <ul className="space-y-3">
                      {dev.contribution.map((item, index) => {
                        const parts = item.split(':');
                                                if (parts.length > 1) {
                          return (
                            <li key={index} className="text-[#475569] text-sm leading-relaxed flex items-start gap-2">
                              <span className="text-[#2563EB] font-bold mt-0.5">•</span>
                              <span>
                                <strong className="text-[#0F172A]">{parts[0]}:</strong>
                                {parts.slice(1).join(':')}
                              </span>
                            </li>
                          );
                        }
                        return (
                          <li key={index} className="text-[#475569] text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-[#2563EB] font-bold mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#F1F5F9]">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mr-1">Стек:</span>
                      {dev.techStack.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-2.5 py-1 bg-[#EFF6FF] text-[#1E40AF] text-xs font-medium rounded-lg border border-[#DBEAFE]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  )
}
