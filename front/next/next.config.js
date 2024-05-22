const withTM = require('next-transpile-modules')(['zustand', 'zukeeper']);

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/:path*",
                // origin: "/:path*",   
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*", // Set your origin
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization",
                    },
                    {
                        key: 'Referrer-Policy',
                        value: "no-referrer",
                    },
                    
                    
                ],
            },
        ]
    }
};

module.exports = withTM(nextConfig);