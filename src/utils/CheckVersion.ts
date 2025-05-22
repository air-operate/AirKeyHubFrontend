import { Alert, Linking, Platform } from "react-native";
// import { checkVersion } from "react-native-check-version";
import VersionCheck from "react-native-version-check";

export default function useCheckVersion() {
  const checkAppVersion = async () => {
    // const version = await checkVersion();
    try {
      const latestVersion =
        Platform.OS === "ios"
          ? await fetch(
              `https://itunes.apple.com/in/lookup?bundleId=com.airkeyhub.com`
            )
              .then((r) => r.json())
              .then((res) => {
                return res?.results[0]?.version;
              })
          : await VersionCheck.getLatestVersion({
              provider: "playStore",
              packageName: "com.airkeyhub",
              ignoreErrors: true,
            });

      const currentVersion = VersionCheck.getCurrentVersion();

      if (latestVersion > currentVersion) {
        Alert.alert(
          "Update Required",
          "A new version of the app is available. Please update to continue using the app.",
          [
            {
              text: "Update Now",
              onPress: async () => {
                Linking.openURL(
                  await (Platform.OS === "ios"
                    ? VersionCheck.getAppStoreUrl({
                        appID: "com.airkeyhub.com",
                      })
                    : VersionCheck.getPlayStoreUrl({
                        packageName: "com.airkeyhub",
                      }))
                );
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        // App is up-to-date; proceed with the app
      }
    } catch (error) {
      // Handle error while checking app version
      console.error("Error checking app version:", error);
    }
  };

  return checkAppVersion;
}
