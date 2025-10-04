FROM node:22-bookworm-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
RUN corepack enable && corepack use pnpm
WORKDIR /usr/src/client
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --prod

FROM base AS build
RUN corepack enable && corepack use pnpm
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:stable-bookworm
COPY --from=build /usr/src/client/build/client /usr/share/nginx/html
COPY nginx/production.nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]