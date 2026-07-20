import { useEffect, useState } from "react";
import { css, keyframes } from "@emotion/css";
import { sharedStyles } from "./shared.styles";

type Props = {
  language: "en-US" | "sv";
};

// Glob import all images from images/gallery relative to src/pages
const imageModules = import.meta.glob(
  "../../images/gallery/*.{JPG,jpg,jpeg,png,PNG,JPEG}",
  { eager: true },
);

interface GalleryImage {
  url: string;
  name: string;
  filename: string;
}

const galleryImages: GalleryImage[] = Object.keys(imageModules)
  .map((path) => {
    const module = imageModules[path] as { default: string };
    const filename = path.split("/").pop() || "";
    // Create a clean title for screen readers and labels, e.g. "Image 1386"
    const name = filename.replace(/\.[^/.]+$/, "").replace("IMG_", "Image ");
    return {
      url: module.default,
      name,
      filename,
    };
  })
  .sort((a, b) => a.filename.localeCompare(b.filename));

export function Gallery({ language }: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImageIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex]);

  const handlePrev = () => {
    setActiveImageIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const handleNext = () => {
    setActiveImageIndex((prev) =>
      prev === null ? null : (prev + 1) % galleryImages.length,
    );
  };

  const handleClose = () => {
    setActiveImageIndex(null);
  };

  const translations = {
    title: language === "sv" ? "Galleri" : "Gallery",
    subtitle:
      language === "sv"
        ? "En kurerad samling av konstnärliga uttryck och fångade ögonblick."
        : "A curated collection of artistic expressions and captured moments.",
    close: language === "sv" ? "Stäng" : "Close",
    prev: language === "sv" ? "Föregående" : "Previous",
    next: language === "sv" ? "Nästa" : "Next",
  };

  return (
    <section className={sharedStyles.section}>
      <div className={style.container}>
        <div className={style.headerSection}>
          <h1 className={sharedStyles.title}>{translations.title}</h1>
          <p className={style.subtitle}>{translations.subtitle}</p>
        </div>

        <div className={style.grid}>
          {galleryImages.map((image, index) => {
            // Apply fetchpriority="high" to the first 3 images (above-the-fold)
            const isCritical = index < 3;
            return (
              <div
                key={image.filename}
                className={style.imageCard}
                onClick={() => setActiveImageIndex(index)}
              >
                <div className={style.imageWrapper}>
                  <img
                    src={image.url}
                    alt={image.name}
                    className={style.image}
                    loading={isCritical ? undefined : "lazy"}
                    fetchpriority={isCritical ? "high" : undefined}
                  />
                  <div className={style.overlay}>
                    <span className={style.viewText}>
                      {language === "sv" ? "Visa" : "View"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeImageIndex !== null && (
        <div className={style.lightboxOverlay} onClick={handleClose}>
          <button
            className={style.closeButton}
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label={translations.close}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <button
            className={style.navButton("left")}
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label={translations.prev}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div
            className={style.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[activeImageIndex].url}
              alt={galleryImages[activeImageIndex].name}
              className={style.lightboxImage}
            />
            <div className={style.lightboxCaption}>
              <span className={style.lightboxCounter}>
                {activeImageIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </div>

          <button
            className={style.navButton("right")}
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label={translations.next}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const style = {
  container: css({
    width: "100%",
    maxWidth: "80rem", // 1280px
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 1rem",
    marginTop: "10rem",
    "@media (max-width: 768px)": {
      marginTop: "8rem",
    },
  }),
  headerSection: css({
    textAlign: "center",
    marginBottom: "3rem",
  }),
  subtitle: css({
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1rem",
    fontWeight: 300,
    color: "rgba(255, 255, 255, 0.7)",
    letterSpacing: "0.05em",
    marginTop: "-1rem",
    "@media (min-width: 768px)": {
      fontSize: "1.2rem",
      marginTop: "-2rem",
    },
  }),
  grid: css({
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
    "@media (min-width: 768px)": {
      gap: "2rem",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    },
  }),
  imageCard: css({
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    transition:
      "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.4s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      borderColor: "rgba(255, 255, 255, 0.25)",
      boxShadow:
        "0 15px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 255, 255, 0.05)",
    },
  }),
  imageWrapper: css({
    position: "relative",
    width: "100%",
    paddingTop: "75%", // 4:3 Aspect Ratio
    overflow: "hidden",
  }),
  image: css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    "div:hover > div > &": {
      transform: "scale(1.06)",
    },
  }),
  overlay: css({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s ease",
    "div:hover > div > &": {
      opacity: 1,
    },
  }),
  viewText: css({
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.8rem",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: "#ffffff",
    border: "1px solid #ffffff",
    padding: "0.5rem 1.5rem",
    borderRadius: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(4px)",
    transform: "translateY(10px)",
    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    "div:hover > div > div > &": {
      transform: "translateY(0)",
    },
  }),
  lightboxOverlay: css({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    backdropFilter: "blur(20px)",
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  lightboxContent: css({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "90%",
    maxHeight: "85%",
    animation: `${fadeIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  }),
  lightboxImage: css({
    maxWidth: "100%",
    maxHeight: "75vh",
    objectFit: "contain",
    borderRadius: "4px",
    boxShadow:
      "0 30px 100px rgba(255, 255, 255, 0.05), 0 20px 40px rgba(0, 0, 0, 0.8)",
  }),
  lightboxCaption: css({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "1.5rem",
    color: "rgba(255, 255, 255, 0.9)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.9rem",
    fontWeight: 300,
    letterSpacing: "0.05em",
  }),
  lightboxCounter: css({
    color: "rgba(255, 255, 255, 0.5)",
  }),
  closeButton: css({
    position: "absolute",
    top: "1.5rem",
    right: "1.5rem",
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    cursor: "pointer",
    padding: "0.75rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    zIndex: 2002,
    "&:hover": {
      background: "rgba(255, 255, 255, 0.15)",
      transform: "scale(1.05)",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
    "@media (min-width: 768px)": {
      top: "2.5rem",
      right: "2.5rem",
    },
  }),
  navButton: (direction: "left" | "right") =>
    css({
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      [direction]: "1rem",
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      color: "#ffffff",
      cursor: "pointer",
      padding: "0.75rem",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s ease",
      zIndex: 2001,
      "&:hover": {
        background: "rgba(255, 255, 255, 0.15)",
        transform: "translateY(-50%) scale(1.05)",
      },
      "&:active": {
        transform: "translateY(-50%) scale(0.95)",
      },
      "@media (min-width: 768px)": {
        [direction]: "2.5rem",
        padding: "1rem",
      },
    }),
};
