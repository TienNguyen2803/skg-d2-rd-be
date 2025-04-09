import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { LoginResponseType } from './types/login-response.type';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    login(loginDto: AuthEmailLoginDto): Promise<LoginResponseType>;
}
