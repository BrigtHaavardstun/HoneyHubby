import React, { useState, useEffect } from 'react';

interface ImageCarouselProps {
    totalImages?: number;
    displayCount?: number;
    tickRate?: number;
    baseUrl?: string;
    vertical?: boolean;
    startingIndex?: number;
    imageWidth?: number;
    imageHeight?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
                                                         totalImages = 13,
                                                         displayCount = 10,
                                                         tickRate = 3000,
                                                         baseUrl = process.env.PUBLIC_URL,
                                                         vertical = false,
                                                         startingIndex = 0,
                                                         imageWidth,
                                                         imageHeight,
                                                     }) => {
    const [visibleImages, setVisibleImages] = useState<string[]>([]);
    const [startIndex, setStartIndex] = useState(startingIndex);

    useEffect(() => {
        if (totalImages < displayCount) {
            console.warn('Total images should be greater than or equal to display count');
            return;
        }

        const updateImages = (index: number) => {
            return Array.from({ length: displayCount }, (_, i) => {
                const imageIndex = ((index + i) % totalImages);
                return `${baseUrl}/images/image${imageIndex}.jpg`;
            });
        };

        setVisibleImages(updateImages(startingIndex));

        const interval = setInterval(() => {
            setStartIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % totalImages;
                setVisibleImages(updateImages(newIndex));
                return newIndex;
            });
        }, tickRate);

        return () => clearInterval(interval);
    }, [totalImages, displayCount, tickRate, baseUrl, startingIndex]);

    const carouselClassName = vertical ? "image-carousel-vertical" : "image-carousel";

    // Custom image style based on props
    const imageStyle = {
        width: imageWidth ? `${imageWidth}px` : undefined,
        height: imageHeight ? `${imageHeight}px` : undefined,
    };

    return (
        <div className={carouselClassName}>
            {visibleImages.map((src, index) => (
                <img
                    key={`${src}-${index}`}
                    src={src}
                    alt={`item number ${index + 1}`}
                    className="carousel-image"
                    style={imageStyle}
                    loading="lazy"
                />
            ))}
        </div>
    );
};

export default ImageCarousel;