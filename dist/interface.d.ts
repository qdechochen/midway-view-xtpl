export interface IXtplConfig {
    root: string;
    cache: boolean;
    catchError: boolean;
    encoding: string;
    strict: boolean;
}
export type RenderOptions = Partial<IXtplConfig> & {
    commands?: Record<string, (scope: Record<string, any>, option: {
        params: any[];
    }) => string>;
};
//# sourceMappingURL=interface.d.ts.map