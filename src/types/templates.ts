export interface TemplateResponse {
  template_type: string;
  traveler_type?: string;
  data: Record<string, unknown> | unknown[];
}
