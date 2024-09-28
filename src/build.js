import {existsSync} from "https://deno.land/std@0.224.0/fs/exists.ts";
import {github} from './lib.js'

const token = Deno.args[0]

var data = JSON.parse(Deno.readTextFileSync('data.json'))
console.log('Total: '+data.length)
data = data.filter(repo => {
  repo.path = repo.gh.split('/')[1]
  return !existsSync(`docs/${repo.category}/${repo.path}.html`)
})
console.log('New: '+data.length)

Promise.all(data.map(({gh}) => github(token, `repos/${gh}`))).then(GH => {
  data.forEach((repo, i) => {
    console.log(repo.gh)
    delete repo.gh
    const nips = []
    repo.nips.forEach(nip => {
      if (nips.indexOf(nip) < 0) {
        nips.push(nip)
      }
    })
    repo.nips = nips.map(nip => 'NIP'+String(nip).padStart(2, '0'))
    repo.title = GH[i].name
    repo.description = GH[i].description
    repo.repository = GH[i].html_url
    repo.website = GH[i].homepage
    repo.stars = GH[i].stargazers_count || 0
    repo.language = GH[i].language
    repo.forks = GH[i].forks_count || 0
    repo.issues = GH[i].open_issues || 0
    repo.license = GH[i].license?.spdx_id
    repo.tags = GH[i].topics.join(', ')
    repo.since = GH[i].created_at
    repo.last = GH[i].pushed_at
  })

  const genFile = ({title, category, ...M}) => {
    Deno.mkdirSync('docs/'+category, {recursive: true})
    Deno.writeTextFileSync(`docs/${category}/index.html`, `<!DOCTYPE html>
    <html lang="en">
      <head>
        ${Object.keys(M).filter(k => M[k]).
          map(k => `<meta name="${k}" content="${M[k]}">`
        ).join('\n    ')}
        <title>${title}</title>
      </head>
      <body></body>
    </html>`)
  }

  genFile({
    category: '',
    title: 'NosTracker',
    icon: 'circle-nodes',
    description: 'A website dedicated to collecting information from the nostr network.'
  })

  data.forEach(({path, title, category, ...M}, i) => {
    genFile({
      category,
      title: category,
      description: ''
    })

    Deno.writeTextFileSync(`docs/${category}/${path}.html`, `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="index" content="${String(i).padStart(4, '0')}">
    ${Object.keys(M).filter(k => M[k]).
      map(k => `<meta name="${k}" content="${M[k]}">`
    ).join('\n    ')}
    <title>${title}</title>
  </head>
  <body></body>
</html>`)
  })
})
