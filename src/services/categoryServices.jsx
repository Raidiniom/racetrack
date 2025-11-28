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