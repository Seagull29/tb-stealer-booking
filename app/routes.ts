import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/log-in.tsx"),
    route("booking", "routes/booking.tsx"),
] satisfies RouteConfig;
