module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['.'],
                    // Needs to match tsconfig.json
                    alias: {
                        '@components': './src/components',
                        '@contexts': './src/contexts',
                        '@routes': './src/routes',
                        '@screens': './src/screens',
                        '@styles': './src/styles',
                        '@utils': './src/utils',
                    },
                },
            ],
            [
                'module:react-native-dotenv',
                {
                    moduleName: '@env',
                    path: '.env',
                },
            ],
        ],
    }
}
