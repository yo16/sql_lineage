/* DfInsert */
import DfBase from "./dfBase";

export default class DfInsert extends DfBase {
    constructor(ast){
        super(ast);

        // insertのnameは、insert先のtableName
        // たぶん、１件だけ存在する
        console.assert(ast.table && ast.table.length===1);
        this.name = ast.table[0].table;
    }
};
