// src/services/pdfService.tsx
import { pdf, DocumentProps } from '@react-pdf/renderer';
import { ReactElement } from 'react';
import ProposalPDF, { type ProposalPDFProps } from '../componentes/ProposalPDF/ProposalPDF';

export interface UserData {
  name: string;
  phone: string;
}

export interface TruckData {
  name: string;
  variant: string;
  engine: string;
  power: string;
  torque: string;
  weight: string;
  type?: string;
}

export interface Configuration {
  chassisLength: number;
  paint: {
    nome: string;
    colorCode: string;
  };
  packages: Array<{
    codigo: string;
    nome: string;
    categoria: string;
  }>;
}

type ConstellationColors = 
  | "Bege Agata" 
  | "Laranja" 
  | "Azul Biscay" 
  | "Vermelho" 
  | "Amarelo Bem-te-vi" 
  | "Cinza MoonStone" 
  | "Branco Polar";

type MeteorColors = 
  | "Prata Pyrit"
  | "Vermelho Rubi"
  | "Azul Biscay"
  | "Preto Universal"
  | "Branco Gelo"
  | "Bega Agata"
  | "Verde Turquesa"
  | "Amarelo Bem-te-vi"
  | "Cinza Moonstone"
  | "Azul Unique";

type DeliveryColors = 
  | "Branco gelo"
  | "Laranja Safaty"
  | "Azul Biscay"
  | "Amarelo Bem-te-vi"
  | "Cinza Moonstone"
  | "Vermelho Coca-cola"
  | "Verde Limão"
  | "Prata Pyrit"
  | "Preto Universal";

type VehicleImages = {
  [key: string]: string; 
};

const VEHICLE_IMAGES: Record<string, VehicleImages> = {
  constellation: {
    "Bege Agata": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr02YYDtsqdKFseCcpqzHrUtMBAR9VumY4aWDIh",
    "Laranja": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0hJLv9XeXeVMRwOltd6mGH1Q9oEKAj4bJPYnc",
    "Azul Biscay": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0WS1Lke4KMuTloxRN7rU4yiFEIsAnvPz3HB2k",
    "Vermelho": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ul6LHEVtqGATQO1zXaIh2VKYlx7DMoRfPJ8u",
    "Amarelo Bem-te-vi": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0FQg2EYi1Nu85fCjEqUGF4ShW0BLK2Q9oetJw",
    "Cinza MoonStone": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0TN37PQwQq8tcohsp3zfJbrmlFSZ0LIYnyGBg",
    "Branco Polar": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr02YYDtsqdKFseCcpqzHrUtMBAR9VumY4aWDIh" 
  },
  meteor: {
    "Prata Pyrit": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0AclrkEUluVP8NKwvb2Zzy4ip195ahGD7gAT6",
    "Vermelho Rubi": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0uEpE75VtqGATQO1zXaIh2VKYlx7DMoRfPJ8u",
    "Azul Biscay": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ymwvp4SwAKxFhk9eiYJvqRu1LOf3TZtnjdIo",
    "Preto Universal": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0jF6QauTpnQ1BeImtf4U09XVAMiu7lGKWChv5",
    "Branco Gelo": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr085pteWM9ZOafCkVHPsWqdjIFy3NUz6XKtiwb",
    "Bega Agata": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0vYirdqltWkVFrLscwKlaUoY8B9eZHm2yDpz0",
    "Verde Turquesa": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0qVYiCaKKEuBMIyJ7TZsox1eXWNOAg3GQawS5",
    "Amarelo Bem-te-vi": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0SGzWxLnE1JtEXpV0f2kdZmvGbuFnrPRg8ija",
    "Cinza Moonstone": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0JkAacqWuV0vIZ97H8WMrdhYUEm5jAo3sRqSk",
    "Azul Unique": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0oXQ3vTCkrn5e3P96qY4K7bOAatLUuDXzGRFc",
  },
  delivery: {
    "Branco gelo": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0QJYquWXBFSiugpXPo13x7Dmj4T2JUf8EZWCH",
    "Laranja Safaty": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0eFEP5NCEbxGi5NQcAgOoz90UWutYymLdphqX6",
    "Azul Biscay": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0F6m9mEi1Nu85fCjEqUGF4ShW0BLK2Q9oetJw",
    "Amarelo Bem-te-vi": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0dCY4vlrOzs3jGHqVxX2NQYaeLZtom64igWbp",
    "Cinza Moonstone": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0IjbaVZ52vLeKVUf0JkMdWSb6n8psEYyOBH7R",
    "Vermelho Coca-cola": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0NConQY7hix2U5l71Xumz6YOgqnryEGZ8Meot",
    "Verde Limão": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0sQO9RCwoujKcEJZnxpINqM1L3Pdy6UD78eHF",
    "Prata Pyrit": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr06tjBB9ySarjJxgwdi6tRWoLNCunz7hEPy5XZ",
    "Preto Universal": "https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0SxnxYfE1JtEXpV0f2kdZmvGbuFnrPRg8ijae",
  }
};

