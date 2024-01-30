/* DfBase */

import DfColBase from "./dfColBase";

export default class DfBase {
    constructor(ast){
        this.ast = ast;
        this.name = null;
        this.type = ast.type;
        
        // from
        this.from = ast.from ? 
            ast.from.map((f) => {
                // 結合条件は無視し、テーブル名のみ
                return {table:f.table, as:f.as, table_as:f.as?f.as:f.table};
            })
            :[]
        ;

        // columns
        this.columns = ast.columns ?
            ast.columns.map((col) => new DfColBase(col))
            :[]
        ;

        // with
        // ここでは、テーブル名として持つ
        // astの解析はしない
        this.with = ast.with ?
            ast.with.map((w) => {
                return {table:w.name.value, as:null, table_as:w.name.value};
            })
            :null
        ;

        // has_values
        this.has_values = ast.values ? true: false;
    }
};

