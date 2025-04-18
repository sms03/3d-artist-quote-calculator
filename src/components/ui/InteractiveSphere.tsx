
import { useState, useEffect } from "react";

interface InteractiveSphereProps {
  size?: number;
  className?: string;
}

const InteractiveSphere = ({ 
  size = 150, // Reduced from 200 to 150
  className = ""
}: InteractiveSphereProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Only follow mouse if window width is greater than 768px (desktop)
      if (window.innerWidth > 768) {
        const { clientX, clientY } = event;
        
        // Calculate position with some damping for smoother movement
        setPosition((prev) => ({
          x: prev.x + (clientX - prev.x) * 0.1,
          y: prev.y + (clientY - prev.y) * 0.1
        }));
        
        if (!isActive) setIsActive(true);
      }
    };

    // Handle touch for mobile devices
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      setPosition({
        x: touch.clientX,
        y: touch.clientY
      });
      
      if (!isActive) setIsActive(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isActive]);

  // Only render sphere if active
  if (!isActive) return null;

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    transform: `translate(${position.x - size / 2}px, ${position.y - size / 2}px)`,
  };

  return (
    <div 
      className={`interactive-sphere fixed pointer-events-none animate-pulse-soft z-0 opacity-30 ${className}`}
      style={style}
    />
  );
};

export default InteractiveSphere;
