export declare class TokenBlacklistService {
    private blacklistedTokens;
    addToBlacklist(token: string, expiresIn: number): void;
    isBlacklisted(token: string): boolean;
    removeFromBlacklist(token: string): void;
    clearBlacklist(): void;
    getBlacklistSize(): number;
}
