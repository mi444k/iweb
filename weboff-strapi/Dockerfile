# Multi-stage build for Strapi v5 on Node 20 (Alpine)

FROM node:20-alpine AS base
WORKDIR /srv/app
# Build deps for better-sqlite3 and other native modules
RUN apk add --no-cache libc6-compat python3 make g++

FROM base AS deps
ENV YARN_CACHE_FOLDER=/root/.cache/yarn
COPY package.json yarn.lock* ./
# Single fetch of all deps (dev+prod), cache retained for later stages
RUN yarn install --frozen-lockfile

FROM base AS builder
ENV NODE_ENV=production
ENV YARN_CACHE_FOLDER=/root/.cache/yarn
COPY --from=deps /srv/app/node_modules ./node_modules
COPY --from=deps /root/.cache/yarn /root/.cache/yarn
COPY . .
RUN yarn build
# Prune to production deps using cached tarballs (no extra network)
RUN yarn install --frozen-lockfile --production=true --ignore-scripts --offline && yarn cache clean

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=1337
WORKDIR /srv/app
COPY --from=builder /srv/app/package.json ./package.json
COPY --from=builder /srv/app/node_modules ./node_modules
COPY --from=builder /srv/app/dist ./dist
COPY --from=builder /srv/app/public ./public
COPY --from=builder /srv/app/dist/config ./config
COPY --from=builder /srv/app/.strapi ./.strapi
# SQLite DB lives in .tmp by default; keep empty dir and mount volume for persistence
RUN mkdir -p /srv/app/.tmp
VOLUME ["/srv/app/public/uploads", "/srv/app/.tmp"]
EXPOSE 1337
CMD ["yarn", "start"]
