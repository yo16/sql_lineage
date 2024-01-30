/* DfSelect */
import DfBase from "./dfBase";

export default class DfSelect extends DfBase {
    constructor(ast, table_name=null){
        super(ast);

        // selectのテーブル名は、withで使われているならコンストラクタで指定する
        this.name = table_name;
    }
};
