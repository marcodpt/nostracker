
export default ({
  sort: ['index'],
  taxonomies: ['nips', 'tags'],
  default: {
    tags: '',
    nips: '',
    repository: '',
    website: ''
  },
  render: Post => {
    Object.keys(Post.meta).forEach(k => {
      Post[k] = Post.meta[k]
    })
  }
})
