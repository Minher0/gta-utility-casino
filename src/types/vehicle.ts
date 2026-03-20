export interface VehicleStat {
  label: string;
  value: number;
  maxValue: number;
  unit: string;
}

export interface VehicleStats {
  topSpeed: VehicleStat;
  acceleration: VehicleStat;
  braking: VehicleStat;
  traction: VehicleStat;
}

export interface PodiumVehicle {
  id: string;
  name: string;
  manufacturer: string;
  type: string;
  image: string;
  originalPrice: number;
  currency: string;
  dealer: string;
  weekStart: string;
  weekEnd: string;
  stats: VehicleStats;
  description: string;
}

export interface WeeklyBonus {
  id: number;
  title: string;
  description: string;
  icon: string;
  reward?: string;
  isNew?: boolean;
  isHot?: boolean;
}

export interface CasinoInfo {
  name: string;
  location: string;
  spinCost: string;
  podiumRefreshDay: string;
}

export interface VehicleConfig {
  currentPodiumVehicle: PodiumVehicle;
  weeklyBonuses: WeeklyBonus[];
  casinoInfo: CasinoInfo;
}
