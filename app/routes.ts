import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/log-in.tsx"),
    route("book", "routes/book.tsx"),
    route("bookings", "routes/bookings.tsx"),
] satisfies RouteConfig;
