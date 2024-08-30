import plugin from './plugin.js'

export default ({
  plugin,  
  template: Deno.readTextFileSync('src/template.html'),
  title: 'NosTracker',
  description: 'A website dedicated to collecting information from the nostr network.',
  url: 'http://localhost:3000/',
  dir: 'docs',
  rss: false,
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
      }
    ]
  }
})
