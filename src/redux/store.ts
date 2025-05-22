import { configureStore } from "@reduxjs/toolkit";
import { signInUserSlice } from "./slices/SignIn";
import { ownerSlice } from "./slices/owner";
import { verifyOtpSlice } from "./slices/verifyOtp";
import { getPlansSlice } from "./slices/getPlans";
import resendOtp from "./slices/resendOtp";
import { forgotPasswordSlice } from "./slices/forgotPassword";
import getKeyHosts from "./slices/getKeyHosts";
import getKeyCatalog from "./slices/getKeyCatalog";
import { addKeySlice } from "./slices/addKey";
import { getKeyDetailSlice } from "./slices/getKeyDetail";
import notify from "./slices/notify";
import { updateKeySlice } from "./slices/updateKey";
import { setKeyValiditySlice } from "./slices/setValidity";
import { getCollectionCodeSlice } from "./slices/getCollectionCode";
import { getOwnProfileSlice } from "./slices/profileDetail";
import registerNewKey from "./slices/registerNewKey";
import linkKeyRing from "./slices/linkKeyRing";
import changePassword from "./slices/changePassword";
import { getOwnHistorySlice } from "./slices/getOwnerHistory";
import { logOutSlice } from "./slices/logout";
import updateProfile from "./slices/updateProfile";
import hostProfile from "./slices/hostProfile";
import updateKeyStatus from "./slices/updateKeyStatus";
import notificationSetting from "./slices/notificationSetting";
import notificationList from "./slices/notificationList";
import appConditions from "./slices/appConditions";
import contactUs from "./slices/contactUs";
import unreadCount from "./slices/unreadCount";
import paymentMethod from "./slices/paymentMethod";
import retireKey from "./slices/retireKey";
import renewSubscription from "./slices/renewSubscription";
import cancelSubscription from "./slices/cancelSubscription";
import getCoupons from "./slices/getCoupons";
import { expireCodeSlice } from "./slices/expireCode";
import reportKey from "./slices/reportKey";
import { deleteKeySlice } from "./slices/deleteKey";
import getCodeCollection from "./slices/getCodeCollection";

export const store = configureStore({
  reducer: {
    signIn: signInUserSlice.reducer,
    ownerRegister: ownerSlice.reducer,
    verifyOtp: verifyOtpSlice.reducer,
    getPlans: getPlansSlice.reducer,
    resendOTP: resendOtp,
    forgotPassword: forgotPasswordSlice.reducer,
    getKeyHosts: getKeyHosts,
    getKeyCatalog: getKeyCatalog,
    addKey: addKeySlice.reducer,
    getKeyDetail: getKeyDetailSlice.reducer,
    notifyOwner: notify,
    updateKey: updateKeySlice.reducer,
    setValidity: setKeyValiditySlice.reducer,
    getCollectionCode: getCollectionCodeSlice.reducer,
    getOnwerProfile: getOwnProfileSlice.reducer,
    getOwnerHistory: getOwnHistorySlice.reducer,
    logOutUser: logOutSlice.reducer,
    scanKey: registerNewKey,
    linkKeyRing: linkKeyRing,
    changePass: changePassword,
    updateProfile: updateProfile,
    hostProfile: hostProfile,
    keyStatus: updateKeyStatus,
    notificationSettings: notificationSetting,
    notificationList: notificationList,
    appCondtions: appConditions,
    contactUs: contactUs,
    unreadCount: unreadCount,
    paymentMethods: paymentMethod,
    retireKey: retireKey,
    renewSubscription: renewSubscription,
    cancelSub: cancelSubscription,
    coupons: getCoupons,
    expireCode: expireCodeSlice.reducer,
    reportKey: reportKey,
    deleteKey: deleteKeySlice.reducer,
    codeCollection: getCodeCollection,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {authenticationState: AuthState}
export type AppDispatch = typeof store.dispatch;
