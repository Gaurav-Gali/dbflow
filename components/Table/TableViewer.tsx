"use client";

import React from "react";
import { ChartNoAxesCombined, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { TabStore } from "@/store/TabStore";
import { TableDataAtom } from "@/store/TableDataStore";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const TableViewer = () => {
    const [tab, setTab] = useAtom(TabStore);
    const [tableData] = useAtom(TableDataAtom);

    const headers = tableData?.length > 0 ? tableData[0] : [];
    const rows = tableData?.length > 1 ? tableData.slice(1) : [];

    return (
        <div className="h-screen w-full flex flex-col">
            {/* Tabs */}
            <div className="flex items-center border-b border-b-zinc-100 justify-start overflow-x-auto">
                <span
                    onClick={() => setTab("table")}
                    className={cn(
                        "flex items-center justify-center gap-1 hover:bg-zinc-50 active:bg-transparent border-r border-r-zinc-100 text-md font-normal text-zinc-500 cursor-pointer w-32 py-3 border-b border-b-transparent",
                        tab === "table" && "border-b border-b-yellow-400"
                    )}
                >
                    <Database className="text-yellow-400" size={16} />
                    Table
                </span>
                <span
                    onClick={() => setTab("analytics")}
                    className={cn(
                        "flex items-center justify-center gap-1 hover:bg-zinc-50 active:bg-transparent border-r border-r-zinc-100 text-md font-normal text-zinc-500 cursor-pointer w-32 py-3 border-b border-b-transparent",
                        tab === "analytics" && "border-b border-b-sky-400"
                    )}
                >
                    <ChartNoAxesCombined className="text-sky-400" size={16} />
                    Analytics
                </span>
            </div>

            {/* Table View */}
            {tab === "table" && (
                <div className="py-0 px-0 overflow-auto max-h-[calc(100vh-60px)]">
                    {tableData?.length === 0 || !tableData ? (
                        <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
                            <p className="text-sm text-zinc-400">No data loaded yet</p>
                        </div>
                    ) : (
                        <div className="rounded-none bg-white">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {headers.map((header, i) => (
                                            <TableHead
                                                key={i}
                                                className="font-medium text-zinc-700 text-sm"
                                            >
                                                {header}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {rows.map((row, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {row.map((cell, colIndex) => (
                                                <TableCell
                                                    key={colIndex}
                                                    className="text-xs text-zinc-600"
                                                >
                                                    {cell}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TableViewer;
