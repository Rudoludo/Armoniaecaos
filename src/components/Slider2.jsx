import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

function Slider({ images, id = "infinite-carousel", direction = "left" }) {
    const [displayedImages, setDisplayedImages] = useState([]);
    const x = useMotionValue(0);
    const animationRef = useRef(null);
    const isDraggingRef = useRef(false);

    const containerRef = useRef(null);
    // Refs for the first slide of the A copy and the first slide of the B copy
    const firstASlideRef = useRef(null);
    const firstBSlideRef = useRef(null);

    // We no longer need separate slideWidth/gapWidth state, as we'll derive singleSetWidth directly
    const [singleSetWidth, setSingleSetWidth] = useState(0);

    useEffect(() => {
        if (images && images.length > 0) {
            setDisplayedImages([...images, ...images, ...images]);
        } else {
            setDisplayedImages([]);
        }
    }, [images]);

    // This is the CRITICAL measurement function
    const measureDimensions = useCallback(() => {
        if (firstASlideRef.current && firstBSlideRef.current && containerRef.current) {
            const rectA = firstASlideRef.current.getBoundingClientRect();
            const rectB = firstBSlideRef.current.getBoundingClientRect();

            // The singleSetWidth is the precise distance between the start of copy A and the start of copy B
            // Use Math.abs in case order is reversed for some reason, though it shouldn't be.
            const calculatedSetWidth = Math.abs(rectB.left - rectA.left);

            // Add console log to see what's being calculated
            console.log('measureDimensions calculated:', {
                rectA_left: rectA.left,
                rectB_left: rectB.left,
                calculatedSetWidth: calculatedSetWidth,
                containerWidth: containerRef.current.offsetWidth
            });

            if (calculatedSetWidth > 0 && Math.abs(calculatedSetWidth - singleSetWidth) > 0.1) { // Only update if significantly different
                setSingleSetWidth(calculatedSetWidth);

                // Initialize x only if it's practically zero (very first render or full reset)
                // And only if the new calculated width is different to prevent jump on every resize.
                if (Math.abs(x.get()) < 0.01) { // Tighter epsilon here for initial set
                    x.set(-calculatedSetWidth); // Start at the beginning of the 'B' copy
                }
            }
        } else {
            if (images.length > 0 && displayedImages.length > 0) { // Only retry if images are loaded but refs aren't ready
                console.warn("Slider: DOM elements not ready for precise measurement. Retrying...");
                setTimeout(measureDimensions, 100);
            }
        }
    }, [images.length, displayedImages.length, singleSetWidth, x]);

    useEffect(() => {
        const debouncedMeasure = debounce(measureDimensions, 100);
        // Measure immediately on mount
        measureDimensions();
        // Add resize listener
        window.addEventListener('resize', debouncedMeasure);
        // Clean up
        return () => window.removeEventListener('resize', debouncedMeasure);
    }, [measureDimensions]);

    // --- Animation Logic (remains mostly the same, now relying on the derived singleSetWidth state) ---
    const startAnimation = useCallback(() => {
        if (displayedImages.length === 0 || singleSetWidth === 0 || isDraggingRef.current) {
            if (singleSetWidth === 0 && images.length > 0) { // If dimensions not ready, retry
                setTimeout(startAnimation, 50);
            }
            return;
        }

        const animationDuration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--time')) || 20;
        let currentX = x.get();
        const loopEpsilon = 0.001; 

        // Normalize currentX to be strictly within the middle copy's operational range [-2*SW, -SW]
        while (currentX >= -singleSetWidth + loopEpsilon) { 
            currentX -= singleSetWidth;
        }
        while (currentX <= -singleSetWidth * 2 - loopEpsilon) { 
            currentX += singleSetWidth;
        }
        x.set(currentX);

        let targetX;
        let jumpToX;

        if (direction === "left") {
            targetX = -2 * singleSetWidth; 
            jumpToX = -singleSetWidth;    
        } else { // direction === "right"
            targetX = -singleSetWidth;    
            jumpToX = -2 * singleSetWidth; 
        }

        const distance = Math.abs(targetX - currentX);
        const duration = (distance / singleSetWidth) * animationDuration;

        if (animationRef.current) {
            animationRef.current.stop();
        }

        animationRef.current = animate(x, targetX, {
            duration: duration,
            ease: "linear",
            onComplete: () => {
                if (!isDraggingRef.current) {
                    x.set(jumpToX); // This is the invisible teleport
                    startAnimation(); 
                }
            }
        });

    }, [displayedImages.length, singleSetWidth, x, direction, images.length]);

    useEffect(() => {
        if (!isDraggingRef.current) {
            startAnimation();
        }
        return () => {
            if (animationRef.current) {
                animationRef.current.stop();
            }
        };
    }, [startAnimation]);


    // --- Drag Handlers (now use the `singleSetWidth` state directly) ---

    const handleDragStart = useCallback(() => {
        isDraggingRef.current = true;
        if (animationRef.current) {
            animationRef.current.stop();
        }
    }, []);

    const handleDragEnd = useCallback(() => {
        if (singleSetWidth === 0) { // Check only singleSetWidth here
            console.warn("Slider: Dimensions are zero, cannot snap after drag.");
            isDraggingRef.current = false;
            startAnimation();
            return;
        }

        let currentX = x.get();
        // We still need individual slide width for snapping to individual slides
        // We'll calculate it on the fly or pass it as a prop from measureDimensions if needed.
        // For now, assuming totalSlideAndGapWidth can be derived from singleSetWidth / images.length
        const totalSlideAndGapWidth = singleSetWidth / images.length; // Re-derive it for snapping

        const snapEpsilon = 0.0001; 

        // Step 1: Normalize currentX strictly into the B copy's operating range for snapping.
        while (currentX < -singleSetWidth * 2 - snapEpsilon) {
            currentX += singleSetWidth;
        }
        while (currentX > -singleSetWidth + snapEpsilon) {
            currentX -= singleSetWidth;
        }

        // Step 2: Calculate the snapped position directly within this B copy range.
        const tempPositiveX = currentX + singleSetWidth; 
        const nearestSlideIndexFromOrigin = Math.round(tempPositiveX / totalSlideAndGapWidth);
        let targetSnapX = -singleSetWidth + (nearestSlideIndexFromOrigin * totalSlideAndGapWidth);

        // Step 3: Final sanity check on targetSnapX (should be redundant if logic is perfect, but safe)
        while (targetSnapX < -singleSetWidth * 2 - snapEpsilon) {
            targetSnapX += singleSetWidth;
        }
        while (targetSnapX > -singleSetWidth + snapEpsilon) {
            targetSnapX -= singleSetWidth;
        }
        
        animate(x, targetSnapX, {
            duration: 0, // Keeping this at 0 for now as per your preference
            ease: "easeOut"
        }).then(() => {
            isDraggingRef.current = false;
            startAnimation();
        });
    }, [x, singleSetWidth, images.length, startAnimation]);


    const dragConstraints = useMemo(() => {
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const totalTrackWidth = singleSetWidth * 3;

        const rightConstraint = 0;
        const leftConstraint = totalTrackWidth > containerWidth ? -(totalTrackWidth - containerWidth) : 0;

        return { right: rightConstraint, left: leftConstraint };
    }, [singleSetWidth, containerRef.current?.offsetWidth]);

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="slider h-[250px] max-h-[25vh]" id={id} ref={containerRef} >
            <motion.div
                className="slider-track"
                style={{ x }}
                drag="x"
                dragMomentum={false}
                dragElastic={0.1}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                whileDrag={{ cursor: "grabbing" }}
                dragConstraints={dragConstraints}
            >
                {/* Apply refs to the first slide of the A copy and the first slide of the B copy */}
                {displayedImages.map((src, index) => (
                    <div
                        className="slide"
                        key={index}
                        ref={index === 0 ? firstASlideRef : (index === images.length ? firstBSlideRef : null)}
                    >
                        <img
                            src={src}
                            alt={`Slide ${index + 1}`}
                            draggable={false}
                            style={{ pointerEvents: 'none' }}
                        />
                        {/* <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'white',
                            background: 'rgba(0,0,0,0.7)',
                            padding: '5px 10px',
                            fontSize: '2em',
                            fontWeight: 'bold',
                            zIndex: 10,
                            pointerEvents: 'none'
                        }}>
                            {index % images.length}
                        </div> */}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default Slider;