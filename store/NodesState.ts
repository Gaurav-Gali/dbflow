import {atom} from "jotai";

import {NodeType} from "@/types/NodeType";
import {EdgeType} from "@/types/EdgeType";

export const NodesAtom = atom<NodeType[]>([
    {id: 'n1', position: {x: 0, y: 0}, type:"tableNode"},
    {id: 'n2', position: {x: 0, y: 100}, type: "dbNode"},
]);

export const EdgesAtom = atom<EdgeType[]>([
    {id: 'n1-n2', source: 'n1', target: 'n2', animated:true}
]);
