"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterBuilder = void 0;
const typeorm_1 = require("typeorm");
class FilterBuilder {
    static buildFilter(filterQuery) {
        const findOptions = {
            where: {}
        };
        if (filterQuery) {
            try {
                const filters = JSON.parse(filterQuery);
                if (filters.$and) {
                    filters.$and.forEach((andCondition) => {
                        if (andCondition.$or) {
                            const searchableFields = Object.keys(andCondition.$or[0]).filter(key => typeof andCondition.$or[0][key] === 'object' && '$contL' in andCondition.$or[0][key]);
                            findOptions.where = searchableFields.map(() => ({}));
                            andCondition.$or.forEach((condition) => {
                                searchableFields.forEach((field, index) => {
                                    var _a;
                                    if ((_a = condition[field]) === null || _a === void 0 ? void 0 : _a.$contL) {
                                        findOptions.where[index] = { [field]: (0, typeorm_1.ILike)(`%${condition[field].$contL}%`) };
                                    }
                                });
                            });
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