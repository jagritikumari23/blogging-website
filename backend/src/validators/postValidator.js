export const validatePost = (req, res, next) => {
  const { title, content, category_id } = req.body

  if (!title || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required' })
  }

  if (title.trim().length < 5) {
    return res.status(400).json({ error: 'Title must be at least 5 characters' })
  }

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: 'Content is required' })
  }

  if (content.trim().length < 10) {
    return res.status(400).json({ error: 'Content must be at least 10 characters' })
  }

  if (!category_id) {
    return res.status(400).json({ error: 'Category is required' })
  }

  next()
}
