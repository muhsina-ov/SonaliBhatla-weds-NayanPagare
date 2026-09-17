class SoundManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private userMuted = false;
  private listeners = new Set<(playing: boolean) => void>();

  constructor() {
    if (typeof window !== "undefined") {
      const src = (import.meta.env.BASE_URL || "./") + "bg-music.mp3";
      this.audio = new Audio(src);
      this.audio.loop = true;
      this.audio.preload = "auto";
      this.audio.volume = 0.75;

      this.audio.addEventListener("play", () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener("pause", () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener("ended", () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener("error", (e) => {
        console.warn("Audio loading or playback error:", e);
      });
    }
  }

  public play(): Promise<void> | undefined {
    if (!this.audio || this.userMuted) return;
    return this.audio.play().catch((err) => {
      console.log("Audio autoplay prevented by browser:", err.message);
    });
  }

  public pause() {
    if (!this.audio) return;
    this.audio.pause();
  }

  public toggle() {
    if (!this.audio) return;
    if (this.isPlaying) {
      this.userMuted = true;
      this.pause();
    } else {
      this.userMuted = false;
      this.play();
    }
  }

  public getPlaying() {
    return this.isPlaying;
  }

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.add(fn);
    fn(this.isPlaying);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }
}

export const soundManager = new SoundManager();
