import { useEffect } from 'react';

// Ports the process sticky-step progress tracker from js/script.js
export default function useProcessProgress() {
  useEffect(() => {
    const processList = document.querySelector('.process-list');
    const processSteps = document.querySelectorAll('.process-step');
    const processProgressStep = document.querySelector('.process-progress-step');
    const processProgressFill = document.querySelector('.process-progress-fill');

    if (!processList || !processSteps.length || !processProgressStep || !processProgressFill) {
      return undefined;
    }

    const totalSteps = processSteps.length;

    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-active', entry.isIntersecting);

        if (entry.isIntersecting) {
          const index = Array.from(processSteps).indexOf(entry.target);
          processList.setAttribute('data-active', '');
          processProgressStep.textContent = String(index + 1).padStart(2, '0');
          processProgressFill.style.width = `${((index + 1) / totalSteps) * 100}%`;
        }
      });
    }, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    });

    processSteps.forEach((step) => stepObserver.observe(step));

    return () => stepObserver.disconnect();
  }, []);
}
