# syntax=docker/dockerfile:1

FROM node:24-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile=false

FROM deps AS build
COPY . .
RUN pnpm build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile=false

COPY --from=build /app .

EXPOSE 3000
CMD ["pnpm", "start"]
