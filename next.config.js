/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'avatars.githubusercontent.com',
      'images.unsplash.com',
      'api.dicebear.com'
    ],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: '丘比特AI情感助手',
  }
}

module.exports = nextConfig