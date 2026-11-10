import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">EH</span>
              EventHub
            </Link>
            <p className="mt-3 text-sm leading-6 text-slate-500">Сервис для поиска и просмотра городских мероприятий. Находите интересные события и планируйте свободное время.</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Навигация</h2>
            <nav aria-label="Навигация в подвале" className="mt-3 flex flex-col items-start gap-2 text-sm">
              <Link href="/" className="text-slate-600 transition-colors hover:text-blue-600">Главная</Link>
            </nav>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">О сервисе</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">Собираем городские события в одном удобном месте.</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} EventHub</span>
          <span>EventHub</span>
        </div>
      </div>
    </footer>
  );
}
