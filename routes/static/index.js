const fs = require('fs')
const postStore = require('../../store/post')

const postHTML = fs.readFileSync('./public/post.html', 'utf-8')
const getPostPage = (req, res) => {
  const { id } = req.params
  if (id) {
    const nid = Number(id)
    if (!isNaN(nid) && nid - 1 < postStore.max) {
      const newHTML = postHTML
      const result = newHTML.replace('//#fetchData', `fetchData(${id}, false)`)
      res.send(result)
      return
    }
  }
  res.status(404).end()
}

module.exports = {
  getPostPage
}