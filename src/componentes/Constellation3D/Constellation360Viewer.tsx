// src/components/Constellation/Constellation360Viewer.tsx
import React, { useState, useRef, useEffect, TouchEvent } from "react";
import "./Constellation360Viewer.css";

interface Constellation360ViewerProps {
  scale?: number;
  color?: string; 
  model?: string;
}

const imageCache: Map<string, HTMLImageElement[]> = new Map();
const Constellation360Viewer: React.FC<Constellation360ViewerProps> = ({
  scale = 1.3,
  color = "Branco Geada",
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true); 
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
  
  const IMAGES_BY_COLOR: Record<string, string[]> = {
    "Bege Agata": [
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0NSQqxhix2U5l71Xumz6YOgqnryEGZ8Meot3b",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr02YYDtsqdKFseCcpqzHrUtMBAR9VumY4aWDIh", 
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0qjG5IkKKEuBMIyJ7TZsox1eXWNOAg3GQawS5",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0rDn6eyjt0BwPjfGyusl2cQ94Uo5menVRgYNk",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0HTGbiB3uC7WzExLIHDKf854MQXcUstAbZS1w",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0TzsGybHwQq8tcohsp3zfJbrmlFSZ0LIYnyGB",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0V5JohLsL1DNU2SGCArKHqVeJ4nfl9TgbFaEk",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0mzwi8VcU2NqYFwnbK1XkBThMDtGQVo9vzI5a"
    ],
    "Laranja": [
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr00tfy5VyRbO8krQC41Wm7UyuKdScnNgI2FRzq",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0hJLv9XeXeVMRwOltd6mGH1Q9oEKAj4bJPYnc",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0CRIXMemzV9IYuXMtKSm4brNO7Zyd6ojwcLRv",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0hhWIUteXeVMRwOltd6mGH1Q9oEKAj4bJPYnc",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0X4XU0cIdt6TLARKvkc09qBDo1z5XGJlihp8Q",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0P6V7PT0YJ4nkLI32fqFQyMDVoh8xi5BU1erc",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0eA9dUbCEbxGi5NQcAgOoz90UWutYymLdphqX",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0KM7TAJCfT62NIBgSFao0CRrOy87dbc3DXsth"
    ],
    "Azul Biscay": [
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0TRZEF7wQq8tcohsp3zfJbrmlFSZ0LIYnyGBg",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0WS1Lke4KMuTloxRN7rU4yiFEIsAnvPz3HB2k",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0NPJ24Yhix2U5l71Xumz6YOgqnryEGZ8Meot3",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0NCUQxEhix2U5l71Xumz6YOgqnryEGZ8Meot3",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0aFNzDc92Ef5jZGDo3qKrlIzbBVkWYh7mnUJ1",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0AxNzrZUluVP8NKwvb2Zzy4ip195ahGD7gAT6",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0E9orPB1lqADCeUMSQuZmabt961Hif7F405dw",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0q90byXKKEuBMIyJ7TZsox1eXWNOAg3GQawS5"
    ],
    "Vermelho": [
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0cMiAPWu8IYaiM4OWKlZQyt6Dxz3FRV0svCSP",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ul6LHEVtqGATQO1zXaIh2VKYlx7DMoRfPJ8u",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0N7j31Zhix2U5l71Xumz6YOgqnryEGZ8Meot3",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0sdZd9soujKcEJZnxpINqM1L3Pdy6UD78eHFV",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0y1rnUIzSwAKxFhk9eiYJvqRu1LOf3TZtnjdI",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0mWbQFAcU2NqYFwnbK1XkBThMDtGQVo9vzI5a",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0iIgkEFHrpXYOWZg71NImzthPsRukLCSB5V84",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0n3eHRwZqjhFbPT5JVCkQ1myXAniRBrY3a2xc"
    ],
    "Amarelo Bem-te-vi": [
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0VkBtT2sL1DNU2SGCArKHqVeJ4nfl9TgbFaEk",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0hJQrF7eXeVMRwOltd6mGH1Q9oEKAj4bJPYnc",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr05bdcDCAogYsJSVxeRWa64uM89yBcTbjmdDhr",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0T0kD2nwQq8tcohsp3zfJbrmlFSZ0LIYnyGBg",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ep3R3NCEbxGi5NQcAgOoz90UWutYymLdphqX",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0QoQotAXBFSiugpXPo13x7Dmj4T2JUf8EZWCH",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0uOAdeyVtqGATQO1zXaIh2VKYlx7DMoRfPJ8u"
    ],
    "Branco Geada": [
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0C4FNpumzV9IYuXMtKSm4brNO7Zyd6ojwcLRv",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0alwfB2D92Ef5jZGDo3qKrlIzbBVkWYh7mnUJ",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr06EvFUYySarjJxgwdi6tRWoLNCunz7hEPy5XZ",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0nJxf40ZqjhFbPT5JVCkQ1myXAniRBrY3a2xc",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0XLx62oIdt6TLARKvkc09qBDo1z5XGJlihp8Q",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr05iTsQVAogYsJSVxeRWa64uM89yBcTbjmdDhr",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr03ElVyMNcujJtS6L1nNTlORwF5girxpQAhDe4",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ql9nnXKKEuBMIyJ7TZsox1eXWNOAg3GQawS5"
    ],

    
    "Cinza MoonStone": [
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0hWD8LreXeVMRwOltd6mGH1Q9oEKAj4bJPYnc",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0TN37PQwQq8tcohsp3zfJbrmlFSZ0LIYnyGBg",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0nRtqtPZqjhFbPT5JVCkQ1myXAniRBrY3a2xc",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0dDVxKErOzs3jGHqVxX2NQYaeLZtom64igWbp",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0kIaBWYQIKn0CQqhr7l92dotMaSPiW5byLcpR",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0T2JP26wQq8tcohsp3zfJbrmlFSZ0LIYnyGBg",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0uoIm3HhVtqGATQO1zXaIh2VKYlx7DMoRfPJ8",
      "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0cs5Tdb0u8IYaiM4OWKlZQyt6Dxz3FRV0svCS"
    ]
  };

  const getImageSequence = () => {
    if (color && IMAGES_BY_COLOR[color]) {
      return IMAGES_BY_COLOR[color];
    }
    return IMAGES_BY_COLOR["Branco Geada"];
  };

  const IMAGE_SEQUENCE = getImageSequence();
  const totalFrames = IMAGE_SEQUENCE.length;
  const preloadImages = (urls: string[], colorKey: string) => {
    if (imageCache.has(colorKey)) {
      return;
    }

    urls.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (!imageCache.has(colorKey)) {
          imageCache.set(colorKey, []);
        }
        const cache = imageCache.get(colorKey);
        if (cache) {
          cache[index] = img;
        }
      };
    });
  };

  useEffect(() => {
    setCurrentFrame(0);
    setShowSwipeHint(true);
    
    preloadImages(IMAGE_SEQUENCE, color);
    
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
    
    autoRotateRef.current = setInterval(() => {
      if (!isDragging) {
        rotateTo('right');
      }
    }, 3000);

    const hintTimer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 5000);

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
      clearTimeout(hintTimer);
    };
  }, [color, isDragging]);

  const rotateTo = (direction: 'left' | 'right') => {
    const increment = direction === 'left' ? -1 : 1;
    const newFrame = (currentFrame + increment + totalFrames) % totalFrames;
    setCurrentFrame(newFrame);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setShowSwipeHint(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    
    if (Math.abs(deltaX) > 20) {
      const direction = deltaX > 0 ? 'right' : 'left';
      rotateTo(direction);
      setStartX(currentX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setShowSwipeHint(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const deltaX = currentX - startX;
    
    if (Math.abs(deltaX) > 20) {
      const direction = deltaX > 0 ? 'right' : 'left';
      rotateTo(direction);
      setStartX(currentX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getHintMessage = () => {
    return `Gire o Constellation ${color}`;
  };

  const getImageAltText = () => {
    return `VW Constellation ${color} - Vista ${currentFrame + 1} de ${totalFrames}`;
  };

  const getCurrentImageUrl = () => {
    const cachedImages = imageCache.get(color);
    if (cachedImages && cachedImages[currentFrame]) {
      return cachedImages[currentFrame].src;
    }
    return IMAGE_SEQUENCE[currentFrame];
  };

  const imageStyle = {
    filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.4))`,
    background: 'transparent' as const,
    display: 'block' as const,
    pointerEvents: 'none' as const,
    transform: `scale(${scale})`,
    transition: 'transform 0.3s ease-out'
  };

  return (
    <div 
      className={`constellation-360-viewer color-${color.toLowerCase().replace(/\s+/g, '-')}`}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ 
        cursor: isDragging ? 'grabbing' : 'grab',
        background: 'transparent',
        position: 'relative',
        width: '100%',
        height: '100%',
        touchAction: 'pan-y'
      }}
    >
      <div className="viewer-layout">
        <div className="image-container">
          <div className="image-wrapper">
            <img
              ref={imageRef}
              src={getCurrentImageUrl()}
              alt={getImageAltText()}
              className="current-image"
              style={imageStyle}
              onLoad={() => {
                if (imageCache.get(color)?.[currentFrame]) {
                  imageRef.current?.style.setProperty('opacity', '1');
                }
              }}
            />
          </div>
        </div>

        {showSwipeHint && (
          <div className="swipe-hint">
            {getHintMessage()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Constellation360Viewer;