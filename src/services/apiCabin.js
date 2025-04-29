import supabase, { supabaseUrl } from './supabase';

// API function to get cabins
export async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .order('created_at', {
      ascending: true,
    });

  if (error) {
    console.log(error);
    throw new Error('cabins could not be loaded!');
  }
  return data;
}

// API function for Creating and Editing cabin
export async function createEditCabin(newCabin, id) {
  // Validation of image Path.
  // const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // const isEditSession = Boolean(id);
  const hasImagePath = Boolean(typeof newCabin.image === 'string');

  // Image Name === new cabin image and generate new one!
  const imageName = hasImagePath
    ? newCabin.image
    : `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');

  // THe image pathway.
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create and Edit cabin
  let query = supabase.from('cabins');
  const newImage = hasImagePath ? newCabin.image : imagePath;

  // A. CREATE CABIN
  if (!id)
    query = query.insert(
      !newCabin.image[0] ? { ...newCabin, image: imagePath } : { ...newCabin }
      // [{ ...newCabin, image: newImage }]
    );

  // B. EDIT CABIN
  if (id)
    query = query
      .update({ ...newCabin, image: newImage })
      .eq('id', id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('cabins could not be deleted!');
  }

  // 2. Uploading the image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there is an error in uploading the image file
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    throw Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }

  return data;
}

// API function for Deleting cabin
export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    throw new Error('cabins could not be deleted!');
  }

  return data;
}
