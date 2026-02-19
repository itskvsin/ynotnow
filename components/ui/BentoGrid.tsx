import React from "react";
import { motion, Variants } from "framer-motion";

const row1 = [
  "/images/BentoGrid/img1.png",
  "/images/BentoGrid/img2.png",
  "/images/BentoGrid/img3.png",
  "/images/BentoGrid/img4.png",
];

const row2 = [
  "/images/BentoGrid/img5.png",
  "/images/BentoGrid/img6.png", // <- this must animate FIRST
  "/images/BentoGrid/img7.png",
];

const row3 = [
  "/images/BentoGrid/img8.png",
  "/images/BentoGrid/img9.png",
  "/images/BentoGrid/img10.png",
];

// Combine all images in layout order
const allImages = [...row1, ...row2, ...row3];

const itemVariants: Variants = {
  hidden: {
    scale: 0.85,
    opacity: 0,
  },
  show: (customIndex: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: customIndex * 0.12,
    },
  }),
};

interface ImageCardProps {
  src: string;
  customIndex: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  customIndex,
  objectFit = "cover",
}) => {
  return (
    <motion.div
      variants={itemVariants}
      custom={customIndex}
      className="overflow-hidden rounded-2xl"
    >
      <img
        src={src}
        alt="grid-item"
        className={`w-full h-full object-${objectFit}`}
      />
    </motion.div>
  );
};

const BentoGrid: React.FC = () => {
  // Find index of img6
  const img6Path = "/images/BentoGrid/img6.png";

  const orderedImages = [
    img6Path,
    ...allImages.filter((img) => img !== img6Path),
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-7xl mx-auto px-6 py-16 space-y-8"
    >
      {/* Row 1 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {row1.map((img) => {
          const animationIndex = orderedImages.indexOf(img);
          return (
            <ImageCard
              key={img}
              src={img}
              customIndex={animationIndex}
            />
          );
        })}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-stretch h-70">
        {row2.map((img) => {
          const animationIndex = orderedImages.indexOf(img);
          return (
            <ImageCard
              key={img}
              src={img}
              customIndex={animationIndex}
              objectFit="fill"
            />
          );
        })}
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-stretch h-70">
        {row3.map((img) => {
          const animationIndex = orderedImages.indexOf(img);
          return (
            <ImageCard
              key={img}
              src={img}
              customIndex={animationIndex}
              objectFit="fill"
            />
          );
        })}
      </div>
    </motion.section>
  );
};

export default BentoGrid;
