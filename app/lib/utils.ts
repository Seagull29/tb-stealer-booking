import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import isLeapYear from "dayjs/plugin/isLeapYear";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import "dayjs/locale/es"

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(isLeapYear);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.locale("es");

export const customDayjs = dayjs;

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getNestedError = (errors: any, path: string) => {
    const parts = path.split('.');
    let current = errors;
    for (const part of parts) {
        if (!current || typeof current !== 'object') {
            return undefined;
        }
        current = current[part];
    }
    return current;
};