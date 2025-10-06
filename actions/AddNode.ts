"use client";

import {useAtom} from "jotai";
import {NodesAtom} from "@/store/NodesState";
import {NodeType} from "@/types/NodeType";

import {nodeTypes} from "@/types/nodeTypes.";
import { v4 as uuidv4 } from 'uuid';

export const useAddNode = () => {
    const [nodes,setNodes] = useAtom<NodeType[]>(NodesAtom);

    const addNode = (type:keyof typeof nodeTypes) => {
        setNodes((prevNodes) => [...prevNodes, {
            id: uuidv4().toString(),
            position:{x:0,y:0},
            data:{"data":[]},
            type:type
        }]);
    }

    return addNode;
}