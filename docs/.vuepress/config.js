module.exports = {
  title: 'CatchAdmin 官网',
  description: '基于 Thinkphp & Vue 开发的后台管理框架',
  head: [
    ['meta', { name: 'keywords', content: 'catchadmin, 后台管理, 前后端分离, thinkphp后台管理框架, thinkphp前后端分离框架,php, elementui'}],
    [
      "script",
      {
        "data-ad-client": "ca-pub-1505209242532150",
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      }
    ]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/docs/' },
      { text: 'FAQ', link: '/faq/' },
      { text: '视频教程', link: '/news/' },
      { text: '赞助名单', link: '/donate/' },
      { text: '仓库地址', 
        items: [
          { text: 'github', link: 'https://github.com/yanwenwu/catch-admin' },
          { text: 'gitee', link: 'https://gitee.com/jaguarjack/catchAdmin' }
        ] 
      },
    ],
    sidebar: {
      '/docs/': [
        '',
        'install',
        'project-introduce',
        'console',
        'request',
        'model',
        'dataScope',
        'extend',
        'http',
        'develop',
        'excel',
        'sensitiveWord',
        'crontab',
        'front'
      ],
    },
    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'catch-admin/document',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '在 Github 编辑此页',
    plugins: [
      ['@vuepress/active-header-links'],
      ['@vuepress/back-to-top'],
      ['@vuepress-plugin-google-adsense']
    ]
  }
}
