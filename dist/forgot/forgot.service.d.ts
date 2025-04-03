import { FindOptions } from 'src/utils/types/find-options.type';
import { DeepPartial, Repository } from 'typeorm';
import { Forgot } from './entities/forgot.entity';
import { NullableType } from '../utils/types/nullable.type';
export declare class ForgotService {
    private readonly forgotRepository;
    constructor(forgotRepository: Repository<Forgot>);
    findOne(options: FindOptions<Forgot>): Promise<NullableType<Forgot>>;
    findMany(options: FindOptions<Forgot>): Promise<Forgot[]>;
    create(data: DeepPartial<Forgot>): Promise<Forgot>;
    softDelete(id: Forgot['id']): Promise<void>;
}
