import moment from "moment";

export function snakeToCamel<T>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map(item => snakeToCamel(item)) as unknown as T;
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()) as keyof T;
            (acc as Record<typeof camelKey, unknown>)[camelKey] = snakeToCamel((obj as Record<string, unknown>)[key]);
            return acc;
        }, {} as T);
    }
    return obj;
}

export function camelToSnake<T>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map(item => camelToSnake(item)) as unknown as T;
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase() as keyof T;
            (acc as Record<typeof snakeKey, unknown>)[snakeKey] = camelToSnake((obj as Record<string, unknown>)[key]);
            return acc;
        }, {} as T);
    }
    return obj;
}

export function getInitials (name: string) {
    const words = name.split(' ');
    return words.map((word) => word[0]).join('').toUpperCase();
}


export function getRelativeDate(date: Date | string) {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return moment(dateObj).fromNow();
}


export function calculateAge (birthday: string): string {
    const birthDate = new Date(birthday);
    const today = new Date();
    return (today.getFullYear() - birthDate.getFullYear()).toString();
};


export function getFileIcon (fileName: string) {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png'].includes(extension || '')) {
        return "/images/file-types/image.svg";
    }
    return extension ? `/images/file-types/${extension}.svg` : "/images/file-types/file.svg";
};
  