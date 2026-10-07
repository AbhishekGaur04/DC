// src/constants/seoData.ts

export interface RouteSEO {
  path: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogType: string;
  schema: object;
}

const siteUrl = "https://www.diamondconstructionkota.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#organization`,
  "name": "Diamond Construction (DC)",
  "legalName": "Diamond Construction",
  "url": siteUrl,
  "logo": `${siteUrl}/diamond-icon.webp`,
  "image": `${siteUrl}/diamond-icon.webp`,
  "description": "Premier industrial construction contractor specializing in Thermal Power Plants, Refineries, Metro projects, Thermal Insulation, Refractory Works, and Manpower supply in Kota, Rajasthan.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "A-31, Jay Prakash Kumar, Landmark City Road, RSEB Area",
    "addressLocality": "Kota",
    "addressRegion": "Rajasthan",
    "postalCode": "324008",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.18",
    "longitude": "75.83"
  },
  "telephone": "+91-7340588077",
  "email": "diamondkota1@gmail.com",
  "taxID": "08BOGPA8472K1ZM",
  "priceRange": "$$$$"
};

export const seoData: Record<string, RouteSEO> = {
  "/": {
    path: "/",
    title: "Diamond Construction (DC) — World-Class Industrial & Thermal Power Construction in Kota",
    description: "Diamond Construction specializes in Thermal Power, Refinery & Metro projects with nearly two decades of proven excellence in Kota, Rajasthan. Thermal insulation, refractory work & manpower supply.",
    keywords: "Diamond Construction, construction company Kota, thermal power plant contractor, refinery construction, metro project work, thermal insulation Kota, refractory work Rajasthan, industrial manpower supply",
    canonical: `${siteUrl}/`,
    ogType: "website",
    schema: organizationSchema,
  },
  "/about": {
    path: "/about",
    title: "About Us | Diamond Construction — Nearly Two Decades of Engineering Excellence",
    description: "Learn about Diamond Construction's heritage, certified engineering capabilities, safety standards, and leadership across major infrastructure projects in India.",
    keywords: "about Diamond Construction, Kota industrial contractor, industrial construction heritage, engineering safety standards, infrastructure contractor Rajasthan",
    canonical: `${siteUrl}/about`,
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": organizationSchema,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
          { "@type": "ListItem", "position": 2, "name": "About Us", "item": `${siteUrl}/about` }
        ]
      }
    },
  },
  "/services": {
    path: "/services",
    title: "Industrial Construction Services | Thermal Insulation, Refractory & Civil Works | Diamond Construction",
    description: "Specialized industrial services including Thermal Insulation, Refractory Work, Civil Construction, Industrial Painting, Thermal Power Works, and Skilled Manpower in Kota, Rajasthan.",
    keywords: "industrial construction services, thermal insulation contractor, refractory installation Kota, industrial painting Rajasthan, power plant maintenance, metro civil work, skilled manpower supply",
    canonical: `${siteUrl}/services`,
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Industrial Construction & Thermal Insulation",
      "provider": organizationSchema,
      "areaServed": "India",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Industrial Construction Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Civil Construction Work" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Thermal Insulation Work" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Refractory Work" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Industrial Painting" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Thermal Power Plant Work" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Metro Project Work" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Refinery Work" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Structural Work" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Manpower Supply for Mechanical & Civil Works" } }
        ]
      }
    },
  },
  "/projects": {
    path: "/projects",
    title: "Industrial Projects Showcase | NTPC, Reliance, BHEL & L&T | Diamond Construction",
    description: "Explore landmark thermal power, refinery, and metro infrastructure projects executed by Diamond Construction for industry leaders like NTPC, BHEL, Reliance, and L&T.",
    keywords: "Diamond Construction projects, NTPC contractor, Reliance project works, BHEL civil contractor, thermal power project portfolio, Kota industrial achievements",
    canonical: `${siteUrl}/projects`,
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Diamond Construction Projects Portfolio",
      "description": "Major industrial and infrastructure project portfolio executed by Diamond Construction.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
          { "@type": "ListItem", "position": 2, "name": "Projects", "item": `${siteUrl}/projects` }
        ]
      }
    },
  },
  "/process": {
    path: "/process",
    title: "Our Execution Process & Methodology | Diamond Construction Kota",
    description: "Discover our rigorous 10-stage execution methodology ensuring safety, quality assurance, precision engineering, and timely delivery on every industrial project.",
    keywords: "construction execution process, industrial project methodology, quality assurance construction, 10-stage execution, safety protocol power plant",
    canonical: `${siteUrl}/process`,
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Project Execution Methodology",
      "description": "Comprehensive 10-stage workflow and quality control methodology used by Diamond Construction.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
          { "@type": "ListItem", "position": 2, "name": "Process", "item": `${siteUrl}/process` }
        ]
      }
    },
  },
  "/why-choose-us": {
    path: "/why-choose-us",
    title: "Why Choose Diamond Construction | Quality, Safety & Proven Track Record",
    description: "Why top infrastructure conglomerates trust Diamond Construction: 18+ years experience, zero-incident safety culture, certified workforce, and rapid execution.",
    keywords: "why choose Diamond Construction, trusted contractor Kota, safety certified industrial contractor, reliable thermal insulation partner, industrial contractor advantages",
    canonical: `${siteUrl}/why-choose-us`,
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Why Choose Diamond Construction",
      "description": "Core competencies, safety records, and client value delivered by Diamond Construction.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
          { "@type": "ListItem", "position": 2, "name": "Why Choose Us", "item": `${siteUrl}/why-choose-us` }
        ]
      }
    },
  },
  "/certifications": {
    path: "/certifications",
    title: "Certifications, Compliance & Safety Standards | Diamond Construction",
    description: "Verified GSTIN, ESIC, EPFO, ISO compliance, and safety certifications guaranteeing total regulatory adherence on all heavy industrial sites.",
    keywords: "Diamond Construction certifications, GSTIN 08BOGPA8472K1ZM, industrial safety compliance, ESIC EPFO registered contractor Kota, ISO standard construction",
    canonical: `${siteUrl}/certifications`,
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Certifications & Statutory Compliance",
      "description": "Statutory registrations, safety credentials, and compliance documents of Diamond Construction.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
          { "@type": "ListItem", "position": 2, "name": "Certifications", "item": `${siteUrl}/certifications` }
        ]
      }
    },
  },
  "/contact": {
    path: "/contact",
    title: "Contact Diamond Construction | Kota, Rajasthan Head Office",
    description: "Get in touch with Diamond Construction in Kota, Rajasthan. Reach out for project inquiries, tenders, civil and mechanical contracts, and workforce solutions.",
    keywords: "contact Diamond Construction, Kota construction office, construction inquiries Rajasthan, industrial contractor contact, hire construction manpower Kota",
    canonical: `${siteUrl}/contact`,
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": organizationSchema,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
          { "@type": "ListItem", "position": 2, "name": "Contact Us", "item": `${siteUrl}/contact` }
        ]
      }
    },
  },
  "/sitemap": {
    path: "/sitemap",
    title: "Site Directory & Navigation | Diamond Construction Kota",
    description: "Complete visual sitemap and navigation directory of all pages, industrial services, past projects, and company resources for Diamond Construction Kota.",
    keywords: "Diamond Construction sitemap, site directory, navigation Kota construction, pages index",
    canonical: `${siteUrl}/sitemap`,
    ogType: "website",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Visual Sitemap & Directory",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
          { "@type": "ListItem", "position": 2, "name": "Sitemap", "item": `${siteUrl}/sitemap` }
        ]
      }
    },
  },
};
