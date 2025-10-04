import React from 'react';
import NodeEditor from "@/components/Nodes/NodeEditor";
import TableViewer from "@/components/Table/TableViewer";

const Page = () => {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1">
                <NodeEditor />
            </div>

            <div className="flex-1 border-t border-t-zinc-100">
                <TableViewer />
            </div>
        </div>
    );
};

export default Page;