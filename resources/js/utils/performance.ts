/**
 * Performance monitoring utilities
 * Used for measuring and monitoring component render times and function execution
 */

/**
 * Measures the execution time of a function
 * @param name - Name identifier for the measurement
 * @param fn - Function to measure
 */
export function measurePerformance(name: string, fn: () => void) {
    if (typeof window !== 'undefined' && 'performance' in window) {
        const start = performance.now();
        fn();
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    } else {
        fn();
    }
}

/**
 * Measures the execution time of an async function
 * @param name - Name identifier for the measurement
 * @param fn - Async function to measure
 * @returns The result of the function execution
 */
export async function measureAsyncPerformance<T>(
    name: string,
    fn: () => Promise<T>,
): Promise<T> {
    if (typeof window !== 'undefined' && 'performance' in window) {
        const start = performance.now();
        const result = await fn();
        const end = performance.now();
        console.log(`${name}: ${(end - start).toFixed(2)}ms`);
        return result;
    } else {
        return fn();
    }
}

import { useEffect } from 'react';

/**
 * Custom hook for monitoring component render performance
 * Only works in development mode
 * @param componentName - Name of the component being monitored
 */
export function usePerformanceMonitor(componentName: string) {
    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            'performance' in window &&
            process.env.NODE_ENV === 'development'
        ) {
            const startTime = performance.now();

            return () => {
                const endTime = performance.now();
                const duration = endTime - startTime;
                console.log(
                    `${componentName} render time: ${duration.toFixed(2)}ms`,
                );
            };
        }
    });
}

