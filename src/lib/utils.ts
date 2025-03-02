import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatRelative } from "date-fns";
import {zhCN} from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(date: Date) {
  if (!date) {
    return ''
  }
  return formatRelative(date, new Date(), {locale: zhCN})
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
