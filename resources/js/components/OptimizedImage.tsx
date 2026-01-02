import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    loading?: 'lazy' | 'eager';
    placeholder?: React.ReactNode;
}

export function OptimizedImage({
    src,
    alt,
    className,
    width,
    height,
    loading = 'lazy',
    placeholder,
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!imgRef.current) return;

        // Eager loading için direkt yükle
        if (loading === 'eager') {
            const img = new Image();
            img.onload = () => setIsLoaded(true);
            img.onerror = () => setError(true);
            img.src = src;
            return;
        }

        // Lazy loading için IntersectionObserver kullan
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isLoaded && !error) {
                        const img = new Image();
                        img.onload = () => setIsLoaded(true);
                        img.onerror = () => setError(true);
                        img.src = src;
                        observer.disconnect();
                    }
                });
            },
            { rootMargin: '50px' },
        );

        observer.observe(imgRef.current);

        return () => observer.disconnect();
    }, [src, isLoaded, error, loading]);

    return (
        <div className={className} style={{ width, height }}>
            {!isLoaded && !error && (
                <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800 animate-pulse">
                    {placeholder || (
                        <span className="text-zinc-400 text-xs">Loading...</span>
                    )}
                </div>
            )}
            {error ? (
                <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                    <span className="text-zinc-400 text-xs">Image failed to load</span>
                </div>
            ) : (
                <img
                    ref={imgRef}
                    src={isLoaded ? src : undefined}
                    alt={alt}
                    className={`${className} transition-opacity duration-300 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading={loading}
                    width={width}
                    height={height}
                />
            )}
        </div>
    );
}

