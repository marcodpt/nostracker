//deno run -RWN src/crawler.js
fetch(`https://raw.githubusercontent.com/aljazceru/awesome-nostr/refs/heads/main/README.md`).
  then(res => res.text()).
  then(md => {
    var data = JSON.parse(Deno.readTextFileSync('data.json'))
    const GH = data.map(({gh}) => gh)
    const Missing = []
    const isMissing = repo => Missing.indexOf(repo) < 0 && GH.indexOf(repo) < 0
    const test = re => {
      var m
      do {
        m = re.exec(md)
        if (m) {
          const repo = m[1]+'/'+m[2]
          if (isMissing(repo)) {
            Missing.push(repo)
          }
        }
      } while (m)
    }
    test(/\(https:\/\/img.shields.io\/github\/stars\/([^\/]+)\/([^\/\.\?\)]+)/g)
    test(/\(https:\/\/github.com\/([^\/]+)\/([^\/\.\?\)]+)/g)

    Deno.writeTextFileSync(
      'output/gh.json', 
      JSON.stringify(Missing.map(gh => ({
        gh,
        'nips': [],
        'category': ''
      })), undefined, 2)
    )

    const Links = []
    const re = /https?:\/\/[^\?\)\]\s\#]+/g

    var m
    do {
      m = re.exec(md)
      if (m && Links.indexOf(m[0]) < 0 && m[0].indexOf('github') < 0) {
        Links.push(m[0])
      }
    } while (m)
    Links.sort()

    Deno.writeTextFileSync(
      'output/links.json', 
      JSON.stringify(Links, undefined, 2)
    )
  })

