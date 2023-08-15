import { ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function firstLetterCap(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
