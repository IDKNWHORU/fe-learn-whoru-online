# 1. Node.js 기반 이미지 선택
FROM node:20.9.0 AS base

# 2. pnpm 설치
RUN npm install -g pnpm

# 3. 작업 디렉토리 설정
WORKDIR /app

# 4. 의존성 파일 복사
COPY package.json pnpm-lock.yaml ./

# 5. 의존성 설치 (빌드 인자 사용)
# ARG로 환경을 받습니다. 기본값은 'development'
ARG NODE_ENV=development
RUN if [ "$NODE_ENV" = "production" ]; then \
      pnpm install --frozen-lockfile --prod; \
    else \
      pnpm install --frozen-lockfile; \
    fi

# 6. 소스 코드 복사
COPY . .

# 7. 빌드 단계 (프로덕션 환경일 경우 빌드 실행)
RUN if [ "$NODE_ENV" = "production" ]; then \
      pnpm build; \
    fi

# 8. 실행 명령어 설정 (환경에 따라 다른 명령어 사용)
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then pnpm start; else pnpm dev; fi"]
