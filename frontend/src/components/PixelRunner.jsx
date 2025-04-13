import React, { useEffect, useRef } from "react";
import "../assets/PixelRunner.css";
import marioSprite from "../assets/images/8bit-mario-runing.webp";



const PixelRunner = () => {
    const spriteRef = useRef(null);

    useEffect(() => {
        let position = -50;
        const speed = 2;
        const interval = setInterval(() => {
            if (spriteRef.current) {
                position += speed;
                if (position > window.innerWidth + 50) {
                    position = -50;
                }
                spriteRef.current.style.left = `${position}px`;
            }
        }, 20);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="runner-container">
            <img
                ref={spriteRef}
                src={marioSprite}
                alt="Runner"
                className="runner"
            />

        </div>
    );
};

export default PixelRunner;
