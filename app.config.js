
const IS_DEV = process.env.APP_VARIANT === 'development';
export default {
  expo: {

    name: IS_DEV ? 'Adorès (Dev)' : 'Adorès',
    slug: 'Adores',
    version: '2.0.1',
    orientation: 'portrait',
    icon: './assets/logo-icone.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/adaptive-logo.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
      accessibilityLabel: "Image de lancement d'Adorès",
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_DEV ? 'dev.mandigoentreprise.adores' : 'com.mandigoentreprise.adores',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-logo.png',
        backgroundColor: '#ffffff',
      },
      package: IS_DEV ? 'dev.mandigoentreprise.adores' : 'com.mandigoentreprise.adores',
      versionCode: 5
    },
    web: {
      favicon: './assets/favlogo.png',
    },
    extra: {
      appVariant: 'development' || null,
      eas: {
        projectId: '69e762c3-5940-4dda-a8b0-15b6329015e5',
      },
    },
    updates: {
      url: 'https://u.expo.dev/69e762c3-5940-4dda-a8b0-15b6329015e5',
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    }
  },
};