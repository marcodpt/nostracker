import plugin from './plugin.js'

export default ({
  plugin,  
  template: Deno.readTextFileSync('src/template.html'),
  title: 'NosTracker',
  description: 'A website dedicated to collecting information from the nostr network.',
  //url: 'http://localhost:3000',
  url: 'https://marcodpt.github.io/nostracker/',
  dir: 'docs',
  rss: false
})
