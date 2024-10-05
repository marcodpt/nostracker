//deno -RWN src/api.js
import {github} from './lib.js'
import src from '../data.json' with {type: 'json'}

const token = Deno.args[0]
const dir = 'output'
const target = dir+'/api.json'

let output = []
try {
  output = JSON.parse(Deno.readTextFileSync(target))
} catch (err) {}

console.log('Total: '+src.length)
const data = src.filter(({gh}) =>
  !output.filter(({repo}) => repo == gh).length
)
console.log('New: '+data.length)

Promise.all(data.map(({gh}) => github(token, `repos/${gh}`))).then(Repos => {
  Repos.forEach((repo, i) => {
    repo.repo = data[i].gh
  })
  console.log(Repos.map(({repo}) => repo).join('\n'))
  Deno.mkdirSync(dir, {
    recursive: true
  })
  output.concat(Repos)
  Deno.writeTextFileSync(target, JSON.stringify(output, undefined, 2))
})
