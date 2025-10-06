import React, { useState, useEffect, useCallback } from "react";
import PlayTrigger from "@/components/PlayTrigger";
import { Handle, Position } from "@xyflow/react";
import { useAtom } from "jotai";
import { EdgesAtom, NodesAtom } from "@/store/NodesState";
import { NodeType } from "@/types/NodeType";
import { EdgeType } from "@/types/EdgeType";

interface MergeNodeProps {
    id: string;
}

const MergeNode: React.FC<MergeNodeProps> = ({ id }) => {
    const [nodes, setNodes] = useAtom<NodeType[]>(NodesAtom);
    const [edges] = useAtom<EdgeType[]>(EdgesAtom);
    const [isActive, setIsActive] = useState(false);
    const [isMerging, setIsMerging] = useState(false);

    useEffect(() => {
        const incomingEdges = getIncomingEdges(edges, id);
        const sourceNodes = getSourceNodes(nodes, incomingEdges);

        const active =
            incomingEdges.length >= 2 &&
            sourceNodes.length >= 2 &&
            validateMergeInputs(sourceNodes);

        setIsActive(active);
    }, [edges, nodes, id]);

    const handleMerge = useCallback(() => {
        setIsMerging(true);
        console.log("🧩 Merge triggered for node:", id);

        const incomingEdges = getIncomingEdges(edges, id);
        if (incomingEdges.length < 2) {
            console.warn("⚠️ Not enough inputs to merge (need 2).");
            setIsMerging(false);
            return;
        }

        const sourceNodes = getSourceNodes(nodes, incomingEdges);
        if (sourceNodes.length < 2) {
            console.warn("⚠️ Could not find both input nodes.");
            setIsMerging(false);
            return;
        }

        if (!validateMergeInputs(sourceNodes)) {
            console.warn("❌ Validation failed — merge aborted.");
            setIsMerging(false);
            return;
        }

        const mergedData = mergeNodeData(sourceNodes);
        if (!mergedData) {
            console.warn("⚠️ Merge failed due to missing or invalid data.");
            setIsMerging(false);
            return;
        }

        setNodes((prev) =>
            prev.map((n) =>
                n.id === id
                    ? {
                        ...n,
                        data: {
                            ...n.data,
                            type: sourceNodes[0].data?.type,
                            data: mergedData,
                        },
                    }
                    : n
            )
        );

        console.log("✅ Merge successful:", mergedData);
        setIsMerging(false);
    }, [id, nodes, edges, setNodes]);

    return (
        <div
            className={`bg-white border-[0.5px] ${
                "border-zinc-100 active:border-zinc-200"
            } w-18 rounded-lg`}
        >
            {/* Input Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id="merge_input_1"
                style={{
                    background: "oklch(87.1% 0.006 286.286)",
                    width: 8,
                    height: 8,
                    top: "35%",
                }}
            />
            <Handle
                type="target"
                position={Position.Left}
                id="merge_input_2"
                style={{
                    background: "oklch(87.1% 0.006 286.286)",
                    width: 8,
                    height: 8,
                    top: "65%",
                }}
            />

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Right}
                id="merge_output"
                style={{
                    background: "oklch(87.1% 0.006 286.286)",
                    width: 8,
                    height: 8,
                    top: "50%",
                }}
            />

            {/* Node UI */}
            <div className="flex items-center justify-between px-2 py-2.5">
                <span className="text-[8px] text-zinc-600">
                    {isMerging ? "Merging..." : "Merge"}
                </span>
                <PlayTrigger inActive={!isActive || isMerging} handleRun={handleMerge} />
            </div>
        </div>
    );
};

export default MergeNode;

//
// --- Helper functions ---
//

function getIncomingEdges(edges: EdgeType[], nodeId: string): EdgeType[] {
    return edges.filter((e) => e.target === nodeId);
}

function getSourceNodes(nodes: NodeType[], incomingEdges: EdgeType[]): NodeType[] {
    return incomingEdges
        .map((edge) => nodes.find((n) => n.id === edge.source))
        .filter((n): n is NodeType => Boolean(n));
}

function validateMergeInputs(sourceNodes: NodeType[]): boolean {
    const types = sourceNodes.map((n) => n.data?.type);
    const allSameType = types.every((t) => t === types[0]);

    if (!allSameType) return false;

    for (const node of sourceNodes) {
        if (!node.data || !Array.isArray(node.data.data)) return false;
    }

    return true;
}

function mergeNodeData(sourceNodes: NodeType[]): any[] | null {
    try {
        const merged = sourceNodes.reduce<any[]>((acc, node) => {
            const nodeData = node.data?.data;
            if (Array.isArray(nodeData)) return acc.concat(nodeData);
            return acc;
        }, []);

        return merged.length > 0 ? merged : null;
    } catch {
        return null;
    }
}
