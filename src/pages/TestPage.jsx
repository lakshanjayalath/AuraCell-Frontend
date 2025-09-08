
import { useState } from "react";
import MediaUpload from "../utils/MediaUpload";


export default function TestPage() {
    const [file, setFile] = useState(null)

    async function uploadImage() {

        const link = await MediaUpload(file)
        console.log(link);


    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <input type="file" onChange={
                (e) => {
                    setFile(e.target.files[0])
                }
            } />
            <button className="bg-blue-500 text-white p-2 rounded" onClick={uploadImage}>
                Upload
            </button>
        </div>
    );
}