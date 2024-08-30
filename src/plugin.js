
export default ({
  sort: ['-stars', '-since', 'title'],
  taxonomies: ['nips', 'tags', 'language'],
  default: {
    description: '',
    tags: '',
    nips: '',
    repository: '',
    website: '',
    language: '',
    license: '',
    since: '',
    last: '',
    stars: 0,
    forks: 0,
    issues: 0
  },
  render: Post => {
    Object.keys(Post.meta).forEach(k => {
      Post[k] = Post.meta[k]
    })
    Post.count = Post.posts.length
  }
})
