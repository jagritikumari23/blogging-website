import { supabase } from '../config/supabase.js'
import { successResponse, errorResponse } from '../utils/response.js'

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      // If profile doesn't exist, create it from auth user data
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: req.user.email,
          full_name: req.user.user_metadata?.full_name || ''
        })
        .select()
        .single()

      if (createError) throw createError
      return successResponse(res, newProfile)
    }

    successResponse(res, data)
  } catch (error) {
    console.error('Error fetching profile:', error)
    errorResponse(res, 'Failed to fetch profile', 500)
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id
    const { full_name } = req.body

    const { data, error } = await supabase
      .from('profiles')
      .update({ full_name })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error

    successResponse(res, data, 'Profile updated successfully')
  } catch (error) {
    console.error('Error updating profile:', error)
    errorResponse(res, 'Failed to update profile', 500)
  }
}
