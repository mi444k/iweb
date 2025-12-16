# Multi-stage Dockerfile for Next.js 15 production build

FROM node:20-alpine AS deps
WORKDIR /app
ENV YARN_CACHE_FOLDER=/root/.cache/yarn
RUN apk add --no-cache libc6-compat python3 make g++
COPY package.json yarn.lock* ./
# Single network download of deps (dev + prod) cached to /root/.cache/yarn
RUN yarn install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV YARN_CACHE_FOLDER=/root/.cache/yarn
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /root/.cache/yarn /root/.cache/yarn
COPY . .
RUN yarn build
# prune dev deps to slim runtime using cached tarballs (no extra network)
RUN yarn install --frozen-lockfile --production=true --ignore-scripts --offline && yarn cache clean

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/app ./app
COPY --from=builder /app/components ./components
COPY --from=builder /app/providers ./providers
COPY --from=builder /app/types ./types
COPY --from=builder /app/data ./data

EXPOSE 3000
CMD ["yarn","start"]
