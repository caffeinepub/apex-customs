import { createRootRoute, createRoute } from "@tanstack/react-router";
import BookingPage from "./pages/BookingPage";
import GaragePage from "./pages/GaragePage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ShopPage from "./pages/ShopPage";
import { Route as rootRoute } from "./routes/__root";

const IndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const GarageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/garage",
  component: GaragePage,
});

const ProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: ProjectsPage,
});

const ShopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: ShopPage,
});

const BookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking",
  component: BookingPage,
});

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  GarageRoute,
  ProjectsRoute,
  ShopRoute,
  BookingRoute,
]);

export { createRootRoute, createRoute };
