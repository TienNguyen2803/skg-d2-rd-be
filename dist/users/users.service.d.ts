import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { MailService } from '../mail/mail.service';
export declare class UsersService {
    private mailService;
    private usersRepository;
    constructor(mailService: MailService, usersRepository: Repository<User>);
    create(createProfileDto: CreateUserDto, isAdmin: boolean): Promise<User>;
    findManyWithPagination(paginationOptions: IPaginationOptions): Promise<User[]>;
    standardCount(): Promise<number>;
    findOne(fields: EntityCondition<User>): Promise<NullableType<User>>;
    update(id: User['id'], payload: DeepPartial<User>): Promise<User>;
    softDelete(id: User['id']): Promise<void>;
}
