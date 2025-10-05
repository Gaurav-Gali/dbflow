"use client";

import React from "react";
import { Handle, Position } from "@xyflow/react";
import {Play} from "lucide-react";
import {useAtom} from "jotai";
import {EdgesAtom, NodesAtom} from "@/store/NodesState";
import {EdgeType} from "@/types/EdgeType";
import {NodeType} from "@/types/NodeType";
import {TableDataAtom} from "@/store/TableDataStore";

const TableNode = ({id}:{id:string}) => {
    const [edges, setEdges] = useAtom<EdgeType[]>(EdgesAtom);
    const [nodes, setNodes] = useAtom<NodeType[]>(NodesAtom);

    const [tableData, setTableData] = useAtom(TableDataAtom);

    const handleRunClicked = () => {
        // 1. Find the incoming edge(s) to this node
        const incomingEdge = edges.find(edge => edge.target === id);
        if (!incomingEdge) {
            console.warn("No incoming edge found for node:", id);
            return;
        }

        // 2. Find the source node using the edge
        const sourceNode = nodes.find(node => node.id === incomingEdge.source);
        if (!sourceNode || !sourceNode.data) {
            console.warn("Source node has no data to copy:", incomingEdge.source);
            return;
        }

        // 3. Copy source node data to this node
        setNodes(prevNodes =>
            prevNodes.map(node =>
                node.id === id
                    ? { ...node, data: { ...sourceNode.data } } // overwrite data
                    : node
            )
        );

        // 4. Set The table data in global store
        setTableData(sourceNode.data);
    };


    return (
        <div className={"bg-zinc-50 border border-zinc-100 rounded-r-full pl-2 pr-0.5 py-0.5"}>
            <Handle
                type="target"
                position={Position.Left}
                id="table_input"
                style={{ background: "oklch(87.1% 0.006 286.286)", width: 8, height: 8 }}
            />

            <div className={"flex items-center justify-center gap-2"}>
                <p className={"text-[8px] text-zinc-600 "}>
                    Table
                </p>
                <div onClick={() => handleRunClicked()} className={"bg-green-200 cursor-pointer hover:bg-green-200/50 active:bg-green-200 rounded-full p-1"}>
                    <Play className={"text-green-500"} size={8}/>
                </div>
            </div>
        </div>
    );
};

export default TableNode;
