'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Inner component that uses useSearchParams
function ProgressBarInner() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This effect runs when the route changes
    let timeoutId: NodeJS.Timeout;

    // Start the loading animation
    const startLoading = () => {
      setIsVisible(true);
      setProgress(0);

      // Quickly move to 80% to simulate loading
      const initialLoadingTimeoutId = setTimeout(() => {
        setProgress(70);
      }, 50);

      return () => clearTimeout(initialLoadingTimeoutId);
    };

    // Complete the loading animation
    const completeLoading = () => {
      setProgress(100);

      // Hide the progress bar after it reaches 100%
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 200);
    };

    // Start and complete the loading sequence
    const cleanup = startLoading();
    completeLoading();

    return () => {
      cleanup();
      clearTimeout(timeoutId);
    };
  }, [pathname, searchParams]); // Triggered when pathname or search params change

  return (
    <div
      className={`bg-primary fixed top-0 right-0 left-0 z-50 h-1 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        width: `${progress}%`,
        transition: 'width 0.3s ease-in-out',
      }}
    />
  );
}

// Fallback component shown during loading
function ProgressBarFallback() {
  return <div className="bg-primary/30 fixed top-0 right-0 left-0 z-50 h-1" />;
}

// Main exported component with Suspense boundary
export function TopProgressBar() {
  return (
    <Suspense fallback={<ProgressBarFallback />}>
      <ProgressBarInner />
    </Suspense>
  );
}
