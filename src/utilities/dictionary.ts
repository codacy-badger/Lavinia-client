﻿export interface Dictionary<T> {
    [key: string]: T;
}

export interface RawDictionaryEntry {
    id: number;
    key: string;
    value: number;
}

export function copyDictionary<T>(dictionary: Dictionary<T>): Dictionary<T> {
    const copy: Dictionary<T> = {};

    for (const entry in dictionary) {
        if (dictionary.hasOwnProperty(entry)) {
            copy[entry] = dictionary[entry];
        }
    }

    return copy;
}

export function dictionaryToArray<T>(dictionary: Dictionary<T>): T[] {
    const array: T[] = [];

    for (const key in dictionary) {
        if (dictionary.hasOwnProperty(key)) {
            array.push(dictionary[key]);
        }
    }

    return array;
}

export function rawDictionaryToDictionary(rawDictionary: Array<RawDictionaryEntry>): Dictionary<number> {
    const dict: Dictionary<number> = {};

    rawDictionary.forEach((entry) => (dict[entry.key] = entry.value));

    return dict;
}
