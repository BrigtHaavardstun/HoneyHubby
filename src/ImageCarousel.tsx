import React, { useState, useEffect } from 'react';

interface ImageCarouselProps {
    totalImages?: number;
    displayCount?: number;
    tickRate?: number;
    baseUrl?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
                                                         totalImages=13,
                                                         displayCount = 10,
                                                         tickRate = 3000,
                                                         // Use baseUrl prop to handle GitHub Pages subdirectory
                                                         baseUrl = process.env.PUBLIC_URL,
                                                     }) => {
    const [visibleImages, setVisibleImages] = useState<string[]>([]);
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        if (totalImages < displayCount) {
            console.warn('Total images should be greater than or equal to display count');
            return;
        }

        const updateImages = (index: number) => {
            return Array.from({ length: displayCount }, (_, i) => {
                const imageIndex = ((index + i) % totalImages) + 1;
                // Construct the path using baseUrl
                return `${baseUrl}/images/image${imageIndex}.jpg`;
            });
        };

        // Initialize the visible images array
        setVisibleImages(updateImages(0));

        // Set up the interval to update images
        const interval = setInterval(() => {
            setStartIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % totalImages;
                setVisibleImages(updateImages(newIndex));
                return newIndex;
            });
        }, tickRate);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [totalImages, displayCount, tickRate, baseUrl]);

    return (
        <div className="image-carousel">
            {visibleImages.map((src, index) => (
                <img
                    key={`${src}-${index}`}
                    src={src}
                    alt={`Carousel image ${index + 1}`}
                    className="carousel-image"
                    loading="lazy"
                />
            ))}
        </div>
    );
};

export default ImageCarousel;