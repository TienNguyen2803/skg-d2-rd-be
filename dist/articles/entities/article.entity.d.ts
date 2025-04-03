import { User } from '../../users/entities/user.entity';
export declare class Article {
    id: number;
    title: string;
    published?: boolean;
    createdAt?: Date;
    editedAt?: Date;
    content: string;
    author: User;
}
