"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const books_service_1 = require("../books/books.service");
async function fixBooksPdfUrls() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const booksService = app.get(books_service_1.BooksService);
    try {
        console.log('📚 Kitoblar PDF URL larini to\'g\'irlash boshlandi...\n');
        const books = await booksService.findAll();
        console.log(`Jami kitoblar: ${books.length}`);
        let fixedCount = 0;
        for (const book of books) {
            let needsUpdate = false;
            const updates = {};
            if (book.pdf) {
                const pdfUrl = book.pdf;
                if (!pdfUrl.startsWith('http://') &&
                    !pdfUrl.startsWith('https://') &&
                    !pdfUrl.startsWith('/')) {
                    updates.pdf = `/books/${pdfUrl}`;
                    needsUpdate = true;
                    console.log(`\n📄 To'g'irlanmoqda: ${book.title}`);
                    console.log(`   Eski PDF: ${pdfUrl}`);
                    console.log(`   Yangi PDF: ${updates.pdf}`);
                }
            }
            if (needsUpdate) {
                await booksService.update(book._id.toString(), updates);
                fixedCount++;
                console.log(`   ✅ To'g'irlandi`);
            }
        }
        console.log(`\n\n✅ Tugadi! Jami to'g'irlandi: ${fixedCount} ta kitob`);
    }
    catch (error) {
        console.error('❌ Xatolik:', error);
    }
    finally {
        await app.close();
    }
}
fixBooksPdfUrls();
//# sourceMappingURL=fix-books-pdf-urls.js.map