const normalizeColorName = (colorName: string): string => {
  const mappings: Record<string, string> = {
    "Bega Agata": "Bege Agata",
    "Branco gelo": "Branco Gelo",
    "Cinza Moonstone": "Cinza MoonStone",
  };
  
  return mappings[colorName] || colorName;
};

const getVehicleImage = (modelName: string, colorName: string): string => {
  const normalizedColor = normalizeColorName(colorName);
  let modelType = "constellation";
  
  if (modelName.toLowerCase().includes('meteor')) {
    modelType = "meteor";
  } else if (modelName.toLowerCase().includes('delivery')) {
    modelType = "delivery";
  }
  
  const modelImages = VEHICLE_IMAGES[modelType];
  
  if (!modelImages) {
    return "https://via.placeholder.com/400x250?text=Modelo+não+encontrado";
  }
  
  const specificImage = modelImages[normalizedColor];
  if (specificImage) {
    return specificImage;
  }
  
  const normalizedColorLower = normalizedColor.toLowerCase();
  for (const [key, value] of Object.entries(modelImages)) {
    if (key.toLowerCase().includes(normalizedColorLower) || 
        normalizedColorLower.includes(key.toLowerCase())) {
      return value;
    }
  }
  
  
  const firstImage = Object.values(modelImages)[0];
  return firstImage || "https://via.placeholder.com/400x250?text=Imagem+não+disponível";
};

export async function generateProposalPDF(
  userData: UserData,
  truckData: TruckData,
  configuration: Configuration
): Promise<Blob> {
  try {
    const screenshotUrl = getVehicleImage(truckData.name, configuration.paint.nome);
    const pdfComponent: ReactElement<DocumentProps> = (
      <ProposalPDF
        userData={userData}
        truckData={truckData}
        configuration={configuration}
        screenshotUrl={screenshotUrl}
      />
    );
    
    const pdfBlob = await pdf(pdfComponent).toBlob();
    return pdfBlob;

  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    const pdfComponent: ReactElement<DocumentProps> = (
      <ProposalPDF
        userData={userData}
        truckData={truckData}
        configuration={configuration}
      />
    );
    
    return await pdf(pdfComponent).toBlob();
  }
}

export function downloadPDF(blob: Blob, fileName: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const url = URL.createObjectURL(blob);
      
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobileDevice) {
        handleMobileDownload(url, fileName, resolve);
      } else {
        handleDesktopDownload(url, fileName, resolve);
      }
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 30000);
      
    } catch (error) {
      console.error('Erro no download:', error);
      
      try {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 10000);
        resolve(true);
      } catch (fallbackError) {
        console.error('Erro no fallback:', fallbackError);
        resolve(false);
      }
    }
  });
}

function handleMobileDownload(url: string, fileName: string, resolve: (success: boolean) => void) {
  if ('showSaveFilePicker' in window) {
    (window as any).showSaveFilePicker({
      suggestedName: fileName,
      types: [{
        description: 'PDF Document',
        accept: { 'application/pdf': ['.pdf'] },
      }],
    })
      .then(async (fileHandle: any) => {
        const writable = await fileHandle.createWritable();
        await writable.write(await fetch(url).then(r => r.blob()));
        await writable.close();
        resolve(true);
      })
      .catch(() => {
        mobileLinkFallback(url, fileName, resolve);
      });
  } else {
    mobileLinkFallback(url, fileName, resolve);
  }
}

