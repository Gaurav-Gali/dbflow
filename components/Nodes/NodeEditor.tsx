// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import React,{useCallback} from 'react';

import {
    ReactFlow, ReactFlowProvider, applyNodeChanges, applyEdgeChanges, addEdge, Background,Controls
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {useAtom} from "jotai";
import {EdgesAtom, NodesAtom} from "@/store/NodesState";

import {nodeTypes} from "@/types/nodeTypes.";

const Page = () => {
    const [nodes, setNodes] = useAtom(NodesAtom);
    const [edges, setEdges] = useAtom(EdgesAtom);

    // Node Event Handlers
    const onNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );

    const onConnect = useCallback(
        (params) =>
            setEdges((edgesSnapshot) => {
                const newEdges = addEdge(params, edgesSnapshot);
                console.log("Edges after connect:", newEdges);
                return newEdges;
            }),
        []
    );


    return (
        <div style={{ width: '100vw', height:'100vh', position: 'relative' }}>
            <ReactFlowProvider>
                <Background  color="#ccc"/>
                <ReactFlow
                    nodeTypes={nodeTypes}
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