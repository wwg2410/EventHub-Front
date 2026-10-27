'use client'

import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Music2,
} from 'lucide-react'

const slides = [
  {
    tag: 'Концерты и события',
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    tag: 'Фестивали',
    image:
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=85',
  },
  {
    tag: 'Бизнес и обучение',
    image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=85',
  },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length)
  }

  const previousSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    )
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  const slide = slides[activeSlide]

  return (
    <section className="w-full overflow-hidden bg-[#FAFAFA] text-[#0F172A]">
      <div className="mx-auto box-border w-full max-w-[1200px] px-4 pt-5 sm:px-6 md:px-5 md:pt-7">
        <div className="relative rounded-2xl bg-gradient-to-br from-[#F4F8FF] to-[#EAF2FF]">
          <div className="grid min-h-[400px] grid-cols-1 items-center gap-5 px-5 py-8 sm:px-8 md:px-12 md:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-14">
            {/* Левая часть Hero */}
            <div className="min-w-0">
              <div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-[0.6px] text-[#2563EB]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DCE9FF]">
                  <Sparkles size={16} />
                </span>
                ГЛАВНЫЕ СОБЫТИЯ
              </div>

              <h1 className="m-0 text-[36px] font-extrabold leading-[1.12] tracking-[-1.5px] text-[#102447] sm:text-[44px] lg:text-[48px] xl:text-[54px]">
                Впечатления
                <br />
                начинаются здесь
              </h1>

              <p className="mb-6 mt-5 max-w-[430px] text-sm leading-7 text-[#526783] sm:text-base">
                Открывай новые события, находи интересные места и планируй свой следующий выход.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#events"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#2563EB] px-6 text-sm font-semibold text-white shadow-[0_8px_20px_#2563EB25] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1D4ED8] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  Найти мероприятие
                  <ArrowRight size={17} />
                </a>

                <a
                  href="/create-event"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#8DB3FF] bg-white/80 px-6 text-sm font-semibold text-[#17345E] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  Создать событие
                </a>
              </div>
            </div>

            {/* Правая часть — слайдер */}
            <div className="relative min-w-0 p-2 sm:p-3">
              <div className="absolute inset-2 rounded-2xl bg-[#D3E2FF] sm:inset-3" />

              <div className="relative h-[230px] overflow-hidden rounded-2xl bg-[#DBEAFE] shadow-[0_18px_40px_#10244720] sm:h-[300px] lg:h-[315px]">
                <img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.tag}
                  className="hero-slide-image h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#10244755] via-transparent to-transparent pointer-events-none" />

                <span className="absolute right-3 top-3 inline-flex max-w-[85%] items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#17345E] shadow-sm sm:right-4 sm:top-4 sm:px-4">
                  <Music2 size={15} />
                  {slide.tag}
                </span>

                <div className="absolute bottom-3 right-3 flex items-center gap-3 rounded-full bg-white px-3 py-2 text-xs text-[#17345E] shadow-sm sm:bottom-4 sm:right-4 sm:gap-4">
                  <span>
                    {activeSlide + 1} / {slides.length}
                  </span>

                  <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Предыдущее изображение"
                    className="rounded-full p-1 text-[#2563EB] transition-colors hover:bg-[#DCE9FF] focus-visible:outline-2 focus-visible:outline-[#2563EB]"
                  >
                    <ArrowLeft size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Следующее изображение"
                    className="rounded-full p-1 text-[#2563EB] transition-colors hover:bg-[#DCE9FF] focus-visible:outline-2 focus-visible:outline-[#2563EB]"
                  >
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Стрелки по бокам на больших экранах */}
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Предыдущее изображение"
            className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-md transition-all duration-300 hover:scale-110 hover:bg-[#DCE9FF] focus-visible:outline-2 focus-visible:outline-[#2563EB] md:flex lg:left-4"
          >
            <ArrowLeft size={21} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Следующее изображение"
            className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-md transition-all duration-300 hover:scale-110 hover:bg-[#DCE9FF] focus-visible:outline-2 focus-visible:outline-[#2563EB] md:flex lg:right-4"
          >
            <ArrowRight size={21} />
          </button>
        </div>

        {/* Индикаторы слайдов */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {slides.map((item, index) => (
            <button
              key={item.tag}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Показать изображение ${index + 1}`}
              aria-current={activeSlide === index ? 'true' : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? 'w-7 bg-[#2563EB]'
                  : 'w-4 bg-[#CBDCF7] hover:bg-[#94B8F5]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
