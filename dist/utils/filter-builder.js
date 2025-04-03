"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterBuilder = void 0;
const typeorm_1 = require("typeorm");
class FilterBuilder {
    static buildFilter(filterQuery) {
        const findOptions = {
            where: []
        };
        if (filterQuery) {
            try {
                const filters = JSON.parse(filterQuery);
                if (filters.$and) {
                    filters.$and.forEach((andCondition) => {
                        if (andCondition.$or) {
                            const orConditions = andCondition.$or.map((condition) => {
                                const whereCondition = {};
                                Object.keys(condition).forEach(field => {
                                    if (typeof condition[field] === 'object' && '$contL' in condition[field]) {
                                        whereCondition[field] = (0, typeorm_1.ILike)(`%${condition[field].$contL}%`);
                                    }
                                });
                                return whereCondition;
                            });
                            findOptions.where = orConditions;
                        }
                    });
                }
            }
            catch (error) {
                console.error('Error parsing filter query:', error);
            }
        }
        return findOptions;
    }
}
exports.FilterBuilder = FilterBuilder;
//# sourceMappingURL=filter-builder.js.map