"use client";

import React from "react";
import { Handle, Position } from "@xyflow/react";
import {ChevronRight, Database, Play, Settings, Table2} from "lucide-react";

const DbNode = () => {
    return (
        <div>
            <div className="bg-zinc-50 relative border border-zinc-100 rounded-sm px-2 py-1 w-36 flex flex-col gap-2 text-sm">
                <Handle
                    type="source"
                    position={Position.Right}
                    id="db_output"
                    style={{ background: "oklch(87.1% 0.006 286.286)", width: 8, height: 8 }}
                />

                <div className="flex justify-between items-center">
                    <span className="text-[8px] text-zinc-600">Database</span>

                    <div className={"flex items-center justify-center gap-1"}>
                        <div className={"bg-orange-100 cursor-pointer hover:bg-orange-200/50 active:bg-orange-100 rounded-full p-1"}>
                            <Settings className={"text-orange-400"} size={8}/>
                        </div>

                        <div className={"bg-green-200 cursor-pointer hover:bg-green-200/50 active:bg-green-200 rounded-full p-1"}>
                            <Play className={"text-green-500"} size={8}/>
                        </div>
                    </div>
                </div>

            </div>

            <div className={"flex items-center justify-start gap-1 px-1.5 py-0.5"}>
                <p className={"text-[8px] flex items-center justify-center gap-0.5 text-zinc-500"}>
                    <Database className={"text-yellow-400"} size={8}/>
                    Firebase
                </p>

                <ChevronRight size={8}/>

                <p className={"text-[8px] flex items-center justify-center gap-0.5 text-zinc-500"}>
                    <Table2 className={"text-sky-400"} size={8}/>
                    users
                </p>
            </div>
        </div>
    );
};

export default DbNode;
