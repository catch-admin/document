module.exports = {
  title: 'CatchAdmin 官网',
  description: 'CatchAdmin',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/docs/' },
      { text: 'FAQ', link: '/faq/' },
      { text: '博客', link: '/news/' },
      { text: '仓库地址', link: 'https://gitee.com/jaguarjack/catchAdmin' },
    ],
    sidebar: {
      '/docs/': [
        '',
        'install',
        'project-introduce',
        'console',
        'request',
      ],
    },
    plugins: [
      ['@vuepress/active-header-links'],
      ['@vuepress/back-to-top']
    ]
  }
}
