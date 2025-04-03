
import { ILike } from 'typeorm';

export class FilterBuilder {
  static buildFilter(filterQuery?: string) {
    const findOptions: any = {
      where: []
    };

    if (filterQuery) {
      try {
        const filters = JSON.parse(filterQuery);
        if (filters.$and) {
          filters.$and.forEach((andCondition: any) => {
            if (andCondition.$or) {
              // Get all searchable fields from OR conditions
              const orConditions = andCondition.$or.map((condition: any) => {
                const whereCondition: any = {};
                Object.keys(condition).forEach(field => {
                  if (typeof condition[field] === 'object' && '$contL' in condition[field]) {
                    whereCondition[field] = ILike(`%${condition[field].$contL}%`);
                  }
                });
                return whereCondition;
              });

              // Add OR conditions to where clause
              findOptions.where = orConditions;
            }
          });
        }
      } catch (error) {
        console.error('Error parsing filter query:', error);
      }
    }

    return findOptions;
  }
}
