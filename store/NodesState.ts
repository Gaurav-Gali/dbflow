import {atom} from "jotai";

import {NodeType} from "@/types/NodeType";
import {EdgeType} from "@/types/EdgeType";

export const NodesAtom = atom<NodeType[]>([]);

export const EdgesAtom = atom<EdgeType[]>([]);
