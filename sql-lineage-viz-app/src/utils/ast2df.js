import DfInsert from "./df/dfInsert";
import DfSelect from "./df/dfSelect";

// astから、表示用の形式へ変換
export default function ast2df(ast){
    return ast.map((single_ast) => singleAst2df(single_ast)).flat();
};

// astの１要素を変換
function singleAst2df(single_ast, name=null){
    let retDfs = [];

    // ast.typeごとのインスタンスを生成
    let obj_df = null;
    switch (single_ast.type) {
        case "select":
            obj_df = new DfSelect(single_ast, name);
            break;
        case "insert":
            obj_df = new DfInsert(single_ast);
            break;
        default:
            console.log(`Unknown ast-type! ${single_ast.type}`);
            break;
    }
    retDfs.push(obj_df);

    // valueがあれば追加(insertにある)
    if (obj_df.has_values) {
        retDfs.push(...singleAst2df(single_ast.values));
    }

    // withがあれば追加
    if (obj_df.with) {
        const tmp_ary = obj_df.ast.with.map((w) => {
            // withの中に入っているastを解析
            return singleAst2df(w.stmt.ast, w.name.value);
        }).flat();
        retDfs.push(...tmp_ary);
    }

    return retDfs;
};