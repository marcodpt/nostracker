import plugin from './plugin.js'

export default ({
  plugin,  
  template: Deno.readTextFileSync('src/template.html'),
  title: 'NosTracker',
  description: 'A website dedicated to collecting information from the nostr network.',
  //url: 'http://localhost:3000',
  url: 'https://marcodpt.github.io/nostracker/',
  dir: 'docs',
  rss: false,
  settings: {
    external: 'small fa-solid fa-arrow-up-right-from-square',
    footer: {
      build: {
        icon: 'fa-solid fa-clock',
        title: 'Last built: '+new Date().toISOString().substr(0, 10),
        description: 'Date and time when the site was last generated.'
      },
      repo: {
        icon: 'fa-solid fa-code-branch',
        title: 'Repository',
        description: 'The repository where this project\'s code is hosted.',
        href: 'https://github.com/marcodpt/nostracker',
        target: '_blank'
      }
    }
  }
})
