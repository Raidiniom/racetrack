import supabase from '../config/supabaseclient.jsx'

export const getCategoryNumberByDistance = async (distance) => {
  if (distance == null) return null
  
  const { data, error } = await supabase
    .from('race_categories')
    .select('category_id, min_distance, max_distance')
    .order('min_distance', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return null
  }

  if (!data?.length) return null

  const category = data.find(
    cat =>
      distance >= cat.min_distance &&
      (cat.max_distance == null || distance <= cat.max_distance)
  )

  return category ? category.category_id : null
}

// export const getCategories = async () => {
//   const { data, error } = await supabase
//     .from('race_categories')
//     .select('*')
//     .order('min_distance', { ascending: true })

//   if (error) {
//     console.error('Error fetching categories:', error)
//     throw new Error(`Failed to fetch categories: ${error.message}`)
//   }

//   return data || []
// }

// export const addCategory = async (category) => {
// const { data, error } = await supabase
//     .from('race_categories')
//     .insert([category])
//     .select()

//   if (error) {
//     console.error('Error adding category:', error)
//     throw new Error(`Failed to add category: ${error.message}`)
//   }

//   return data?.[0]
// }

// export const findCategoryByDistance = (categories, distance) => {
//   if (!categories?.length || distance == null) return null

//   return categories.find(
//     cat =>
//       distance >= cat.min_distance &&
//       (cat.max_distance == null || distance <= cat.max_distance)
//   )
// }

