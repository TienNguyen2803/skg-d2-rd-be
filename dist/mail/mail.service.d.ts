import { ConfigService } from '@nestjs/config';
import { MailData } from './interfaces/mail-data.interface';
import { AllConfigType } from 'src/config/config.type';
import { MailerService } from 'src/mailer/mailer.service';
export declare class MailService {
    private readonly mailerService;
    private readonly configService;
    constructor(mailerService: MailerService, configService: ConfigService<AllConfigType>);
    userSignUp(mailData: MailData<{
        hash: string;
    }>): Promise<void>;
    userCreatedByAdmin(mailData: {
        initialPass: string | undefined;
        to: string | null;
    }): Promise<void>;
    forgotPassword(mailData: MailData<{
        hash: string;
    }>): Promise<void>;
}
