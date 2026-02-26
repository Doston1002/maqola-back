"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeText = exports.sanitizeHtml = void 0;
function sanitizeHtml(html) {
    if (!html || typeof html !== 'string') {
        return '';
    }
    let sanitized = html;
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
    sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/data:text\/html/gi, '');
    sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
    sanitized = sanitized.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
    sanitized = sanitized.replace(/expression\s*\(/gi, '');
    return sanitized.trim();
}
exports.sanitizeHtml = sanitizeHtml;
function sanitizeText(text) {
    if (!text || typeof text !== 'string') {
        return '';
    }
    return text.replace(/<[^>]*>/g, '').trim();
}
exports.sanitizeText = sanitizeText;
//# sourceMappingURL=sanitize.helper.js.map