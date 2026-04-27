const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

export const festival = {
  name: "SAMA 2026",
  city: "Brighton",
  strapline: "SAMA International Film Festival Brighton 2026",
  dateRange: "15-19 June 2026",
  defaultStartTime: "19:30",
  description:
    "Join us for the inaugural SAMA Brighton film festival, providing an international platform dedicated to freedom of expression and to amplifying the voices of displaced, diasporic and underrepresented filmmakers. Five nights of features, documentaries and shorts, music and discussion across multiple venues in Brighton and Lewes.",
  motherFestivalUrl: "https://www.samaiff.com/",
};

export const about = {
  title: "SAMA Film Festival",
  intro:
    "This is the Brighton chapter of the SAMA International Film Festival. It focusses on filmmakers from Afghanistan, Iran, Tajikistan, Turkey, India, Kazakhstan, Kyrgyzstan, South Asia, and other underrepresented regions.",
  imageUrl:
    "https://impro.usercontent.one/appid/oneComWsb/domain/samaiff.com/media/samaiff.com/onewebmedia/Screenshot%202022-08-18%20at%2014.48.22.png?etag=%22487390-62fe3e84%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=1200%2B938",
  paragraphs: [
    "SAMAIFF is committed to amplifying cinematic voices from regions and communities that receive limited visibility within Nordic film culture. The Festival highlights works by filmmakers from Afghanistan, Iran, Tajikistan, Turkey, India, Kazakhstan, Kyrgyzstan, South Asia, and other underrepresented regions, while also welcoming European, American, and international filmmakers whose works engage with Asian societies and global cultural narratives. By showcasing diverse perspectives, the Festival promotes cultural exchange, broadens artistic representation, and supports both emerging and established voices in world cinema.",
    "The Festival is founded on the principles of freedom of expression, democracy, gender equality, respect for children’s rights, and the promotion of the positive values of life. SAMAIFF recognizes cinema as a powerful medium for social reflection and encourages works that engage with urgent global challenges, including the human consequences of war and conflict, displacement and humanitarian crises, environmental sustainability, and social transformation. Through film, the Festival seeks to inspire awareness, dialogue, and deeper understanding across cultures and communities.",
    "Committed to artistic integrity, SAMAIFF presents films distinguished by strong creative vision, meaningful storytelling, and technical excellence. The Festival values originality in both form and content and supports innovative approaches to cinematic language. While high artistic and technical standards guide the selection process, the Festival also recognizes the importance of socially relevant and compelling narratives, acknowledging that the urgency and impact of a film’s message may at times transcend formal conventions.",
    "Beyond screenings, SAMAIFF creates a dynamic space for dialogue, exchange, and cultural engagement. The Festival fosters meaningful interaction between filmmakers, audiences, and cultural institutions through discussions, round tables, and public programs that encourage knowledge-sharing, critical reflection, and intercultural understanding. By creating opportunities for conversation and collaboration, the Festival promotes mutual respect, global coexistence, and the continued development of international film culture.",
  ],
};

