/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
