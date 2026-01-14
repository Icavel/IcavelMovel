// src/components/TruckModelSelector/TruckModelSelector.tsx
import { useState } from 'react';
import { 
  ChevronRight, 
  X, 
  Zap, 
  Gauge,
  Weight,
  Settings,
  Info,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ChevronDown,
  ChevronLeft 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import './TruckModelSelector.css';

export interface TruckSpec {
  label: string;
  value: string;
}

export interface TruckModel {
  id: string;
  name: string;
  type: 'constellation' | 'meteor' | 'delivery';
  variant: string;
  specs: TruckSpec[];
  features: string[];
  transmission: string;
  engine: string;
  power: string;
  torque: string;
  weight: string;
  imageUrl: string;
  isBestSeller?: boolean;
  salesRank?: number;
}

export type TruckType = 'constellation' | 'meteor' | 'delivery';
const constellationModels: TruckModel[] = [

{
    id: 'constellation-14-210-4x2',
    name: 'Constellation 14.210',
    type: 'constellation',
    variant: '4x2',
    specs: [
      { label: 'Motor', value: 'MAN / D0834LF08' },
      { label: 'Transmissão', value: 'Manual - Eaton' },
      { label: 'PBT', value: '14.500 kg' }
    ],
    features: ['Cabine Standard', 'Ar condicionado', 'Direção hidráulica'],
    transmission: 'Manual 6 vel.',
    engine: 'MAN D08 4.6L',
    power: '205 cv',
    torque: '750 Nm',
    weight: '14.500 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0IqzjTM52vLeKVUf0JkMdWSb6n8psEYyOBH7R',
    isBestSeller: true,
    salesRank: 1
  },

 {
    id: 'constellation-17-210-4x2-2',
    name: 'Constellation 17.210',
    type: 'constellation',
    variant: '4x2',
    specs: [
      { label: 'Motor', value: 'MAN / D0834LF08' },
      { label: 'Transmissão', value: 'Manual - Eaton / FS 5406-A' },
      { label: 'PBT', value: '16.000 kg' }
    ],
    features: ['Cabine Standard', 'Ar condicionado', 'Direção hidráulica'],
    transmission: 'Manual 6 vel.',
    engine: 'MAN / D0834LF08',
    power: '205 cv',
    torque: '750 Nm',
    weight: '16.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr097GilQOveFS8kwitsCaZn02EN6hB7IAdWGbY',
    isBestSeller: true,
    salesRank: 2
  },

{
    id: 'constellation-18-210-4x2',
    name: 'Constellation 18.210',
    type: 'constellation',
    variant: '4x2',
    specs: [
      { label: 'Motor', value: 'MAN / D0834LF08' },
      { label: 'Transmissão', value: 'EATON / FS 5406-A ZF / 8AP 900T' },
      { label: 'PBT', value: '16.000 kg' }
    ],
    features: ['Cabine Estendida', 'ABS', 'Controle de Tração'],
    transmission: 'Manual 6 vel. / Automática 8 vel.',
    engine: 'MAN / D0834LF08',
    power: '205 cv',
    torque: '750 Nm',
    weight: '16.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ZmrmLOPmOr0ft81hy9vdqW5DlbXnFYAw2K3N',
    isBestSeller: true,
    salesRank: 3
  },

{
    id: 'constellation-18-260',
    name: 'Constellation 18.260',
    type: 'constellation',
    variant: '4x2',
    specs: [
      { label: 'Motor', value: 'MAN / D0836LF18' },
      { label: 'Transmissão', value: 'Automatizada 12 vel.' },
      { label: 'PBT', value: '16.000 kg' }
    ],
    features: ['Cabine Leito', 'Airbag', 'Controle de Estabilidade'],
    transmission: 'Automatizado 12 vel.',
    engine: 'MAN D08 6.9L',
    power: '260 cv',
    torque: '950 Nm',
    weight: '16.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0IqzjTM52vLeKVUf0JkMdWSb6n8psEYyOBH7R',
    isBestSeller: true,
    salesRank: 4
  },

   {
    id: 'constellation-18-320-4x4',
    name: 'Constellation 18.320',
    type: 'constellation',
    variant: '4x2',
    specs: [
      { label: 'Motor', value: 'MAN / D2676LF21' },
      { label: 'Transmissão', value: 'ZF 9S 1310 TD / ZF / 12TX 2420 TD' },
      { label: 'PBT', value: '16.000 kg' }
    ],
    features: ['Cabine Mega Space', 'GPS', 'Câmera de Ré'],
    transmission: 'Manual / V-Tronic',
    engine: 'MAN D26 12.4L',
    power: '315 cv',
    torque: '1.200 Nm',
    weight: '16.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr09772zXyveFS8kwitsCaZn02EN6hB7IAdWGbY',
    isBestSeller: true,
    salesRank: 5
  },

 {
    id: 'constellation-26-260-4x2',
    name: 'Constellation 26.260',
    type: 'constellation',
    variant: '6x2',
    specs: [
      { label: 'Motor', value: 'MAN / D0836LF18' },
      { label: 'Transmissão', value: 'EATON / FSO 6406-A ZF 9S 1310 TD' },
      { label: 'PBT', value: '23.000 kg' }
    ],
    features: ['Cabine Standard', 'Ar condicionado'],
    transmission: 'Manual',
    engine: 'MAN / D0836LF18',
    power: '260 cv',
    torque: '950 Nm',
    weight: '23.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0y1EJebDSwAKxFhk9eiYJvqRu1LOf3TZtnjdI'
  },

  {
    id: 'constellation-26-320-6x2',
    name: 'Constellation 26.320',
    type: 'constellation',
    variant: '6x2',
    specs: [
      { label: 'Motor', value: 'MAN / D0836LF17' },
      { label: 'Transmissão', value: 'ZF V-Tronic' },
      { label: 'PBT', value: '23.000 kg' }
    ],
    features: ['Cabine Leito', 'Teto Alto', 'Computador de bordo'],
    transmission: 'Automatizado 12 vel.',
    engine: 'MAN D08 6.9L',
    power: '315 cv',
    torque: '1.200 Nm',
    weight: '23.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr00L1oQmRbO8krQC41Wm7UyuKdScnNgI2FRzqx',
  },

  {
    id: 'constellation-30-320-8x2',
    name: 'Constellation 30.320',
    type: 'constellation',
    variant: '8x2',
    specs: [
      { label: 'Motor', value: 'MAN / D0836LF17' },
      { label: 'Transmissão', value: 'ZF 9S 1310 TD ZF / 12TX 2420 TD' },
      { label: 'PBT', value: '19.000 kg' }
    ],
    features: ['Cabine Mega Space', 'GPS', 'Câmera de Ré'],
    transmission: 'Manual / V-Tronic',
    engine: 'MAN / D0836LF17',
    power: '315 cv',
    torque: '1.200 Nm',
    weight: '19.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0FDw8P3i1Nu85fCjEqUGF4ShW0BLK2Q9oetJw'
  },

{
    id: 'constellation-27-260-6x4',
    name: 'Constellation 27.260',
    type: 'constellation',
    variant: '6x4',
 
    specs: [
      { label: 'Motor', value: 'MAN / D0836LF18' },
      { label: 'Transmissão', value: 'ZF/95 1310 TD' },
      { label: 'PBT', value: '23.000 kg' }
    ],
    features: ['Cabine Leito', 'Teto Alto'],
    transmission: 'Manual 9 vel.',
    engine: 'MAN / D0836LF18',
    power: '260 cv',
    torque: '950 Nm',
    weight: '23.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr05ebHifAogYsJSVxeRWa64uM89yBcTbjmdDhr'
  },

{
    id: 'constellation-27-320-6x4',
    name: 'Constellation 27.320',
    type: 'constellation',
    variant: '6x4',
  
    specs: [
      { label: 'Motor', value: 'MAN / D0836LF17' },
      { label: 'Transmissão', value: 'ZF / 9S 1310 TD' },
      { label: 'PBT', value: '36.000 kg' }
    ],
    features: ['Cabine Leito', 'Teto Alto'],
    transmission: 'Manual 9 vel.',
    engine: 'MAN D08 6.9L',
    power: '315 cv',
    torque: '1.200 Nm',
    weight: '36.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr06CLoYrySarjJxgwdi6tRWoLNCunz7hEPy5XZ'
  },

  {
    id: 'constellation-31-320-8x2',
    name: 'Constellation 31.320',
    type: 'constellation',
    variant: '8x2',
    specs: [
      { label: 'Motor', value: 'MAN / D2676LF21' },
      { label: 'Transmissão', value: 'ZF / 12TX2424TD' },
      { label: 'PBT', value: '23.000 kg' }
    ],
    features: ['Cabine Mega Space', 'GPS', 'Câmera de Ré'],
    transmission: 'Automatizado',
    engine: 'MAN D26 12.4L',
    power: '315 cv',
    torque: '1.200 Nm',
    weight: '23.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ukT8A2VtqGATQO1zXaIh2VKYlx7DMoRfPJ8u'
  },

{
    id: 'constellation-32-380-6x4',
    name: 'Constellation 32.380',
    type: 'constellation',
    variant: '6x4',
  
    specs: [
      { label: 'Motor', value: 'Cummins / ISL' },
      { label: 'Transmissão', value: 'ZF /12TX2624TD' },
      { label: 'PBT', value: '23.000 kg' }
    ],
    features: ['Cabine Leito', 'Teto Alto'],
    transmission: 'Automatizado',
    engine: 'Cummins / ISL',
    power: '375 cv',
    torque: '1.700 Nm',
    weight: '23.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0uoIfTgCVtqGATQO1zXaIh2VKYlx7DMoRfPJ8'
  },

{
    id: 'constellation-33-260-8x4',
    name: 'Constellation 33.260',
    type: 'constellation',
    variant: '8x4',
    specs: [
      { label: 'Motor', value: 'MAN / D0836LF18' },
      { label: 'Transmissão', value: 'ZF / 9S1310TD' },
      { label: 'PBT', value: '29.000 kg' }
    ],
    features: ['Cabine Leito', 'Teto Alto'],
    transmission: 'Manual',
    engine: 'MAN / D0836LF18',
    power: '260 cv',
    torque: '950 Nm',
    weight: '29.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0JDGBgaWuV0vIZ97H8WMrdhYUEm5jAo3sRqSk'
  },

  {
    id: 'constellation-33-480-6x4',
    name: 'Constellation 33.480',
    type: 'constellation',
    variant: '6x4',
    specs: [
      { label: 'Motor', value: 'MAN / D2676LFAG' },
      { label: 'Transmissão', value: 'ZF / 12TX 2824 TO' },
      { label: 'PBT', value: '74.000 kg' }
    ],
    features: ['Cabine Mega Space', 'GPS', 'Câmera de Ré'],
    transmission: 'Automatizado',
    engine: 'MAN / D2676LFAG',
    power: '475 cv',
    torque: '2.400 Nm',
    weight: '74.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0a3HJUc92Ef5jZGDo3qKrlIzbBVkWYh7mnUJ1'
  },

{
    id: 'constellation-19-380-4x2',
    name: 'Constellation 19.380',
    type: 'constellation',
    variant: '4x2',
    specs: [
      { label: 'Motor', value: 'Cummins / ISL' },
      { label: 'Transmissão', value: 'ZF / 12TX 2624 TD' },
      { label: 'PBT', value: '45.000 kg' }
    ],
    features: ['Cabine Leito', 'Teto Alto'],
    transmission: 'Automatizado',
    engine: 'Cummins L9',
    power: '375 cv',
    torque: '1.700 Nm',
    weight: '45.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr01g3HdAGTWwkoFOpDL1INPn4h7MSZ6H3CAmXf'
  },

{
    id: 'constellation-20-480-8x2',
    name: 'Constellation 20.480',
    type: 'constellation',
    variant: '4x2',
    specs: [
      { label: 'Motor', value: 'MAN / D2676LFAG' },
      { label: 'Transmissão', value: 'ZF / 12TX 2624 TD' },
      { label: 'PBT', value: '56.000 kg' }
    ],
    features: ['Cabine Leito', 'Teto Alto'],
    transmission: 'Automatizado',
    engine: 'MAN | D2676LFAG',
    power: '475 cv',
    torque: '2.400 Nm',
    weight: '56.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0kd4CvSQIKn0CQqhr7l92dotMaSPiW5byLcpR'
  },

 {
    id: 'constellation-25-380-8x2',
    name: 'Constellation 25.380',
    type: 'constellation',
    variant: '8x2',
    specs: [
      { label: 'Motor', value: 'Cummins / ISL' },
      { label: 'Transmissão', value: 'ZF / 12TX 2624 TD' },
      { label: 'PBT', value: '56.000 kg' }
    ],
    features: ['Cabine Leito', 'Teto Alto'],
    transmission: 'Automatizado',
    engine: 'Cummins L9',
    power: '375 cv',
    torque: '1.700 Nm',
    weight: '56.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0jgs4nYTpnQ1BeImtf4U09XVAMiu7lGKWChv5'
  },

 

  {
    id: 'constellation-25-480HD-6x2',
    name: 'Constellation 25.480HD',
    type: 'constellation',
    variant: '6x2',

    specs: [
      { label: 'Motor', value: 'MAN / D2676LFAG' },
      { label: 'Transmissão', value: 'ZF / 12TX 2624 TD' },
      { label: 'PBT', value: '58.500 kg' }
    ],
    features: ['Cabine Leito', 'Teto Alto'],
    transmission: 'Automatizado',
    engine: 'MAN / D2676LFAG',
    power: '475 cv',
    torque: '2.400 Nm',
    weight: '58.500 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0moAt0fcU2NqYFwnbK1XkBThMDtGQVo9vzI5a'
  }
];

const meteorModels: TruckModel[] = [
  {
    id: 'meteor-28-480-6x2',
    name: 'Meteor Highline 28.480HD',
    type: 'meteor',
    variant: '6x2',
    specs: [
      { label: 'Motor', value: 'MAN D2676LF28' },
      { label: 'Transmissão', value: 'V-Tronic/12 marchas' },
      { label: 'PBTC', value: '58.500 kg' }
    ],
    features: ['Cabine Leito', 'Geladeira', 'Painel Digital', 'Volante multifuncional', 'Vidros e travas elétricas', 'Carregador de celular por indução', 'Controle de tração e estabilidade', 'Assistente de partida em rampo'],
    transmission: 'Automatizada 12 vel.',
    engine: 'MAN D26 12.4L',
    power: '480 cv',
    torque: '2.400 Nm',
    weight: '23.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0O1LgoMnvcwPrSGyJalpdfEL2MBU7zV39HXiT',
    isBestSeller: true,
    salesRank: 1
  },

  {
    id: 'meteor-29-530-8x4',
    name: 'Meteor Highline 29.530',
    type: 'meteor',
    variant: '6x4',
    specs: [
      { label: 'Motor', value: 'MAN D3876LF42' },
      { label: 'Transmissão', value: 'V-Tronic' },
      { label: 'PBTC', value: '74.000 kg' }
    ],
    features: ['Cabine Presidential', 'Duas Camas', 'Escritório', 'Wi-Fi'],
    transmission: 'Automatizada 16 vel.',
    engine: 'MAN D26 13L',
    power: '530 cv',
    torque: '2.600 Nm',
    weight: '100.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr02JRlo6qdKFseCcpqzHrUtMBAR9VumY4aWDIh',
   isBestSeller: true,
    salesRank: 2
  },

];

const deliveryModels: TruckModel[] = [
  {
    id: 'delivery-express',
    name: 'Delivery Express',
    type: 'delivery',
    variant: '4x2',
    specs: [
      { label: 'Motor', value: 'F1C 3.0L' },
      { label: 'Transmissão', value: 'Manual 6 vel.' },
      { label: 'PBT', value: '3.500 kg' }
    ],
    features: ['Programa eletronico de estabilizacao (ESP) com ABS + EBD + ATC + ESP', 'Teto ventilante', 'Banco do passageiro com polaina, sem porta-objetos', 'Banco do motorista com ajuste longitudinal e apoio de cabeca', 'Espelho retrovisor interno de seguranca nao antiofuscante', 'Airbag para motorista e passageiro', 'Espelho retrovisor principal e auxiliar c/ regulagem manual lado direito', 'Tomadas de 12 V (2 tomadas)', 'Farois halogenos com farol de rodagem diurna de LED', 'Regulador eletronico de velocidade e piloto automatico', 'Assist. de Partida na Subida HSA HSA'],
    transmission: 'Manual 6 vel.',
    engine: 'F1C 3.0L',
    power: '156 cv',
    torque: '3.300 Nm',
    weight: '35.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0ePk8lqCEbxGi5NQcAgOoz90UWutYymLdphqX',
    isBestSeller: true,
    salesRank: 1
  },

  {
    id: 'delivery-6-170',
    name: 'Delivery 6.170',
    type: 'delivery',
    variant: '4x2',
    specs: [
      { label: 'Motor', value: 'F1C 3.0L' },
      { label: 'Transmissão', value: 'Manual 6 vel.' },
      { label: 'PBT', value: '5.850 kg' }
    ],
    features: ['Teto ventilante', 'Para-choque standard (cinza cross)', 'Banco do motorista com ajuste longitudinal e apoio de cabeca', 'Espelho retrovisor externo esquerdo, convexo e menor', 'Tomadas de 12 V (2 tomadas)', 'Regulagem do facho do farol', 'Assist. de Partida na Subida HSA HSA', 'Revestimento dos bancos em vinil', 'Tacografo eletronico semanal (7 dias)'],
    transmission: 'Manual 6 vel.',
    engine: 'F1C 3.0L',
    power: '156 cv',
    torque: '430 Nm',
    weight: '5.850 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0fD9j1qS8dNBEODjo52CpMcs0WRQFlmkGPrt7',
    isBestSeller: true,
    salesRank: 2
  },

  {
    id: 'delivery-express-9-180',
    name: 'Delivery Express 9.180',
    type: 'delivery',
    variant: '4x2',
    specs: [
      { label: 'Motor', value: 'Cummins / ISF 3.8l' },
      { label: 'Transmissão', value: 'Automatizada/Manual 6 marchas' },
      { label: 'PBT', value: '9.200 kg' }
    ],
    features: ['Programa eletronico de estabilizacao (ESP) com ABS + EBD + ATC + ESP', 'Tomadas de 12 V (2 tomadas)', 'Farois halogenos com farol de rodagem diurna de LED', 'Regulagem do facho do farol', 'Aviso sonoro de cinto de seguranca', 'Display multifuncional/computador de bordo "Medium" Cluster black & white', 'Mangueira para limpeza da cabine (conexao da pressao de ar)', ''],
    transmission: 'Manual 5 vel.',
    engine: 'Cummins / ISF 3.8l',
    power: '175 cv',
    torque: '600 Nm',
    weight: '9.200 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr06EBv3nUySarjJxgwdi6tRWoLNCunz7hEPy5X',
    isBestSeller: true,
    salesRank: 3
  },

  {
    id: 'delivery-11-180',
    name: 'Delivery 11.180',
    type: 'delivery',
    variant: '4x2',
    specs: [
      { label: 'Motor', value: 'ISF 3.8l' },
      { label: 'Transmissão', value: 'Automatizada/Manual 6 vel.' },
      { label: 'PBT', value: '10.800 kg' }
    ],
    features: ['Suspensao chassi na frente parabola', 'Programa eletronico de estabilizacao (ESP) com ABS + EBD + ATC + ESP', 'Banco do motorista com apoio de cabeca e suspensao pneumatica', 'Tomadas de 12 V (2 tomadas)', 'Farois halogenos com farol de rodagem diurna de LED', 'Tacógrafo digítal', 'Acionamento do freio pneumatico', 'Mangueira para limpeza da cabine (conexao da pressao de ar)'],
    transmission: 'Manual 6 vel.',
    engine: 'MWM 4.12 TCE 4.8L',
    power: '175 cv',
    torque: '600 Nm',
    weight: '10.800 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0kwrktDQIKn0CQqhr7l92dotMaSPiW5byLcpR',
    isBestSeller: true,
    salesRank: 4
  },

  {
    id: 'delivery-11-1804x4',
    name: 'Delivery 11.180 4x4',
    type: 'delivery',
    variant: '4x4',
    specs: [
      { label: 'Motor', value: 'Cummins / ISF 3.8l' },
      { label: 'Transmissão', value: 'Manual 6 vel.' },
      { label: 'PBT', value: '10.800 kg' }
    ],
    features: ['Programa eletronico de estabilizacao (ESP) com ABS + EBD + ATC + ESP', 'Tracao 4X4', 'Bloqueio do diferencial transversal ', 'Teto ventilante', 'Tomadas de 12 V (2 tomadas)', 'Farois halogenos com farol de rodagem diurna de LED', 'Aviso sonoro de cinto de seguranca', 'Display multifuncional/computador de bordo', 'Revestimento dos bancos em vinil'],
    transmission: 'Manual 6 vel.',
    engine: 'MWM 4.12 TCE 4.8L',
    power: '175 cv',
    torque: '600 Nm',
    weight: '10.800 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0IeRlcF52vLeKVUf0JkMdWSb6n8psEYyOBH7R',
    isBestSeller: true,
    salesRank: 5
  },

  {
    id: 'delivery-14-180',
    name: 'Delivery 14.180',
    type: 'delivery',
    variant: '6x2',
    specs: [
      { label: 'Motor', value: 'Cummins / ISF 3.8l' },
      { label: 'Transmissão', value: 'Manual 6 vel.' },
      { label: 'PBT', value: '14.000 kg' }
    ],
    features: ['Ar-condcionado', 'trio-elétrico', 'rádio com bluetooth', 'banco do motorista com suspensão pneumática', 'bancos com revestimentos premium', 'DRL integrado aos faróis', 'luzes de posição e lanternas traseiras em LED', 'Assistente de partida em rampa', 'Controle de estabilidade', 'painel de instrumentos 100% digital com tela de 10 polegadas', 'Central multimídia de 7 polegadas'],
    transmission: 'Manual 6 vel.',
    engine: 'Cummins / ISF 3.8l',
    power: '175 cv',
    torque: '600 Nm',
    weight: '14.000 kg',
    imageUrl: 'https://w1d6f4ppqx.ufs.sh/f/ZRWBOk2PmOr0UxbSsCOBPWOC41hMj5dRwYcy7HAZL98apmGg',
    
  }

];

interface TruckModelSelectorProps {
  onConfigure?: (model: TruckModel) => void;
}

export default function TruckModelSelector({ onConfigure }: TruckModelSelectorProps) {
  const navigate = useNavigate(); 
  const [activeTab, setActiveTab] = useState<TruckType>('constellation');
  const [selectedModel, setSelectedModel] = useState<TruckModel | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAllModels, setShowAllModels] = useState(false);

  const handleTabChange = (tab: TruckType) => {
    if (tab === activeTab) return;
    setIsAnimating(true);
    setActiveTab(tab);
    setShowAllModels(false);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getCurrentModels = () => {
    switch (activeTab) {
      case 'constellation':
        return constellationModels;
      case 'meteor':
        return meteorModels; 
      case 'delivery':
        return deliveryModels; 
      default:
        return constellationModels;
    }
  };

  const currentModels = getCurrentModels();
  const bestSellers = currentModels
    .filter(model => model.isBestSeller)
    .sort((a, b) => (a.salesRank || 99) - (b.salesRank || 99))
    .slice(0, 5);

  const modelsToDisplay = showAllModels ? currentModels : bestSellers;

  return (
    <div className="vw-selector-container">
      <header className="vw-header">
        <div className="vw-header-content">
          <h2>Escolha seu Volkswagen</h2>
          <p>Potência e tecnologia para o seu negócio.</p>
        </div>
        
        <div className="back-to-home-container">
          <button 
            className="back-to-home-button" 
            onClick={() => navigate('/')}
          >
            <ChevronLeft size={20} />
            Voltar para o início
          </button>
        </div>
        
        <div className="vw-tabs-wrapper">
          <div className="vw-tabs">
            <button 
              className={`vw-tab ${activeTab === 'constellation' ? 'active' : ''}`}
              onClick={() => handleTabChange('constellation')}
            >
              Constellation
            </button>
            <button 
              className={`vw-tab ${activeTab === 'meteor' ? 'active' : ''}`}
              onClick={() => handleTabChange('meteor')}
            >
              Meteor
            </button>
            <button 
              className={`vw-tab ${activeTab === 'delivery' ? 'active' : ''}`}
              onClick={() => handleTabChange('delivery')}
            >
              Delivery
            </button>
          </div>
        </div>
      </header>

      <section className="best-sellers-section">
        <div className="best-sellers-header">
          <TrendingUp className="trending-icon" />
          <h3>Caminhões mais vendidos</h3>
          <span className="best-seller-badge"></span>
        </div>
        <p className="best-sellers-subtitle">
          Os modelos mais populares entre nossos clientes
        </p>
      </section>

      <main className={`vw-models-grid ${isAnimating ? 'fade-out' : 'fade-in'}`}>
        {modelsToDisplay.map((model) => (
          <div 
            key={model.id} 
            className="vw-truck-card"
            onClick={() => setSelectedModel(model)}
          >
            <div className="card-image-wrapper">
              <img src={model.imageUrl} alt={model.name} loading="lazy" />
              <div className="card-badge">{model.variant}</div>
              {model.isBestSeller && (
                <div className="best-seller-indicator">
                  <TrendingUp size={12} />
                  <span>#{model.salesRank} mais vendido</span>
                </div>
              )}
            </div>
            
            <div className="card-content">
              <div className="card-header">
                <h3>{model.name}</h3>
                
              </div>
              
              <div className="card-mini-specs">
                <span><Zap size={14}/> {model.power}</span>
                <span><Weight size={14}/> {model.weight}</span>
              </div>

              <button className="card-cta">
                Ver Detalhes <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </main>

      {!showAllModels && currentModels.length > 5 && (
        <div className="show-all-container">
          <button 
            className="show-all-button"
            onClick={() => setShowAllModels(true)}
          >
            <ChevronDown size={20} />
            Conheça todos os modelos
            <span className="models-count">+{currentModels.length - 5} modelos</span>
          </button>
        </div>
      )}

      {selectedModel && (
        <div className="vw-drawer-overlay" onClick={() => setSelectedModel(null)}>
          <div 
            className={`vw-drawer ${selectedModel.type}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-drawer-btn" onClick={() => setSelectedModel(null)}>
              <X size={24} />
            </button>

            <div className="drawer-scroll-content">
              <div className="drawer-hero">
                <img src={selectedModel.imageUrl} alt={selectedModel.name} />
                <div className="drawer-hero-gradient"></div>
                <div className="drawer-hero-title">
                  {selectedModel.isBestSeller && (
                    <div className="drawer-best-seller-tag">
                      <TrendingUp size={14} />
                      #{selectedModel.salesRank} mais vendido
                    </div>
                  )}
                  <span className="model-tag">{selectedModel.type}</span>
                  <h2>{selectedModel.name}</h2>
                  
                </div>
              </div>

              <div className="drawer-main-specs">
                <div className="spec-box">
                  <Zap className="spec-icon" />
                  <label>Potência</label>
                  <strong>{selectedModel.power}</strong>
                </div>
                <div className="spec-box">
                  <Gauge className="spec-icon" />
                  <label>Torque</label>
                  <strong>{selectedModel.torque}</strong>
                </div>
                <div className="spec-box">
                  <Settings className="spec-icon" />
                  <label>Câmbio</label>
                  <strong>{selectedModel.transmission.split(' ')[0]}</strong>
                </div>
              </div>

              <div className="drawer-section">
                <h4><Info size={18} /> Especificações Técnicas</h4>
                <ul className="specs-list">
                  {selectedModel.specs.map((spec, idx) => (
                    <li key={idx}>
                      <span>{spec.label}</span>
                      <span className="value">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="drawer-section">
                <h4><CheckCircle2 size={18} /> Itens de Série</h4>
                <div className="features-tags">
                  {selectedModel.features.map((feat, idx) => (
                    <span key={idx} className="feature-pill">{feat}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="drawer-footer">
              <button 
                className="vw-btn-primary"
                onClick={() => {
                  if (onConfigure) onConfigure(selectedModel);
                  setSelectedModel(null);
                }}
              >
                Configurar Este Caminhão <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}