export const films = {
  simasSong: {
    title: "Sima's Song",
    director: "Roya Sadat",
    directorCredits: [
      {
        name: "Roya Sadat",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Roya_Sadat",
      },
    ],
    artworkUrl: assetPath("posters/simas-song.jpg"),
    description:
      "For the opening night of SAMA Brighton 2026 we take a short trip to the Lewes Depot for the UK premiere of Sima’s Song, an exploration of friendship, upheaval and ideology in 1970s Afghanistan. The film follows Suraya and her close friend Sima as political upheaval, ideology, marriage, and women’s rights reshape their friendship and their futures.",
    programmeNotes: [
      "Directed by Roya Sadat in 2024, 1h37m, Persian with English subtitles.",
      "Winner of the Public Award at the 2025 Bilbao Cine Invisible ‘Film Sozialak’ Festival.",
      "Nominated for awards at the Seville European Film Festival and the Tokyo International Film Festival.",
    ],
    quotes: [
      {
        text: "The world is going down the wrong path; cinema needs to serve to awaken people",
        source: "Roya Sadat",
      },
      {
        text: "Global history has largely ignored our stories, reducing Afghanistan to a narrative of war, extremism and fundamentalism",
        source: "Roya Sadat",
      },
    ],
    sourceLinks: [
      {
        label: "Official selection artwork",
        url: "https://www.samaiff.com/Archives/festival-2024/official-selection_2025",
      },
      {
        label: "Synopsis source",
        url: "https://cineuropa.org/film/468207/",
      },
    ],
    externalLinks: [
      {
        label: "Rotten Tomatoes",
        url: "https://www.rottentomatoes.com/m/simas_song",
      },
      {
        label: "IMDb",
        url: "https://www.imdb.com/title/tt11647720/",
      },
    ],
  },
  baurynaSalu: {
    title: "Bauryna Salu",
    director: "Askhat Kuchinchirekov",
    directorCredits: [
      {
        name: "Askhat Kuchinchirekov",
        wikipediaUrl: "https://www.asiapacificscreenawards.com/apsa-academy-members/askhat-kuchencherekov",
      },
    ],
    artworkUrl: assetPath("posters/Bauryna_Salu.jpeg"),
    description:
      "SAMA Brighton 2026 closes with the luminous feature Bauryna Salu, which illustrates the quotidien adventures and familial challenges of a 12-year-old boy in Kazhakstan. Following the film the festival ends with a community celebration with live music.",
    programmeNotes: ["£8/£5 (?) + ticket link"],
    quotes: [
      {
        text: "Many children around the world are raised by their grandparents or other relatives, and this film resonates with their experiences",
        source: "Ashkat K",
      },
    ],
    sourceLinks: [
      {
        label: "Official selection artwork",
        url: "https://www.samaiff.com/Archives/festival-2024/official-selection_2025",
      },
      {
        label: "Festival synopsis",
        url: "https://samaiff.com/Festival-2025/Read%20more%20_%20files/Bauryna%20Salu_1.docx",
      },
    ],
    externalLinks: [
      {
        label: "Rotten Tomatoes",
        url: "https://www.rottentomatoes.com/m/bauryna_salu",
      },
      {
        label: "IMDb",
        url: "https://www.imdb.com/title/tt28517189/",
      },
    ],
  },
  championsGoldenValley: {
    title: "Champions of the Golden Valley",
    director: "Ben Sturgulewski",
    directorCredits: [
      {
        name: "Ben Sturgulewski",
        wikipediaUrl: "https://www.sturgefilm.com/about",
      },
    ],
    artworkUrl: assetPath("posters/champions-golden-valley.jpg"),
    description:
      "Documentary about the emergence of a homegrown ski culture in the mountains of Afghanistan. Far from the luxury chalets of Alpe d’Huez, skiing provides moments of hope, transcendence and community forged in a context of recurrent conflict and uncertainty.",
    trailerEmbedUrl: "https://www.youtube.com/embed/aj3dokeUCvI",
    programmeNotes: ["Plus live music (details?), readings and discussion."],
    quotes: [
      {
        text: "The heart of this film is about connection - how sport can unite people, uplift the next generation and spark hope in places where it’s needed most...",
        source: "Ben Sturgulewski",
      },
    ],
    sourceLinks: [
      {
        label: "Official selection artwork",
        url: "https://www.samaiff.com/Archives/festival-2024/official-selection_2025",
      },
      {
        label: "Festival synopsis",
        url: "https://samaiff.com/Festival-2025/Read%20more%20_%20files/Champions%20of%20the%20Golden%20Valley_1.docx",
      },
    ],
    externalLinks: [
      {
        label: "Rotten Tomatoes",
        url: "https://www.rottentomatoes.com/m/champions_of_the_golden_valley",
      },
      {
        label: "IMDb",
        url: "https://www.imdb.com/title/tt32127384/",
      },
    ],
  },
  theKnot: {
    title: "The Knot",
    director: "Mohammadreza (Oshan) Mahmoodi",
    directorCredits: [
      {
        name: "Mohammadreza (Oshan) Mahmoodi",
      },
    ],
    artworkUrl: assetPath("Artwork/the-knot.png"),
    description: "Short fiction from Iran by Mohammadreza (Oshan) Mahmoodi, running 12:25 minutes.",
    sourceLinks: [
      {
        label: "Official selection artwork",
        url: "https://www.samaiff.com/Archives/festival-2024/official-selection_2025",
      },
    ],
  },
  gap: {
    title: "GAP",
    director: "Farnaz Farzi",
    directorCredits: [{ name: "Farnaz Farzi" }],
    artworkUrl: assetPath("posters/gap.jpg"),
    description:
      "A mother who believes she knows what is best for her seventeen-year-old daughter faces the widening distance between parental control and a teenager’s desire to choose her own life.",
    sourceLinks: [
      {
        label: "Official selection artwork",
        url: "https://www.samaiff.com/Archives/festival-2024/official-selection_2025",
      },
      {
        label: "Festival synopsis",
        url: "https://samaiff.com/Festival-2025/Read%20more%20_%20files/GAP.docx",
      },
    ],
  },
  wednesday: {
    title: "Wednesday",
    director: "Sam Javadi",
    directorCredits: [{ name: "Sam Javadi" }],
    artworkUrl: assetPath("Artwork/wednesday.jpg"),
    description: "Short fiction from Iran by Sam Javadi, running 14 minutes.",
    sourceLinks: [
      {
        label: "Official selection artwork",
        url: "https://www.samaiff.com/Archives/festival-2024/official-selection_2025",
      },
    ],
  },
  bintElShalabiya: {
    title: "Bint El Shalabiya",
    director: "Saro Heidari",
    directorCredits: [{ name: "Saro Heidari" }],
    artworkUrl: assetPath("posters/bint-el-shalabiya.jpg"),
    description:
      "In 1980s Kurdistan, a girl teaches herself music by ear while her family tries to suppress that desire. As an air-raid siren sounds, she chooses a fleeting taste of freedom over safety.",
    sourceLinks: [
      {
        label: "Official selection artwork",
        url: "https://www.samaiff.com/Archives/festival-2024/official-selection_2025",
      },
      {
        label: "Festival synopsis",
        url: "https://samaiff.com/Festival-2025/Read%20more%20_%20files/Bint%20El%20Shalabiya.docx",
      },
    ],
  },
  perfectRestaurant: {
    title: "Perfect Restaurant",
    director: "Mahmoud Salimi",
    directorCredits: [{ name: "Mahmoud Salimi" }],
    artworkUrl: assetPath("posters/perfect-restaurant.jpg"),
    description:
      "On a date, Roya and Mansoor pretend to be married in order to sidestep public scrutiny, scandal, and the social risks attached to being seen together.",
    sourceLinks: [
      {
        label: "Official selection artwork",
        url: "https://www.samaiff.com/Archives/festival-2024/official-selection_2025",
      },
      {
        label: "Festival synopsis",
        url: "https://samaiff.com/Festival-2025/Read%20more%20_%20files/Perfect%20Restaurant.docx",
      },
    ],
  },
  myChildhoodMyCountry: {
    title: "My Childhood, My Country - 20 Years in Afghanistan",
    director: "Phil Grabsky, Shoaib Sharifi",
    directorCredits: [
      {
        name: "Phil Grabsky",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Phil_Grabsky",
      },
      {
        name: "Shoaib Sharifi",
        wikipediaUrl: "https://www.bbc.co.uk/mediaaction/author/?id=author-shoaib-sharifi-1589895023",
      },
    ],
    artworkUrl: assetPath("posters/mcmc_small.jpg"),
    description:
      "A two-decade documentary portrait following Mir from childhood in Bamiyan into adult life, set against the upheavals of modern Afghanistan’s recent history. Plus live Q & A with directors Phil Grabsky and Shoaib Sharifi.",
    detailFlowBlocks: [
      {
        type: "quote",
        text: "One day I saw a foreigner and an Afghan holding what I now know is a camera. I looked at this strange machine and this strange machine looked at me and kept looking.",
        source: "Mir Hussein",
      },
      {
        type: "paragraph",
        text: "Another sentence blah blah blah an epic tale comparable to linklaters boyhood blah bla",
      },
      { type: "meta", text: "Dir. Phil Grabsky, Shoaib Shafiri, 2021, 1h30m" },
      { type: "label", text: "Awards" },
    ],
    programmeNotes: ["£10/£6 + ticket link"],
    trailerEmbedUrl: "https://www.youtube.com/embed/_WoROZl6kG0",
    externalLinks: [
      {
        label: "Rotten Tomatoes",
        url: "https://www.rottentomatoes.com/m/my_childhood_my_country_20_years_in_afghanistan",
      },
      {
        label: "IMDb",
        url: "https://www.imdb.com/title/tt14291906/",
      },
      {
        label: "AllMovie",
        url: "https://www.allmovie.com/movie/my-childhood-my-country-20-years-in-afghanistan-am251219",
      },
    ],
  },
};

