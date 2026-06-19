import { motion, useReducedMotion } from 'framer-motion';

function StageTransition({ children, transitionKey }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={transitionKey}
      initial={reduceMotion ? false : { opacity: 0, x: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default StageTransition;
