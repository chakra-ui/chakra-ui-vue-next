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
        { text: 'Getting Started', link: '/pages/getting-started/getting-started' },
        { text: 'Plugin Options', link: '/pages/getting-started/plugin-options' },
        { text: 'Principles', link: '/pages/getting-started/principles' },
        { text: 'Changelog', link: '/pages/getting-started/changelog' }
      ]
    },
    {
      text: 'Features',
      children: [
        { text: 'Style Props', link: '/pages/features/style-props' },
        { text: 'Gradient', link: '/pages/features/gradient' },
        { text: 'CSS Variables', link: '/pages/features/css-variables' },
        { text: 'Responsive Styles', link: '/pages/features/responsive-styles' },
        { text: 'Chakra Factory', link: '/pages/features/chakra-factory' }
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
        { text: 'Breadcrumb', link: '/components/breadcrumb' },
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
        { text: 'usePopper', link: '/composables/use-popper' },
        { text: 'useFocusLock', link: '/composables/use-focus-lock' }
      ]
    }
  ]
}