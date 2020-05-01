import { Role } from '../model/User';

export const allowedRoutesPerRole = {
    [Role.user]: ["weather", "overview", "todo", "rapsberry"], 
    [Role.admin]: ["weather", "overview", "todo", "rapsberry", "administration"]
}