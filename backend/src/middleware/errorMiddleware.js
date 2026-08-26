export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err)

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  if (err.code === '23505') {
    return res.status(409).json({ error: 'Resource already exists' })
  }

  if (err.code === '23503') {
    return res.status(400).json({ error: 'Related resource not found' })
  }

  res.status(500).json({ error: 'Internal server error' })
}

export const notFound = (req, res) => {
  res.status(404).json({ error: 'Route not found' })
}
