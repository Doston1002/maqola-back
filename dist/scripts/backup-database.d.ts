interface BackupOptions {
    outputDir?: string;
    compress?: boolean;
    keepDays?: number;
}
declare function backupDatabase(options?: BackupOptions): Promise<{
    success: boolean;
    backupPath: string;
    size: number;
    timestamp: string;
}>;
export { backupDatabase, BackupOptions };
