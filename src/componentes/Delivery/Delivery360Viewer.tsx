// Delivery360Viewer.tsx 
import React, { useState, useRef, useEffect } from "react";
import "./Delivery360Viewer.css";

interface Delivery360ViewerProps {
  color?: string; 
  model?: string;
  scale?: number;
}

const DELIVERY_IMAGES_BY_COLOR: Record<string, string[]> = {
  "Azul Biscay": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr060k1eOySarjJxgwdi6tRWoLNCunz7hEPy5XZ",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0F6m9mEi1Nu85fCjEqUGF4ShW0BLK2Q9oetJw",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0AnRXlGGUluVP8NKwvb2Zzy4ip195ahGD7gAT",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0rNGEqnjt0BwPjfGyusl2cQ94Uo5menVRgYNk",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr06DMNJ9ySarjJxgwdi6tRWoLNCunz7hEPy5XZ",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ZRWMTRdPmOr0ft81hy9vdqW5DlbXnFYAw2K3",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0r3dRcOjt0BwPjfGyusl2cQ94Uo5menVRgYNk",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr02X2rcFqdKFseCcpqzHrUtMBAR9VumY4aWDIh"
  ],
  "Branco Gelo": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr03MhDuXNcujJtS6L1nNTlORwF5girxpQAhDe4",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0QJYquWXBFSiugpXPo13x7Dmj4T2JUf8EZWCH",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr06C65HMySarjJxgwdi6tRWoLNCunz7hEPy5XZ",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ZRbmGmcPmOr0ft81hy9vdqW5DlbXnFYAw2K3",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0CuOYeppmzV9IYuXMtKSm4brNO7Zyd6ojwcLR",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0uJUaojVtqGATQO1zXaIh2VKYlx7DMoRfPJ8u",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0KwOWGRfT62NIBgSFao0CRrOy87dbc3DXsthj",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0uoOP25FVtqGATQO1zXaIh2VKYlx7DMoRfPJ8"
  ],
  "Cinza Moonstone": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ecuXbwdCEbxGi5NQcAgOoz90UWutYymLdphq",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0IjbaVZ52vLeKVUf0JkMdWSb6n8psEYyOBH7R",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0uqpdUHVtqGATQO1zXaIh2VKYlx7DMoRfPJ8u",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0O8DReznvcwPrSGyJalpdfEL2MBU7zV39HXiT",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0JpGEGFWuV0vIZ97H8WMrdhYUEm5jAo3sRqSk",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0kJo22VQIKn0CQqhr7l92dotMaSPiW5byLcpR",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0e4K0glCEbxGi5NQcAgOoz90UWutYymLdphqX6",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0shOgExoujKcEJZnxpINqM1L3Pdy6UD78eHFV"
  ],
  "Vermelho Coca-Cola": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0bbd5deJgO9m03kJXSex5QGbY8ujdhaRziwr4",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0NConQY7hix2U5l71Xumz6YOgqnryEGZ8Meot",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0IRfWAQ52vLeKVUf0JkMdWSb6n8psEYyOBH7R",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr056e3X7AogYsJSVxeRWa64uM89yBcTbjmdDhr",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0r82wSqjt0BwPjfGyusl2cQ94Uo5menVRgYNk",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0sB0a7OoujKcEJZnxpINqM1L3Pdy6UD78eHFV",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr058Yin0AogYsJSVxeRWa64uM89yBcTbjmdDhr",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0A7HkIoUluVP8NKwvb2Zzy4ip195ahGD7gAT6"
  ],
  "Verde Limão": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0PbVguI0YJ4nkLI32fqFQyMDVoh8xi5BU1erc",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0sQO9RCwoujKcEJZnxpINqM1L3Pdy6UD78eHF",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0Dv9WbVEanx0rLyjKPkRCYbJ3HiqScBud18wo",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0b4Wy6C7JgO9m03kJXSex5QGbY8ujdhaRziwr",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ENFQDn1lqADCeUMSQuZmabt961Hif7F405dw",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0OQWU5JnvcwPrSGyJalpdfEL2MBU7zV39HXiT",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ApQMN2UluVP8NKwvb2Zzy4ip195ahGD7gAT6",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0v6zD8IgltWkVFrLscwKlaUoY8B9eZHm2yDpz"
  ],
  "Amarelo Bem-te-vi": [  
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0cIho8nu8IYaiM4OWKlZQyt6Dxz3FRV0svCSP",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0dCY4vlrOzs3jGHqVxX2NQYaeLZtom64igWbp",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0DZrvp3anx0rLyjKPkRCYbJ3HiqScBud18wo6",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0rfAMByjt0BwPjfGyusl2cQ94Uo5menVRgYNk",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0mXtogcU2NqYFwnbK1XkBThMDtGQVo9vzI5ad",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr079FUri6GgFKT6bCYX8nBAMVEe3sPvcxy5oR2",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0hmO6pTneXeVMRwOltd6mGH1Q9oEKAj4bJPYn",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0CndRWYmzV9IYuXMtKSm4brNO7Zyd6ojwcLRv"
  ],
  "Laranja Safety": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0Q5Jl8e9XBFSiugpXPo13x7Dmj4T2JUf8EZWC",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0eFEP5NCEbxGi5NQcAgOoz90UWutYymLdphqX6",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0JyKKA2WuV0vIZ97H8WMrdhYUEm5jAo3sRqSk",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0e84Pa4CEbxGi5NQcAgOoz90UWutYymLdphqX6",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0EN2jwJ1lqADCeUMSQuZmabt961Hif7F405dwN",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr09L3DpbveFS8kwitsCaZn02EN6hB7IAdWGbY1",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr00vVviLRbO8krQC41Wm7UyuKdScnNgI2FRzqx",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr05OOY5esAogYsJSVxeRWa64uM89yBcTbjmdDh"
  ],
  "Prata Pyrit": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0WqvPFxY4KMuTloxRN7rU4yiFEIsAnvPz3HB2",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr06tjBB9ySarjJxgwdi6tRWoLNCunz7hEPy5XZ",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0Edda8AY1lqADCeUMSQuZmabt961Hif7F405d",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0dAQMztrOzs3jGHqVxX2NQYaeLZtom64igWbp",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr06muVWMySarjJxgwdi6tRWoLNCunz7hEPy5XZ",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr05OJcEpBAogYsJSVxeRWa64uM89yBcTbjmdDh",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0dkbnWarOzs3jGHqVxX2NQYaeLZtom64igWbp",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0hyxKl6eXeVMRwOltd6mGH1Q9oEKAj4bJPYnc"
  ],
  "Preto Universal": [
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0cqDJytu8IYaiM4OWKlZQyt6Dxz3FRV0svCSP",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0SxnxYfE1JtEXpV0f2kdZmvGbuFnrPRg8ijae",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0CuA62rvmzV9IYuXMtKSm4brNO7Zyd6ojwcLR",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0fdc3ms8dNBEODjo52CpMcs0WRQFlmkGPrt7w",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0b39sXrJgO9m03kJXSex5QGbY8ujdhaRziwr4",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0mtdYZrcU2NqYFwnbK1XkBThMDtGQVo9vzI5a",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0VpOxS3sL1DNU2SGCArKHqVeJ4nfl9TgbFaEk",
    "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0fXTpca8dNBEODjo52CpMcs0WRQFlmkGPrt7w"
  ]
};

