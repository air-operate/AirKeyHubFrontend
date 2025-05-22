export interface OwnHistoryResponse {
  success?: boolean;
  status?: boolean;
  message: string;
  data: OwnHistoryData[];
  errors: Record<string, any>;
  statusCode: number;
}

export interface OwnHistoryData {
  _id: string;
  code_number: number;
  tag: string;
  key_collected_date: number | null;
  key_returned_date: number | null;
}
