import React from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
import Image from "next/image";


function DropzoneUpload({files, setFiles}) {

    const handleDrop = (acceptedFiles) => {
        const updatedFiles = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            progress: 0,
        }));

        setFiles((prev) => {
            const combinedFiles = [...prev, ...updatedFiles];

            updatedFiles.forEach((_, index) => {
                setTimeout(() => {
                    setFiles((currentFiles) =>
                        currentFiles.map((f, i) =>
                            i === prev.length + index ? { ...f, progress: 100 } : f
                        )
                    );
                }, 100);
            });

            return combinedFiles;
        });
    };

    const handleRemove = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <Dropzone onDrop={handleDrop} accept={{ 'image/*': [] }}>
            {({ getRootProps, getInputProps }) => (
                <section
                    style={{
                        border: "dashed",
                        borderColor: "#ccc",
                        borderRadius: "10px",
                        padding: "30px"
                    }}
                >
                    <div {...getRootProps()}>
                        <input {...getInputProps()} accept="image/*" />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            marginTop: "20px"
                        }}
                    >
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="card"
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    position: "relative"
                                }}
                            >
                                <Image
                                    src={file.preview} // Use the preview URL for the image source
                                    alt={file.file.name}
                                    style={{ width: "78px", height: "42px", objectFit: "cover" }}
                                    width={78}
                                    height={42}
                                />
                                <p>{file.file.name}</p>
                                <button
                                    className="tf-btn btn-fill btn-color-3 animate-hover-btn rounded-0 justify-content-center"
                                    style={{ marginLeft: "5px" }}
                                    type="button"
                                    onClick={() => handleRemove(index)} // Remove the file on button click
                                >
                                    <span>X</span>
                                </button>

                                <div
                                    style={{
                                        height: "2px",
                                        width: `${file.progress}%`,
                                        backgroundColor: "#000",
                                        borderRadius: "5px",
                                        transition: "width 1.2s ease-in-out",
                                        position: "absolute",
                                        left: 0,
                                        bottom: 0
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </Dropzone>
    )
}

export default DropzoneUpload