// src/types.ts
export type Page = 
  | 'truck-selector' 
  | 'meteor' 
  | 'constellation' 
  | 'delivery' 
  | 'recommendation' 
  | 'events' 
  | 'consultants' 
  | 'discover' 
  | 'customize';

export interface TruckModel {
  id: string;
  name: string;
  type: 'meteor' | 'constellation' | 'delivery';
  variant: string;
  price: string;
  image: string;
  imageUrl: string;
  description: string;
  features: string[];
  specs: Record<string, string> | Array<{ label: string; value: string }>;
  transmission?: string;
  engine?: string;
  power?: string;
  torque?: string;
  capacity?: string;
  weight?: string;
}