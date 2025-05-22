import HomeScreen from "@screens/home/Home";
import ForgotPasswordScreen from "@screens/onboarding/forgotPassword/ForgotPassword";
import ProfileScreen from "@screens/profile/Profile";
import AuthStackNavigator from "./stack/AuthStackNavigator";
import UnAuthStackNavigator from "./stack/UnauthStackNavigation";
import SplashScreen from "@screens/onboarding/splash/Splash";
import LoginScreen from "@screens/onboarding/login/Login";
import SignUpScreen from "@screens/onboarding/signup/SignUp";
import OTPVerificationScreen from "@screens/onboarding/verification/Verification";
import KeyDetailScreen from "@screens/keydetail/keydetail";
import ConfirmPasswordScreen from "@screens/onboarding/confirmPassword/ConfirmPassword";
import AddKeyScreen from "@screens/addkey/AddKey";
import KeyHostListingScreen from "@screens/keyhostlisting/KeyHostListing";
import SubscriptionPlanScreen from "@screens/subscriptionplan/subscriptionplan";
import SettingsScreen from "@screens/settings/Settings";
import ChangePasswordScreen from "@screens/changepassword/ChangePassword";
import TermsConditionScreen from "@screens/termscondtion/TermsCondtion";
import PrivacyPolicyScreen from "@screens/privacypolicy/PrivacyPolicy";
import NotificationScreen from "@screens/notification/Notification";
import KeyHostListTabScreen from "@screens/keyhostlisttab/KeyHostListTab";
import PayNowScreen from "@screens/payment/PayNow";
import HomeScreenKeyHost from "@screens/keyhoststack/home/HomeScreenKeyHost";
import UpdateKeyScreen from "@screens/updateKey/updateKey";
import History from "@screens/history/History";
import ContactUsScreen from "@screens/contactus/ContactUs";
import HostProfile from "@screens/keyhoststack/profile/HostProfile";
import CodeCollection from "@screens/codeCollection/CodeCollection";

export const UnAuthStack = {
  name: "UnAuthStack" as never,
  component: UnAuthStackNavigator,
};

export const AuthStack = {
  name: "AuthStack" as never,
  component: AuthStackNavigator,
};

export default {
  splashPage: {
    name: "Splash" as never,
    component: SplashScreen,
  },
  loginPage: {
    name: "LoginScreen" as never,
    component: LoginScreen,
  },
  registerPage: {
    name: "SignUpScreen" as never,
    component: SignUpScreen,
  },
  forgotPasswordPage: {
    name: "ForgotPasswordScreen" as never,
    component: ForgotPasswordScreen,
  },
  confirmPasswordPage: {
    name: "ConfirmPasswordScreen" as never,
    component: ConfirmPasswordScreen,
  },
  otpPage: {
    name: "OTPVerificationScreen" as never,
    component: OTPVerificationScreen,
  },
  homePage: {
    name: "HomeScreen" as never,
    component: HomeScreen,
  },
  customerProfilePage: {
    name: "ProfileScreen" as never,
    component: ProfileScreen,
  },
  subscriptionPlanPage: {
    name: "SubscriptionPlanScreen" as never,
    component: SubscriptionPlanScreen,
  },
  keyDetailPage: {
    name: "KeyDetailScreen" as never,
    component: KeyDetailScreen,
  },
  addKeyPage: {
    name: "AddKeyScreen" as never,
    component: AddKeyScreen,
  },
  keyHostListingPage: {
    name: "KeyHostListingScreen" as never,
    component: KeyHostListingScreen,
  },
  settingPage: {
    name: "SettingsScreen" as never,
    component: SettingsScreen,
  },
  changePasswordPage: {
    name: "ChangePasswordScreen" as never,
    component: ChangePasswordScreen,
  },
  termsConditionPage: {
    name: "TermsConditionScreen" as never,
    component: TermsConditionScreen,
  },
  privacyPage: {
    name: "PrivacyPolicyScreen" as never,
    component: PrivacyPolicyScreen,
  },
  contactUsPage: {
    name: "ContactUsScreen" as never,
    component: ContactUsScreen,
  },
  notificationPage: {
    name: "NotificationScreen" as never,
    component: NotificationScreen,
  },
  KeyHostListingTabPage: {
    name: "KeyHostListTabScreen" as never,
    component: KeyHostListTabScreen,
  },
  payNowPage: {
    name: "PayNowPage" as never,
    component: PayNowScreen,
  },
  HostHomeScreen: {
    name: "HostHomeScreen" as never,
    component: HomeScreenKeyHost,
  },
  UpdateKeyScreen: {
    name: "UpdateKeyScreen" as never,
    component: UpdateKeyScreen,
  },
  historyScreen: {
    name: "HistoryScreen" as never,
    component: History,
  },
  CodeCollection: {
    name: "CodeCollectionScreen" as never,
    component: CodeCollection,
  },
  hostProfile: {
    name: "hostProfile" as never,
    component: HostProfile,
  },
};
