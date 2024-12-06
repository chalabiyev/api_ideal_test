export type HouseData = {
  id: string;
  propertyType: string;
  registrationNumber: string;
  occupancyAddress: string;
  ownershipStatus: string;
  numberOfRooms: string;
  area: string;
  constructionYear: string;
  marketValue: string;
  mortgageStatus: string;
  monthlyRent: string;
};

export type VehicleData = {
  id: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleVin: string;
  vehicleMarketValue: string;
  vehicleNumber: string;
};

export type OccupancyData = {
  houseData: HouseData[];
  vehicleData: VehicleData[];
};

export type ValuesType = {
  [year: string]: {
    [month: string]: number;
  };
};