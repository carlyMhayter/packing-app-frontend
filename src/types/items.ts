import {
  MeasurementUnit,
  ItemType,
  PackOrRent,
  ClothingCategories,
  ClothingSubCategory,
} from "../enums/enums";

export interface ItemProductDetailBase {
  product_id?: number;
  tsa_max_size?: number;
  has_tsa_restriction: boolean;
  tsa_restriction_note?: string;
  has_airline_restriction: boolean;
  airline_restriction_note?: string;
}

export interface ItemProductDetailCreate extends ItemProductDetailBase {}

export interface ItemProductDetailPublic extends ItemProductDetailBase {
  id: number;
}

export interface ItemGearDetailBase {
  gear_item_id?: number;
  pack_or_rent: (typeof PackOrRent)[keyof typeof PackOrRent];
  source_activity?: string;
}

export interface ItemGearDetailCreate extends ItemGearDetailBase {}

export interface ItemGearDetailPublic extends ItemGearDetailBase {
  id: number;
}

export interface ItemClothingDetailBase {
  warmth?: number;
  weight_in_g?: number;
  source_activity?: string;
  is_activity_crossover: boolean;
  category?: (typeof ClothingCategories)[keyof typeof ClothingCategories];
  subcategory?: (typeof ClothingSubCategory)[keyof typeof ClothingSubCategory];
}

export interface ItemClothingDetailCreate extends ItemClothingDetailBase {}

export interface ItemClothingDetailPublic extends ItemClothingDetailBase {
  id: number;
}

export interface ItemElectronicsDetailBase {
  has_charger: boolean;
  charger_is_dual_voltage?: boolean;
  has_voltage_warning: boolean;
  voltage_note?: string;
}

export interface ItemElectronicsDetailCreate extends ItemElectronicsDetailBase {}

export interface ItemElectronicsDetailPublic extends ItemElectronicsDetailBase {
  id: number;
}

export interface ItemBase {
  section_id: number;
  name: string;
  quantity?: number;
  unit?: (typeof MeasurementUnit)[keyof typeof MeasurementUnit];
  is_checked: boolean;
  is_prechecked: boolean;
  is_selected: boolean;
  is_user_excluded: boolean;
  source_activity?: string;
  is_rental_reminder: boolean;
  estimated_weight_lbs?: number;
  item_type: (typeof ItemType)[keyof typeof ItemType];
  is_auto_generated: boolean;
}

export interface ItemCreate extends ItemBase {
  is_private: boolean;
  is_shareable: boolean;
  source: string;
  product_detail?: ItemProductDetailCreate;
  gear_detail?: ItemGearDetailCreate;
  clothing_detail?: ItemClothingDetailCreate;
  electronics_detail?: ItemElectronicsDetailCreate;
}

export interface ItemPublic extends ItemBase {
  id: number;
  is_private: boolean;
  is_shareable: boolean;
  source: string;
  product_detail?: ItemProductDetailPublic;
  gear_detail?: ItemGearDetailPublic;
  clothing_detail?: ItemClothingDetailPublic;
  electronics_detail?: ItemElectronicsDetailPublic;
}

export interface ItemUpdate {
  name?: string;
  quantity?: number;
  unit?: (typeof MeasurementUnit)[keyof typeof MeasurementUnit];
  is_checked?: boolean;
  is_prechecked?: boolean;
  is_selected?: boolean;
  is_user_excluded?: boolean;
  is_private?: boolean;
  is_shareable?: boolean;
  source_activity?: string;
  estimated_weight_lbs?: number;
  product_detail?: ItemProductDetailCreate;
  gear_detail?: ItemGearDetailCreate;
  clothing_detail?: ItemClothingDetailCreate;
  electronics_detail?: ItemElectronicsDetailCreate;
}
