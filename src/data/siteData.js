const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

export const festival = {
  name: "SAMA 2026",
  city: "Brighton",
  strapline: "SAMA International Film Festival Brighton 2026",
  dateRange: "15-19 June 2026",
  defaultStartTime: "19:30",
  description:
    "Join us for the inaugural Sama Brighton film festival, providing an international platform promoting freedom of expression and showcasing displaced, diasporic and underrepresented filmmakers. Five nights of features, documentaries and shorts - plus discussions, music and connection - across multiple venues in Brighton and Lewes.",
  motherFestivalUrl: "https://www.samaiff.com/",
};

export const about = {
  title: "Sama Brighton Film Festival",
  eyebrow: "About",
  intro:
    "A new festival bringing diasporic and underrepresented cinema to Brighton\u00a0&\u00a0Hove.",
  imageUrl: assetPath("Artwork/SAMA west pier artwork.jpg"),
  logoUrl: assetPath("Artwork/sama-brighton-main-logo-transparent.png"),
  paragraphs: [
    "Sama Film Festival is an international platform dedicated to amplifying voices shaped by displacement and political violence. Founded in Stockholm 17 years ago, Sama began with a focus on Afghan cinema and has since grown into a wider showcase for films made under conditions of conflict, censorship and exile.",
    "The work presented through Sama is not defined by geography alone, but also motivated by a shared artistic sensibility informed by restriction and movement, and highlighting the persistence of voice.",
    "The first Brighton edition takes place during Refugee Week, and brings Sama to new surroundings, with a multi-venue programme taking advantage of the diverse screening spaces Brighton and Lewes have to offer.",
    "We have put together films previously selected for the annual Stockholm event, alongside conversations and public events that invite audiences to immerse themselves in a wider cultural field - one shaped by the emotional and spiritual realities of displacement, violence and repression. A world where survival is not only physical, but also a struggle to hold onto expressive presence, meaning and a sense of self against all odds.",
    "The festival takes its name from the Sufi practice of sama - deep listening and attentive presence as a path towards understanding. This idea sits at the heart of the festival: cinema as a space of attention, where stories are received with openness and perspectives formed under duress can be meaningfully encountered.",
    "The festival is delivered by Stories from Nowhere CIC, a Brighton-based platform working across film, storytelling and public cultural programmes. Stories from Nowhere exists to collect, preserve and share narratives shaped by displacement, conflict and systems of exclusion.",
    "It is exciting to be bringing Sama to Brighton audiences for the first time in 2026. We look forward to meeting you at one of our events. With thanks to our partner venues, artists and designers, and all the other collaborators who have given their energy to making this happen. And particular gratitude to Chalk Cliff Trust and Enjoolata for providing the funds to make it possible.",
  ],
  links: [
    {
      label: "samaiff.com",
      url: "https://www.samaiff.com/",
    },
    {
      label: "storiesfromnowhere.org",
      url: "https://storiesfromnowhere.org/",
    },
  ],
  team: [
    {
      name: "Sanjar Qiam",
      role: "Co-producer",
      bio: "Sanjar Qiam is the founder and Director of Stories from Nowhere. Sanjar is an artist and storyteller based in Brighton. His work explores memory and freedom of expression, often shaped by lived experience of displacement and conflict.",
    },
    {
      name: "Maddy Ryle",
      role: "Co-producer",
      bio: "Maddy is a co-director of Stories from Nowhere. Her background includes communications, campaigning and governance for many nonprofit and community initiatives. She is also a gardener and editor.",
    },
    {
      name: "Alasdair Dawney",
      role: "Co-producer",
      bio: "Alasdair works in local venues the Duke of York’s cinema and the Rose Hill and has a passion for film, music and making space for underrepresented culture in Brighton.",
    },
    {
      name: "Layla Skedaddle",
      role: "Social Media Coordinator and Marketing Support",
      bio: "Brighton organiser and film programmer. Founder of @wetpuppetcinema, co-founder of @queerfriendlyimprov and @transcendborders.",
    },
    {
      name: "Rob Koeling",
      role: "Website design",
      bio: "During the day, Rob works as a Data Scientist, but he needs a healthy dose of film and music to keep him sane. He is keen to support any effort to make culture in Brighton more diverse.",
    },
  ],
};

