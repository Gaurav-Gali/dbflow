import {atom} from "jotai";

const initialNodes = [
    {id: 'n1', position: {x: 0, y: 0}, data: {label: 'Node 1'}},
    {id: 'n2', position: {x: 0, y: 100}, data: {label: 'Node 2'}}
];

const initialEdges = [{id: 'n1-n2', source: 'n1', target: 'n2', label:"connected", animated:true}];

export const NodesAtom = atom(initialNodes);
export const EdgesAtom = atom(initialEdges);
