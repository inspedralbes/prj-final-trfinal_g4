const withTM = require('next-transpile-modules')(['zustand', 'zukeeper']);

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };
        
        
        return config;
    },
    output:"export"
};

module.exports = nextConfig;