import { Model } from 'mongoose';
import { QuestionDocument } from './question.model';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AnswerQuestionDto } from './dto/answer-question.dto';
export declare class QuestionService {
    private questionModel;
    constructor(questionModel: Model<QuestionDocument>);
    createQuestion(userId: string, createQuestionDto: CreateQuestionDto): Promise<{
        id: string;
        user: {
            id: any;
            fullName: any;
            email: any;
        };
        title: string;
        description: string;
        answer: string;
        answeredBy: {
            id: any;
            fullName: any;
            email: any;
        };
        answeredAt: Date;
        status: "pending" | "closed" | "answered";
        isRead: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllQuestions(limit?: number, page?: number, status?: string): Promise<{
        questions: {
            id: string;
            user: {
                id: any;
                fullName: any;
                email: any;
            };
            title: string;
            description: string;
            answer: string;
            answeredBy: {
                id: any;
                fullName: any;
                email: any;
            };
            answeredAt: Date;
            status: "pending" | "closed" | "answered";
            isRead: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    getUserQuestions(userId: string, limit?: number, page?: number): Promise<{
        questions: {
            id: string;
            user: {
                id: any;
                fullName: any;
                email: any;
            };
            title: string;
            description: string;
            answer: string;
            answeredBy: {
                id: any;
                fullName: any;
                email: any;
            };
            answeredAt: Date;
            status: "pending" | "closed" | "answered";
            isRead: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    getQuestionById(id: string, userId?: string): Promise<{
        id: string;
        user: {
            id: any;
            fullName: any;
            email: any;
        };
        title: string;
        description: string;
        answer: string;
        answeredBy: {
            id: any;
            fullName: any;
            email: any;
        };
        answeredAt: Date;
        status: "pending" | "closed" | "answered";
        isRead: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    answerQuestion(adminId: string, answerQuestionDto: AnswerQuestionDto): Promise<{
        id: string;
        user: {
            id: any;
            fullName: any;
            email: any;
        };
        title: string;
        description: string;
        answer: string;
        answeredBy: {
            id: any;
            fullName: any;
            email: any;
        };
        answeredAt: Date;
        status: "pending" | "closed" | "answered";
        isRead: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    markAsRead(id: string): Promise<{
        id: string;
        user: {
            id: any;
            fullName: any;
            email: any;
        };
        title: string;
        description: string;
        answer: string;
        answeredBy: {
            id: any;
            fullName: any;
            email: any;
        };
        answeredAt: Date;
        status: "pending" | "closed" | "answered";
        isRead: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateStatus(id: string, status: 'pending' | 'answered' | 'closed'): Promise<{
        id: string;
        user: {
            id: any;
            fullName: any;
            email: any;
        };
        title: string;
        description: string;
        answer: string;
        answeredBy: {
            id: any;
            fullName: any;
            email: any;
        };
        answeredAt: Date;
        status: "pending" | "closed" | "answered";
        isRead: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteQuestion(id: string): Promise<{
        message: string;
    }>;
    getUnreadCount(): Promise<number>;
    private transformQuestion;
}
