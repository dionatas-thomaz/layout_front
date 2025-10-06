import { RoleGuard } from "@/core/guards/role.guards";
import { Dashboard } from "./dashboard";
import { Routes } from "@angular/router";

export default [
    { canActivate: [RoleGuard], path: 'dashboard', data: { breadcrumb: 'dashboard', roles: ['ROLE_DASH'] }, component: Dashboard },
] as Routes;
