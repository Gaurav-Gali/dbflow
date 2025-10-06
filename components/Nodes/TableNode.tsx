"use client";

import React, { useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { useAtom } from "jotai";
import { EdgesAtom, NodesAtom } from "@/store/NodesState";
import { EdgeType } from "@/types/EdgeType";
import { NodeType } from "@/types/NodeType";
import { CsvDataType, TableDataAtom } from "@/store/TableDataStore";
import PlayTrigger from "@/components/PlayTrigger";

const TableNode = ({ id }: { id: string }) => {
    const [edges] = useAtom<EdgeType[]>(EdgesAtom);
    const [nodes] = useAtom<NodeType[]>(NodesAtom);
    const [tableData, setTableData] = useAtom<CsvDataType>(TableDataAtom);
    const [inActive, setInActive] = useState<boolean>(true);

    useEffect(() => {
        const incomingEdge = edges.find((edge) => edge.target === id);
        if (!incomingEdge) {
            setInActive(true);
            return;
        }

        const sourceNode = nodes.find((node) => node.id === incomingEdge.source);
        if (!sourceNode || !sourceNode.data?.data || sourceNode.data.data.length === 0) {
            setInActive(true);
            return;
        }

        setInActive(false);
    }, [edges, nodes, id]);

    const handleRun = () => {
        if (inActive) return; // safety check

        const incomingEdge = edges.find((edge) => edge.target === id);
        const sourceNode = nodes.find((node) => node.id === incomingEdge?.source);

        const csvData = sourceNode?.data?.data as CsvDataType | undefined;
        if (!csvData) return;

        setTableData(csvData);
    };

    return (
        <div className="bg-white active:border-zinc-200 border-[0.5px] border-zinc-100 rounded-full pl-2 pr-1 py-1">
            <Handle
                type="target"
                position={Position.Left}
                id="table_input"
                style={{
                    background: "oklch(87.1% 0.006 286.286)",
                    width: 8,
                    height: 8,
                }}
            />

            <div className="flex items-center justify-center gap-2">
                <p className="text-[8px] text-zinc-600">Table</p>
                <PlayTrigger inActive={inActive} handleRun={handleRun} />
            </div>
        </div>
    );
};

export default TableNode;
