const get = url => fetch(url).
  then(res => res.text()).
  then(data => {
    try {
      data = JSON.parse(data)
    } catch (err) {}
    return data
  })

export {get}
