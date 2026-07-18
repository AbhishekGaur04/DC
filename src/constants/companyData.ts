// src/constants/companyData.ts

export const companyInfo = {
  name: "Diamond Construction (DC)",
  tagline: "World-Class Quality in Every Layer",
  headquarters: "Kota, Rajasthan",
  coreSpecialty: "Mechanical, Civil, Insulation, Refractory, Industrial Painting, and Structural work in Thermal power, Refinery, and Metro Projects.",
  secondarySpecialty: "Mechanical & Civil Manpower supply.",
  experience: "Nearly two decades of experience.",
  keyClients: ["NTPC", "Reliance", "BHEL", "L&T", "Aditya Birla"],
};

export const coreValues = [
  "Quality First",
  "Safety Always",
  "Commitment to Deadlines",
  "Integrity",
  "Innovation",
  "Client Satisfaction",
  "Technical Excellence",
  "Team Excellence",
];

export const services = [
  { title: "Civil Construction Work" },
  { title: "Thermal Insulation Work" },
  { title: "Refractory Work" },
  { title: "Industrial Painting" },
  { title: "Thermal Power Plant Work" },
  { title: "Metro Project Work" },
  { title: "Refinery Work" },
  { title: "Structural Work" },
  { title: "Manpower Supply for Mechanical & Civil Works" },
];

export const processStages = [
  "Integrity with Client",
  "Clients Objectives and Priorities",
  "Site Survey",
  "Deployment of Workforce",
  "Ordering and Delivery of Material",
  "Safety Setup",
  "Execution & Supervision",
  "Quality Assurance & Safety Check",
  "Testing & Final Inspection",
  "Client Handover & Documentation",
];

/* ─── Currently Working On Projects ─── */
export const currentProjects = [
  {
    client: "Powermech Project Ltd.",
    projects: [
      {
        title: "Buxar – Ducting & Coal Pipe Erection",
        description: "Complete ducting and coal pipe erection work at Buxar thermal power plant under Powermech Project Ltd.",
        category: "Ducting & Erection",
        location: "Buxar",
        status: "In Progress" as const,
        imageUrl: "/projects/coal-pipe-erection.png",
      },
      {
        title: "Kodarma – Civil Work",
        description: "Civil construction works at Kodarma, Jharkhand including foundation, structural concrete, and allied civil activities.",
        category: "Civil",
        location: "Kodarma, Jharkhand",
        status: "In Progress" as const,
        imageUrl: "/projects/civil-construction.png",
      },
    ],
  },
  {
    client: "Doosan",
    projects: [
      {
        title: "NTPC Barh – Insulation Work",
        description: "Thermal insulation work at NTPC Barh Super Thermal Power Station including boiler components and piping systems.",
        category: "Insulation",
        location: "Barh, Bihar",
        status: "In Progress" as const,
        imageUrl: "/projects/insulation.png",
      },
    ],
  },
  {
    client: "L&T",
    projects: [
      {
        title: "Patna Metro – Civil Work",
        description: "Civil construction for Patna Metro Rail project including structural foundation, viaduct construction, and station civil works.",
        category: "Metro Project",
        location: "Patna, Bihar",
        status: "In Progress" as const,
        imageUrl: "/projects/metro.png",
      },
    ],
  },
  {
    client: "SP Singla Construction",
    projects: [
      {
        title: "Sherpur Digwara – Six Lane Bridge Construction",
        description: "Complete six-lane bridge construction project at Sherpur Digwara, Patna under SP Singla Construction, encompassing structural foundation work, pier construction, deck erection, and allied civil activities.",
        category: "Bridge / Highway",
        location: "Sherpur Digwara, Patna, Bihar",
        status: "In Progress" as const,
        imageUrl: "/projects/bridge-construction.png",
      },
    ],
  },
];

/* ─── Previous Works (All Clients) ─── */
export interface PreviousProject {
  title: string;
  year: string;
}

export interface PreviousClientGroup {
  client: string;
  projects: PreviousProject[];
}

