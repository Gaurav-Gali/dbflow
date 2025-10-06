"use client";

import React from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useAddNode} from "@/actions/AddNode";
import {cn} from "@/lib/utils";
import {ArrowRight} from "lucide-react";

const Navbar = () => {
    const addNode = useAddNode();

    const NodeGroups = [
        {
            "title" : "Data",
            "nodes" : [
                {
                    "title" : "CSV",
                    "onClick": () => addNode("csvNode"),
                },
                {
                    "title" : "Database",
                    "onClick": () => addNode("dbNode"),
                }
            ]
        },
        {
            "title" : "Viewer",
            "nodes" : [
                {
                    "title" : "Table",
                    "onClick": () => addNode("tableNode"),
                },
                {
                    "title" : "Analytics",
                    "onClick": () => addNode("tableNode"),
                }
            ]
        },
        {
            "title" : "Logic",
            "nodes" : [
                {
                    "title" : "Conditional",
                    "onClick": () => addNode("tableNode"),
                }
            ]
        },
        {
            "title" : "Functions",
            "nodes" : [
                {
                    "title" : "Merge",
                    "onClick": () => addNode("mergeNode"),
                },
                {
                    "title" : "Formatter",
                    "onClick": () => addNode("mergeNode"),
                }
            ]
        }
    ]

    return (
        <div className="absolute top-4 left-4 z-50 w-[70vw]">
            <div className={"flex items-center justify-start gap-5"}>
                <span className={"text-zinc-600 w-fit bg-white px-4 py-2 rounded-full border-none border-zinc-200 flex text-lg font-bold"}>
                    DB
                    <p className={"font-light"}>Flow</p>
                </span>

                {/* Nodes */}
                <div className={"w-full flex items-center justify-start gap-0 overflow-x-auto"}>

                    {NodeGroups.map((node,index) => (
                        <DropdownMenu key={index}>
                            <DropdownMenuTrigger className={cn("cursor-pointer bg-white text-zinc-600 text-[14px] font-light border-r border-r-zinc-100 border-y border-y-zinc-100 w-28 h-10 rounded-none outline-none", index === 0 ? "border-l border-l-zinc-100 rounded-l-full" : index === NodeGroups.length-1 && "rounded-r-full")}>{node.title}</DropdownMenuTrigger>
                            <DropdownMenuContent className={"outline-none p-0 w-38 shadow-none border-zinc-100 rounded-md"}>
                                {node.nodes.map((n, index) => (
                                    <DropdownMenuItem className={cn("hover:bg-zinc-50 flex items-center justify-between cursor-pointer rounded-none py-2",index===node.nodes.length-1 ? "border-none" : "border-b border-b-zinc-100")} onClick={() => n.onClick()} key={index}>
                                        <p className={"text-zinc-500 text-sm"}>
                                            {n.title}
                                        </p>
                                        <ArrowRight className={"text-zinc-300"} size={8}/>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;