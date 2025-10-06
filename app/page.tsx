import React from 'react';
import NodeEditor from "@/components/Nodes/NodeEditor";
import TableViewer from "@/components/Table/TableViewer";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

import Navbar from "@/components/Navbar";

const Page = () => {
    return (
        <ResizablePanelGroup className="h-screen" direction="horizontal">
            <ResizablePanel className="relative">
                <Navbar/>
                <NodeEditor />
            </ResizablePanel>

            <ResizableHandle className="bg-zinc-100" />

            <ResizablePanel defaultSize={30} minSize={20} maxSize={80}>
                <TableViewer />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default Page;