export const previousWorks: PreviousClientGroup[] = [
  {
    client: "Powermech",
    projects: [
      { title: "NTPC Mouda", year: "2011–2013" },
      { title: "Reliance Sasan", year: "2012–2014" },
      { title: "Bawana Delhi", year: "2012–2013" },
      { title: "Sikka Gujarat", year: "2015–2016" },
      { title: "Chhabra Baran (Rajasthan)", year: "2017–2019" },
      { title: "Aligarh UP", year: "2019–2021" },
      { title: "Bunar Bihar", year: "2024" },
      { title: "Suratgarh Rajasthan", year: "2015–2016" },
      { title: "Vedanta (Odisha)", year: "2019–2020" },
      { title: "Mahatma Gandhi Thermal Power (Jhajjar)", year: "" },
    ],
  },
  {
    client: "PCPL",
    projects: [
      { title: "Chhabra Baran (Rajasthan)", year: "2008–2009" },
      { title: "NTPC Jhajjar (Haryana)", year: "2010–2013" },
      { title: "Bajaj Power Lalitpur (UP)", year: "2014–2017" },
      { title: "NTPC Darlipali (Odisha)", year: "2015–2019" },
      { title: "NTPC Meja (UP)", year: "2018–2019" },
    ],
  },
  {
    client: "Petron Engg.",
    projects: [
      { title: "NTPC Sipat", year: "2008–2009" },
      { title: "Rajeev Gandhi Thermal Power Station Hisar (Haryana)", year: "" },
      { title: "Adani Power Gondiya (Maharashtra)", year: "2011–2012" },
      { title: "Adani Power Kawai (Baran, Rajasthan)", year: "2013–2014" },
    ],
  },
  {
    client: "Brothers Engg.",
    projects: [
      { title: "GHTP Bhatinda Punjab", year: "2005–2006" },
      { title: "Giral Thermal Power (Rajasthan)", year: "2005–2006" },
    ],
  },
  {
    client: "UB Engg.",
    projects: [
      { title: "GHTP Thermal Power (Bhatinda, Punjab)", year: "2006–2007" },
      { title: "Adani Power Maharashtra Ltd (5×660 MW) Thermal Power Plant (Tiroda, Maharashtra)", year: "2017–2020" },
    ],
  },
  {
    client: "BHEL",
    projects: [
      { title: "Rayana RTPP", year: "2022–2023" },
      { title: "NTPC Ramagundam (Telangana)", year: "2020–2021" },
    ],
  },
  {
    client: "L&T",
    projects: [
      { title: "Chhabara (Rajasthan)", year: "2017–2018" },
      { title: "Koradi Nagpur (Maharashtra)", year: "2013–2014" },
    ],
  },
  {
    client: "Aditya Birla",
    projects: [
      { title: "Rayagada (Odisha)", year: "2021–2022" },
    ],
  },
  {
    client: "Golden Edge",
    projects: [
      { title: "Nigri Power Plant (MP)", year: "2012–2013" },
      { title: "NTPC Gadarwara (MP)", year: "2018–2019" },
    ],
  },
  {
    client: "DCPL",
    projects: [
      { title: "Chanrawa Tori (Jharkhand)", year: "2014–2015" },
      { title: "Govindwal (Punjab)", year: "2010–2012" },
    ],
  },
  {
    client: "Arun Construction",
    projects: [
      { title: "CTPP Chhabra (Rajasthan)", year: "2023" },
    ],
  },
  {
    client: "Doosan",
    projects: [
      { title: "NTPC Barh (Bihar)", year: "" },
    ],
  },
  {
    client: "Jindal Power",
    projects: [
      { title: "Raigarh", year: "2007–2009" },
    ],
  },
  {
    client: "Texel Engg.",
    projects: [
      { title: "NTPC Kahalgaon", year: "2007–2008" },
    ],
  },
];

export const galleryImages = [
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop", label: "Construction Site" },
  { src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop", label: "Industrial Work" },
  { src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop", label: "Welding" },
  { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop", label: "Engineering" },
  { src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop", label: "Metalwork" },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop", label: "Building" },
  { src: "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=600&h=400&fit=crop", label: "Architecture" },
  { src: "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=600&h=400&fit=crop", label: "Infrastructure" },
];

export const contactDetails = {
  address: "A-31, Jay Prakash Kumar, Landmark City Road, RSEB Area, Kota (Raj.) 324008",
  phones: ["+91-7340588077"],
  phone: "+91-7340588077",
  email: "diamondkota1@gmail.com",
};
