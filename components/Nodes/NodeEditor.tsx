"use client";

import React,{useCallback} from 'react';

import {
    ReactFlow, ReactFlowProvider, applyNodeChanges, applyEdgeChanges, addEdge, NodeChange, EdgeChange, Background,Controls,MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {useAtom} from "jotai";
import {EdgesAtom, NodesAtom} from "@/store/NodesState";

const Page = () => {
    const [nodes, setNodes] = useAtom(NodesAtom);
    const [edges, setEdges] = useAtom(EdgesAtom);

    const onNodesChange = useCallback(
        (changes: NodeChange<{
            id: string;
            position: { x: number; y: number; };
            data: { label: string; };
        }>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange<{ id: string; source: string; target: string; }>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <div style={{ width: '100vw', height:'50vh', position: 'relative' }}>
            <ReactFlowProvider>
                <Background  color="#ccc"/>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                />
                <Controls/>
            </ReactFlowProvider>
        </div>
    );
};

export default Page;