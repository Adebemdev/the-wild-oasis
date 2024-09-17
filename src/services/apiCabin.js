import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .order('created_at', {
      ascending: true,
    });

  if (error) {
    console.log(error);
    throw new Error('cabins could not loaded!');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = hasImagePath
    ? newCabin.image.at[0]
    : `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create and Edit cabin
  let query = await supabase.from('cabins');

  // A. CREATE CABIN
  if (!id)
    query = query.insert(
      !newCabin.image[0] ? { ...newCabin, image: imagePath } : newCabin
    );

  // B. EDIT CABIN
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
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
    console.log(storageError);
    throw Error(
      'Cabin image can not be uploaded and the cabin was not created'
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('cabins could not be deleted!');
  }

  return data;
}
