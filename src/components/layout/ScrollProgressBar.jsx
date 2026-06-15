import { useRef } from 'react';
import useScrollProgress from '../../hooks/useScrollProgress';

export default function ScrollProgressBar() {
  const ref = useRef(null);
  useScrollProgress(ref);

  return <div className="scroll-progress" ref={ref} aria-hidden="true"></div>;
}
