// src/types/chassisTypes.ts
export interface ChassisTruckModel {
  name: string;
  chassisConfig?: {
    lengths: number[];
    labels?: string[];
    images?: Record<number, string>;
  };
  id?: string;
  category?: string;
  power?: string;
  torque?: string;
  transmission?: string;
  traction?: string;
  image?: string;
}
