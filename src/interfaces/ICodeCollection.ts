export interface CodeCollectionData {
  _id: string;
  active_status: boolean;
  code_expiry_date: number;
  code_issue_date: number;
  code_number: number;
  tag: string;
}

export interface CodeCollectionResponse {
  success?: boolean;
  status?: boolean;
  message: string;
  data: CodeCollectionData[];
  errors: Record<string, any>;
  statusCode: number;
}
