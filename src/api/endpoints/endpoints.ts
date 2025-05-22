// export const BASE_URL = "http://13.43.245.13:3000/v1/api/";
// export const BASE_URL = "https://airkeyhubapi.csdevhub.com/v1/api/";
export const BASE_URL = "https://api.airkeyhub.com/v1/api/";
export const REGISTER_URL = BASE_URL + "owner";
export const SignIn_URL = BASE_URL + "owner/login";
export const VERIFY_OTP_URL = BASE_URL + "owner/verifyOtp";
export const GET_PLANS_URL = BASE_URL + "owner/getPlans";
export const RESEND_OTP_URL = BASE_URL + "owner/otp";
export const FORGOT_PASSWORD_URL = BASE_URL + "owner/forgetPassword";
export const GET_KEY_CATALOG_URL = BASE_URL + "owner/getUserKeys";
export const GET_KEY_HOSTS_URL = BASE_URL + "owner/getKeyHosts";
export const ADD_KEY_URL = BASE_URL + "owner/createUserKey";
export const KEY_PAY_URL = BASE_URL + "owner/keyPayment";
export const DELETE_KEY_URL = BASE_URL + "owner/key";
export const UPDATE_KEY_URL = BASE_URL + "owner/key/updateKeyDetail";
export const KEY_DETAIL_URL = BASE_URL + "owner/key/detail?id=";
export const NOTIFY_URL = BASE_URL + "owner/key/notifyOwner";
export const SET_VALIDITY_URL = BASE_URL + "owner/key/setvalidity";
export const GET_OWNER_HISTORY = BASE_URL + "owner/key/history";
export const GET_CODE_COLLECTION = BASE_URL + "owner/key/collection/history";
export const GET_COLLECTION_CODE_URL =
  BASE_URL + "owner/key/getShareCollectionCode";
export const GET_OWNER_PROFILE_URL = BASE_URL + "owner/getOwnProfile";
export const CHANGE_PASSWORD_URL = BASE_URL + "owner/changePassword";
export const LOGOUT_OWNER = BASE_URL + "owner/logout";
export const UPDATE_PROFILE_URL = BASE_URL + "owner/updateProfile";
export const NOTIFICATION_SETTING_URL = BASE_URL + "owner/notificationSetting";
export const CONDITIONS_URL = BASE_URL + "owner/appConditions";
export const CONTACT_US = BASE_URL + "owner/contactUs";
export const GET_PAYMENT_METHOD_URL = BASE_URL + "owner/customerPaymentMethod";
export const RENEW_SUBSCRIPTION_URL = BASE_URL + "owner/key/renewSubscription";
export const CANCEL_SUBSCRIPTION_URL =
  BASE_URL + "owner/key/cancelSubsacription";
export const GET_COUPON_URL = BASE_URL + "owner/getCoupons";
export const EXPIRE_CODE_URL = BASE_URL + "owner/key/expireValidity";
export const DELETE_ACCOUNT_URL = BASE_URL + "owner/userAccount"

//KEY HOST API URL SECTION
export const REGISTER_KEY_URL = BASE_URL + "keyHost/scan_qr_code";
export const SCAN_QR_URL = BASE_URL + "keyHost/scan_qr_code";
export const LINK_KEY_RING_URL = BASE_URL + "keyHost/link_key_ring";
export const HOST_PROFILE_URL = BASE_URL + "keyHost/getProfileData";
export const KEY_STATUS_URL = BASE_URL + "keyHost/change_key_status";
export const LOGOUT_HOST = BASE_URL + "keyHost/logout";
export const RETIRE_KEY_URL = BASE_URL + "keyHost/retire_key";
export const REPORT_KEY_URL = BASE_URL + "keyHost/report_key";

//COMMON APIs
export const NOTIFICATION_LIST_URL = BASE_URL + "common/getNotification";
export const UNREAD_COUNT_URL = BASE_URL + "common/unreadNotifications";