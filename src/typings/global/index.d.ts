export interface API_ERROR {
  data: any | undefined;
  status: number | undefined;
}

export interface AUTH_STATE {
  isAuthenticated: boolean;
}

export interface SignInRes {
  data: Data;
  error: Error;
  message: string;
  status: boolean;
  statusCode: number;
}
export interface Data {
  _id: string;
  otp: string;
  otpVerifiedStatus: boolean;
  time: string;
  name: string;
  profileImage: string;
  token: string;
  role: string;
  notificationStatus: boolean;
}
export interface Error {}

export interface OwnerRes {
  data: {
    email: string;
    otp: string;
    time: string;
    token: string;
    name: string;
    profileImage: string;
    role: string;
  };
  errors: Errors;
  message: string;
  status: boolean;
  statusCode: number;
}

export interface ResendOtpRes {
  data: {
    otp: string;
    time: string;
  };
  errors: Errors;
  message: string;
  status: boolean;
  statusCode: number;
}

export interface subscriptionPlansRes {
  data?: {
    subscription_plans: DataEntity[] | null;
    local_currency_price: number;
    stripe_public_key?: string;
    stripe_secret_key?: string;
    tax_percentage?: string;
  };
  errors: Errors;
  message: string;
  status: boolean;
  statusCode: number;
}
export interface DataEntity {
  _id: string;
  currency: string;
  price: string;
  timePeriod?: number;
  title: string;
  type: string;
  tax_price: string;
  total_price: string;
}

export interface KeysListResponse {
  message: string;
  status: boolean;
  data: {
    _id: string;
    name: string;
    description: string;
    status: 1;
    subscription_active_status: string;
    stripe_subscription_status: boolean;
  }[];
  error: any; // Assuming the error property can contain any type of error data
  statusCode: number;
}

export interface PasswordChangeResponse {
  message: string;
  status: boolean;
  data: any; // Assuming the data property can contain any type of data
  errors: any; // Assuming the errors property can contain any type of error data
  statusCode: number;
}

export interface KeyDetailResponse {
  data: {
    _id: string;
    active_time: {
      from: string;
      to: string;
    };
    address: string;
    country_code: number;
    description: string;
    email: string;
    key_QR: number;
    key_host_name: string;
    key_status: number;
    latitude: number;
    longitude: number;
    name: string;
    phone_number: string;
    store_info: string;
    plan_price: string;
    plan_suspended_status: boolean;
    plan_title: string;
    plan_type: string;
    subscriptionExpriyString: number;
    subscription_status: boolean;
    store_name: string;
  };
  error: any;
  message: string;
  status: boolean;
  statusCode: number;
}

export interface KeyHostResponse {
  message: string;
  status: boolean;
  data: KeyHost[];
  error: any;
  statusCode: number;
}

export interface KeyHost {
  _id: string;
  user_name: string;
  email: string;
  country_code: number;
  phone_number: string | number;
  address: string;
  longitude: number;
  latitude: number;
  active_time: {
    from: string;
    to: string;
  };
  status: number;
  distance: number;
  availableSlots: number;
  store_info: string;
  store_name: string;
}

export interface User {
  email?: string;
  otp?: string;
  time?: string;
  token?: string;
  name?: string;
  profileImage?: string;
  role?: string;
  otpVerifiedStatus?: boolean;
  countryCode?: string;
  country?: string;
}

export interface UpdateKeyDetailResponse {
  message: string;
  status: boolean;
  data: {};
  error: any; // Assuming the error property can contain any type of error data
  statusCode: number;
}

export interface KeyValidateResponse {
  success: boolean;
  message: string;
  data: {
    shareCollectionCode: number;
  };
  errors: Record<string, any>;
  statusCode: number;
}

export interface CollectionCodeResponse {
  success: boolean;
  message: string;
  data: {
    code: number;
  };
  errors: Record<string, any>;
  statusCode: number;
}

export interface ProfileDetailResponse {
  success: boolean;
  message: string;
  data: {
    userName: string;
    phoneNumber: string;
    email: string;
    image: string;
    profileImage: string;
  };
  errors: Record<string, any>;
  statusCode: number;
}

export interface ScanKeyResponse {
  success: boolean;
  message: string;
  data: {
    box_id: string;
    key_slot_location: number;
    key_id: string;
    _id: string;
    key_status: number;
  };
  errors: Record<string, any>;
  statusCode: number;
}

export interface HostProfileResponse {
  success: boolean;
  message: string;
  data: HostData;
  errors: Record<string, any>;
  statusCode: number;
}

export interface HostData {
  _id: string;
  name: string;
  contryCode: number;
  phoneNumber: number;
  email: string;
  address: string;
  longitude: number;
  latitude: number;
  profileImage: string;
}

export interface NotificationResponse {
  message: string;
  status: boolean;
  data: NotificationData[];
  error: {};
  statusCode: number;
}

export interface NotificationData {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
}

export interface conditionsResponse {
  message: string;
  status: boolean;
  data: conditionData;
  errors: any;
  statusCode: number;
}

export interface conditionData {
  _id: string;
  title: string;
  description: string;
}

export interface unreadCountResponse {
  message: string;
  status: boolean;
  data: unreadCountData;
  errors: any;
  statusCode: number;
}

export interface unreadCountData {
  unreadNotifications: number;
}

export interface paymentMethodResp {
  message: string;
  status: boolean;
  data: paymentMethodData[];
  errors: {};
  statusCode: 200;
}

export interface paymentMethodData {
  payment_method: string;
  exp_month: number;
  exp_year: number;
  last4: string;
}

export interface couponListResp {
  message: string;
  status: boolean;
  data: couponListData[];
  errors: {};
  statusCode: number;
}

export interface couponListData {
  _id: string;
  coupon_amount: string;
  coupon_code: string;
  coupon_type: number;
  description: string;
  end_date: string;
  limit: number;
  plan_id: string;
  plan_type: number;
  start_date: string;
  status: number;
  title: string;
  users_type: number;
}
