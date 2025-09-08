import { createClient } from '@supabase/supabase-js';


const anonkey = import.meta.env.VITE_ANON_KEY
const supabaseURL = import.meta.env.VITE_SUPABASE_URL
const supabase = createClient(supabaseURL, anonkey);

/*

supabase.storage.from("images").upload(file.name, file, {
            upsert: false,
            cacheControl: '3600',
        }).then(
            () => {
                const publicURL = supabase.storage.from("images").getPublicUrl(file.name);
                console.log(publicURL);
            }
        )

*/

export default function MediaUpload(file) {
    return new Promise((resolve, reject) => {
        if (file == null) {
            reject("No file selected");
        } else {
            const timestamp = new Date().getTime();
            const fileName = timestamp + file.name

            supabase.storage
                .from("images")
                .upload(fileName, file, {
                    upsert: false,
                    cacheControl: "3600",
                })
                .then(() => {
                    const publicUrl = supabase.storage
                        .from("images")
                        .getPublicUrl(fileName).data.publicUrl;

                    resolve(publicUrl);
                }).catch(
                    () => {
                        reject("An error occured")
                    }
                )
        }
    });
}
