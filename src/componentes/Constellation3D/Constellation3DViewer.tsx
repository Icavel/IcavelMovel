// src/components/Constellation3DViewer.tsx
import React, { useState } from "react";
import "./Constellation3DViewer.css";
import Constellation3DModel from "./Constellation3DModel";

interface Constellation3DViewerProps {
  color?: string;
  scale?: number;
  showControls?: boolean;
    onColorChange?: (newColor: string) => void; 
}

const Constellation3DViewer = ({ 
  color = "#0056b3", 
  scale = 0.8,
  showControls = false
}: Constellation3DViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="constellation-viewer-container">
      <div className="constellation-viewer-ambient-light" />
      <div 
        className="constellation-viewer-model"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="relative z-10 w-full h-full">
          <Constellation3DModel 
            scale={0.7}
            className="w-full h-full"
          />
          
       
          <div 
            className="constellation-viewer-color-overlay"
            style={{ 
              backgroundColor: color,
              mixBlendMode: 'multiply'
            }}
          ></div>
        </div>
        
        <div className="constellation-viewer-shadow"></div>

        {showControls && (
          <div className="viewer-controls-hint">
            <div className="control-item">
              <span className="control-icon">🖱️</span>
              <span className="control-text">Arraste para girar</span>
            </div>
            <div className="control-item">
              <span className="control-icon">🖱️</span>
              <span className="control-text">Scroll para zoom</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Constellation3DViewer;