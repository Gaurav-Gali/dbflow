import React, { useState } from "react";
import { Play } from "lucide-react";

const PlayTrigger = ({
                         inActive,
                         handleRun,
                     }: {
    inActive: boolean;
    handleRun: () => Promise<void> | void;
}) => {
    const [status, setStatus] = useState<"loaded" | "progress">("loaded");

    const onRun = async () => {
        if (status === "progress" || inActive) return;

        try {
            setStatus("progress");
            await handleRun();
        } finally {
            setTimeout(() => {
                setStatus("loaded");
            }, 250);
        }
    };

    const isClickable = status === "loaded" && !inActive;

    return (
        <div
            onClick={isClickable ? onRun : undefined}
            className={`relative rounded-full p-1 flex items-center justify-center transition-all
                ${
                inActive
                    ? "bg-gray-200 cursor-not-allowed"
                    : status === "loaded"
                        ? "bg-green-200 cursor-pointer hover:bg-green-200/50 active:bg-green-200"
                        : "bg-green-100 cursor-not-allowed"
            }`}
        >
            {status === "progress" && (
                <div
                    className="absolute inset-0 rounded-full border-[1.5px] border-dotted border-green-300 animate-spin"
                    style={{ animationDuration: "1.5s" }}
                />
            )}

            <Play
                className={`${
                    inActive
                        ? "text-gray-400"
                        : status === "progress"
                            ? "text-green-400 opacity-60"
                            : "text-green-500"
                }`}
                size={8}
            />
        </div>
    );
};

export default PlayTrigger;
