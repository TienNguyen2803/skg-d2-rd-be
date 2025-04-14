"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const filter_builder_1 = require("../utils/filter-builder");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./entities/project.entity");
const department_entity_1 = require("../departments/entities/department.entity");
const user_entity_1 = require("../users/entities/user.entity");
const project_type_entity_1 = require("../project-types/entities/project-type.entity");
let ProjectsService = exports.ProjectsService = class ProjectsService {
    constructor(projectRepository, departmentRepository, userRepository, projectTypeRepository) {
        this.projectRepository = projectRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
        this.projectTypeRepository = projectTypeRepository;
    }
    async create(createProjectDto) {
        const project = this.projectRepository.create(createProjectDto);
        const projectType = await this.projectTypeRepository.findOne({ where: { id: createProjectDto.project_type_id } });
        if (!projectType) {
            throw new common_1.NotFoundException(`Project Type with ID ${createProjectDto.project_type_id} not found`);
        }
        project.project_type = projectType;
        return this.projectRepository.save(project);
    }
    async findManyWithPagination({ page, limit, offset }, filterQuery, sort) {
        const findOptions = Object.assign(Object.assign({}, filter_builder_1.FilterBuilder.buildFilter(filterQuery)), { skip: offset, take: limit, relations: ['department', 'project_manager', 'project_type'], order: {} });
        if (sort) {
            const [field, direction] = sort.split(',');
            if (field && direction) {
                const upperDirection = direction.toUpperCase();
                if (upperDirection === 'ASC' || upperDirection === 'DESC') {
                    findOptions.order = { [field]: upperDirection };
                }
            }
        }
        else {
            findOptions.order = { id: 'DESC' };
        }
        return this.projectRepository.find(findOptions);
    }
    standardCount(filterQuery) {
        const findOptions = filter_builder_1.FilterBuilder.buildFilter(filterQuery);
        return this.projectRepository.count(findOptions);
    }
    async findOne(id) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['department', 'project_manager', 'project_type'],
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }
    async update(id, updateProjectDto) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['department', 'project_manager', 'project_type'],
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        Object.assign(project, updateProjectDto);
        if (updateProjectDto.project_type_id) {
            const projectType = await this.projectTypeRepository.findOne({ where: { id: updateProjectDto.project_type_id } });
            if (!projectType) {
                throw new common_1.NotFoundException(`Project Type with ID ${updateProjectDto.project_type_id} not found`);
            }
            project.project_type = projectType;
        }
        if (updateProjectDto.department_id) {
            const department = await this.departmentRepository.findOne({
                where: { id: updateProjectDto.department_id },
            });
            if (department) {
                project.department = department;
            }
        }
        if (updateProjectDto.pm_user_id) {
            const projectManager = await this.userRepository.findOne({
                where: { id: updateProjectDto.pm_user_id },
            });
            if (projectManager) {
                project.project_manager = projectManager;
            }
        }
        await this.projectRepository.save(project);
        return this.projectRepository.findOneOrFail({
            where: { id },
            relations: ['department', 'project_manager', 'project_type'],
        });
    }
    async softDelete(id) {
        await this.projectRepository.softDelete(id);
    }
};
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(project_type_entity_1.ProjectType)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map