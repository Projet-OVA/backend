import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
interface JwtPayload {
    sub: string;
    email: string;
    username: string;
    nom: string;
    prenom: string;
    role: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): {
        id: string;
        email: string;
        username: string;
        nom: string;
        prenom: string;
        role: string;
    };
}
export {};