const COLOR_HEX_TO_NAME: Record<string, string> = {
  "#0056b3": "Azul Biscay",
  "#ffffff": "Branco Gelo",
  "#565F6B": "Cinza Moonstone",
  "#F40009": "Vermelho Coca-Cola",
  "#32CD32": "Verde Limão",
  "#fdd835": "Amarelo Bem-te-vi",  
  "#fb8c00": "Laranja Safety",
  "#757575": "Prata Pyrit",
  "#212121": "Preto Universal",
};

const DEFAULT_IMAGE_SEQUENCE = DELIVERY_IMAGES_BY_COLOR["Azul Biscay"] || [
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr060k1eOySarjJxgwdi6tRWoLNCunz7hEPy5XZ",
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0F6m9mEi1Nu85fCjEqUGF4ShW0BLK2Q9oetJw",
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0AnRXlGGUluVP8NKwvb2Zzy4ip195ahGD7gAT",
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0rNGEqnjt0BwPjfGyusl2cQ94Uo5menVRgYNk",
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr06DMNJ9ySarjJxgwdi6tRWoLNCunz7hEPy5XZ",
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ZRWMTRdPmOr0ft81hy9vdqW5DlbXnFYAw2K3",
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0r3dRcOjt0BwPjfGyusl2cQ94Uo5menVRgYNk",
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr02X2rcFqdKFseCcpqzHrUtMBAR9VumY4aWDIh"
];

