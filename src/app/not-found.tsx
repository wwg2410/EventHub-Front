import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border-8 border-blue-100 bg-white shadow-sm sm:h-28 sm:w-28">
          <span className="text-4xl font-bold tracking-tight text-blue-600 sm:text-5xl">404</span>
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
          EventHub
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Страница не найдена
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-500">
          Похоже, такой страницы не существует или она была перемещена. Вернитесь на главную и найдите новое событие.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          На главную
        </Link>
      </div>
    </section>
  );
}
