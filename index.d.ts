declare module 'orcwasmjs' {
    export function loadOrcFromBuffer(url: string, columns: string[]): Promise<any[][]>;
}
