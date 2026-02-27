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
exports.CollectionController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const article_service_1 = require("../article/article.service");
const collection_service_1 = require("./collection.service");
const create_collection_dto_1 = require("./dto/create-collection.dto");
const update_collection_dto_1 = require("./dto/update-collection.dto");
let CollectionController = class CollectionController {
    constructor(collectionService, articleService) {
        this.collectionService = collectionService;
        this.articleService = articleService;
    }
    create(dto) {
        return this.collectionService.create(dto);
    }
    findAll() {
        return this.collectionService.findAll(false);
    }
    findAllAdmin() {
        return this.collectionService.findAll(false);
    }
    findBySlug(slug) {
        return this.collectionService.findBySlug(slug, false);
    }
    findBySlugAdmin(slug) {
        return this.collectionService.findBySlug(slug, false);
    }
    findById(id) {
        return this.collectionService.findById(id);
    }
    update(id, dto) {
        return this.collectionService.update(id, dto);
    }
    remove(id) {
        return this.collectionService.remove(id);
    }
    async getStats() {
        const [collectionsCount, articlesCount] = await Promise.all([
            this.collectionService.count(false),
            this.articleService.count(false),
        ]);
        return { collectionsCount, articlesCount };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_collection_dto_1.CreateCollectionDto]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin/all'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)('admin/slug/:slug'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "findBySlugAdmin", null);
__decorate([
    (0, common_1.Get)('admin/:id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_collection_dto_1.UpdateCollectionDto]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(200),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('stats/counts'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "getStats", null);
CollectionController = __decorate([
    (0, common_1.Controller)('collections'),
    __metadata("design:paramtypes", [collection_service_1.CollectionService,
        article_service_1.ArticleService])
], CollectionController);
exports.CollectionController = CollectionController;
//# sourceMappingURL=collection.controller.js.map