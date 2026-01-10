//truckConfigData.ts

import { TruckModel } from '../TruckModelSelector/TruckModelSelector';


export interface ModelOptions {
    pintura: Array<{ nome: string; colorCode: string; categoria: string }>;
    pacotes: Array<{
        codigo: string;
        nome: string;
        descricao: string[];
        beneficios: string[];
        selecionado: boolean;
        categoria: string;
        disponivel: boolean;
    }>;
}

export const modelOptionsMap: Record<string, ModelOptions> = {
    'constellation-18-210-4x2': {
        pintura: [
            { nome: "Azul Constellation", colorCode: "#0056b3", categoria: "Especial" },
            { nome: "Branco Neve", colorCode: "#ffffff", categoria: "Sólida" },
        ],
        pacotes: [
            {
                codigo: "PCA",
                nome: "Pacote Cabine Avançada",
                descricao: ["Ar-condicionado digital", "Painel multimídia"],
                beneficios: ["Conforto superior"],
                selecionado: false,
                categoria: "conforto",
                disponivel: true
            },
        ]
    },
};

export function getTransmissionOptions(model: TruckModel): string[] {
    const transmissionString = model.specs.find(s => s.label === 'Transmissão')?.value || model.transmission;
    if (model.id === 'constellation-18-210-4x2' || model.id === 'constellation-18-320-4x4') {

        return transmissionString.split(' - ').map(t => t.trim());
    }
    return [transmissionString];
}