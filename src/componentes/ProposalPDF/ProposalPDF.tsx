import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#0056b3',
    borderBottomStyle: 'solid',
    paddingBottom: 15,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: '#0056b3',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  brandInfo: {
    flexDirection: 'column',
  },
  brandName: {
    fontSize: 16,
    color: '#0056b3',
    fontWeight: 'bold',
  },
  brandSubtitle: {
    fontSize: 10,
    color: '#666666',
  },
  proposalInfo: {
    alignItems: 'flex-end',
  },
  proposalTitle: {
    fontSize: 20,
    color: '#0056b3',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  proposalNumber: {
    fontSize: 10,
    color: '#666666',
  },
  date: {
    fontSize: 10,
    color: '#666666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#0056b3',
    fontWeight: 'bold',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderBottomStyle: 'solid',
  },
  clientInfoGrid: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // ✅ ESSENCIAL: cada coluna ocupa metade da linha
  },
  infoLabel: {
    fontSize: 10,
    color: '#666666',
    fontWeight: 'bold',
    width: 90, // ✅ Menor e seguro para duas colunas
  },
  infoValue: {
    fontSize: 10,
    color: '#333333',
    flex: 1,
    lineHeight: 1.4, // ✅ MUITO IMPORTANTE no PDF
  },
  vehicleGrid: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  vehicleImageContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 15,
    marginRight: 20,
  },
  vehicleImage: {
    width: 200,
    height: 120,
    objectFit: 'contain',
  },
  vehicleSpecs: {
    width: '50%',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
    borderBottomStyle: 'solid',
  },
  specLabel: {
    fontSize: 10,
    color: '#666666',
  },
  specValue: {
    fontSize: 10,
    color: '#333333',
    fontWeight: 'bold',
    lineHeight: 1.4, // ✅ Consistência com outros textos
  },
  packagesSection: {
    marginBottom: 20,
  },
  packageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
  },
  packageCode: {
    fontSize: 9,
    color: '#FFFFFF',
    backgroundColor: '#0056b3',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    fontWeight: 'bold',
    marginRight: 8,
  },
  packageName: {
    fontSize: 10,
    color: '#333333',
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
    lineHeight: 1.4, // ✅
  },
  packageCategory: {
    fontSize: 9,
    color: '#666666',
    backgroundColor: '#e9ecef',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    lineHeight: 1.4, // ✅
  },
  colorDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    marginBottom: 20,
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  colorInfo: {
    flexDirection: 'column',
  },
  colorName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 1.4, // ✅
  },
  colorCode: {
    fontSize: 9,
    color: '#666',
    lineHeight: 1.4, // ✅
  },
  disclaimer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#e8f4fd',
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#0056b3',
    borderLeftStyle: 'solid',
  },
  disclaimerText: {
    fontSize: 9,
    color: '#0056b3',
    lineHeight: 1.4, // ✅
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    borderTopStyle: 'solid',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: '#999999',
    lineHeight: 1.4, // ✅
  },
  pageNumber: {
    fontSize: 8,
    color: '#999999',
    lineHeight: 1.4, // ✅
  },
});

export interface ProposalPDFProps {
  userData: {
    name: string;
    phone: string;
  };
  truckData: {
    name: string;
    variant: string;
    engine: string;
    power: string;
    torque: string;
    weight: string;
  };
  configuration: {
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
  };
  screenshotUrl?: string;
}