export const programme = [
  {
    id: "2026-06-15",
    dayLabel: "Mon 15 Jun",
    fullDate: "Monday 15 June 2026",
    venue: "Lewes Depot",
    title: "Sima's Song",
    filmIds: ["simasSong"],
    startTime: "Time TBC",
    status: "TBC",
    summary: "UK premiere of Sima's Song at Lewes Depot.",
    cardSummary:
      "For the opening night of SAMA Brighton 2026 we take a short trip to the Lewes Depot for the UK premiere of Sima’s Song, an exploration of friendship, upheaval and ideology in late 1970s Afghanistan.",
  },
  {
    id: "2026-06-16",
    dayLabel: "Tue 16 Jun",
    fullDate: "Tuesday 16 June 2026",
    venue: "Pink Moon",
    title: "Short film night",
    subtitle: "The Knot + Gap + Wednesday + Bint El Shalabiya + Perfect Restaurant",
    filmIds: ["theKnot", "gap", "wednesday", "bintElShalabiya", "perfectRestaurant"],
    startTime: "Time TBC",
    status: "TBC",
    summary:
      "A night of short films bringing poignant, provocative and humorous slices of Afghan and Iranian cinema to the upstairs screen at Brighton’s beloved Pink Moon hangout space.",
    programmeNotes: [
      "FREE and eventbrite?",
    ],
    quotes: [
      {
        lines: [
          "I said to the night,",
          "If you are in love with the moon,",
          "It is because you never stay too long.",
          "The night turned to me and said,",
          "It is not my fault, I never see the sun,",
          "How can I know that love is endless?",
        ],
        source: "Rumi - Whispers of the Beloved",
      },
    ],
  },
  {
    id: "2026-06-17",
    dayLabel: "Wed 17 Jun",
    fullDate: "Wednesday 17 June 2026",
    venue: "Rose Hill",
    title: "Champions of the Golden Valley",
    filmIds: ["championsGoldenValley"],
    startTime: "19:00 doors, 19:45 screening",
    status: "Confirmed",
    summary: "",
    detailSummary: "",
    cardSummary: "Documentary about the emergence of a homegrown ski culture in the mountains of Afghanistan.",
    cardProgrammeNotes: ["Plus live music (details?), readings and discussion."],
  },
  {
    id: "2026-06-18",
    dayLabel: "Thu 18 Jun",
    fullDate: "Thursday 18 June 2026",
    venue: "Duke's at Komedia",
    title: "My Childhood, My Country - 20 Years in Afghanistan",
    filmIds: ["myChildhoodMyCountry"],
    startTime: "19:00",
    status: "Confirmed",
    summary: "",
    detailSummary: "",
    cardSummary:
      "A two-decade documentary portrait following Mir from childhood in Bamiyan into adult life, set against the upheavals of modern Afghanistan’s recent history. Plus live Q & A with directors Phil Grabsky and Shoaib Sharifi.",
    programmeNotes: ["£10/£6 + ticket link"],
  },
  {
    id: "2026-06-19",
    dayLabel: "Fri 19 Jun",
    fullDate: "Friday 19 June 2026",
    venue: "Fabrica",
    title: "Bauryna Salu",
    filmIds: ["baurynaSalu"],
    startTime: "18:00 doors, 18:30 screening",
    status: "Confirmed",
    summary: "",
    cardSummary:
      "SAMA Brighton 2026 closes with the luminous feature Bauryna Salu, which illustrates the quotidien adventures and familial challenges of a 12-year-old boy in Kazhakstan. Following the film the festival ends with a community celebration with live music.",
    cardProgrammeNotes: ["£8/£5 (?) + ticket link"],
  },
];

