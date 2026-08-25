/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // نطبّق على كل الصفحات
        source: "/(.*)",
        headers: [
          {
            // نسمح فقط لـ Storyblok Visual Editor بعمل iframe لموقعنا
            // نفس الموقع مسموح أيضاً — self
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://app.storyblok.com https://*.storyblok.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
