import { useEffect } from "react";

const FloatingFlowers = () => {
  useEffect(() => {
    const createPetal = () => {
      const petal = document.createElement("div");
      petal.className = "petal";
      petal.textContent = "🌸";
      petal.setAttribute("aria-hidden", "true");

      const randomX = Math.random() * window.innerWidth;
      const startY = window.innerHeight + 20;
      const size = 18 + Math.random() * 14;

      petal.style.left = `${randomX}px`;
      petal.style.top = `${startY}px`;
      petal.style.fontSize = `${size}px`;
      petal.style.animationDuration = `${6 + Math.random() * 3}s`;
      petal.style.animationDelay = `${Math.random() * 0.5}s`;

      document.body.appendChild(petal);

      petal.addEventListener("animationend", () => {
        petal.remove();
      });
    };

    const interval = setInterval(createPetal, 650);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default FloatingFlowers;

