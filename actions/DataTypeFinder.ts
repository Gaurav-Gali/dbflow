import {nodeTypes} from "@/types/nodeTypes.";

export const DataTypeFinder = (nodeType:keyof typeof nodeTypes) => {
    let dataType:string = "";

    if (nodeType === "csvNode") {
        dataType = "csv";
    } else if (nodeType === "dbNode") {
        dataType = "sql";
    } else {
        dataType = "";
    }

    return dataType;
}