// src/components/SEO.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { seoData, type RouteSEO } from "../constants/seoData";

const fallbackSEO: RouteSEO = {
  path: "/",
  title: "Diamond Construction (DC) — World-Class Quality in Every Layer",
  description: "Diamond Construction specializes in Thermal Power, Refinery & Metro projects with nearly two decades of proven excellence in Kota, Rajasthan.",
  keywords: "Diamond Construction, Kota construction, industrial contractor",
  canonical: "https://www.diamondconstructionkota.com/",
  ogType: "website",
  schema: {},
};

function updateMetaTag(attrName: "name" | "property", attrVal: string, content: string) {
  let element = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function updateCanonical(href: string) {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function updateJsonLd(schema: object) {
  let element = document.getElementById("schema-ld-json") as HTMLScriptElement | null;
  if (!element) {
    element = document.createElement("script");
    element.id = "schema-ld-json";
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(schema);
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Normalize pathname (remove trailing slash except for root)
    const normalized = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
    const current = seoData[normalized] || fallbackSEO;

    // Document Title
    document.title = current.title;

    // Meta tags
    updateMetaTag("name", "description", current.description);
    if (current.keywords) {
      updateMetaTag("name", "keywords", current.keywords);
    }

    // Canonical Link (CRITICAL: prevents duplicate page penalty & indexing exclusion)
    updateCanonical(current.canonical);

    // Open Graph
    updateMetaTag("property", "og:title", current.title);
    updateMetaTag("property", "og:description", current.description);
    updateMetaTag("property", "og:url", current.canonical);
    updateMetaTag("property", "og:type", current.ogType);

    // Twitter Card
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", current.title);
    updateMetaTag("name", "twitter:description", current.description);

    // Schema.org Structured Data
    if (current.schema && Object.keys(current.schema).length > 0) {
      updateJsonLd(current.schema);
    }
  }, [pathname]);

  return null;
}
