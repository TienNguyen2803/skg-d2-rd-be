FROM node:20.14.0-alpine3.20 AS base

RUN apk add --no-cache tzdata
ENV TZ=Asia/Ho_Chi_Minh

FROM base AS deps

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS build
RUN apk add --no-cache curl

WORKDIR /usr/src/app

COPY --from=deps ./node_modules ./node_modules

COPY . .

RUN if [ ! -f .env ]; then cp .env.testing .env; fi

RUN npm run build

CMD npm run start:prod
