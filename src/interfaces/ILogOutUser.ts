export interface LogOutUserData {
  success?: boolean;
  status?: boolean;
  message: string;
  errors: Record<string, any>;
  statusCode: number;
}
