"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backupDatabase = void 0;
const path = require("path");
const fs = require("fs-extra");
const child_process_1 = require("child_process");
const util_1 = require("util");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const execAsync = (0, util_1.promisify)(child_process_1.exec);
const appRoot = require('app-root-path').path;
async function backupDatabase(options = {}) {
    const { outputDir = path.join(appRoot, 'backups'), compress = true, keepDays = 7, } = options;
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI environment variable topilmadi!');
        }
        const dbName = extractDatabaseName(mongoUri);
        if (!dbName) {
            throw new Error('Database nomi topilmadi!');
        }
        await fs.ensureDir(outputDir);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const backupName = `${dbName}_${timestamp}`;
        const backupPath = path.join(outputDir, backupName);
        console.log('📦 MongoDB Backup boshlandi...');
        console.log(`Database: ${dbName}`);
        console.log(`Output: ${backupPath}`);
        let command = `mongodump --uri="${mongoUri}" --out="${backupPath}"`;
        let finalBackupPath = backupPath;
        if (compress) {
            command += ' --gzip';
            finalBackupPath = `${backupPath}.gz`;
        }
        console.log('\n⏳ Backup jarayoni...');
        const { stdout, stderr } = await execAsync(command);
        if (stderr && !stderr.includes('writing')) {
            console.error('⚠️  Xatolik:', stderr);
        }
        console.log('✅ Backup muvaffaqiyatli yakunlandi!');
        console.log(`📁 Backup joylashuvi: ${finalBackupPath}`);
        await cleanupOldBackups(outputDir, keepDays, dbName);
        const stats = await fs.stat(finalBackupPath);
        const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`💾 Backup hajmi: ${sizeInMB} MB`);
        return {
            success: true,
            backupPath: finalBackupPath,
            size: stats.size,
            timestamp: new Date().toISOString(),
        };
    }
    catch (error) {
        console.error('❌ Backup xatosi:', error.message);
        if (error.message.includes('mongodump')) {
            console.error('\n💡 Mongodump topilmadi! MongoDB Tools o\'rnatilganligini tekshiring:');
            console.error('   https://www.mongodb.com/try/download/database-tools');
        }
        throw error;
    }
}
exports.backupDatabase = backupDatabase;
function extractDatabaseName(uri) {
    try {
        const match = uri.match(/\/([^\/\?]+)(\?|$)/);
        return match ? match[1] : null;
    }
    catch (_a) {
        return null;
    }
}
async function cleanupOldBackups(backupDir, keepDays, dbName) {
    try {
        const files = await fs.readdir(backupDir);
        const now = Date.now();
        const maxAge = keepDays * 24 * 60 * 60 * 1000;
        let deletedCount = 0;
        for (const file of files) {
            if (!file.startsWith(dbName))
                continue;
            const filePath = path.join(backupDir, file);
            const stats = await fs.stat(filePath);
            const fileAge = now - stats.mtimeMs;
            if (fileAge > maxAge) {
                await fs.remove(filePath);
                deletedCount++;
                console.log(`🗑️  Eski backup o'chirildi: ${file}`);
            }
        }
        if (deletedCount > 0) {
            console.log(`\n🧹 ${deletedCount} ta eski backup o'chirildi`);
        }
    }
    catch (error) {
        console.warn('⚠️  Eski backuplarini o\'chirishda xatolik:', error.message);
    }
}
function parseArguments() {
    const args = process.argv.slice(2);
    const options = {};
    args.forEach(arg => {
        if (arg === '--compress') {
            options.compress = true;
        }
        else if (arg.startsWith('--keepDays=')) {
            options.keepDays = parseInt(arg.split('=')[1], 10);
        }
        else if (arg.startsWith('--outputDir=')) {
            options.outputDir = arg.split('=')[1];
        }
        else if (arg === '--no-compress') {
            options.compress = false;
        }
    });
    return options;
}
if (require.main === module) {
    const options = parseArguments();
    backupDatabase(options)
        .then(result => {
        console.log('\n✨ Backup muvaffaqiyatli yakunlandi!');
        process.exit(0);
    })
        .catch(error => {
        console.error('\n💥 Backup xatosi:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=backup-database.js.map