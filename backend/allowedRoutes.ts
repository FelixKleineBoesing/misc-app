import { Role } from "./model/User"

export const allowedRoutesPerRole = {
    [Role.user]: ["weather", "overview", "todo", "rapsberry", "login", "register"], 
    [Role.admin]: ["weather", "overview", "todo", "rapsberry", "administration"]
}