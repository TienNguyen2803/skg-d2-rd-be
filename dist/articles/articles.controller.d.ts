import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    create(createArticleDto: CreateArticleDto): Promise<import("./entities/article.entity").Article>;
    findAll(): Promise<import("./entities/article.entity").Article[]>;
    findOne(id: string): Promise<import("../utils/types/nullable.type").NullableType<import("./entities/article.entity").Article>>;
    update(id: string, updateArticleDto: UpdateArticleDto): Promise<import("./entities/article.entity").Article>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
