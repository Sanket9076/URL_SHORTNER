import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import LinksPage from "../pages/LinksPage"
import { checkAuth } from "../utils/helper"

export const linksRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/links',
    component: LinksPage,
    // beforeLoad: checkAuth
})
