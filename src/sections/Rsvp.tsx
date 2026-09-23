import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Heart, Send, Calendar, MessageSquareShare } from "lucide-react";
import Reveal, { SectionHeading } from "../components/Reveal";
import { wedding, googleCalendarUrl, downloadICS } from "../config";

export default function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const createWhatsAppUrl = () => {
    const status = attending === "yes" ? "Joyfully accepting the invitation! ✨" : "Regretfully declining with warm wishes. 💐";
    const text = `*Wedding RSVP for Sonali & Nayan*\n\n*Name:* ${name || "Guest"}\n*Attendance:* ${status}\n*Number of Guests:* ${guests}${message ? `\n*Message:* ${message}` : ""}\n\nCan't wait to celebrate!`;
    const phone = (wedding.rsvp as any).whatsappNumber
      ? (wedding.rsvp as any).whatsappNumber.replace(/[^0-9]/g, "")
      : "";
    return phone
      ? `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const url = createWhatsAppUrl();
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="paper-section relative overflow-hidden px-6 py-24 sm:py-36">
      <img
        src={wedding.assets.mandap}
        alt=""
        className="pointer-events-none absolute -right-20 -top-10 w-96 max-w-none opacity-[0.06]"
      />
      <div className="[&_.section-heading_h2]:!text-ink">
        <SectionHeading
          kicker={`RSVP Deadline · ${wedding.rsvp.deadline}`}
          title="Will You Join Our Celebration?"
        />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <Reveal>
          <div className="mb-8 text-center">
            <p className="font-display text-xl tracking-wide text-ink/85 sm:text-2xl">
              Please let us know by{" "}
              <span className="font-bold text-ink underline decoration-[#7a4816] underline-offset-4">
                {wedding.rsvp.deadline}
              </span>
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ink/50">
              Saturday, 24 October 2026 · Versailles Convention Centre
            </p>
            <p className="mt-1 text-xs font-medium tracking-wide text-[#7a4816]">
              RSVP via WhatsApp
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative rounded-2xl border border-gold/30 bg-white/70 p-7 shadow-[0_20px_50px_rgba(7,16,29,0.08)] backdrop-blur-md sm:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-display mt-5 text-3xl font-medium text-ink">
                    Thank You, {name}!
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {attending === "yes"
                      ? "Your RSVP has been prepared for WhatsApp. We cannot wait to celebrate with you under the stars!"
                      : "Your RSVP has been prepared for WhatsApp. Thank you for letting us know."}
                  </p>
                  <p className="mt-1 text-xs text-ink/50">
                    If WhatsApp did not open automatically, tap below to send:
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                      href={createWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-[#7a4816] bg-[#dfb86c] py-3.5 px-7 text-xs font-bold uppercase tracking-[0.2em] text-[#07101d] shadow-[0_8px_20px_rgba(122,72,22,0.2)] transition-all hover:bg-[#d4a853]"
                    >
                      <MessageSquareShare size={17} className="text-[#07101d] transition-transform group-hover:scale-110" />
                      <span>Open in WhatsApp</span>
                      <span className="ml-1 text-sm font-semibold text-[#7a4816]">✦</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-ink/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink/80 transition hover:border-ink/40 hover:bg-ink/5"
                    >
                      Edit RSVP
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Attendance Toggle */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending("yes")}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border py-4 px-3 text-center transition-all ${
                        attending === "yes"
                          ? "border-gold bg-gold/10 text-ink shadow-sm ring-1 ring-gold/40"
                          : "border-ink/15 bg-white/40 text-ink/60 hover:bg-white/70"
                      }`}
                    >
                      <Heart
                        size={18}
                        className={attending === "yes" ? "fill-gold text-gold" : "text-ink/40"}
                      />
                      <span className="font-display text-base font-medium">Joyfully Accepts</span>
                      <span className="text-[10px] uppercase tracking-wider text-ink/50">Attending with pleasure</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttending("no")}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border py-4 px-3 text-center transition-all ${
                        attending === "no"
                          ? "border-ink/50 bg-ink/5 text-ink shadow-sm ring-1 ring-ink/30"
                          : "border-ink/15 bg-white/40 text-ink/60 hover:bg-white/70"
                      }`}
                    >
                      <Send
                        size={18}
                        className={attending === "no" ? "text-ink/80" : "text-ink/40"}
                      />
                      <span className="font-display text-base font-medium">Regretfully Declines</span>
                      <span className="text-[10px] uppercase tracking-wider text-ink/50">Wishing from afar</span>
                    </button>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="rsvp-name"
                      className="block text-[11px] font-medium uppercase tracking-[0.2em] text-ink/70"
                    >
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priyanshu Sharma"
                      className="mt-1.5 w-full rounded-xl border border-ink/20 bg-white/80 px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  {/* Guest Count */}
                  {attending === "yes" && (
                    <div>
                      <label
                        htmlFor="rsvp-guests"
                        className="block text-[11px] font-medium uppercase tracking-[0.2em] text-ink/70"
                      >
                        Total Attending Guests
                      </label>
                      <select
                        id="rsvp-guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-ink/20 bg-white/80 px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5+">5+ Guests</option>
                      </select>
                    </div>
                  )}

                  {/* Wishes / Note */}
                  <div>
                    <label
                      htmlFor="rsvp-message"
                      className="block text-[11px] font-medium uppercase tracking-[0.2em] text-ink/70"
                    >
                      Message
                    </label>
                    <textarea
                      id="rsvp-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Special wishes for Sonali & Nayan..."
                      className="mt-1.5 w-full resize-none rounded-xl border border-ink/20 bg-white/80 px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  {/* WhatsApp RSVP Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-[#7a4816] bg-[#dfb86c] py-4 px-6 text-xs font-bold uppercase tracking-[0.2em] text-[#07101d] shadow-[0_8px_20px_rgba(122,72,22,0.2)] transition-all hover:bg-[#d4a853] hover:shadow-[0_12px_28px_rgba(122,72,22,0.28)] active:scale-[0.99]"
                    >
                      <MessageSquareShare size={18} className="text-[#07101d] transition-transform group-hover:scale-110" />
                      <span>RSVP via WhatsApp</span>
                      <span className="ml-1 text-sm font-semibold text-[#7a4816]">✦</span>
                    </button>
                    <p className="mt-2.5 text-center text-[11px] text-ink/60">
                      Tapping will open WhatsApp with your RSVP details pre-filled
                    </p>
                  </div>
                </form>
              )}
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-ink/10 pt-6 text-xs text-ink/60">
              <a
                href={googleCalendarUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-gold"
              >
                <Calendar size={13} />
                <span>Add to Google Calendar</span>
              </a>
              <button
                type="button"
                onClick={downloadICS}
                className="flex items-center gap-1.5 transition-colors hover:text-gold"
              >
                <span>Download .ics file</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
