export type EdgeType = {
    id: string;
    source: string;
    sourceHandle?:string;
    targetHandle?:string;
    target: string;
    label?: string;
    animated: boolean;
};