const ProposalPDF: React.FC<ProposalPDFProps> = ({
  userData,
  truckData,
  configuration,
  screenshotUrl,
}) => {
  const proposalNumber = `PRO-${Date.now().toString().slice(-8)}`;
  
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const currentDate = formatDate(new Date());
  const expiryDate = formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>I</Text>
            </View>
            <View style={styles.brandInfo}>
              <Text style={styles.brandName}>ICAVEL</Text>
              <Text style={styles.brandSubtitle}>Caminhoes & Onibus</Text>
            </View>
          </View>
          
          <View style={styles.proposalInfo}>
            <Text style={styles.proposalTitle}>PROPOSTA COMERCIAL</Text>
            <Text style={styles.proposalNumber}>Numero: {proposalNumber}</Text>
            <Text style={styles.date}>Data: {currentDate}</Text>
          </View>
        </View>

        {/* Informações do Cliente - LAYOUT CORRIGIDO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMACOES DO CLIENTE</Text>
          <View style={styles.clientInfoGrid}>
            {/* Primeira linha: Nome e Telefone lado a lado */}
            <View style={styles.infoRow}>
              {/* Coluna 1: Nome */}
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Nome:</Text>
                <Text style={styles.infoValue}>{userData.name || 'Nao informado'}</Text>
              </View>
              
              {/* Coluna 2: Telefone */}
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Telefone:</Text>
                <Text style={styles.infoValue}>{userData.phone || 'Nao informado'}</Text>
              </View>
            </View>
            
            {/* Segunda linha: Data da Proposta e Validade lado a lado */}
            <View style={styles.infoRow}>
              {/* Coluna 1: Data da Proposta */}
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Data da Proposta:</Text>
                <Text style={styles.infoValue}>{currentDate}</Text>
              </View>
              
              {/* Coluna 2: Validade */}
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Validade:</Text>
                <Text style={styles.infoValue}>{expiryDate}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Veículo Configurado */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VEICULO CONFIGURADO</Text>
          <View style={styles.vehicleGrid}>
            {screenshotUrl ? (
              <View style={styles.vehicleImageContainer}>
                <Image 
                  src={screenshotUrl} 
                  style={styles.vehicleImage}
                  cache={false}
                />
                <Text style={{ fontSize: 9, color: '#666', marginTop: 8, lineHeight: 1.4 }}>
                  Visualizacao do caminhao configurado
                </Text>
              </View>
            ) : (
              <View style={styles.vehicleImageContainer}>
                <Text style={{ fontSize: 12, color: '#666', lineHeight: 1.4 }}>
                  {truckData.name}
                </Text>
                <Text style={{ fontSize: 10, color: '#999', marginTop: 5, lineHeight: 1.4 }}>
                  Imagem ilustrativa
                </Text>
              </View>
            )}
            
            <View style={styles.vehicleSpecs}>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Modelo:</Text>
                <Text style={styles.specValue}>{truckData.name || 'Nao informado'}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Versao:</Text>
                <Text style={styles.specValue}>{truckData.variant || 'Nao informado'}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Motor:</Text>
                <Text style={styles.specValue}>{truckData.engine || 'Nao informado'}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Potencia:</Text>
                <Text style={styles.specValue}>{truckData.power || 'Nao informado'}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Torque:</Text>
                <Text style={styles.specValue}>{truckData.torque || 'Nao informado'}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Peso Bruto:</Text>
                <Text style={styles.specValue}>{truckData.weight || 'Nao informado'}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Comprimento do Chassi:</Text>
                <Text style={styles.specValue}>
                  {(configuration.chassisLength / 1000).toFixed(1)}m
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Personalização */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PERSONALIZACAO</Text>
          <View style={styles.colorDisplay}>
            <View 
              style={[
                styles.colorSwatch, 
                { backgroundColor: configuration.paint.colorCode }
              ]} 
            />
            <View style={styles.colorInfo}>
              <Text style={styles.colorName}>{configuration.paint.nome}</Text>
              <Text style={styles.colorCode}>Codigo: {configuration.paint.colorCode}</Text>
            </View>
          </View>
        </View>

        {/* Pacotes Opcionais */}
        {configuration.packages.length > 0 && (
          <View style={styles.packagesSection}>
            <Text style={styles.sectionTitle}>PACOTES OPCIONAIS</Text>
            {configuration.packages.map((pkg, index) => (
              <View key={index} style={styles.packageItem}>
                <Text style={styles.packageCode}>{pkg.codigo}</Text>
                <Text style={styles.packageName}>{pkg.nome}</Text>
                <Text style={styles.packageCategory}>{pkg.categoria}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ATENCAO: Esta proposta tem validade de 30 dias a partir da data de emissao. 
            Valores sujeitos a alteracao sem aviso previo. Para confirmar disponibilidade, 
            prazos de entrega e condicoes de financiamento, entre em contato com nossa 
            concessionaria. Imagens meramente ilustrativas.
          </Text>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Icavel Caminhoes & Onibus • CNPJ: 00.000.000/0000-00
          </Text>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `Pagina ${pageNumber} de ${totalPages}`
          )} />
        </View>
      </Page>
    </Document>
  );
};

export default ProposalPDF;