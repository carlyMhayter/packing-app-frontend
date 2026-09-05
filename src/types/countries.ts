export interface CountryBase {
  id: string;
  fullName: string;
  voltages: string[];
}

export interface CountryPublic extends CountryBase {}

export interface CountryCreate extends CountryBase {}

export interface CountryUpdate {
  id?: string;
  fullName?: string;
  voltages?: string[];
}
