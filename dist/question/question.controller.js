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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const create_question_dto_1 = require("./dto/create-question.dto");
const answer_question_dto_1 = require("./dto/answer-question.dto");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    async createQuestion(req, createQuestionDto) {
        const userId = req.user._id;
        const question = await this.questionService.createQuestion(userId, createQuestionDto);
        return { message: 'Savol muvaffaqiyatli yuborildi', data: question };
    }
    async getAllQuestions(limit = '10', page = '1', status) {
        return this.questionService.getAllQuestions(Number(limit), Number(page), status);
    }
    async getUserQuestions(req, limit = '10', page = '1') {
        const userId = req.user._id;
        return this.questionService.getUserQuestions(userId, Number(limit), Number(page));
    }
    async getUnreadCount() {
        const count = await this.questionService.getUnreadCount();
        return { unreadCount: count };
    }
    async getQuestion(id, req) {
        const userId = req.user._id;
        const question = await this.questionService.getQuestionById(id, userId);
        return { data: question };
    }
    async answerQuestion(req, answerQuestionDto) {
        const adminId = req.user._id;
        const question = await this.questionService.answerQuestion(adminId, answerQuestionDto);
        return { message: 'Javob muvaffaqiyatli yuborildi', data: question };
    }
    async markAsRead(id) {
        const question = await this.questionService.markAsRead(id);
        return { message: 'O\'qilgan deb belgilandi', data: question };
    }
    async updateStatus(id, body) {
        const question = await this.questionService.updateStatus(id, body.status);
        return { message: 'Status yangilandi', data: question };
    }
    async deleteQuestion(id) {
        return this.questionService.deleteQuestion(id);
    }
};
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, transform: true })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('all'),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getAllQuestions", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('my-questions'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getUserQuestions", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('unread-count'),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getQuestion", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('answer'),
    (0, auth_decorator_1.Auth)('ADMIN'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, transform: true })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, answer_question_dto_1.AnswerQuestionDto]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "answerQuestion", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)(':id/read'),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)(':id/status'),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "deleteQuestion", null);
QuestionController = __decorate([
    (0, common_1.Controller)('question'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map