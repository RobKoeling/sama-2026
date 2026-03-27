export const festival = {
  name: "SAMA 2026",
  city: "Brighton",
  strapline: "Brighton Film Festival",
  dateRange: "15-19 June 2026",
  defaultStartTime: "19:30",
  description:
    "Five nights of cinema across Brighton, featuring films and conversations rooted in stories from the SWANA region and its diasporas.",
};

export const programme = [
  {
    id: "2026-06-15",
    dayLabel: "Mon 15 Jun",
    fullDate: "Monday 15 June 2026",
    venue: "Depot",
    title: "Sima's Song",
    startTime: "19:30",
    status: "TBC",
    summary:
      "Opening night begins at Depot with a featured screening of Sima's Song. Final event details can be locked in once venue notes arrive.",
  },
  {
    id: "2026-06-16",
    dayLabel: "Tue 16 Jun",
    fullDate: "Tuesday 16 June 2026",
    venue: "Pink Moon",
    title: "Various short films",
    subtitle: "Border? + Gap + Hozan + Bint El Shalabiya + Perfect Restaurant",
    startTime: "19:30",
    status: "Confirmed",
    summary:
      "A curated shorts night bringing together emerging voices and contrasting forms in one compact programme.",
  },
  {
    id: "2026-06-17",
    dayLabel: "Wed 17 Jun",
    fullDate: "Wednesday 17 June 2026",
    venue: "Rose Hill",
    title: "Champions of the Golden Valley",
    startTime: "19:30",
    status: "Confirmed",
    summary:
      "Midweek screening at Rose Hill in a community-led setting suited to a warm documentary audience.",
  },
  {
    id: "2026-06-18",
    dayLabel: "Thu 18 Jun",
    fullDate: "Thursday 18 June 2026",
    venue: "Duke's at Komedia",
    title: "My Childhood, My Country",
    startTime: "19:30",
    status: "Confirmed",
    summary:
      "A major documentary presentation in the city centre as the festival heads into its final stretch.",
  },
  {
    id: "2026-06-19",
    dayLabel: "Fri 19 Jun",
    fullDate: "Friday 19 June 2026",
    venue: "Fabrica",
    title: "Bauryna Salu",
    startTime: "19:30",
    status: "Confirmed",
    summary:
      "Closing night lands at Fabrica in an art-forward setting that gives the finale a distinct atmosphere.",
  },
];

export const venues = [
  {
    name: "Depot",
    type: "Cinema",
    note: "Opening-night venue. Full location and access details can be dropped in as soon as the venue file arrives.",
  },
  {
    name: "Pink Moon",
    type: "Screening space",
    note: "An intimate setting for the shorts programme and post-screening conversation.",
  },
  {
    name: "Rose Hill",
    type: "Community venue",
    note: "A relaxed, independent environment with a strong local cultural identity.",
  },
  {
    name: "Duke's at Komedia",
    type: "City-centre cinema",
    note: "A central Brighton venue suited to one of the week’s major documentary screenings.",
  },
  {
    name: "Fabrica",
    type: "Arts venue",
    note: "A striking space for the closing night, with room to add practical visitor guidance later.",
  },
];

export const newsItems = [
  {
    id: "launch",
    category: "Festival Update",
    title: "Programme week announced",
    summary:
      "SAMA 2026 runs from Monday 15 June to Friday 19 June, with all screenings currently scheduled for 19:30.",
  },
  {
    id: "venues",
    category: "Publishing Workflow",
    title: "Venue details slot into the site data model",
    summary:
      "Once venue notes arrive, they can feed both the venue cards and future visitor guidance without changing the components.",
  },
  {
    id: "social",
    category: "Social Integration",
    title: "News items can syndicate to social channels",
    summary:
      "This frontend is now structured for share actions, Open Graph metadata, and a later CMS or automation layer for publishing.",
  },
];
