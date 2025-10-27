export type RephraseFieldName =
  | "description"
  | "criteria"
  | "screening_email"
  | "notes";

export interface RephraseRequest {
  field_name: RephraseFieldName;
  field_data: string;
}

export interface RephraseResponse {
  rephrased: string;
}
