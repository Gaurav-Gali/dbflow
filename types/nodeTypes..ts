import TableNode from "@/components/Nodes/Viewer/TableNode";
import DBNode from "@/components/Nodes/Data/DBNode";
import CSVNode from "@/components/Nodes/Data/CSVNode";
import MergeNode from "@/components/Nodes/Functions/MergeNode";

export const nodeTypes = {
    'tableNode': TableNode,
    'dbNode': DBNode,
    'csvNode': CSVNode,
    'mergeNode':MergeNode
}