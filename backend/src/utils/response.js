export const successResponse = (res, data, message = 'Success') => {
  return res.status(200).json({ success: true, message, data })
}

export const errorResponse = (res, error, statusCode = 400) => {
  return res.status(statusCode).json({ success: false, error })
}

export const createdResponse = (res, data, message = 'Created successfully') => {
  return res.status(201).json({ success: true, message, data })
}
