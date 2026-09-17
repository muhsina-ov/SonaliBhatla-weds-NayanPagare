import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc3, Music2, X, ExternalLink } from "lucide-react";
import { wedding } from "../config";

export default function MusicPlayer() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-80 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-gold/35 bg-ink/90 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <Music2 size={16} className="text-gold" />
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-champagne">
                  Wedding Soundtrack
                </span>
              </div>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="rounded-full p-1 text-pearl/50 transition hover:bg-white/10 hover:text-pearl"
                aria-label="Close music player"
              >
                <X size={15} />
              </button>
            </div>

            {/* Spotify Embed Player */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <iframe
                title="Planetarium by Justin Hurwitz"
                src={wedding.music.spotifyEmbedUrl}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full"
              />
            </div>

            <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-pearl/65">
              <div className="truncate pr-2">
                <p className="truncate font-medium text-pearl">{wedding.music.title}</p>
                <p className="truncate text-[10px] text-pearl/40">{wedding.music.artist}</p>
              </div>
              <a
                href={wedding.music.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold hover:bg-gold/20"
              >
                <span>Spotify</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Capsule Button */}
      <motion.button
        type="button"
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group flex items-center gap-2.5 rounded-full border border-gold/40 bg-ink/85 px-3.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all hover:border-gold hover:bg-ink/95"
        aria-label="Open wedding soundtrack"
      >
        <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold">
          <Disc3 size={15} className="animate-[spin_4s_linear_infinite]" />
        </span>

        <div className="hidden flex-col text-left sm:flex">
          <span className="text-[9px] uppercase tracking-[0.2em] text-gold/80">Soundtrack</span>
          <span className="max-w-[130px] truncate text-[11px] font-medium text-pearl">
            {wedding.music.title}
          </span>
        </div>

        {/* Animated equalizer bars */}
        <div className="flex h-3 items-end gap-[2px] px-1">
          <span className="h-2 w-[2px] animate-[bounce_1s_infinite_100ms] rounded-full bg-gold" />
          <span className="h-3 w-[2px] animate-[bounce_1s_infinite_300ms] rounded-full bg-gold" />
          <span className="h-1.5 w-[2px] animate-[bounce_1s_infinite_200ms] rounded-full bg-gold" />
          <span className="h-2.5 w-[2px] animate-[bounce_1s_infinite_400ms] rounded-full bg-gold" />
        </div>
      </motion.button>
    </div>
  );
}
