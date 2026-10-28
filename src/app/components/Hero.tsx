'use client'

import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
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
      <div className="mx-auto box-border w-full max-w-[1200px] px-4 pt-6 sm:px-6 md:px-5">
        <div className="group relative rounded-3xl bg-gradient-to-br from-[#F1F6FF] to-[#E5EFFF] border border-[#DEE8F8]">
          <div className="grid min-h-[420px] grid-cols-1 items-center gap-8 px-6 py-12 sm:px-10 md:px-14 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="min-w-0 z-10">
              <h1 className="m-0 text-[36px] font-black leading-[1.15] tracking-tight text-[#0F172A] sm:text-[42px] lg:text-[46px] xl:text-[52px]">
                Впечатления <br className="hidden sm:inline" />
                начинаются здесь
              </h1>

              <p className="mb-8 mt-4 max-w-[460px] text-base leading-7 text-[#475569]">
                Открывай новые события, находи интересные места и планируй свой следующий идеальный выходной.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#events"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)] transition-all duration-200 hover:bg-[#1D4ED8] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:-translate-y-0.5"
                >
                  Найти мероприятие
                  <ArrowRight size={16} />
                </a>

                <a
                  href="/create-event"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-[#CBD5E1] bg-white px-6 text-sm font-semibold text-[#334155] shadow-sm transition-all duration-200 hover:bg-gray-50 hover:-translate-y-0.5"
                >
                  Создать событие
                </a>
              </div>
            </div>

            <div className="relative min-w-0">
              <div className="absolute -inset-2 rounded-2xl bg-[#2563EB]/5 blur-[2px]" />

              <div className="relative h-[240px] overflow-hidden rounded-2xl bg-[#DBEAFE] shadow-[0_12px_30px_rgba(16,36,71,0.08)] sm:h-[280px] lg:h-[320px]">
                <img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.tag}
                  className="h-full w-full object-cover transition-all duration-700 ease-out scale-100 hover:scale-105 motion-safe:animate-[fadeIn_700ms_ease-out]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 via-transparent to-transparent pointer-events-none" />

                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-lg bg-white/90 backdrop-blur-md px-3 py-2 text-xs font-bold text-[#1E3A8A] shadow-sm border border-white/20">
                  <Music2 size={14} className="text-[#2563EB]" />
                  {slide.tag}
                </span>
              </div>
            </div>

          </div>
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Предыдущий слайд"
            className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex h-11 w-11 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#2563EB] shadow-md border border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 hover:bg-white hover:scale-105"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Следующий слайд"
            className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex h-11 w-11 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-[#2563EB] shadow-md border border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 hover:bg-white hover:scale-105"
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 pt-5">
          {slides.map((item, index) => (
            <button
              key={item.tag}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Слайд ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? 'w-6 bg-[#2563EB]'
                  : 'w-2 bg-[#CBDCF7] hover:bg-[#94B8F5]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
