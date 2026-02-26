"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const article_service_1 = require("./article.service");
const create_article_dto_1 = require("./dto/create-article.dto");
const update_article_dto_1 = require("./dto/update-article.dto");
let ArticleController = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    create(dto) {
        return this.articleService.create(dto);
    }
    findAll(collectionId) {
        return this.articleService.findAll(true, collectionId);
    }
    search(query, year, collectionId) {
        return this.articleService.search({
            query,
            year: year ? parseInt(year, 10) : undefined,
            collectionId,
            publicOnly: true,
        });
    }
    async findBySlug(slug) {
        const article = await this.articleService.findBySlug(slug, true);
        await this.articleService.incrementView(slug);
        return article;
    }
    async recordDownload(slug) {
        await this.articleService.incrementDownload(slug);
        return { success: true };
    }
    findAllAdmin(collectionId) {
        return this.articleService.findAll(false, collectionId);
    }
    findById(id) {
        return this.articleService.findById(id);
    }
    update(id, dto) {
        return this.articleService.update(id, dto);
    }
    remove(id) {
        return this.articleService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('collectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('collectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)('slug/:slug/download'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "recordDownload", null);
__decorate([
    (0, common_1.Get)('admin/all'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __param(0, (0, common_1.Query)('collectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)('admin/:id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_article_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "remove", null);
ArticleController = __decorate([
    (0, common_1.Controller)('articles'),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=article.controller.js.map