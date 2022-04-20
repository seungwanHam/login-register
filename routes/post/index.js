const router = require('express').Router()

const postController = require('./post.controller')

router.get('/:id', postController.getPost)
router.get('/', postController.getPostList)

module.exports = router