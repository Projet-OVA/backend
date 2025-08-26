export declare class UserResponseDto {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    username: string;
    phoneNumber?: string;
    role: string;
    createdAt: Date;
}
export declare class AuthDataDto {
    user: UserResponseDto;
    accessToken: string;
}
export declare class AuthResponseDto {
    message: string;
    data: AuthDataDto;
    statusCode: number;
}
export declare class RegisterResponseDto {
    message: string;
    data: UserResponseDto;
    statusCode: number;
}
export declare class LogoutResponseDto {
    message: string;
    data: null;
    statusCode: number;
}