const Delivery360Viewer: React.FC<Delivery360ViewerProps> = ({ 
  color = "Azul Biscay",  
  model = "9-170",
  scale = 1 
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const getImageSequence = () => {
    if (!color) return DEFAULT_IMAGE_SEQUENCE;
    
    let colorName = color.trim();
    
    if (colorName.startsWith('#')) {
      colorName = COLOR_HEX_TO_NAME[colorName] || "Azul Biscay";
    }
    
    console.log("Buscando imagens para cor:", colorName);
    
    if (DELIVERY_IMAGES_BY_COLOR[colorName] && Array.isArray(DELIVERY_IMAGES_BY_COLOR[colorName])) {
      return DELIVERY_IMAGES_BY_COLOR[colorName];
    }
    
    console.warn(`Cor "${colorName}" não encontrada, usando Azul Biscay como fallback`);
    
    return DELIVERY_IMAGES_BY_COLOR["Azul Biscay"] || DEFAULT_IMAGE_SEQUENCE;
  };

  const [imageSequence, setImageSequence] = useState<string[]>(DEFAULT_IMAGE_SEQUENCE);
  const [totalFrames, setTotalFrames] = useState(DEFAULT_IMAGE_SEQUENCE.length);

  useEffect(() => {
    const sequence = getImageSequence();
    if (Array.isArray(sequence) && sequence.length > 0) {
      setImageSequence(sequence);
      setTotalFrames(sequence.length);
      console.log(`Sequência carregada: ${sequence.length} imagens para cor: ${color}`);
    } else {
      setImageSequence(DEFAULT_IMAGE_SEQUENCE);
      setTotalFrames(DEFAULT_IMAGE_SEQUENCE.length);
    }
  }, [color]);

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

  useEffect(() => {
    setCurrentFrame(0);
  }, [color]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && totalFrames > 0) {
        rotateTo('right');
      }
    }, 3000);

    const hintTimer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(hintTimer);
    };
  }, [currentFrame, isDragging, color, totalFrames]);

  if (!imageSequence || !Array.isArray(imageSequence) || imageSequence.length === 0) {
    console.error("Erro: imageSequence não é um array válido", imageSequence);
    return (
      <div className="delivery-360-viewer error-state">
        <p>Erro ao carregar as imagens do veículo.</p>
        <p>Cor: {color}</p>
      </div>
    );
  }

  const currentImage = imageSequence[currentFrame] || imageSequence[0];

  return (
    <div 
      className="delivery-360-viewer"
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
        transform: `scale(${scale})`,
        background: 'transparent',
        border: 'none',
        margin: 0,
        padding: 0,
        position: 'relative',
        width: '100%',
        height: '100%',
        touchAction: 'pan-y'
      }}
    >
      <div className="delivery-viewer-layout">
        <div className="delivery-image-container">
          <div className="delivery-image-wrapper">
            <img
              ref={imageRef}
              src={currentImage}
              alt={`VW Delivery ${model} ${color} - Vista ${currentFrame + 1} de ${totalFrames}`}
              className="delivery-current-image"
              style={{
                filter: `drop-shadow(0 20px 30px rgba(0,0,0,0.4))`,
                background: 'transparent',
                border: 'none',
                margin: 0,
                padding: 0,
                display: 'block',
                pointerEvents: 'none',
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
              onError={(e) => {
                console.error("Erro ao carregar imagem:", currentImage);
                const fallbackImg = imageSequence[0] || DEFAULT_IMAGE_SEQUENCE[0];
                if (e.currentTarget.src !== fallbackImg) {
                  e.currentTarget.src = fallbackImg;
                }
              }}
              onLoad={() => {
                console.log("Imagem carregada:", currentImage);
              }}
            />
          </div>
        </div>

        {showSwipeHint && (
          <div className="delivery-swipe-hint">
            Gire o Delivery com o dedo
          </div>
        )}
      </div>
    </div>
  );
};

export default Delivery360Viewer;