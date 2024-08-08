/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**i.pinimg.com",
        port: "",
      },
    ],
  },
  env: {
    YOUR_SERVICE_ID: "service_8tk5t8e",

    YOUR_TEMPLATE_ID: "template_rry5fod",

    YOUR_PUBLIC_KEY: "wB9zZVOGSt7hoLkWh",
  },
};

export default nextConfig;
