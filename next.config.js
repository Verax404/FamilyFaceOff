/** @type {import("next").NextConfig} */
module.exports = {
  experimental: { appDir: true },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  publicRuntimeConfig: {
    BUZZER_SOUND: '/buzzed.mp3',
  },
};
