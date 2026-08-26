import { supabase } from '../config/supabase.js'
import { successResponse, errorResponse, createdResponse } from '../utils/response.js'

export const getAllCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')

    if (error) throw error

    successResponse(res, data)
  } catch (error) {
    console.error('Error fetching categories:', error)
    errorResponse(res, 'Failed to fetch categories', 500)
  }
}

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body

    if (!name || name.trim().length === 0) {
      return errorResponse(res, 'Category name is required', 400)
    }

    const { data, error } = await supabase
      .from('categories')
      .insert({ name: name.trim() })
      .select()
      .single()

    if (error) throw error

    createdResponse(res, data, 'Category created successfully')
  } catch (error) {
    console.error('Error creating category:', error)
    if (error.code === '23505') {
      return errorResponse(res, 'Category already exists', 409)
    }
    errorResponse(res, 'Failed to create category', 500)
  }
}
