import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, Target, Coffee } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    title: "Plan your day",
    text: "Organise your priorities and focus on what matters most.",
    icon: CalendarDays,
    theme: "slide-purple",
  },
  {
    id: 2,
    title: "One task at a time",
    text: "Pick your highest-priority task and give it your full attention until it is done.",
    icon: Target,
    theme: "slide-blue",
  },
  {
    id: 3,
    title: "Take short breaks",
    text: "Rest for five minutes after every focused session to stay fresh all day.",
    icon: Coffee,
    theme: "slide-green",
  },
];

function FocusNotes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = SLIDES.length;
  const slide = SLIDES[activeIndex];
  const Icon = slide.icon;

  // Circular navigation: after the last slide comes the first, and vice versa.
  const goToPrevious = () => setActiveIndex((index) => (index - 1 + total) % total);
  const goToNext = () => setActiveIndex((index) => (index + 1) % total);

  return (
    <section
      className={`focus-notes ${slide.theme}`}
      aria-roledescription="carousel"
      aria-label="Focus Notes"
    >
      <div
        className="focus-slide"
        role="group"
        aria-roledescription="slide"
        aria-label={`${activeIndex + 1} of ${total}`}
        aria-live="polite"
      >
        <span className="focus-icon" aria-hidden="true">
          <Icon size={28} />
        </span>
        <div>
          <p className="focus-label">
            Focus Notes · {activeIndex + 1} of {total}
          </p>
          <h2 className="focus-title">{slide.title}</h2>
          <p className="focus-text">{slide.text}</p>
        </div>
      </div>

      <div className="focus-controls">
        <button
          type="button"
          className="carousel-button"
          onClick={goToPrevious}
          aria-label="Previous focus note"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="carousel-dots">
          {SLIDES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`dot ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to focus note ${index + 1}: ${item.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className="carousel-button"
          onClick={goToNext}
          aria-label="Next focus note"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}

export default FocusNotes;
