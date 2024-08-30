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
    Post.description = Post.main.querySelector('p')?.textContent
  }
})
