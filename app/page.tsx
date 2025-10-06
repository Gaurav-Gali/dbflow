import React from 'react';
import NodeEditor from "@/components/Nodes/NodeEditor";
import TableViewer from "@/components/Table/TableViewer";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

const Page = () => {
    return (
        <ResizablePanelGroup className="h-screen" direction="horizontal">
            <ResizablePanel className="relative">
                <div className="absolute top-4 left-4 z-50 w-[70vw] overflow-x-auto">
                    <p className={"text-zinc-600 w-fit bg-white px-4 py-2 rounded-full border border-zinc-200 flex text-lg font-bold"}>
                        DB
                        <p className={"font-light"}>Flow</p>
                    </p>
                </div>

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
