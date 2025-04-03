import { CreateArticleDto } from './dto/create-article.dto';
import { DeepPartial, Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { NullableType } from '../utils/types/nullable.type';
export declare class ArticlesService {
    private articlesRepository;
    constructor(articlesRepository: Repository<Article>);
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    findAll(): Promise<Article[]>;
    findOne(fields: EntityCondition<Article>): Promise<NullableType<Article>>;
    update(id: Article['id'], payload: DeepPartial<Article>): Promise<Article>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
