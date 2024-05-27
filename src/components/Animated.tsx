import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedProps {
  children: ReactNode;
}

export const Animated = ({ children }: AnimatedProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
