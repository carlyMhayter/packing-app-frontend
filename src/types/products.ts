import { GroomingCategory, MeasurementUnit } from "../enums/enums";

export interface ProductBase {
  name: string;
  category: (typeof GroomingCategory)[keyof typeof GroomingCategory];
  standard_amount_per_use: number;
  unit: (typeof MeasurementUnit)[keyof typeof MeasurementUnit];
  is_custom?: boolean;
  tsa_max_size?: number;
  tsa_max_unit?: (typeof MeasurementUnit)[keyof typeof MeasurementUnit];
  requires_voltage_check?: boolean;
  has_tsa_restriction?: boolean;
  tsa_restriction_note?: string;
  has_airline_restriction?: boolean;
  airline_restriction_note?: string;
  description?: string;
  owner_id?: number;
}

export interface ProductCreate extends ProductBase {}

export interface ProductPublic extends ProductBase {
  id: number;
  created_at: Date;
}

export interface ProductUpdate {
  name?: string;
  category?: (typeof GroomingCategory)[keyof typeof GroomingCategory];
  standard_amount_per_use?: number;
  unit?: (typeof MeasurementUnit)[keyof typeof MeasurementUnit];
  is_custom?: boolean;
  tsa_max_size?: number;
  has_tsa_restriction?: boolean;
  tsa_restriction_note?: string;
  has_airline_restriction?: boolean;
  airline_restriction_note?: string;
  description?: string;
}

export interface ProductSizeBase {
  product_id: number;
  size_value_fl_oz?: number;
  size_value_ml?: number;
  size_value_oz?: number;
  size_value_g?: number;
  size_value_count?: number;
  is_travel_size?: boolean;
  is_tsa_compliant?: boolean;
  estimated_weight_lbs?: number;
}

export interface ProductSizeCreate extends ProductSizeBase {}

export interface ProductSizePublic extends ProductSizeBase {
  id: number;
}

export interface ProductSizeUpdate {
  size_value_fl_oz?: number;
  size_value_ml?: number;
  size_value_oz?: number;
  size_value_g?: number;
  size_value_count?: number;
  is_travel_size?: boolean;
  is_tsa_compliant?: boolean;
  estimated_weight_lbs?: number;
}
