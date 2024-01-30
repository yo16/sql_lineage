import TableBox from "./tableBox";
import ast2df from "../utils/ast2df";

const DrawArea = ({ ast }) => {
    // astからdisplay-formatへ変換
    const dfs = ast2df(ast);

    return (
        <>
            <div className="bg-blue-100 h-screen mx-5 rounded-lg">
                {
                    dfs.map((df, i) => <TableBox key={`table_box_${i}`} df={df} />)
                }
            </div>
        </>
    );
};

export default DrawArea;




