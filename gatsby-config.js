module.exports = {
  pathPrefix: '/hablemos-de-voz',
  plugins: [
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-theme-mdx-deck',
      options: {
        basePath: '/slides',
      },
    },
  ],
}
