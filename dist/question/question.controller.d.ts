import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AnswerQuestionDto } from './dto/answer-question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    createQuestion(req: any, createQuestionDto: CreateQuestionDto): Promise<{
        message: string;
        data: {
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
        };
    }>;
    getAllQuestions(limit?: string, page?: string, status?: string): Promise<{
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
    getUserQuestions(req: any, limit?: string, page?: string): Promise<{
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
    getUnreadCount(): Promise<{
        unreadCount: number;
    }>;
    getQuestion(id: string, req: any): Promise<{
        data: {
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
        };
    }>;
    answerQuestion(req: any, answerQuestionDto: AnswerQuestionDto): Promise<{
        message: string;
        data: {
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
        };
    }>;
    markAsRead(id: string): Promise<{
        message: string;
        data: {
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
        };
    }>;
    updateStatus(id: string, body: {
        status: 'pending' | 'answered' | 'closed';
    }): Promise<{
        message: string;
        data: {
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
        };
    }>;
    deleteQuestion(id: string): Promise<{
        message: string;
    }>;
}
