import {nodeTypes} from "@/types/nodeTypes.";

export type dataType = Record<string, boolean|string|number|string[]|number[]|unknown>;

export type NodeType = {
    id: string;
    position: {x: number, y: number};
    data?: dataType;
    type: keyof typeof nodeTypes;
};