export const films = {
  simasSong: {
    title: "Sima's Song",
    director: "Roya Sadat",
    directorMeta: "(2024, Afghanistan, 1h37m)",
    directorCredits: [
      {
        name: "Roya Sadat",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Roya_Sadat",
      },
    ],
    artworkUrl: assetPath("posters/simas-song.jpg"),
    description:
      "For the opening night of SAMA Brighton 2026 we take a short trip to the Lewes Depot for the UK premiere of Sima’s Song, an exploration of friendship, upheaval and ideology in 1970s Afghanistan. The film follows Suraya and her close friend Sima as political turmoil, ideology, marriage, and women’s rights reshape their friendship and their futures.",
    programmeNotes: [
      {
        emphasis: "strong",
        prefix:
          "The film will be followed by a live Q&A with director Roya Sadat, founder of ",
        link: {
          label: "Roya Film House",
          url: "https://www.royafilmhouse.com/",
        },
        suffix:
          " and co-founder of the International Women's Film Festival in Afghanistan, currently taking place in exile after being outlawed by the Taliban.",
      },
      "Sima’s Song was Winner of Best Afghan Feature Film at Sama Stockholm 2025. It was also Winner of the Public Award at the 2025 Bilbao Cine Invisible ‘Film Sozialak’ Festival, and nominated for awards at the Seville European Film Festival and the Tokyo International Film Festival.",
    ],
    quotes: [
      {
        text: "Global history has largely ignored our stories, reducing Afghanistan to a narrative of war, extremism and fundamentalism",
        source: "Roya Sadat",
      },
      {
        text: "The world is going down the wrong path; cinema needs to serve to awaken people",
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
    director: "Ashkat Kuchincherikov",
    directorMeta: "(2023, Kazakhstan, 1h53m)",
    directorCredits: [
      {
        name: "Ashkat Kuchincherikov",
        wikipediaUrl: "https://www.asiapacificscreenawards.com/apsa-academy-members/askhat-kuchencherekov",
      },
    ],
    artworkUrl: assetPath("posters/Bauryna_Salu.jpeg"),
    description:
      "Sama Brighton 2026 closes at the wonderful Fabrica arts venue with a rare chance to see Kazakh cinema. The beautifully-shot feature film, Bauryna Salu, follows Yersultan - a boy given away to be raised by his grandmother, according to nomadic tradition. As he hits puberty he is forced to return to live with his birth parents; the film depicts his struggles for identity and belonging against the fascinating backdrop of daily life in rural Kazakhstan.",
    programmeNotes: [
      "Winner of multiple international awards including the Panavision Cinematography Award at the Asian World Film Festival 2024",
      "We are very pleased to have producer Dias Feld present at the screening for an in-person Q&A.",
      "After the film, stay on and celebrate the end of Sama Brighton 2026 with the local community. Bar, snacks, live music and more - details TBA.",
    ],
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
    directorMeta: "(2023, Afghanistan/USA, 1h20m)",
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
    programmeNotes: [
      "Winner of multiple international awards including the Grand Prize at the Banff Mountain Film Festival 2024 and Best International Documentary at Sama Stockholm 2025.",
      "Plus music, readings and discussion in the friendly surroundings of the Rose Hill.",
    ],
    quotes: [
      {
        text: "The heart of this film is about connection – how sport can unite people, uplift the next generation and spark hope in places where it’s needed most…",
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
    directorMeta: "(2025, Iran, 12m)",
    directorCredits: [
      {
        name: "Mohammadreza (Oshan) Mahmoodi",
      },
    ],
    artworkUrl: assetPath("Artwork/the-knot.png"),
    description:
      "A desperate actress, facing her husband's impending execution, manipulates a victim's grieving mother by claiming pregnancy to gain sympathy, but her deception unravels…",
    sourceLinks: [
      {
        label: "Official selection artwork",
        url: "https://www.samaiff.com/Archives/festival-2024/official-selection_2025",
      },
    ],
  },
  gap: {
    title: "Gap",
    director: "Farnaz Farsi",
    directorMeta: "(2024, Iran, 18m)",
    directorCredits: [{ name: "Farnaz Farsi" }],
    artworkUrl: assetPath("posters/gap.jpg"),
    description:
      "Arezou’s mother believes she always makes the best decisions for her 17-year-old daughter, but Arezou wants to live life her own way. Winner of Best International Short at Sama Stockholm 2025.",
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
    directorMeta: "(2025, Iran, 14m)",
    directorCredits: [{ name: "Sam Javadi" }],
    artworkUrl: assetPath("Artwork/wednesday.jpg"),
    description:
      "The story of an old foley artist who is in love with the sounds of nature he has created.",
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
    directorMeta: "(2025, Iran/Kurdistan, 8m)",
    directorCredits: [{ name: "Saro Heidari" }],
    artworkUrl: assetPath("posters/bint-el-shalabiya.jpg"),
    description:
      "As air-raid sirens scream, a young girl finds freedom in fantasy and music amidst a repressive patriarchal society. Special Mention at Sama Stockholm 2025 (International Short).",
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
    directorMeta: "(2025, Afghanistan, 10m)",
    directorCredits: [{ name: "Mahmoud Salimi" }],
    artworkUrl: assetPath("posters/perfect-restaurant.jpg"),
    description:
      "On a date, Roya and Mansoor pretend to be married in order to sidestep public scrutiny, scandal, and the social risks attached to being seen together. Winner of Best Afghan Short at Sama Stockholm 2025.",
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
    directorMeta: "(2021, Afghanistan, 1h30m)",
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
      "A two-decade, BAFTA-awarded documentary portrait following Mir Hussein from childhood in Bamiyan into adult life, set against the upheavals of modern Afghanistan’s recent history. Plus we are very excited to have a live, in-person Q&A with directors Phil Grabsky (of Brighton-based Seventh Art Productions) and Shoaib Sharifi.",
    detailFlowBlocks: [
      {
        type: "paragraph",
        text: "My Childhood, My Country commits to a film-making that properly represents life unfolding against the context of conflict, continuing a documentary project that began in 2004 with The Boy Who Plays on the Buddhas of Bamiyan.",
      },
      {
        type: "quote",
        text: "One day I saw a foreigner and an Afghan holding what I now know is a camera. I looked at this strange machine and this strange machine looked at me and kept looking.",
        source: "Mir Hussein",
      },
      { type: "paragraph", text: "Winner of the BAFTA for Best Single Documentary 2022" },
    ],
    programmeNotes: [],
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
    heroDayLabel: "MON 15 JUN",
    fullDate: "Monday 15 June 2026",
    venue: "Lewes Depot",
    title: "Sima's Song",
    heroTitle: "Sima’s Song (Afghanistan)",
    filmIds: ["simasSong"],
    startTime: "17.30",
    heroStartTime: "17.30",
    ticketUrl: "https://lewesdepot.org/film/simas-song",
    status: "TBC",
    summary: "UK premiere of Sima's Song + director Q&A",
    cardSummary:
      "For the opening night of SAMA Brighton 2026 we take a short trip to the Lewes Depot for the UK premiere of Sima’s Song, an exploration of friendship, upheaval and ideology in late 1970s Afghanistan.",
  },
  {
    id: "2026-06-16",
    dayLabel: "Tue 16 Jun",
    heroDayLabel: "TUES 16 JUN",
    fullDate: "Tuesday 16 June 2026",
    venue: "Pink Moon",
    title: "Short film night",
    heroTitle: "Short films from Iran and Afghanistan",
    subtitle: "The Knot + Bint El Shalabiya + Gap + Wednesday + Perfect Restaurant + Border",
    filmIds: ["theKnot", "gap", "bintElShalabiya", "wednesday", "perfectRestaurant"],
    startTime: "19.00",
    heroStartTime: "19:00 DOORS",
    ticketUrl:
      "https://www.eventbrite.co.uk/e/sama-brighton-film-festival-short-films-fundraiser-at-pink-moon-tickets-1988090008734?aff=oddtdtcreator&keep_tld=true",
    status: "TBC",
    summary:
      "A night of short films bringing poignant, provocative and humorous slices of Afghan and Iranian cinema to the upstairs screen at Brighton’s beloved Pink Moon hangout space.",
    programmeNotes: [
      {
        emphasis: "italic",
        prefix:
          "NB: We apologise, this venue has steep stairs and is not accessible to wheelchair users or those with restricted mobility.",
        suffix: "",
      },
      {
        prefix: "Raising funds for Hummingbird’s much-needed ",
        link: {
          label: "Global Social Club",
          url: "https://www.hummingbirdproject.org.uk/gsc-youth-club-brighton.html",
        },
        suffix:
          " for young refugees. Tickets by donation, and come and hear young people from GSC speaking on the night.",
      },
    ],
    quotes: [
      {
        lines: [
          "I said to the night,",
          "If you are in love with the moon,",
          "It is because you never stay for long.",
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
    heroDayLabel: "WED 17 JUN",
    fullDate: "Wednesday 17 June 2026",
    venue: "Rose Hill",
    title: "Champions of the Golden Valley",
    heroTitle: "Champions of the Golden Valley (Afghanistan)",
    filmIds: ["championsGoldenValley"],
    startTime: "19:00 doors, 19:45 screening",
    heroStartTime: "19:00 DOORS, 19:45 SCREENING",
    heroVenue: "Rose Hill",
    ticketUrl:
      "https://therosehill.co.uk/event/sama-brighton-champions-of-the-golden-valley-part-of-brightons-first-afghani-film-festival/",
    status: "Confirmed",
    summary: "",
    detailSummary: "",
    cardSummary:
      "Documentary about the emergence of a homegrown ski culture in the mountains of Afghanistan. Plus music, readings and discussion TBA",
    cardProgrammeNotes: [],
  },
  {
    id: "2026-06-18",
    dayLabel: "Thu 18 Jun",
    heroDayLabel: "THURS 18 JUN",
    fullDate: "Thursday 18 June 2026",
    venue: "Duke's at Komedia",
    title: "My Childhood, My Country - 20 Years in Afghanistan",
    filmIds: ["myChildhoodMyCountry"],
    startTime: "19:00",
    heroStartTime: "19:00",
    ticketUrl:
      "https://www.picturehouses.com/movie-details/019/HO00018005/my-childhood-my-country-20-years-in-afghanistan?filter=",
    status: "Confirmed",
    summary: "",
    detailSummary: "",
    cardSummary:
      "A two-decade documentary portrait following Mir from childhood in Bamiyan into adult life, set against the upheavals of modern Afghanistan’s recent history.",
    cardProgrammeNotes: [
      "Plus an in-person Q&A with directors Phil Grabsky and Shoaib Sharifi.",
    ],
    programmeNotes: [],
  },
  {
    id: "2026-06-19",
    dayLabel: "Fri 19 Jun",
    heroDayLabel: "FRI 19 JUN",
    fullDate: "Friday 19 June 2026",
    venue: "Fabrica",
    title: "Bauryna Salu",
    heroTitle: "Bauryna Salu (Kazakhstan)",
    filmIds: ["baurynaSalu"],
    startTime: "18:00 doors, 18:30 screening",
    heroStartTime: "18:00 DOORS, 18.30 SCREENING",
    ticketPending: true,
    status: "Confirmed",
    summary: "",
    cardSummary:
      "SAMA Brighton 2026 closes with the luminous feature Bauryna Salu, which illustrates the quotidien adventures and familial challenges of a 12-year-old boy in Kazhakstan. Following the film the festival ends with a community celebration with live music.",
    cardProgrammeNotes: [],
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
