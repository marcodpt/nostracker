const get = (url, config) => fetch(url, config).then(res => {
  if (res.status != 200) {
    throw url
  }
  return res.text()
}).then(data => {
  try {
    data = JSON.parse(data)
  } catch (err) {}
  return data
})

const github = (token, endpoint) =>
  get(`https://api.github.com/${endpoint}`, {
    headers: !token ? {} : {
      'Authorization': 'Bearer '+token,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

export {get, github}
