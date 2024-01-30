import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const MainDrawArea = () => {
    const onDrop = useCallback(acceptedFiles => {
        console.log("dropしたよね");
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log("file reading was aborted!");
            reader.onerror = () => console.log("file reading has failed!");
            reader.onload = () => {
                const text = reader.result;
                console.log(text);
            };
            reader.readAsText(file);
        })
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>うぇーいここです！</p>:
                        <p>ドロップするならここですよ！</p>
                }
            </div>
            メインドローエリアです
        </>
    );
};

export default MainDrawArea;
