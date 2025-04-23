import { useEffect, useRef, ReactNode } from "react";
import { cn } from "../lib/utils";

interface ParallaxSectionProps {
  backgroundImage: string;
  className?: string;
  overlayOpacity?: number;
  children: ReactNode;
  height?: string;
}

export default function ParallaxSection({
  backgroundImage,
  className,
  overlayOpacity = 0.7,
  children,
  height = "100vh",
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const scrollTop = window.pageYOffset;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;

      // Only apply parallax effect when the section is in view
      if (
        scrollTop + window.innerHeight < sectionTop ||
        scrollTop > sectionTop + sectionHeight
      ) {
        return;
      }

      // Calculate parallax offset
      const offset = (scrollTop - sectionTop) * 0.4;

      // Apply parallax effect
      sectionRef.current.style.backgroundPositionY = `${-offset}px`;
    };

    window.addEventListener("scroll", handleScroll);

    // Trigger once for initial positioning
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative bg-no-repeat bg-cover bg-center flex items-center justify-center",
        className
      )}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-primary"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
