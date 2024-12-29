interface ProvinceProps {
  province: string;
  province_id: string;
}

interface CityProps {
  city_id: string;
  city_name: string;
  postal_code: string;
  province: string;
  province_id: string;
  type: string;
}

interface CostResponse {
  query: {
    origin: string;
    destination: string;
    weight: number;
    courier: string;
  };
  status: {
    code: number;
    description: string;
  };
  origin_details: {
    city_id: string;
    province_id: string;
    province: string;
    type: string;
    city_name: string;
    postal_code: string;
  };
  destination_details: {
    city_id: string;
    province_id: string;
    province: string;
    type: string;
    city_name: string;
    postal_code: string;
  };
  results: ShippingResult[];
}

interface ShippingResult {
  code: string;
  name: string;
  costs: ShippingCost[];
}

interface ShippingCost {
  service: string;
  description: string;
  cost: ShippingCostDetail[];
}

interface ShippingCostDetail {
  value: number;
  etd: string;
  note: string;
}