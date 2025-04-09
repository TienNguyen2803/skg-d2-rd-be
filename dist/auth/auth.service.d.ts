import { JwtService } from '@nestjs/jwt';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { UsersService } from 'src/users/users.service';
import { ForgotService } from 'src/forgot/forgot.service';
import { MailService } from 'src/mail/mail.service';
import { LoginResponseType } from './types/login-response.type';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { SessionService } from 'src/session/session.service';
export declare class AuthService {
    private jwtService;
    private usersService;
    private forgotService;
    private sessionService;
    private mailService;
    private configService;
    constructor(jwtService: JwtService, usersService: UsersService, forgotService: ForgotService, sessionService: SessionService, mailService: MailService, configService: ConfigService<AllConfigType>);
    validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseType>;
    private getTokensData;
}
