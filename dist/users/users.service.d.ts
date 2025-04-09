import { IPaginationOptions } from '../utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findManyWithPagination({ page, limit, offset }: IPaginationOptions, filterQuery?: string, sort?: string): Promise<User[]>;
    standardCount(filterQuery?: string): Promise<number>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    softDelete(id: number): Promise<void>;
}
