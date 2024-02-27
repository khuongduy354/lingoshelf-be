import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);
export const getBucketUrl = (filename: string) => {
  const base =
    "https://plmbvfliubcdtxkoubom.supabase.co/storage/v1/object/public/LingoShelf/";
  return base + filename;
};
