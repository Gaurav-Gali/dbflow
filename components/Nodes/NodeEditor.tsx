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
import {NodeType} from "@/types/NodeType";
import {EdgeType} from "@/types/EdgeType";

const Page = () => {
    const [nodes, setNodes] = useAtom<NodeType>(NodesAtom);
    const [edges, setEdges] = useAtom<EdgeType>(EdgesAtom);

    // Node Event Handlers
    const onNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );

    const onConnect = useCallback((params) => {
        setEdges((prevEdges) => {
            // Check if the target handle is already connected
            const existingEdgeIndex = prevEdges.findIndex(
                (e) =>
                    e.target === params.target &&
                    e.targetHandle === params.targetHandle
            );

            const newEdges:EdgeType[] = [...prevEdges];

            if (existingEdgeIndex !== -1) {
                // Remove the old edge
                newEdges.splice(existingEdgeIndex, 1);
            }

            // Add the new edge
            newEdges.push({
                id: `${params.source}-${params.target}`,
                sourceHandle: params.sourceHandle,
                targetHandle: params.targetHandle,
                source: params.source,
                target: params.target,
                animated: true,
            });

            return newEdges;
        });
    }, []);




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