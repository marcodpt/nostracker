//deno -RWN src/crawler.js
import http from 'https://cdn.jsdelivr.net/npm/redaxios@0.5.1/+esm'

const dir = 'output'
const repo = 'https://raw.githubusercontent.com/aljazceru/awesome-nostr'

http.get(`${repo}/refs/heads/main/README.md`).then(res => {
  Deno.mkdirSync(dir, {
    recursive: true
  })

  const md = res.data
  Deno.writeTextFileSync(`${dir}/README.md`, md)
  var data = JSON.parse(Deno.readTextFileSync('data.json'))
  const GH = []
  data.forEach(({gh}) => {
    const repo = gh.split('/').filter(x => x).join('/')
    if (GH.indexOf(repo) < 0) {
      GH.push(repo)
    } else {
      console.log('DUPLICATED: '+repo)
    }
  })
  const Missing = []
  const isMissing = repo => Missing.indexOf(repo) < 0 && GH.indexOf(repo) < 0
  const test = re => {
    var m
    do {
      m = re.exec(md)
      if (m) {
        [
          '.svg',
          '.git'
        ].forEach(ext => {
          if (m[2].endsWith(ext)) {
            m[2] = m[2].substr(0, m[2].length - ext.length)
          }
        })
        const repo = m[1]+'/'+m[2]
        if (isMissing(repo)) {
          Missing.push(repo)
        }
      }
    } while (m)
  }
  test(/\(https:\/\/img.shields.io\/github\/stars\/([^\/]+)\/([^\/\?\)]+)/g)
  test(/\(https:\/\/github.com\/([^\/]+)\/([^\/\?\)\#]+)/g)

  Deno.writeTextFileSync(
    `${dir}/gh.json`, 
    JSON.stringify(Missing.map(gh => ({
      link: `https://github.com/${gh}`,
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
    `${dir}/links.json`, 
    JSON.stringify(Links, undefined, 2)
  )
})

