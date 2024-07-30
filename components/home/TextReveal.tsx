import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CharacterRevealText: React.FC = () => {
    const textRef = useRef<HTMLHeadingElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const texts = [
        "Innovation in every pulse",
        "Empowering creativity",
        "Driving progress forward",
        "Discover new possibilities"
    ];

    const animateText = () => {
        if (textRef.current) {
            const currentText = texts[currentIndex];
            const characters = currentText.split('');
            textRef.current.innerHTML = characters
                .map((char) => `<span class="char">${char}</span>`)
                .join('');

            gsap.fromTo(
                textRef.current.querySelectorAll('.char'),
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.05,
                    duration: 0.5,
                    ease: 'power3.out',
                    onComplete: () => {
                        // Change text after animation completes
                        setTimeout(() => {
                            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
                        }, 2000); // Adjust delay if needed
                    }
                }
            );
        }
    };

    useEffect(() => {
        animateText();
    }, [currentIndex]);

    return (
        <h1
            ref={textRef}
            className="mt-8 text-5xl sm:text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl sm:text-left text-center"
        >
            {texts[currentIndex]}
        </h1>
    );
};

export default CharacterRevealText;
