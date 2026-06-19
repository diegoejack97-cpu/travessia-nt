import { motion, useReducedMotion } from 'framer-motion';

function AnimatedCard({ as = 'article', className = '', children, ...props }) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] ?? motion.article;

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </Component>
  );
}

export default AnimatedCard;
