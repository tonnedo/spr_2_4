const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig(__dirname);
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: true, // Поддержка ES-модулей
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      sourceExts: [...sourceExts, 'mjs', 'js', 'jsx', 'ts', 'tsx'], // Явно указываем все расширения
      blockList: /node_modules\/[^/]+\/node_modules/, // Исключаем вложенные node_modules
      extraNodeModules: {}, // Убираем лишние полифилы
    },
    watchFolders: [__dirname + '/node_modules'], // Указываем папки для слежения
  };
})();