"use client";

import React, { useRef, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { FileSpreadsheet, Play } from "lucide-react";
import { useAtom } from "jotai";
import { NodesAtom } from "@/store/NodesState";
import { NodeType } from "@/types/NodeType";
import { CsvDataType, TableDataAtom } from "@/store/TableDataStore";
import * as XLSX from "xlsx";
import PlayTrigger from "@/components/PlayTrigger";

const CSVNode = ({ id }: { id: string }) => {
    const [nodes, setNodes] = useAtom<NodeType[]>(NodesAtom);
    const [tableData, setTableData] = useAtom<CsvDataType>(TableDataAtom);
    const [fileName, setFileName] = useState<string>("No file selected");
    const [localData, setLocalData] = useState<CsvDataType>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- open file picker ---
    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    // --- handle file selection ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();

        if (file.name.endsWith(".csv")) {
            reader.onload = (event) => {
                const text = event.target?.result as string;
                const rows = text
                    .split("\n")
                    .map((row) =>
                        row
                            .split(",")
                            .map((cell) => cell.trim().replace(/\r/g, ""))
                    );
                setLocalData(rows);
            };
            reader.readAsText(file);
        } else if (file.name.endsWith(".xlsx")) {
            reader.onload = (event) => {
                const data = new Uint8Array(event.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                setLocalData(json as string[][]);
            };
            reader.readAsArrayBuffer(file);
        } else {
            alert("Please select a CSV or XLSX file only!");
        }

        e.target.value = "";
    };

    const handleRun = () => {
        if (localData.length === 0) return;

        setNodes((prev) =>
            prev.map((node) =>
                node.id === id
                    ? {
                        ...node,
                        data: {
                            ...node.data,
                            data: localData,
                        },
                    }
                    : node
            )
        );
    };

    return (
        <div>
            <div className="bg-white active:border-zinc-200 relative border-[0.5px] border-zinc-100 rounded-full px-2 py-1 w-36 flex flex-col gap-2 text-sm">
                <Handle
                    type="source"
                    position={Position.Right}
                    id="db_output"
                    style={{
                        background: "oklch(87.1% 0.006 286.286)",
                        width: 8,
                        height: 8,
                    }}
                />

                <div className="flex justify-between items-center">
                    <span className="text-[8px] text-zinc-600">CSV</span>

                    <div className="flex items-center justify-center gap-1">
                        {/* --- File Upload --- */}
                        <div
                            className="bg-orange-100 cursor-pointer hover:bg-orange-200/50 active:bg-orange-100 rounded-full p-1"
                            onClick={handleFileClick}
                        >
                            <FileSpreadsheet className="text-orange-400" size={8} />
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv, .xlsx"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />

                        {/* --- Run Button with PlayTrigger --- */}
                        <PlayTrigger
                            inActive={localData.length === 0}
                            handleRun={handleRun}
                        />
                    </div>
                </div>
            </div>

            {/* --- File name display --- */}
            <div className="flex items-center justify-start gap-1 px-1.5 py-0.5">
                <p className="text-[8px] flex items-center justify-center gap-0.5 text-zinc-500">
                    <FileSpreadsheet className="text-sky-400" size={8} />
                    {fileName}
                </p>
            </div>
        </div>
    );
};

export default CSVNode;
