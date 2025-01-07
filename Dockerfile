# syntax=docker/dockerfile:1
ARG NODE_VERSION=23.4
ARG DEBIAN_CODENAME=slim

ARG SOURCE_DIR=/home/jenkins

FROM node:${NODE_VERSION}-${DEBIAN_CODENAME} AS builder

ARG SOURCE_DIR
ARG API_URL

ENV NEXT_PUBLIC_API_URL=${API_URL}

WORKDIR "$SOURCE_DIR"

RUN corepack enable pnpm && \
  corepack use pnpm@9.15.0

COPY . .
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --no-frozen-lockfile && \
  pnpm install --no-frozen-lockfile && \
  pnpm run build

FROM builder AS test

ARG SOURCE_DIR

WORKDIR "$SOURCE_DIR"

RUN npm run test

FROM builder AS runtime

ARG SOURCE_DIR

WORKDIR "$SOURCE_DIR"

ENV NODE_ENV=production

RUN apt-get update -y && \
  apt-get install -y openssl && \
  addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

COPY --from=builder ["${SOURCE_DIR}/public", "./public"]

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs ["${SOURCE_DIR}/.next/standalone", "./"]
COPY --from=builder --chown=nextjs:nodejs ["${SOURCE_DIR}/.next/static", "./.next/static"]

CMD ["node", "server.js"]
