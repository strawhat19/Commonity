const { getDefaultConfig } = require(`expo/metro-config`);

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push(`svg`);
config.resolver.assetExts = config.resolver.assetExts.filter((extension) => extension !== `svg`);
config.transformer.babelTransformerPath = require.resolve(`react-native-svg-transformer/expo`);

module.exports = config;