export const venues = [
  {
    name: "Lewes Depot",
    type: "Independent Cinema",
    note: "Opening-night venue with a contemporary cinema setting just outside Brighton in Lewes.",
    address: "Pinwell Road, Lewes, BN7 2JS",
    website: "http://www.lewesdepot.org/",
    phone: "01273 525354",
  },
  {
    name: "Pink Moon",
    type: "Screening space",
    note: "An intimate setting for the shorts programme and post-screening conversation.",
    address: "52 Ship St, Brighton BN1 1AF",
    website: "https://www.instagram.com/p/DGbj0BgNE0s/",
    phone: "07513 664374",
  },
  {
    name: "Rose Hill",
    type: "Community venue",
    note: "A relaxed, independent environment with a strong local cultural identity.",
    address: "Rose Hill Terrace, Brighton BN1 4JL",
    website: "https://www.therosehill.co.uk/",
    phone: "07775995493",
  },
  {
    name: "Duke's at Komedia",
    type: "City-centre cinema",
    note: "A central Brighton venue suited to one of the week’s major documentary screenings.",
    address: "Gardner House, 44-47 Gardner St, Brighton BN1 1UN",
    website: "https://www.picturehouses.com/cinema/duke-s-at-komedia/information",
    phone: "02073262649",
  },
  {
    name: "Fabrica",
    type: "Arts venue",
    note: "A striking space for the closing night, with room to add practical visitor guidance later.",
    address: "40 Duke St, Brighton BN1 1AG",
    website: "http://fabrica.org.uk/",
    phone: "01273778646",
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
