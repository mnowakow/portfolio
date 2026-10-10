export type Publication = {
  title: string;
  authors: string;
  venue: string;
  link?: string;
};

export const publicationsByYear: { year: string; entries: Publication[] }[] = [
  {
    year: "2025",
    entries: [
      {
        title: "Perspectives on Practical Implementations in the Web-based Musical Metaverse",
        authors: "Dziwis D., Boem A., Nowakowski M., Turchet L.",
        venue: "IEEE International Symposium on the Internet of Sounds 2025",
        link: "https://ieeexplore.ieee.org/abstract/document/11284607",
      },
      {
        title: "Estimating Interaction Times in Music Notation Editors",
        authors: "Nowakowski M., Hadjakos A.",
        venue: "in: Music and Sound Generation in the AI Era. CMMR 2023. Lecture Notes in Computer Science, vol 15236. Springer, Cham.",
        link: "https://doi.org/10.1007/978-3-032-02042-0_34",
      },
      {
        title: "Disrupting Musical Behavior: Musicking Through Anti-Patterns in 3D",
        authors: "Nowakowski M., Dziwis D.",
        venue: "in: 30th International Symposium on Electronic/Emerging Art, South Korea: Art Center Nabi, Institute for Culture and Arts Seoul National University, 2025.",
      },
    ],
  },
  {
    year: "2024",
    entries: [
      {
        title: "State and Practice of Music Education Software Design",
        authors: "Nowakowski M., Hadjakos A.",
        venue: "in: Music, Technology, Innovation: Industry and Educational Perspectives, New York, NY, USA: Routledge, 2024.",
        link: "https://doi.org/10.4324/9781003041474",
      },
    ],
  },
  {
    year: "2023",
    entries: [
      {
        title: "Online Survey on Usability and User Experience of Music Notation Editors",
        authors: "Nowakowski M., Hadjakos A.",
        venue: "in: Proceedings of the First International Conference on Technologies for Music Notation and Representation (TENOR'23), 2023.",
        link: "https://www.tenor-conference.org/proceedings/2023/2-TENOR_BOSTON_2023_paper_5657Nowakowski.pdf",
      },
      {
        title: "Forschungsperspektiven zur Interaktion mit Musiknotation",
        authors: "Nowakowski M., Berndt A., Hadjakos A.",
        venue: "in: Digital Humanities im deutschsprachigen Raum (DHd): Open Humanities, Open Culture, Trier, Germany, 2023, p. 146-150.",
        link: "https://www.researchgate.net/profile/Axel-Berndt-2/publication/375773376_Forschungsperspektiven_zur_Interaktion_mit_Musiknotation/links/655c6880b1398a779da28b07/Forschungsperspektiven-zur-Interaktion-mit-Musiknotation.pdf",
      },
    ],
  },
  {
    year: "2022",
    entries: [
      {
        title: "Toward Interactive Music Notation for Learning Management Systems",
        authors: "Nowakowski M., Hadjakos A., Stärk A.",
        venue: "in: International Journal on Innovations in Online Education, vol. 5, iss. 3, 2022. Publisher: Begel House Inc.",
        link: "http://onlineinnovationsjournal.com/streams/visual-and-performing-arts/1797e09824daced5.html",
      },
    ],
  },
  {
    year: "2019",
    entries: [
      {
        title: "Towards Deep Learning Strategies for Transcribing Electroacoustic Music",
        authors: "Nowakowski M., Abeßer J., Weiß C.",
        venue: "in: Proceedings of the 14th International Symposium on CMMR, Marseille, France Oct. 14-18, 2019, p. 450–461.",
        link: "https://link.springer.com/chapter/10.1007/978-3-030-70210-6_3",
      },
    ],
  },
];

export const bestPaperAward = {
  title: "Best Paper Award — CMMR Marseille, Sep. 2019",
  description: "„Toward Deep-Learning Strategies for Transcribing Electroacoustic Music“, as a summary of the bachelor's thesis at the University of Applied Sciences Düsseldorf.",
  link: "https://cmmr2019.prism.cnrs.fr/awards.html",
};