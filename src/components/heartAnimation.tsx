import React, { useEffect } from "react";

const FlyingHearts: React.FC = () => {
    const createHeart = () => {
        const heart = document.createElement("div");
        heart.className = "heart";

        const randomX = Math.random() * window.innerWidth;
        const randomY = window.innerHeight + 50;

        heart.style.left = `${randomX}px`;
        heart.style.top = `${randomY}px`;

        document.body.appendChild(heart);

        heart.addEventListener("animationend", () => {
            heart.remove();
        });
    };

    useEffect(() => {
        const interval = setInterval(createHeart, 500);
        return () => clearInterval(interval);
    }, []);

    return null;
};

export default FlyingHearts;
