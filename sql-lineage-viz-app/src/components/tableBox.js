
const TableBox = ({ df }) => {
    return (
        <>
            <div className="relative left-10 top-10 w-20 h-20 bg-red-500 rounded-md">
                {df.table_name}
            </div>
        </>
    );
};

export default TableBox;
