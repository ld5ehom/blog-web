const removeImports = require("next-remove-imports")();

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "wwtfskyxdhafyrkvujzz.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/**",
            },
        ],
    },
};

module.exports = removeImports(nextConfig);
