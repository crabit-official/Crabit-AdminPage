export const sanitizeFileName = (fileName: string): string =>
  fileName.replace(/[&$+\s;/:,?%#|`^{}[\]<>\\\r\n"`~|]/g, '_');
