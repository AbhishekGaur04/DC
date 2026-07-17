// src/components/Card.tsx
import { motion } from "framer-motion";

type CardProps = {
  title: string;
  description?: string;
  imageUrl: string;
  link?: string;
};

export default function Card({ title, description, imageUrl, link }: CardProps) {
  const content = (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.02 }}
    >
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" loading="lazy" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
    </motion.div>
  );

  return link ? (
    <a href={link} className="block" target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}
