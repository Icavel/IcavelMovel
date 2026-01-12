import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Send, 
  Printer, 
  Eye,
  Loader2 
} from 'lucide-react';
import { PDFViewer } from '@react-pdf/renderer';
import ProposalPDF from '../ProposalPDF/ProposalPDF';
import './PDFPreview.css';
import { pdf } from '@react-pdf/renderer';

interface PDFPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  onSendWhatsApp: (blob: Blob) => void;
  userData: any;
  truckData: any;
  configuration: any;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({
  isOpen,
  onClose,
  onSendWhatsApp,
  userData,
  truckData,
  configuration,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

useEffect(() => {
    if (isOpen && !pdfBlob) {
      generatePDF();
    }
  }, [isOpen]);

  const generatePDF = async () => {
    setIsLoading(true);
    try {
      const pdfComponent = (
        <ProposalPDF
          userData={userData}
          truckData={truckData}
          configuration={configuration}
        />
      );
      
      const blob = await pdf(pdfComponent).toBlob();
      setPdfBlob(blob);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };


  if (!isOpen) return null;

  const handleDownload = () => {
    if (pdfBlob) {
      const fileName = `Proposta_${truckData.name}_${userData.name}_${Date.now()}.pdf`;
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handlePrint = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const printWindow = window.open(url);
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    }
  };

  return (
    <div className="pdf-preview-overlay">
      <div className="pdf-preview-modal">
        <div className="preview-header">
          <div className="header-left">
            <Eye size={24} />
            <h2>Pré-visualização da Proposta</h2>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <div className="preview-content">
          {isLoading ? (
            <div className="loading-container">
              <Loader2 className="spinner" size={40} />
              <p>Gerando proposta...</p>
            </div>
          ) : (
            <div className="pdf-viewer-container">
              <PDFViewer width="100%" height="500px">
                <ProposalPDF
                  userData={userData}
                  truckData={truckData}
                  configuration={configuration}
                />
              </PDFViewer>
            </div>
          )}

          <div className="client-info-summary">
            <div className="info-card">
              <h4>Destinatário</h4>
              <p><strong>Nome:</strong> {userData.name}</p>
              <p><strong>WhatsApp:</strong> {userData.phone}</p>
            </div>
            <div className="info-card">
              <h4>Veículo</h4>
              <p><strong>Modelo:</strong> {truckData.name}</p>
              <p><strong>Cor:</strong> {configuration.paint.nome}</p>
              <p><strong>Pacotes:</strong> {configuration.packages.length} selecionados</p>
            </div>
          </div>
        </div>

        <div className="preview-actions">
          <button
            onClick={() => pdfBlob && onSendWhatsApp(pdfBlob)}
            className="btn-whatsapp"
            disabled={!pdfBlob}
          >
            <Send size={18} />
            Enviar para WhatsApp
          </button>
          
          <button
            onClick={handleDownload}
            className="btn-secondary"
            disabled={!pdfBlob}
          >
            <Download size={18} />
            Baixar PDF
          </button>
          
          <button
            onClick={handlePrint}
            className="btn-secondary"
            disabled={!pdfBlob}
          >
            <Printer size={18} />
            Imprimir
          </button>
          
          <button onClick={onClose} className="btn-outline">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;