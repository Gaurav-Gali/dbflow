import {nodeTypes} from "@/types/nodeTypes.";
import {CsvDataType} from "@/store/TableDataStore";

export type dataType = Record<string, CsvDataType|string>;

export type NodeType = {
    id: string;
    position: {x: number, y: number};
    data: dataType;
    type: keyof typeof nodeTypes;
};
