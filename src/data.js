//deno -RWN src/data.js
import data from '../data.json' with {type: 'json'}
import api from '../output/api.json' with {type: 'json'}

Deno.writeTextFileSync('output/data.json', JSON.stringify(data.map(({
  gh, nips, category
}) => {
  const NIPS = []
  nips.forEach(nip => {
    if (NIPS.indexOf(nip) < 0) {
      NIPS.push(nip)
    }
  })

  const github = api.filter(({repo}) => repo == gh)[0]
  if (github) {
    return {
      category,
      nips: NIPS.map(nip => 'NIP'+String(nip).padStart(2, '0')),
      title: github.name,
      description: github.description,
      repository: github.html_url,
      website: github.homepage,
      stars: github.stargazers_count || 0,
      language: github.language,
      forks: github.forks_count || 0,
      issues: github.open_issues || 0,
      license: github.license?.spdx_id,
      tags: github.topics.join(', '),
      since: github.created_at,
      last: github.pushed_at,
      archived: github.archived,
    }
  }
}).filter(x => x), undefined, 2))
