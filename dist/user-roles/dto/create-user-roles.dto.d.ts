declare class UserRoleAssignment {
    user_id: number;
    role_id: number;
}
export declare class CreateUserRolesDto {
    user_role_assignments: UserRoleAssignment[];
}
export {};
