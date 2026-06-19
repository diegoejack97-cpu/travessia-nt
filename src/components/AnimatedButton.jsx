import { motion, useReducedMotion } from 'framer-motion';

function AnimatedButton({ className = '', children, ...props }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      className={className}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { y: 4, scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default AnimatedButton;
