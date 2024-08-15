/** @type {import("next").NextConfig} */
const path = require('path');

function pinoWebpackAbsolutePath(relativePath) {
    console.log("relativepath:" + relativePath + " dirname:" +  __dirname);
    console.log(path.resolve(__dirname, relativePath));
    return path.resolve(__dirname, relativePath);
}

const nextConfig = {
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {not: [...fileLoaderRule.resourceQuery.not, /url/]}, // exclude if *.svg?url
                use: ["@svgr/webpack"],
            },
            {
                test: /worker\.js$/,
                use: {loader: 'worker-loader'},
            },

        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };

        //config.externals.push("pino-pretty");

        return config;
    },
    poweredByHeader: false,
    experimental: {
        // instrumentationHook: true
        serverComponentsExternalPackages: ['pino', 'pino-mongodb', 'pino-pretty'],
    },
    headers: async () => {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin",
                    },
                    {
                        key: "Content-Security-Policy",
                        value: `default-src 'self' data:  https://c.bing.com https://*.quantummetric.com 'unsafe-inline' 'unsafe-eval'; img-src 'self' 'unsafe-inline' data:  https://c.bing.com https://*.quantummetric.com ; style-src 'self' 'unsafe-inline' data:   https://c.bing.com https://vcc.dev.att.com https://vcc.test.att.com https://vcc.it.att.com https://*.quantummetric.com;`,
                    },
                
                
                ],
            },
        ];
    },
};

globalThis.__bundlerPathsOverrides = {
    'thread-stream-worker': pinoWebpackAbsolutePath('./worker.js'),
    'indexes': pinoWebpackAbsolutePath('./indexes.js'),
    'wait': pinoWebpackAbsolutePath('./wait.js'),
  };

module.exports = nextConfig;
