import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Process from './pages/Process';
import Projects from './pages/Projects';
import WhyChooseUs from './pages/WhyChooseUs';
import Certifications from './pages/Certifications';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import NotFound from './pages/NotFound';
import { seoData } from './constants/seoData';

export const routes = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/process',
  '/why-choose-us',
  '/certifications',
  '/contact',
  '/sitemap',
];

export { seoData };

export function render(url: string) {
  return renderToString(
    <MemoryRouter initialEntries={[url]}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/process" element={<Process />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </MemoryRouter>
  );
}
