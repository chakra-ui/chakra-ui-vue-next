module.exports = {
  lang: 'en-US',
  title: '@chakra-ui/vue@next',
  description: 'Build accessible Vue apps with speed',

  themeConfig: {
    repo: 'chakra-ui/chakra-ui-vue-next',
    docsDir: 'docs',

    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    nav: [
      { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: 'Config Reference',
        link: '/config/basics',
        activeMatch: '^/config/'
      },
      {
        text: 'Release Notes',
        link: 'https://github.com/chakra-ui/chakra-ui-vue-next/releases'
      }
    ],

    sidebar: {
      '/setup/': getSetupSidebar(),
      '/components/': getSetupSidebar(),
      '/composables/': getSetupSidebar(),
      '/guides/': getSetupSidebar(),
      '/': getSetupSidebar()
    }
  }
}

function getSetupSidebar() {
  return [
    {
      text: 'Introduction',
      children: [
        { text: 'Chakra UI Vue', link: '/' },
        { text: 'Getting Started', link: '/guide/getting-started' }
      ]
    },
    {
      text: 'Guides',
      children: [
        { text: 'Components guide', link: '/guides/component-guide' }
      ]
    },
    {
      text: 'Components',
      children: [
        { text: 'Alert', link: '/components/alert' },
        { text: 'Badge', link: '/components/badge' },
        { text: 'Button', link: '/components/button' },
        { text: 'Code', link: '/components/code' },
        { text: 'Icon', link: '/components/icon' },
        { text: 'Spinner', link: '/components/spinner' },
        { text: 'CSS reset', link: '/components/css-reset' },
        { text: 'Visually hidden', link: '/components/visually-hidden' },
      ]
    },
    {
      text: 'Composables',
      children: [
        { text: 'usePopper', link: '/composables/use-popper' }
      ]
    }
  ]
}