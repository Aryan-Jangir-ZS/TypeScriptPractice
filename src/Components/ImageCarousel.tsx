import { useState, useRef} from 'react';
import '../Carousel.css';

interface ImageCarouselProps {
  data: { id: number; src: string; alt: string }[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  if (!data.length) return null;

  return (
    <div className="carousel-container">
      <div
        ref={ref}

        className="slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {data.map((img) => (
          <div key={img.id} className="img">
            <img src={img.src} alt={img.alt} className="image" />
          </div>
        ))}
      </div>
      <button className="control prev" onClick={goToPrev}>&lt;</button>
      <button className="control next" onClick={goToNext}>&gt;</button>
      <div className="dots">
        {data.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
