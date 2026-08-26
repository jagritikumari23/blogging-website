export const validateComment = (req, res, next) => {
  const { content } = req.body

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: 'Comment content is required' })
  }

  if (content.trim().length < 3) {
    return res.status(400).json({ error: 'Comment must be at least 3 characters' })
  }

  if (content.trim().length > 1000) {
    return res.status(400).json({ error: 'Comment must be less than 1000 characters' })
  }

  next()
}
