// Meteor360Viewer.tsx
import React, { useState, useRef, useEffect } from "react";
import "./Meteor360Viewer.css";

interface Meteor360ViewerProps {
  cabine?: string;
  scale?: number;
  color?: string; 
  chassisLength?:number
}

const IMAGES_BY_COLOR: Record<string, string[]> = {
  "Prata Pyrit": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0Gj3y2Ghdfw7ZRF3sd2nSKVv5NObJcLT9t6iP",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0AclrkEUluVP8NKwvb2Zzy4ip195ahGD7gAT6",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0OxEURDnvcwPrSGyJalpdfEL2MBU7zV39HXiT",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr08qb7kfM9ZOafCkVHPsWqdjIFy3NUz6XKtiwb",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0hLTjT0eXeVMRwOltd6mGH1Q9oEKAj4bJPYnc",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0b3bPBkJgO9m03kJXSex5QGbY8ujdhaRziwr4",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ZMCaDDPmOr0ft81hy9vdqW5DlbXnFYAw2K3N",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0CPNXetmzV9IYuXMtKSm4brNO7Zyd6ojwcLRv"
  ],
  "Azul Biscay": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0TuaqlwQq8tcohsp3zfJbrmlFSZ0LIYnyGBgK",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ymwvp4SwAKxFhk9eiYJvqRu1LOf3TZtnjdIo",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr03dKKxBNcujJtS6L1nNTlORwF5girxpQAhDe4",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0hmUJaMmeXeVMRwOltd6mGH1Q9oEKAj4bJPYn",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr06ENNDIdySarjJxgwdi6tRWoLNCunz7hEPy5X",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0CyAoxlmzV9IYuXMtKSm4brNO7Zyd6ojwcLRv",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0kI5C2WAQIKn0CQqhr7l92dotMaSPiW5byLcp",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0H1PtIT3uC7WzExLIHDKf854MQXcUstAbZS1w"
  ],
  "Vermelho Rubi": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr00K2eXGRbO8krQC41Wm7UyuKdScnNgI2FRzqx",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0uEpE75VtqGATQO1zXaIh2VKYlx7DMoRfPJ8u",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0NCOV9fmhix2U5l71Xumz6YOgqnryEGZ8Meot",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0o9JPLFkrn5e3P96qY4K7bOAatLUuDXzGRFc0",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0TW4ViYwQq8tcohsp3zfJbrmlFSZ0LIYnyGBg",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0KX1VcXfT62NIBgSFao0CRrOy87dbc3DXsthj",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0mf5fYecU2NqYFwnbK1XkBThMDtGQVo9vzI5a",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr01aYiLeGTWwkoFOpDL1INPn4h7MSZ6H3CAmXf"
  ],
  "Preto Universal": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0hGCZxUeXeVMRwOltd6mGH1Q9oEKAj4bJPYnc",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0jF6QauTpnQ1BeImtf4U09XVAMiu7lGKWChv5",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0345QlnNcujJtS6L1nNTlORwF5girxpQAhDe4",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0KpV4eLfT62NIBgSFao0CRrOy87dbc3DXsthj",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ZRtRFrCPmOr0ft81hy9vdqW5DlbXnFYAw2K3",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr01rPDExGTWwkoFOpDL1INPn4h7MSZ6H3CAmXf",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ecVsq8lCEbxGi5NQcAgOoz90UWutYymLdphq",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0uusUeHVtqGATQO1zXaIh2VKYlx7DMoRfPJ8u"
  ],
  "Branco Gelo": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0Kq1pGGfT62NIBgSFao0CRrOy87dbc3DXsthj",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr085pteWM9ZOafCkVHPsWqdjIFy3NUz6XKtiwb",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0qgUrwkKKEuBMIyJ7TZsox1eXWNOAg3GQawS5",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ZvmAScPmOr0ft81hy9vdqW5DlbXnFYAw2K3N",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0QxRWlcXBFSiugpXPo13x7Dmj4T2JUf8EZWCH",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0CdSqUqmzV9IYuXMtKSm4brNO7Zyd6ojwcLRv",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0vun1BRltWkVFrLscwKlaUoY8B9eZHm2yDpz0",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0T45YxZwQq8tcohsp3zfJbrmlFSZ0LIYnyGBg"
  ],
  "Bege Agata": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0sQO0Nj6oujKcEJZnxpINqM1L3Pdy6UD78eHF",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0vYirdqltWkVFrLscwKlaUoY8B9eZHm2yDpz0",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0n0gwWA6ZqjhFbPT5JVCkQ1myXAniRBrY3a2x",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0lyEiKTS7QxJL8jOTFS5ktlVRCUBW69pcX2hu",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr03PEKqWNcujJtS6L1nNTlORwF5girxpQAhDe4",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0eckPPphCEbxGi5NQcAgOoz90UWutYymLdphq",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0cMxK7Wu8IYaiM4OWKlZQyt6Dxz3FRV0svCSP",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0HrbP2Z3uC7WzExLIHDKf854MQXcUstAbZS1w"
  ],
  "Verde Turquesa": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0hIpXmreXeVMRwOltd6mGH1Q9oEKAj4bJPYnc",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0qVYiCaKKEuBMIyJ7TZsox1eXWNOAg3GQawS5",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0NQEbGnhix2U5l71Xumz6YOgqnryEGZ8Meot3",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0K5t8TcfT62NIBgSFao0CRrOy87dbc3DXsthj",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr034FfFwNcujJtS6L1nNTlORwF5girxpQAhDe4",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0yGNjl2SwAKxFhk9eiYJvqRu1LOf3TZtnjdIo",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0UoESs9OBPWOC41hMj5dRwYcy7HAZL98apmGg",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0cxNYygu8IYaiM4OWKlZQyt6Dxz3FRV0svCSP"
  ],
  "Amarelo Bem-te-vi": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0daehsvrOzs3jGHqVxX2NQYaeLZtom64igWbp",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0SGzWxLnE1JtEXpV0f2kdZmvGbuFnrPRg8ija",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0NNAVfmhix2U5l71Xumz6YOgqnryEGZ8Meot3",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0uSAovKVtqGATQO1zXaIh2VKYlx7DMoRfPJ8u",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0c4ASnGu8IYaiM4OWKlZQyt6Dxz3FRV0svCSP",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0uoZC9uSVtqGATQO1zXaIh2VKYlx7DMoRfPJ8",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr05mQljxAogYsJSVxeRWa64uM89yBcTbjmdDhr",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0yPUFjZSwAKxFhk9eiYJvqRu1LOf3TZtnjdIo"
  ],
  "Cinza Moonstone": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0Jf9EpIWuV0vIZ97H8WMrdhYUEm5jAo3sRqSk",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0JkAacqWuV0vIZ97H8WMrdhYUEm5jAo3sRqSk",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0M9dFiPpDUnVHF1adksIKlxeQYZ7EzC92g5Mc",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr05ij10DAogYsJSVxeRWa64uM89yBcTbjmdDhr",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0WoRg5Z4KMuTloxRN7rU4yiFEIsAnvPz3HB2k",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0k8BOHJQIKn0CQqhr7l92dotMaSPiW5byLcpR",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr08oWW2KM9ZOafCkVHPsWqdjIFy3NUz6XKtiwb",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0iNuENaWHrpXYOWZg71NImzthPsRukLCSB5V8"  
  ],
  "Azul Unique": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr097y7LObveFS8kwitsCaZn02EN6hB7IAdWGbY",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0oXQ3vTCkrn5e3P96qY4K7bOAatLUuDXzGRFc",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0PSGkTf0YJ4nkLI32fqFQyMDVoh8xi5BU1erc",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr03UOPuTNcujJtS6L1nNTlORwF5girxpQAhDe4",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0sQX91ZGoujKcEJZnxpINqM1L3Pdy6UD78eHF",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ecOnnP0CEbxGi5NQcAgOoz90UWutYymLdphq",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0PgtZVDU0YJ4nkLI32fqFQyMDVoh8xi5BU1er",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0Sog6taE1JtEXpV0f2kdZmvGbuFnrPRg8ijae"
  ]
};

