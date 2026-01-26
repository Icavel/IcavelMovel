// src/types/chassisTypes.ts
export interface ChassisConfig {
  lengths: number[];
  labels?: string[];
  images?: Record<number, string>;
  minLength?: number;
  maxLength?: number;
  step?: number;
  unit?: string;
  isSingleOption?: boolean;
  recommendedLength?: number;
}

export interface ChassisTruckModel {
  id: string;
  name: string;
  variant?: string;
  chassisConfig: ChassisConfig;
}