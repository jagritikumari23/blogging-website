export const validatePost = (req, res, next) => {
  const { title, content, category_id } = req.body

  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required' })
  }

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: 'Content is required' })
  }

  if (!category_id) {
    return res.status(400).json({ error: 'Category is required' })
  }

  next()
}

export const validateComment = (req, res, next) => {
  const { content } = req.body

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: 'Comment content is required' })
  }

  next()
}