const DEFAULT_IMAGE_SEQUENCE = IMAGES_BY_COLOR["Branco Gelo"] || [];
const imageCache: Map<string, HTMLImageElement[]> = new Map();
const preloadImages = (urls: string[], colorKey: string) => {
  if (imageCache.has(colorKey)) {
    return;
  }

  imageCache.set(colorKey, new Array(urls.length));

  urls.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const cache = imageCache.get(colorKey);
      if (cache) {
        cache[index] = img;
      }
    };
  });
};

const Meteor360Viewer: React.FC<Meteor360ViewerProps> = ({
  cabine = "standard",
  scale = 1.3,
  color = "Branco Gelo" 
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true); 
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  const getImageSequence = () => {
    if (color && IMAGES_BY_COLOR[color]) {
      return IMAGES_BY_COLOR[color];
    }
    
    switch (cabine.toLowerCase()) {
      case "luxo":
      case "premium":
        return IMAGES_BY_COLOR["Branco Gelo"]; 
      default:
        return IMAGES_BY_COLOR["Branco Gelo"]; 
    }
  };

  const [imageSequence, setImageSequence] = useState<string[]>(DEFAULT_IMAGE_SEQUENCE);
  const [totalFrames, setTotalFrames] = useState(DEFAULT_IMAGE_SEQUENCE.length);
  const getCurrentImageUrl = () => {
    const cachedImages = imageCache.get(color);
    
    if (cachedImages && cachedImages[currentFrame]) {
      return cachedImages[currentFrame].src;
    }
    
    return imageSequence[currentFrame] || imageSequence[0];
  };

  useEffect(() => {
    const sequence = getImageSequence();
    if (Array.isArray(sequence) && sequence.length > 0) {
      setImageSequence(sequence);
      setTotalFrames(sequence.length);
      preloadImages(sequence, color);
    } else {
      setImageSequence(DEFAULT_IMAGE_SEQUENCE);
      setTotalFrames(DEFAULT_IMAGE_SEQUENCE.length);
      preloadImages(DEFAULT_IMAGE_SEQUENCE, "Branco Gelo");
    }
  }, [color, cabine]);

  const rotateTo = (direction: 'left' | 'right') => {
    const increment = direction === 'left' ? -1 : 1;
    const newFrame = (currentFrame + increment + totalFrames) % totalFrames;
    setCurrentFrame(newFrame);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setShowSwipeHint(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
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
    return `Gire o Meteor ${color}`;
  };

  const getImageAltText = () => {
    return `VW Meteor ${color} - Vista ${currentFrame + 1} de ${totalFrames}`;
  };

  useEffect(() => {
    setCurrentFrame(0);
    setShowSwipeHint(true);
    
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
    
    autoRotateRef.current = setInterval(() => {
      if (!isDragging && totalFrames > 0) {
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
  }, [color, isDragging, totalFrames]);

  const imageStyle = {
    filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.4))`,
    background: 'transparent' as const,
    display: 'block' as const,
    pointerEvents: 'none' as const,
    transform: `scale(${scale})`,
    transition: 'transform 0.3s ease-out, opacity 0.3s ease',
    opacity: 1
  };

  const preloadAdjacentImages = () => {
    const cachedImages = imageCache.get(color);
    
    if (!cachedImages) return;
    const nextFrame1 = (currentFrame + 1) % totalFrames;
    const nextFrame2 = (currentFrame + 2) % totalFrames;
    const prevFrame1 = (currentFrame - 1 + totalFrames) % totalFrames;
    const prevFrame2 = (currentFrame - 2 + totalFrames) % totalFrames;
    
    const framesToPreload = [nextFrame1, nextFrame2, prevFrame1, prevFrame2];
    
    framesToPreload.forEach(frame => {
      if (!cachedImages[frame] && imageSequence[frame]) {
        const img = new Image();
        img.src = imageSequence[frame];
        img.onload = () => {
          cachedImages[frame] = img;
        };
      }
    });
  };

  useEffect(() => {
    if (totalFrames > 0) {
      preloadAdjacentImages();
    }
  }, [currentFrame, color, totalFrames]);

  return (
    <div 
      className={`meteor-360-viewer External360 color-${color.toLowerCase().replace(/\s+/g, '-')}`}
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
      <div className="External360__stage viewer-layout" aria-hidden="true">
        <div className="image-container">
          <div className="image-wrapper">
            <img
              ref={imageRef}
              src={getCurrentImageUrl()}
              alt={getImageAltText()}
              className="current-image External360__stage__vehicle"
              style={imageStyle}
              onLoad={() => {
                const cachedImages = imageCache.get(color);
                if (cachedImages && cachedImages[currentFrame]) {
                  imageRef.current?.style.setProperty('opacity', '1');
                }
              }}
              onError={(e) => {
                console.error("Erro ao carregar imagem:", getCurrentImageUrl());
                const fallbackImg = imageSequence[0] || DEFAULT_IMAGE_SEQUENCE[0];
                if (e.currentTarget.src !== fallbackImg) {
                  e.currentTarget.src = fallbackImg;
                }
              }}
            />
          </div>
        </div>

        <div className="External360__stage__ellipse" aria-hidden="true"></div>

        {showSwipeHint && (
          <div className="swipe-hint">
            {getHintMessage()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Meteor360Viewer;