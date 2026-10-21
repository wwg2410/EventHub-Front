
'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Music2 } from 'lucide-react';
import './Hero.css';

const slides = [
  {
    label: 'ГЛАВНЫЕ СОБЫТИЯ',
    title: ['Впечатления', 'начинаются здесь'],
    description:
      'Открывай новые события, находи интересные места и планируй свой следующий выход.',
    primaryButton: 'Найти мероприятие',
    secondaryButton: 'Создать событие',
    tag: 'Концерты и события',
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    label: 'ОТКРЫВАЙ НОВОЕ',
    title: ['Найди событие', 'по душе'],
    description:
      'Концерты, фестивали, выставки и лекции — открывай новые впечатления каждый день.',
    primaryButton: 'Смотреть события',
    secondaryButton: 'Узнать больше',
    tag: 'Фестивали',
    image:
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=85',
  },
  {
    label: 'СОЗДАВАЙ СОБЫТИЯ',
    title: ['Твоё событие', 'начинается здесь'],
    description:
      'Планируй, организуй и делись своими идеями. Создай мероприятие, которое запомнится.',
    primaryButton: 'Создать событие',
    secondaryButton: 'Узнать больше',
    tag: 'Бизнес и обучение',
    image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=85',
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = window.setInterval(nextSlide, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const slide = slides[activeSlide];

  return (
    <section className="hero">
    

      <div className="hero-carousel" key={activeSlide}>
        <button
          type="button"
          className="hero-arrow hero-arrow-left"
          onClick={previousSlide}
          aria-label="Предыдущий слайд"
        >
          <ArrowLeft size={21} />
        </button>

        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-label">
              <span className="hero-sparkle">
                <Sparkles size={16} />
              </span>
              {slide.label}
            </div>

            <h1>
              {slide.title[0]}
              <br />
              {slide.title[1]}
            </h1>

            <p className="hero-description">{slide.description}</p>

            <div className="hero-buttons">
              <a
                href={
                  activeSlide === 2
                    ? '/create-event'
                    : '#events'
                }
                className="hero-button hero-button-primary"
              >
                {slide.primaryButton}
                <ArrowRight size={17} />
              </a>

              <a
                href={
                  activeSlide === 0 || activeSlide === 2
                    ? '/create-event'
                    : '#events'
                }
                className="hero-button hero-button-secondary"
              >
                {slide.secondaryButton}
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-backdrop" />

            <div className="hero-image-frame">
              <img
                src={slide.image}
                alt={slide.tag}
                className="hero-image"
              />

              <span className="hero-image-label">
                <Music2 size={15} />
                {slide.tag}
              </span>

              <div className="hero-image-controls">
                <span>{activeSlide + 1} / {slides.length}</span>

                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Предыдущий слайд"
                >
                  <ArrowLeft size={17} />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Следующий слайд"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="hero-arrow hero-arrow-right"
          onClick={nextSlide}
          aria-label="Следующий слайд"
        >
          <ArrowRight size={21} />
        </button>
      </div>

      <div className="hero-dots">
        {slides.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={`hero-dot ${
              activeSlide === index ? 'hero-dot-active' : ''
            }`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
