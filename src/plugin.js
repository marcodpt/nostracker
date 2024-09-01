
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
    if (Post.since) {
      Post.since = Post.since.substr(0, 10)
    }
    if (Post.last) {
      Post.last = Post.last.substr(0, 10)
    }
    Post.count = Post.posts.length
    Post.hasDate = !!(Post.since || Post.last)
  }
})
