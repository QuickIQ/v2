import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'quickiq-tests-completed-counter';
const INITIAL_COUNT = 7349; // Starting count

export function useTestsCompletedCounter() {
  const { i18n } = useTranslation();
  const [count, setCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    // Initialize or reset counter
    const initializeCounter = () => {
      const now = new Date();
      const today = now.toDateString();
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const data = JSON.parse(stored);
        const storedDate = new Date(data.date);

        // Check if it's a new day (24 hours passed)
        const hoursDiff = (now.getTime() - storedDate.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff >= 24) {
          // Reset to initial count for new day
          const newData = {
            date: now.toISOString(),
            count: INITIAL_COUNT,
            lastUpdate30: now.getTime(),
            lastUpdate50: now.getTime(),
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
          setCount(INITIAL_COUNT);
          return newData;
        } else {
          // Continue with existing count
          setCount(data.count);
          return data;
        }
      } else {
        // First time - initialize
        const newData = {
          date: now.toISOString(),
          count: INITIAL_COUNT,
          lastUpdate30: now.getTime(),
          lastUpdate50: now.getTime(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        setCount(INITIAL_COUNT);
        return newData;
      }
    };

    const data = initializeCounter();
    let currentCount = data.count;
    let lastUpdate30 = data.lastUpdate30 || Date.now();
    let lastUpdate50 = data.lastUpdate50 || Date.now();

    // Interval for +1 every 30 seconds
    const interval30 = setInterval(() => {
      const now = Date.now();
      const timeSinceLast30 = (now - lastUpdate30) / 1000;

      if (timeSinceLast30 >= 30) {
        currentCount += 1;
        lastUpdate30 = now;
        
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data = JSON.parse(stored);
          const updatedData = {
            ...data,
            count: currentCount,
            lastUpdate30: now,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        }
        
        setCount(currentCount);
      }
    }, 1000); // Check every second

    // Interval for +2 every 50 seconds
    const interval50 = setInterval(() => {
      const now = Date.now();
      const timeSinceLast50 = (now - lastUpdate50) / 1000;

      if (timeSinceLast50 >= 50) {
        currentCount += 2;
        lastUpdate50 = now;
        
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data = JSON.parse(stored);
          const updatedData = {
            ...data,
            count: currentCount,
            lastUpdate50: now,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
        }
        
        setCount(currentCount);
      }
    }, 1000); // Check every second

    // Check for day reset every minute
    const dayCheckInterval = setInterval(() => {
      const now = new Date();
      const stored = localStorage.getItem(STORAGE_KEY);
      
      if (stored) {
        const data = JSON.parse(stored);
        const storedDate = new Date(data.date);
        const hoursDiff = (now.getTime() - storedDate.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff >= 24) {
          // Reset for new day
          const newData = {
            date: now.toISOString(),
            count: INITIAL_COUNT,
            lastUpdate30: now.getTime(),
            lastUpdate50: now.getTime(),
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
          currentCount = INITIAL_COUNT;
          lastUpdate30 = now.getTime();
          lastUpdate50 = now.getTime();
          setCount(INITIAL_COUNT);
        }
      }
    }, 60000); // Check every minute

    return () => {
      clearInterval(interval30);
      clearInterval(interval50);
      clearInterval(dayCheckInterval);
    };
  }, []);

  // Format the text
  const getText = () => {
    const formattedCount = count.toLocaleString();
    if (i18n.language === 'tr') {
      return `Bugün ${formattedCount} test tamamlandı!`;
    }
    return `Today ${formattedCount} test's completed!`;
  };

  return {
    count,
    text: getText(),
    formattedCount: count.toLocaleString(),
  };
}

