import React from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'


function DropzoneSingleUpload({ file, setFile, src = null }) {

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const updatedFile = {
            file,
            preview: URL.createObjectURL(file),
            progress: 0,
        };

        setFile((prev) => {
            return updatedFile;
        });

        setTimeout(() => {
            setFile((currentFile) => ({
                ...currentFile,
                progress: 100,
            }));
        }, 100);
    };

    const handleRemove = () => {
        setFile(null);
    };


    return (
        <Dropzone onDrop={handleDrop} multiple={false} accept={{ 'image/*': [] }}>
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
                        <p>Drag 'n' drop some file here, or click to select file</p>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            marginTop: "20px"
                        }}
                    >
                        {file ? (
                            <div
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
                                <img
                                    src={file.preview}
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
                                    onClick={() => handleRemove()} // Remove the file on button click
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
                        ) : src && (
                            <div
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
                                }}>

                                <img
                                    src={src}
                                    alt="category-image"
                                    style={{ width: "78px", height: "42px", objectFit: "cover" }}
                                    width={78}
                                    height={42}
                                />
                                <p>{src.split('/')[src.split('/').length - 1]}</p>
                            </div>)}
                    </div>
                </section>
            )}
        </Dropzone>
    )
}

export default DropzoneSingleUpload