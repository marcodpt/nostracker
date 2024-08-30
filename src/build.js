const data = JSON.parse(Deno.readTextFileSync('data.json'))

Deno.mkdirSync('docs', {recursive: true})


Deno.writeTextFileSync(`docs/index.html`, `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>NosTracker</title>
  </head>
  <body>
    <p>A website dedicated to collecting information from the nostr network.</p>
  </body>
</html>`)

data.forEach(({title, description, ...M}, i) => {
  M.nips = M.nips.map(nip => 'NIP'+String(nip).padStart(2, '0'))

  Deno.writeTextFileSync(`docs/${title}.html`, `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="index" content="${String(i).padStart(4, '0')}">
    ${['repository', 'website', 'nips', 'tags'].
      filter(k => M[k]).
      map(k => `<meta name="${k}" content="${M[k]}">`
    ).join('\n    ')}
    <title>${title}</title>
  </head>
  <body>
    <p>${description}</p>
  </body>
</html>`)
})

