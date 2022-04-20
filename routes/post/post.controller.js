const postStore = require('../../store/post')

function getPost(req, res) {
  const { id } = req.params
  if (id && id > 0) {
    const nid = Number(id)
    if (!isNaN(nid) && nid - 1 < postStore.max) {
      res.json(postStore.posts[nid - 1])
      return
    }
  }
  res.status(404).end()
}

function getPostList(req, res) {
  const list = postStore.posts.map(({ title, date, author, content }, index) => ({
    title,
    date,
    author,
    id: index + 1,
    image: (content.find(({ src }) => src) || {}).src,
    image: content.find(({ src }) => src)?.src
  }))
  res.json(list)
}

module.exports = {
  getPost,
  getPostList,
}