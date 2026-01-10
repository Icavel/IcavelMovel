import React, { useState, useRef, useEffect } from "react";

interface Meteor360ViewerProps {
  scale?: number;
}

const IMAGE_SEQUENCE = [
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0VIwK3hsL1DNU2SGCArKHqVeJ4nfl9TgbFaEk",
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0EmwoV71lqADCeUMSQuZmabt961Hif7F405dw",
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0GGEVv4dfw7ZRF3sd2nSKVv5NObJcLT9t6iPh",
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0FX86ani1Nu85fCjEqUGF4ShW0BLK2Q9oetJw",
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0KjGn9ifT62NIBgSFao0CRrOy87dbc3DXsthj",
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr04ytN0H2T6ftGq2CVnaM9xsW1pwh4kmQXPirA",
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0J7OxqlWuV0vIZ97H8WMrdhYUEm5jAo3sRqSk",
  "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0TzVZOPrwQq8tcohsp3zfJbrmlFSZ0LIYnyGB"
];

const Meteor360Viewer: React.FC<Meteor360ViewerProps> = ({
  scale = 1.0
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalFrames = IMAGE_SEQUENCE.length;

  const rotateTo = (direction: 'left' | 'right') => {
    const increment = direction === 'left' ? -1 : 1;
    const newFrame = (currentFrame + increment + totalFrames) % totalFrames;
    setCurrentFrame(newFrame);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
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
    const interval = setInterval(() => {
      if (!isDragging) {
        rotateTo('right');
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentFrame, isDragging]);

  return (
    <div 
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ 
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'pan-y',
        overflow: 'hidden',
        background: 'transparent',
        position: 'relative'
      }}
    >
      <img
        src={IMAGE_SEQUENCE[currentFrame]}
        alt={`VW Meteor - Vista ${currentFrame + 1} de ${totalFrames}`}
        style={{
          width: 'auto',
          height: '40%', 
          maxWidth: '30%', 
          objectFit: 'contain',
          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
          transform: `scale(${scale})`,
          transition: 'transform 0.2s ease',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default Meteor360Viewer;