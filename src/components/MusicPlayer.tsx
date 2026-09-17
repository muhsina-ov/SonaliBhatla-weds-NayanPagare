import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc3, Music2, X, ExternalLink, VolumeX, Play, Pause } from "lucide-react";
import { wedding } from "../config";
import { soundManager } from "../lib/soundManager";

export default function MusicPlayer() {
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = soundManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.toggle();
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-80 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-gold/35 bg-ink/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl"
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
                aria-label="Close soundtrack details"
              >
                <X size={15} />
              </button>
            </div>

            {/* Direct Playback Control in Card */}
            <div className="mb-3 flex items-center justify-between rounded-xl border border-gold/25 bg-white/5 p-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleToggle}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink shadow-md transition hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
                <div>
                  <p className="font-display text-sm font-medium text-pearl">{wedding.music.title}</p>
                  <p className="text-[11px] text-pearl/50">{wedding.music.artist}</p>
                </div>
              </div>

              {isPlaying ? (
                <div className="flex h-4 items-end gap-[2px]">
                  <span className="h-2 w-[2px] animate-[bounce_1s_infinite_100ms] rounded-full bg-gold" />
                  <span className="h-4 w-[2px] animate-[bounce_1s_infinite_300ms] rounded-full bg-gold" />
                  <span className="h-2.5 w-[2px] animate-[bounce_1s_infinite_200ms] rounded-full bg-gold" />
                  <span className="h-3.5 w-[2px] animate-[bounce_1s_infinite_400ms] rounded-full bg-gold" />
                </div>
              ) : (
                <span className="text-[10px] uppercase tracking-wider text-pearl/40">Paused</span>
              )}
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
              <span className="text-[10px] text-pearl/45">Listen on Spotify</span>
              <a
                href={wedding.music.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold hover:bg-gold/20"
              >
                <span>Open Track</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Capsule Button */}
      <div className="flex items-center gap-1.5">
        <motion.button
          type="button"
          onClick={handleToggle}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`group flex items-center gap-2.5 rounded-full border px-3.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all ${
            isPlaying
              ? "border-gold/50 bg-ink/90 hover:border-gold hover:bg-ink"
              : "border-pearl/20 bg-ink/80 opacity-85 hover:border-gold/50 hover:opacity-100"
          }`}
          aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
        >
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold">
            {isPlaying ? (
              <Disc3 size={16} className="animate-[spin_4s_linear_infinite]" />
            ) : (
              <VolumeX size={15} className="text-pearl/60" />
            )}
          </span>

          <div className="hidden flex-col text-left sm:flex">
            <span className="text-[9px] uppercase tracking-[0.2em] text-gold/80">
              {isPlaying ? "Soundtrack · Playing" : "Soundtrack · Tap to Play"}
            </span>
            <span className="max-w-[130px] truncate text-[11px] font-medium text-pearl">
              {wedding.music.title}
            </span>
          </div>

          {/* Equalizer Bars when playing */}
          {isPlaying ? (
            <div className="flex h-3 items-end gap-[2px] px-1">
              <span className="h-2 w-[2px] animate-[bounce_1s_infinite_100ms] rounded-full bg-gold" />
              <span className="h-3 w-[2px] animate-[bounce_1s_infinite_300ms] rounded-full bg-gold" />
              <span className="h-1.5 w-[2px] animate-[bounce_1s_infinite_200ms] rounded-full bg-gold" />
              <span className="h-2.5 w-[2px] animate-[bounce_1s_infinite_400ms] rounded-full bg-gold" />
            </div>
          ) : (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/10 text-gold">
              <Play size={10} className="ml-0.5 fill-gold" />
            </span>
          )}
        </motion.button>

        {/* Info / Spotify expand button */}
        <motion.button
          type="button"
          onClick={() => setExpanded(!expanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-ink/85 text-gold/70 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:border-gold hover:text-gold"
          aria-label="Soundtrack details and Spotify player"
          title="Soundtrack details"
        >
          <Music2 size={15} />
        </motion.button>
      </div>
    </div>
  );
}