function mobileLinkFallback(url: string, fileName: string, resolve: (success: boolean) => void) {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.target = '_blank';
  
  link.style.cssText = `
    position: fixed;
    top: -1000px;
    left: -1000px;
    opacity: 0;
    visibility: hidden;
  `;
  
  document.body.appendChild(link);
  
  link.click();
  
  setTimeout(() => {
    window.open(url, '_blank');
  }, 500);
  
  setTimeout(() => {
    document.body.removeChild(link);
  }, 5000);
  
  setTimeout(() => {
    alert(
      '📄 PDF gerado com sucesso!\n\n' +
      'Em seu dispositivo móvel, você pode:\n\n' +
      '1. Toque em "Salvar" se aparecer a opção\n' +
      '2. Use o menu de compartilhamento do navegador\n' +
      '3. Ou visualize diretamente no navegador\n\n' +
      'O PDF também foi aberto em uma nova aba.'
    );
    resolve(true);
  }, 1000);
}

function handleDesktopDownload(url: string, fileName: string, resolve: (success: boolean) => void) {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.style.cssText = `
    position: absolute;
    left: -9999px;
    top: -9999px;
    opacity: 0;
  `;
  
  document.body.appendChild(link);
  
  requestAnimationFrame(() => {
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      resolve(true);
    }, 100);
  });
}

export async function downloadPDFMobile(blob: Blob, fileName: string): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      const url = URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      document.body.appendChild(iframe);
    
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = fileName;
      downloadLink.innerHTML = '📥 Clique aqui para baixar o PDF';
      downloadLink.style.cssText = `
        display: block;
        padding: 15px 20px;
        background: #25D366;
        color: white;
        text-align: center;
        border-radius: 10px;
        margin: 20px auto;
        text-decoration: none;
        font-weight: bold;
        font-size: 16px;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      `;
      
      const container = document.createElement('div');
      container.id = 'pdf-download-container';
      container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        padding: 20px;
      `;
      
      const contentBox = document.createElement('div');
      contentBox.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 30px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      `;
      
      contentBox.innerHTML = `
        <h3 style="margin: 0 0 15px 0; color: #333;">Download da Proposta</h3>
        <p style="margin: 0 0 20px 0; color: #666;">Clique no botão abaixo para baixar seu PDF</p>
      `;
      
      contentBox.appendChild(downloadLink);
      const closeButton = document.createElement('button');
      closeButton.innerHTML = 'Fechar';
      closeButton.style.cssText = `
        margin-top: 20px;
        padding: 10px 25px;
        background: #f0f0f0;
        border: none;
        border-radius: 8px;
        color: #333;
        font-weight: 500;
        cursor: pointer;
      `;
      closeButton.onclick = () => {
        document.body.removeChild(container);
        resolve(false);
      };
      
      contentBox.appendChild(closeButton);
      container.appendChild(contentBox);
      document.body.appendChild(container);
      downloadLink.onclick = (e) => {
        e.preventDefault();
        const tempLink = document.createElement('a');
        tempLink.href = url;
        tempLink.download = fileName;
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        
        setTimeout(() => {
          if (document.body.contains(container)) {
            document.body.removeChild(container);
          }
          resolve(true);
        }, 1000);
      };
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      }, 30000);
      
    } catch (error) {
      console.error('Erro no download mobile:', error);
      
      try {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 10000);
        resolve(true);
      } catch (fallbackError) {
        resolve(false);
      }
    }
  });
}

export async function safeDownloadPDF(blob: Blob, fileName: string): Promise<boolean> {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    const mobileSuccess = await downloadPDFMobile(blob, fileName);
    if (mobileSuccess) return true;
    return downloadPDF(blob, fileName);
  } else {
    return downloadPDF(blob, fileName);
  }
}

export async function generateSimpleProposal(
  userData: UserData,
  truckData: TruckData,
  configuration: Configuration
): Promise<Blob> {
  const pdfComponent: ReactElement<DocumentProps> = (
    <ProposalPDF
      userData={userData}
      truckData={truckData}
      configuration={configuration}
    />
  );
  
  return await pdf(pdfComponent).toBlob();
}