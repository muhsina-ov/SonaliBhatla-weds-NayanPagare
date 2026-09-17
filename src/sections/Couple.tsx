import Reveal, { SectionHeading } from "../components/Reveal";
import { wedding } from "../config";

export default function Couple() {
  const copyHashtag = async () => {
    try {
      await navigator.clipboard.writeText(wedding.hashtag);
    } catch {
      // Clipboard access is optional.
    }
  };

  const { bride, groom } = wedding.family;

  return (
    <section id="couple" className="night-section relative overflow-hidden px-6 py-28 sm:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,175,194,.13),transparent_58%)]" />
      <SectionHeading
        kicker="Two families, one eternal promise"
        title={`${wedding.bride} & ${wedding.groom}`}
      />

      {/* Main Couple Portraits & Lineage */}
      <div className="relative mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-[1fr_1.1fr_1fr]">
        {/* Bride & Family */}
        <Reveal className="order-2 text-center md:order-1 md:text-right">
          <p className="section-kicker">The Bride</p>
          <h3 className="font-display mt-2 text-4xl text-pearl sm:text-5xl">
            {bride.name}
          </h3>
          <p className="mt-3 text-sm font-medium tracking-wide text-gold">
            Daughter of {bride.parents}
          </p>

          <div className="my-5 h-px w-20 bg-gold/25 mx-auto md:ml-auto md:mr-0" />

          {/* Paternal Grandparents */}
          <div className="mt-4 space-y-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-champagne/70">
              {bride.paternalBlessings.title}
            </p>
            {bride.paternalBlessings.grandparents.map((gp, i) => (
              <p key={i} className="font-display text-base text-pearl/80">
                {gp}
              </p>
            ))}
          </div>

          {/* Maternal Grandparents */}
          <div className="mt-5 space-y-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-champagne/70">
              {bride.maternalBlessings.title}
            </p>
            {bride.maternalBlessings.grandparents.map((gp, i) => (
              <p key={i} className="font-display text-base text-pearl/80">
                {gp}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Center Couple Art */}
        <Reveal delay={0.08} className="order-1 md:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs">
            <div className="absolute inset-[9%] rounded-full bg-gold/15 blur-3xl" />
            <img
              src={wedding.assets.couple}
              alt={`${wedding.bride} and ${wedding.groom} seated together`}
              className="relative h-full w-full object-contain drop-shadow-[0_28px_55px_rgba(0,0,0,.6)]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>

        {/* Groom & Family */}
        <Reveal delay={0.16} className="order-3 text-center md:text-left">
          <p className="section-kicker">The Groom</p>
          <h3 className="font-display mt-2 text-4xl text-pearl sm:text-5xl">
            {groom.name}
          </h3>
          <p className="mt-3 text-sm font-medium tracking-wide text-gold">
            Son of {groom.parents}
          </p>

          <div className="my-5 h-px w-20 bg-gold/25 mx-auto md:ml-0 md:mr-auto" />

          {/* Paternal Grandparents */}
          <div className="mt-4 space-y-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-champagne/70">
              {groom.paternalBlessings.title}
            </p>
            {groom.paternalBlessings.grandparents.map((gp, i) => (
              <p key={i} className="font-display text-base text-pearl/80">
                {gp}
              </p>
            ))}
          </div>

          {/* Maternal Grandparents */}
          <div className="mt-5 space-y-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-champagne/70">
              {groom.maternalBlessings.title}
            </p>
            {groom.maternalBlessings.grandparents.map((gp, i) => (
              <p key={i} className="font-display text-base text-pearl/80">
                {gp}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Couple Hashtag */}
      <Reveal delay={0.2} className="mt-14 flex justify-center">
        <button
          type="button"
          onClick={copyHashtag}
          className="group inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.24em] text-gold transition-all hover:border-gold hover:bg-gold/10"
        >
          <span>{wedding.hashtag}</span>
          <span className="text-[10px] text-pearl/40 transition group-hover:text-pearl/70">
            · Tap to copy
          </span>
        </button>
      </Reveal>
    </section>
  );
}
