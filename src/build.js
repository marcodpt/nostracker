async function get (gh, path) {
  const url = `https://api.github.com/repos/${gh}${path}`
  const res = await fetch(url)
  if (res.status != 200) {
    throw url
  }
  const data = await res.json()
  return data
}

const data = JSON.parse(Deno.readTextFileSync('data.json'))
Promise.all(data.map(({gh}) => get(gh, ''))).then(GH => {
  data.forEach((repo, i) => {
    delete repo.gh
    repo.nips = repo.nips.map(nip => 'NIP'+String(nip).padStart(2, '0'))
    repo.title = GH[i].name
    repo.description = GH[i].description
    repo.repository = GH[i].html_url
    repo.website = GH[i].homepage
    repo.stars = GH[i].stargazers_count
    repo.language = GH[i].language
    repo.forks = GH[i].forks_count
    repo.issues = GH[i].open_issues
    repo.license = GH[i].license.spdx_id
    repo.tags = GH[i].topics.join(', ')
    repo.since = GH[i].created_at.substr(0, 10)
    repo.last = GH[i].pushed_at.substr(0, 10)
  })
  data.sort((a, b) =>
    a.stars > b.stars ? -1 :
    a.stars < b.stars ? 1 : 0
  )
  console.log(data)

  const genFile = ({title, description, category}) => {
    Deno.mkdirSync('docs/'+category, {recursive: true})
    Deno.writeTextFileSync(`docs/${category}/index.html`, `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title}</title>
      </head>
      <body>
        <p>${description}</p>
      </body>
    </html>`)
  }

  genFile({
    category: '',
    title: 'NosTracker',
    description: 'A website dedicated to collecting information from the nostr network.'
  })

  data.forEach(({title, category, ...M}, i) => {
    genFile({
      category,
      title: category,
      description: ''
    })

    Deno.writeTextFileSync(`docs/${category}/${title}.html`, `<!DOCTYPE html>
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
