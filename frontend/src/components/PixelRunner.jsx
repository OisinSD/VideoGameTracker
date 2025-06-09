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
        <div className="position-absolute bottom-0 start-0 w-100" style={{ height: "40px", pointerEvents: "none" }}>
            <img
                ref={spriteRef}
                src={marioSprite}
                alt="Runner"
                className="runner position-absolute"
                style={{ height: "40px" }}
            />
        </div>
    );
};

export default PixelRunner;
