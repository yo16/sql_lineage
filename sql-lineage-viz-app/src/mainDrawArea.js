import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Parser } from "node-sql-parser";

import DrawArea from "./components/drawArea";

const PARSE_DATABASES = [
    "BigQuery",
    "DB2",
    "Hive",
    "MariaDB",
    "MySQL",
    "PostgresQL",
    "Sqlite",
    "TransactSQL",
    "FlinkSQL",
    "Noql",
];
const parser = new Parser();

const MainDrawArea = () => {
    const [ database, setDatabase ] = useState(PARSE_DATABASES[0]);
    const [ ast, setAst ] = useState([]);
    const onChangeDb = (e) => {
        setDatabase(e.target.value);
        console.debug(`changed database:${database}`);
    };

    // accept SQL file
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach((file) => {
            //console.log(file.name);
            const reader = new FileReader();
            reader.onabort = () => console.log("file reading was aborted!");
            reader.onerror = () => console.log("file reading has failed!");
            reader.onload = () => {
                const query = reader.result;
                
                // astify
                const opt = {
                    database: database,
                };
                try {
                    setAst(parser.astify(query, opt));
                } catch(e) {
                    console.error("Parse ERROR");
                    console.log(e.message);
                    console.log(e.location.start);
                    console.log({e});
                }
            };
            reader.readAsText(file);
        })
    }, [database]);
    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        accept: {
            "text/sql": [".sql"],
        },
        onDrop
    });

    return (
        <>
            <div>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>うぇーいここです！</p>:
                            <p>ドロップするならここですよ！</p>
                    }
                </div>
                <div>
                    <select defaultValue={database} onChange={onChangeDb}>
                        {PARSE_DATABASES.map((opt_db_name, i)=>{
                            return (
                                <option value={opt_db_name} key={`db_name_${i}`}>
                                    {opt_db_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <DrawArea ast={ast} />
        </>
    );
};

export default MainDrawArea;
