import { Article } from 'src/articles/entities/article.entity';
import { Repository } from 'typeorm';
export declare class ArticleSeedService {
    private repository;
    constructor(repository: Repository<Article>);
    run(): Promise<void>;
}
