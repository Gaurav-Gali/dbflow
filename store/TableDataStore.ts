import {atom} from "jotai";

export type CsvDataType = string[][];

export const TableDataAtom = atom<CsvDataType>([]);