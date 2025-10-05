import {atom} from "jotai";

import {NodeType} from "@/types/NodeType";
import {EdgeType} from "@/types/EdgeType";

const data = [
    { id: "u001", name: "Aarav Sharma", email: "aarav@example.com", age: 23, role: "admin" },
    { id: "u002", name: "Diya Patel", email: "diya@example.com", age: 20, role: "editor" },
    { id: "u003", name: "Rohan Kumar", email: "rohan@example.com", age: 22, role: "viewer" }
]

export const NodesAtom = atom<NodeType[]>([
    {id: 'n1', position: {x: 0, y: 0}, type:"tableNode"},
    {id: 'n2', position: {x: 0, y: 100}, type: "dbNode", data:{"data":data}},
]);

export const EdgesAtom = atom<EdgeType[]>([]);
