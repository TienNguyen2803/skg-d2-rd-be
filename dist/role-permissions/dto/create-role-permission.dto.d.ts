declare class RolePermissionItem {
    id: number;
    permission_id: number;
}
export declare class CreateRolePermissionDto {
    role_id: number;
    rolePermissions: RolePermissionItem[];
}
export {};
