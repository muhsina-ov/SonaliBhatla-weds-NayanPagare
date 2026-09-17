export const wedding = {
  bride: "Sonali",
  groom: "Nayan",
  brideFull: "Sonali Bhatla",
  groomFull: "Nayan Pagare",
  brideParents: "Daughter of Anita Bhatla and Sunil Bhatla",
  groomParents: "Son of Sangita Pagare and Manohar Pagare",
  familySignoff: "The Bhatla and Pagare families",
  hashtag: "#SonaliWedsNayan",
  monogram: "S N",

  intro: {
    eyebrow: "A celestial wedding celebration",
    title: "An invitation carried by moonlight",
    body: "Join us under the starry night to celebrate the wedding of Sonali and Nayan.",
    beginLabel: "Begin the Journey",
    enterLabel: "Enter the Celebration",
    tapHint: "Tap the glowing arch",
    playingLabel: "The journey begins",
    videoEnabled: false,
    videoTimeoutMs: 12000,
  },

  dateISO: "2026-10-24T18:00:00-04:00",
  dateLabel: "Saturday, 24 October 2026",
  timeLabel: "From 6:00 PM",
  dayLabel: "Saturday",
  dayNum: "24",
  monthLabel: "October",
  yearLabel: "2026",

  rsvp: {
    deadline: "October 3rd, 2026",
    deadlineLabel: "RSVP by Oct 3rd, 2026",
  },

  music: {
    title: "Planetarium",
    artist: "Justin Hurwitz (La La Land)",
    spotifyUrl: "https://open.spotify.com/track/70RecAVg5QudOXfJs64sM5?si=Ke0VvIujTp23_RbicVmvLA&utm_source=copy-link",
    spotifyEmbedUrl: "https://open.spotify.com/embed/track/70RecAVg5QudOXfJs64sM5?utm_source=generator&theme=0",
    trackId: "70RecAVg5QudOXfJs64sM5",
  },

  venue: {
    name: "Versailles Convention Centre",
    address: "6721 Edwards Blvd, Mississauga, ON L5T 2V9, Canada",
    mapsQuery: "Versailles Convention Centre, 6721 Edwards Blvd, Mississauga, ON L5T 2V9",
    mapsDirectUrl: "https://maps.app.goo.gl/y9oVmkPSmA8jCfHLA?g_st=com.google.maps.preview.copy",
    landmark: "6721 Edwards Blvd · Mississauga",
    directionHint: "Tap to open directions in Google Maps",
  },

  verse: {
    hindi: "॥ शुभ विवाह ॥",
    text: "With the divine grace and blessings of our beloved elders, we joyfully invite you to witness Sonali and Nayan begin their forever.",
  },

  family: {
    bride: {
      name: "Sonali Bhatla",
      parents: "Anita Bhatla & Sunil Bhatla",
      paternalBlessings: {
        title: "With the blessings of her paternal grandparents",
        grandparents: [
          "Cdr. Shadi Lal Bhatla (Retd. IN)",
          "Late Shila Rani Bhatla",
        ],
      },
      maternalBlessings: {
        title: "And her maternal grandparents",
        grandparents: [
          "Late Krishna Lal Katiyal",
          "Shrimati Shakuntala Katiyal",
        ],
      },
    },
    groom: {
      name: "Nayan Pagare",
      parents: "Sangita Pagare & Manohar Pagare",
      paternalBlessings: {
        title: "With the blessings of his paternal grandparents",
        grandparents: [
          "Digambar Pagare",
          "Laxmibai Pagare",
        ],
      },
      maternalBlessings: {
        title: "And his maternal grandparents",
        grandparents: [
          "Bhagwan Khonde",
          "Sushila Khonde",
        ],
      },
    },
  },

  events: [
    {
      name: "Wedding",
      date: "Saturday, 24 October 2026",
      dayLabel: "Saturday",
      dayNum: "24",
      monthLabel: "October 2026",
      time: "From 6:00 PM",
      venue: "Versailles Convention Centre, Mississauga",
      note: "An enchanted evening of sacred vows, grand celebrations, and dinner under the stars.",
    },
  ],

  program: [
    { name: "Guests to arrive", time: "6:00 PM" },
    { name: "Baraat arrival", time: "7:00 PM" },
    { name: "Bridal Entrance", time: "7:30 PM" },
    { name: "Wedding ceremony", time: "8:00 PM" },
  ],

  assets: {
    introPoster: "https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/intro-poster.webp",
    introEnd: "https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/intro-end.webp",
    introVideo: "./assets/lotus/intro-journey.mp4",
    sky: "./assets/lotus/sky.webp",
    environment: "./assets/lotus/water-palace.webp",
    barge: "https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/barge.png",
    couple: "https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/couple.png",
    mandap: "https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/lotus-mandap.png",
    foregroundLotus: "https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/foreground-lotus.png",
    diya: "https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/diya.png",
    petals: "https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/floating-petals.png",
    frame: "https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/ornamental-frame.png",
    social: "./og-image.jpg",
  },

  productionUrl: "https://sonali-weds-nayan.vercel.app",

  footer: {
    title: "Meet us under the stars",
  },

  sections: {
    events: true,
    venue: true,
    countdown: true,
    rsvp: true,
    blessings: true,
  },
};

export const googleCalendarUrl = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
  const fmt = (d: Date) => {
    const iso = d.toISOString();
    return iso.replace(/-/g, "").replace(/:/g, "").replace(/\.\d{3}/, "").slice(0, 15) + "Z";
  };
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${wedding.bride} weds ${wedding.groom}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${wedding.venue.name}, ${wedding.venue.address}. ${wedding.hashtag}. RSVP by ${wedding.rsvp.deadline}.`,
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadICS = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
  const fmt = (d: Date) => {
    const iso = d.toISOString();
    return iso.replace(/-/g, "").replace(/:/g, "").replace(/\.\d{3}/, "").slice(0, 15) + "Z";
  };
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InviteStory//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@invitestory`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${wedding.bride} weds ${wedding.groom}`,
    `DESCRIPTION:${wedding.venue.name}, ${wedding.venue.address}. RSVP by ${wedding.rsvp.deadline}`,
    `LOCATION:${wedding.venue.name}\\, ${wedding.venue.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${wedding.bride}-${wedding.groom}-wedding.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  wedding.venue.mapsQuery
)}&output=embed`;

export const mapsDirectionsUrl = wedding.venue.mapsDirectUrl;
