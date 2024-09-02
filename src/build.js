import {existsSync} from "https://deno.land/std@0.224.0/fs/exists.ts";
import {parse} from '../../hippo/js/lib.js'

const nips = {
  'nip01': 'Basic protocol flow description',
  'nip02': 'Follow List',
  'nip03': 'OpenTimestamps Attestations for Events',
  'nip04': 'Encrypted Direct Message --- unrecommended: deprecated in favor of NIP-17',
  'nip05': 'Mapping Nostr keys to DNS-based internet identifiers',
  'nip06': 'Basic key derivation from mnemonic seed phrase',
  'nip07': 'window.nostr capability for web browsers',
  'nip08': 'Handling Mentions --- unrecommended: deprecated in favor of NIP-27',
  'nip09': 'Event Deletion Request',
  'nip10': 'Conventions for clients\' use of e and p tags in text events',
  'nip11': 'Relay Information Document',
  'nip13': 'Proof of Work',
  'nip14': 'Subject tag in text events',
  'nip15': 'Nostr Marketplace (for resilient marketplaces)',
  'nip17': 'Private Direct Messages',
  'nip18': 'Reposts',
  'nip19': 'bech32-encoded entities',
  'nip21': 'nostr: URI scheme',
  'nip23': 'Long-form Content',
  'nip24': 'Extra metadata fields and tags',
  'nip25': 'Reactions',
  'nip26': 'Delegated Event Signing',
  'nip27': 'Text Note References',
  'nip28': 'Public Chat',
  'nip29': 'Relay-based Groups',
  'nip30': 'Custom Emoji',
  'nip31': 'Dealing with Unknown Events',
  'nip32': 'Labeling',
  'nip34': 'git stuff',
  'nip35': 'Torrents',
  'nip36': 'Sensitive Content',
  'nip38': 'User Statuses',
  'nip39': 'External Identities in Profiles',
  'nip40': 'Expiration Timestamp',
  'nip42': 'Authentication of clients to relays',
  'nip44': 'Versioned Encryption',
  'nip45': 'Counting results',
  'nip46': 'Nostr Connect',
  'nip47': 'Wallet Connect',
  'nip48': 'Proxy Tags',
  'nip49': 'Private Key Encryption',
  'nip50': 'Search Capability',
  'nip51': 'Lists',
  'nip52': 'Calendar Events',
  'nip53': 'Live Activities',
  'nip54': 'Wiki',
  'nip55': 'Android Signer Application',
  'nip56': 'Reporting',
  'nip57': 'Lightning Zaps',
  'nip58': 'Badges',
  'nip59': 'Gift Wrap',
  'nip64': 'Chess (PGN)',
  'nip65': 'Relay List Metadata',
  'nip70': 'Protected Events',
  'nip71': 'Video Events',
  'nip72': 'Moderated Communities',
  'nip73': 'External Content IDs',
  'nip75': 'Zap Goals',
  'nip78': 'Application-specific data',
  'nip84': 'Highlights',
  'nip89': 'Recommended Application Handlers',
  'nip90': 'Data Vending Machines',
  'nip92': 'Media Attachments',
  'nip94': 'File Metadata',
  'nip96': 'HTTP File Storage Integration',
  'nip98': 'HTTP Auth',
  'nip99': 'Classified Listings'
}

Object.keys(nips).forEach(nip => {
  const p = `docs/nips/${nip}/index.html`
  if (existsSync(p)) {
    const doc = parse(p)
    console.log(doc.head.querySelector('title').outerHTML)
  }
})

async function get (gh, path) {
  const url = `https://api.github.com/repos/${gh}${path}`
  const res = await fetch(url)
  if (res.status != 200) {
    throw url
  }
  const data = await res.json()
  return data
}

var data = JSON.parse(Deno.readTextFileSync('data.json'))
console.log('Total: '+data.length)
data = data.filter(repo => {
  repo.path = repo.gh.split('/')[1]
  return !existsSync(`docs/${repo.category}/${repo.path}.html`)
})
console.log('New: '+data.length)

Promise.all(data.map(({gh}) => get(gh, ''))).then(GH => {
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
    repo.stars = GH[i].stargazers_count
    repo.language = GH[i].language
    repo.forks = GH[i].forks_count
    repo.issues = GH[i].open_issues
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
