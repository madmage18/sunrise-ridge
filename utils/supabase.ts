import { createClient } from '@supabase/supabase-js';
// storage bucket creaed specifically in the supabase project being used
const bucket = 'main-bucket';

// Create a single supabase client for interacting with database
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export const uploadImage = async (image: File) => {
  //console.log('image', image);
  //console.log('bucket', bucket);

  const timestamp = Date.now();
  //console.log('timestamp', timestamp);
  // const newName = `/users/${timestamp}-${image.name}`;
  const newName = `${timestamp}-${image.name}`;
  //console.log('newName', newName);
  //console.log('supabase', supabase);

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl: '3600',
    });
  if (!data) throw new Error('Image upload failed');
  //const finalValue = supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
  //console.log('finalValue', finalValue);
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};

export const deleteImage = (url:string) => {
  const imageName =url.split('/').pop(); // file name only
  if (!imageName) throw new Error('Invalid URL');
  return supabase.storage.from(bucket).remove([imageName]);
}