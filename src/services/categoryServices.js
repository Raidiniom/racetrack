import supabase from '../config/supabaseclient'

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('race_categories')
    .select('*')
    .order('min_distance', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    throw new Error(`Failed to fetch categories: ${error.message}`)
  }
  
  return data || []  
}

export const addCategory = async (category) => {
  const { data, error } = await supabase
    .from('race_categories')
    .insert([category])
    .select() 

  if (error) {
    console.error('Error adding category:', error)
    throw new Error(`Failed to add category: ${error.message}`)
  }
  
  return data?.[0]  // Return the first inserted category
}

export const findCategoryByDistance = (categories, distance) => {
  if (!categories?.length || distance == null) return null
  
  return categories.find(
    cat =>
      distance >= cat.min_distance &&
      (cat.max_distance == null || distance <= cat.max_distance)
  )
}