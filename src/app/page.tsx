export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-1 items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
          EventHub
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Находите интересные мероприятия рядом
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
          EventHub поможет быстро найти подходящие городские события и узнать о них больше.
        </p>
      </div>
    </section>
  );
}
