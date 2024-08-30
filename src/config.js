import plugin from './plugin.js'

export default ({
  plugin,  
  template: Deno.readTextFileSync('src/template.html'),
  title: 'NosTracker',
  description: 'A website dedicated to collecting information from the nostr network.',
  url: '',
  dir: 'docs',
  rss: true,
  settings: {
    icons: [
      {
        title: 'Home Page',
        icon: 'fa-solid fa-house',
        url: ''
      },
      {
        title: 'GitHub',
        icon: 'fa-brands fa-github',
        url: 'https://github.com/marcodpt/nostracker'
      },
      {
        title: 'Rss Feed',
        icon: 'fa-solid fa-square-rss',
        url: 'rss.xml'
      }
    ]
  }
})
