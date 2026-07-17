// src/components/Toast.tsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ToastProps = {
  message: string;
  visible: boolean;
  onClose: () => void;
  durationMs?: number;
};

export default function Toast({
  message,
  visible,
  onClose,
  durationMs = 3000,
}: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, durationMs);
      return () => clearTimeout(timer);
    }
  }, [visible, durationMs, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-success text-white px-6 py-3 rounded-md shadow-lg font-medium"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
