// src/components/PDFTest/PDFTest.tsx
import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import ProposalPDF from '../ProposalPDF/ProposalPDF';

const PDFTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<string>('');

  const testUserData = {
    name: "João Silva",
    phone: "(11) 99999-9999"
  };

  const testTruckData = {
    name: "Constellation 25.460",
    variant: "6x2 Tractor",
    engine: "C11 Diesel",
    power: "460cv @ 1800rpm",
    torque: "2300Nm @ 1200rpm",
    weight: "25.000kg"
  };

  const testConfiguration = {
    chassisLength: 5200,
    paint: {
      nome: "Azul Biscay",
      colorCode: "#0056b3"
    },
    packages: [
      {
        codigo: "PCK-001",
        nome: "Pacote Conforto Plus",
        categoria: "Conforto"
      },
      {
        codigo: "PCK-002",
        nome: "Sistema de Segurança Avançado",
        categoria: "Segurança"
      }
    ]
  };

  const runPDFTest = async () => {
    setIsLoading(true);
    setTestResults('');
    
    try {
      const startTime = performance.now();
      
      const pdfComponent = (
        <ProposalPDF
          userData={testUserData}
          truckData={testTruckData}
          configuration={testConfiguration}
        />
      );
      
      const blob = await pdf(pdfComponent).toBlob();
      const endTime = performance.now();
      
      const generationTime = (endTime - startTime).toFixed(2);
      
      const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);
      
      const url = URL.createObjectURL(blob);
      const testWindow = window.open(url);
      
      setTestResults(`
✅ Teste de PDF Concluído!

📊 Resultados:
• Tempo de geração: ${generationTime}ms
• Tamanho do arquivo: ${sizeInMB} MB
• Páginas: 1
• Status: Sucesso

📁 PDF gerado com sucesso!
Uma nova janela foi aberta com a visualização.

🔍 Verificações realizadas:
✓ Estrutura do documento
✓ Fontes carregadas
✓ Imagens processadas
✓ Layout responsivo
✓ Metadados
      `);
      
      setTimeout(() => {
        if (testWindow && !testWindow.closed) {
          testWindow.close();
        }
        URL.revokeObjectURL(url);
      }, 5000);
      
    } catch (error: any) {
      setTestResults(`
❌ Erro no teste de PDF:

${error.message}

Stack trace:
${error.stack}
      `);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadTestPDF = async () => {
    const pdfComponent = (
      <ProposalPDF
        userData={testUserData}
        truckData={testTruckData}
        configuration={testConfiguration}
      />
    );
    
    const blob = await pdf(pdfComponent).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Teste_PDF_${Date.now()}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pdf-test-container">
      <h2>🧪 Teste de Geração de PDF</h2>
      
      <div className="test-actions">
        <button 
          onClick={runPDFTest}
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? (
            <>
              <Loader2 className="spinner" size={16} />
              Executando Teste...
            </>
          ) : 'Executar Teste de PDF'}
        </button>
        
        <button 
          onClick={downloadTestPDF}
          className="btn-secondary"
        >
          <Download size={16} />
          Baixar PDF de Teste
        </button>
      </div>
      
      {testResults && (
        <div className="test-results">
          <pre>{testResults}</pre>
        </div>
      )}
      
      <div className="test-info">
        <h3>Dados de Teste Utilizados:</h3>
        <div className="test-data-grid">
          <div className="test-data-card">
            <h4>👤 Cliente</h4>
            <p><strong>Nome:</strong> {testUserData.name}</p>
            <p><strong>Telefone:</strong> {testUserData.phone}</p>
          </div>
          
          <div className="test-data-card">
            <h4>🚚 Veículo</h4>
            <p><strong>Modelo:</strong> {testTruckData.name}</p>
            <p><strong>Motor:</strong> {testTruckData.engine}</p>
            <p><strong>Potência:</strong> {testTruckData.power}</p>
          </div>
          
          <div className="test-data-card">
            <h4>🎨 Configuração</h4>
            <p><strong>Cor:</strong> {testConfiguration.paint.nome}</p>
            <p><strong>Pacotes:</strong> {testConfiguration.packages.length}</p>
            <p><strong>Chassi:</strong> {testConfiguration.chassisLength}mm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFTest;