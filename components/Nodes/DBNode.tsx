"use client";

import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Play } from "lucide-react";

const DbNode = () => {
    return (
        <div className="bg-zinc-50 border border-zinc-100 rounded-sm px-2 py-1 w-36 flex flex-col gap-2 text-sm">
            <Handle
                type="source"
                position={Position.Right}
                id="db_output"
                style={{ background: "oklch(87.1% 0.006 286.286)", width: 8, height: 8 }}
            />

            <div className="flex justify-between items-center">
                <span className="text-[10px] text-zinc-600">Database</span>
                <div className={"bg-green-200 cursor-pointer hover:bg-green-200/50 active:bg-green-200 rounded-full p-1"}>
                    <Play className={"text-green-500"} size={8}/>
                </div>
            </div>
            
        </div>
    );
};

export default DbNode;
