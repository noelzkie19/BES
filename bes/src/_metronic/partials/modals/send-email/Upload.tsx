import { useRef, useState } from 'react';

function ImageUpload(props: any) {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef<any>(null);

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (props.addFiles)
            props.addFiles({
                title: file.name,
                file: file
            })
        setSelectedImage(file);
        console.log('Image selected:', file);
    };

    const handleButtonClick = () => {
    if (fileInputRef && fileInputRef.current && fileInputRef.current)
        fileInputRef.current?.click();
    };
  
  return (
    <div style={{padding: "10px 0 0 0"}}>
      <input
            type="file"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        <button type="button" onClick={handleButtonClick}>
           upload
        </button>
    </div>
  );
}

export default ImageUpload;