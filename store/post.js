const post1 = require('./post1.json')
const post2 = require('./post2.json')
const post3 = require('./post3.json')
const post4 = require('./post4.json')
const post5 = require('./post5.json')

const postStore = {
  posts: [post1, post2, post3, post4, post5],
  get max() {
    return this.posts.length
  }
}

module.exports = postStore