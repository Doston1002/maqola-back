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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const question_model_1 = require("./question.model");
let QuestionService = class QuestionService {
    constructor(questionModel) {
        this.questionModel = questionModel;
    }
    async createQuestion(userId, createQuestionDto) {
        const question = new this.questionModel({
            user: userId,
            title: createQuestionDto.title,
            description: createQuestionDto.description,
            status: 'pending',
        });
        const savedQuestion = await question.save();
        return this.transformQuestion(await savedQuestion.populate('user', 'fullName email'));
    }
    async getAllQuestions(limit = 10, page = 1, status) {
        const skip = (page - 1) * limit;
        const filter = {};
        if (status && ['pending', 'answered', 'closed'].includes(status)) {
            filter.status = status;
        }
        const questions = await this.questionModel
            .find(filter)
            .populate('user', 'fullName email')
            .populate('answeredBy', 'fullName email')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .exec();
        const total = await this.questionModel.countDocuments(filter);
        return {
            questions: questions.map(q => this.transformQuestion(q)),
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getUserQuestions(userId, limit = 10, page = 1) {
        const skip = (page - 1) * limit;
        const questions = await this.questionModel
            .find({ user: userId })
            .populate('user', 'fullName email')
            .populate('answeredBy', 'fullName email')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .exec();
        const total = await this.questionModel.countDocuments({ user: userId });
        return {
            questions: questions.map(q => this.transformQuestion(q)),
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getQuestionById(id, userId) {
        const question = await this.questionModel
            .findById(id)
            .populate('user', 'fullName email')
            .populate('answeredBy', 'fullName email')
            .exec();
        if (!question) {
            throw new common_1.NotFoundException('Savol topilmadi');
        }
        if (userId && question.user && question.user._id.toString() !== userId) {
            throw new common_1.NotFoundException('Savol topilmadi');
        }
        return this.transformQuestion(question);
    }
    async answerQuestion(adminId, answerQuestionDto) {
        const question = await this.questionModel.findById(answerQuestionDto.questionId);
        if (!question) {
            throw new common_1.NotFoundException('Savol topilmadi');
        }
        question.answer = answerQuestionDto.answer;
        question.answeredBy = adminId;
        question.answeredAt = new Date();
        question.status = 'answered';
        const savedQuestion = await question.save();
        return this.transformQuestion(await savedQuestion.populate(['user', 'answeredBy']));
    }
    async markAsRead(id) {
        const question = await this.questionModel
            .findByIdAndUpdate(id, { isRead: true }, { new: true })
            .populate('user', 'fullName email')
            .populate('answeredBy', 'fullName email')
            .exec();
        if (!question) {
            throw new common_1.NotFoundException('Savol topilmadi');
        }
        return this.transformQuestion(question);
    }
    async updateStatus(id, status) {
        const question = await this.questionModel
            .findByIdAndUpdate(id, { status }, { new: true })
            .populate('user', 'fullName email')
            .populate('answeredBy', 'fullName email')
            .exec();
        if (!question) {
            throw new common_1.NotFoundException('Savol topilmadi');
        }
        return this.transformQuestion(question);
    }
    async deleteQuestion(id) {
        const question = await this.questionModel.findByIdAndDelete(id).exec();
        if (!question) {
            throw new common_1.NotFoundException('Savol topilmadi');
        }
        return { message: 'Savol o\'chirildi' };
    }
    async getUnreadCount() {
        return this.questionModel.countDocuments({ isRead: false, status: 'pending' });
    }
    transformQuestion(question) {
        var _a, _b;
        return {
            id: question._id.toString(),
            user: question.user ? {
                id: (_a = question.user._id) === null || _a === void 0 ? void 0 : _a.toString(),
                fullName: question.user.fullName,
                email: question.user.email,
            } : null,
            title: question.title,
            description: question.description,
            answer: question.answer,
            answeredBy: question.answeredBy ? {
                id: (_b = question.answeredBy._id) === null || _b === void 0 ? void 0 : _b.toString(),
                fullName: question.answeredBy.fullName,
                email: question.answeredBy.email,
            } : null,
            answeredAt: question.answeredAt,
            status: question.status,
            isRead: question.isRead,
            createdAt: question.createdAt || new Date(),
            updatedAt: question.updatedAt || new Date(),
        };
    }
};
QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(question_model_1.Question.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map