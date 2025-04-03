import { StandardPaginationResultType } from './types/standard-pagination-result.type';
export declare const standardPagination: <T>(data: T[], total: number) => Readonly<{
    data: T[];
    total: number;
}>;
