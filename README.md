# Random Emoji 随机表情

## 项目简介 | Project Overview

Random Emoji 是一个基于 NestJS 构建的 Web 服务，用于提供随机表情符号（emoji）。该服务允许用户获取随机表情或通过指定索引获取特定表情。该项目展示了 NestJS 框架的多种高级功能，包括中间件、守卫、拦截器、管道和异常过滤器的使用。

Random Emoji is a web service built with NestJS that provides random emoji characters. The service allows users to retrieve a random emoji or get a specific emoji by providing an index. This project demonstrates various advanced features of the NestJS framework, including the use of middleware, guards, interceptors, pipes, and exception filters.

## 功能特性 | Features

- 提供随机表情符号（从预定义的表情符号列表中）
- 支持通过索引查询特定表情（索引范围：0-10）
- 包含请求验证（自定义验证管道确保索引在有效范围内）
- 实现了基于 API 密钥的身份验证机制（通过 x-api-key 请求头）
- 集成了中间件（请求日志记录）
- 实现了拦截器（浏览器信息添加和响应转换）
- 使用异常过滤器统一处理错误响应
- 返回浏览器信息作为响应的一部分

- Provides random emoji characters (from a predefined list of emojis)
- Supports querying specific emoji by index (index range: 0-10)
- Includes request validation (custom validation pipe ensures index is within valid range)
- Implements API key-based authentication mechanism (via x-api-key header)
- Integrates middleware for request logging
- Implements interceptors for browser information addition and response transformation
- Uses exception filters for unified error response handling
- Returns browser information as part of the response

## 技术栈 | Tech Stack

- NestJS 11.x - 现代、服务器端应用程序的渐进式 Node.js 框架
- TypeScript 5.x - 带有类型系统的 JavaScript 超集
- Express - 底层 HTTP 服务器框架
- Jest - JavaScript 测试框架
- pnpm - 快速、节省磁盘空间的包管理器

## 项目结构 | Project Structure

```
src/
├── app.controller.ts        # 主控制器，处理 HTTP 请求
├── app.controller.spec.ts   # 控制器单元测试
├── app.module.ts            # 应用程序的根模块，配置所有组件
├── app.service.ts           # 业务逻辑服务，提供 emoji 数据
├── main.ts                  # 应用入口点，启动 NestJS 应用
├── logger.service.ts        # 日志服务，提供日志记录功能
└── common/                  # 通用功能组件
    ├── auth/                # 认证相关组件
    │   └── auth.guard.ts    # API 密钥认证守卫
    ├── browser/             # 浏览器相关组件
    │   └── browser.interceptor.ts  # 浏览器信息拦截器
    ├── emoji-validation/    # emoji 验证相关组件
    │   └── emoji-validation.pipe.ts # 索引验证管道
    ├── logger/              # 日志相关组件
    │   └── logger.middleware.ts     # 请求日志中间件
    ├── all-exceptions/      # 异常处理相关组件
    │   └── all-exceptions.filter.ts # 全局异常过滤器
    └── transform-response/  # 响应转换相关组件
        └── transform-response.interceptor.ts # 响应格式转换拦截器
test/
├── app.e2e-spec.ts          # 端到端测试规格
└── jest-e2e.json            # Jest 端到端测试配置

# 配置文件
.prettierrc                   # Prettier 代码格式化配置
.gitignore                    # Git 忽略文件配置
eslint.config.mjs             # ESLint 代码质量检查配置
nest-cli.json                 # NestJS CLI 配置
package.json                  # 项目元数据和依赖配置
pnpm-lock.yaml                # pnpm 依赖锁文件
pnpm-workspace.yaml           # pnpm 工作区配置
tsconfig.json                 # TypeScript 编译器配置
tsconfig.build.json           # 构建时使用的 TypeScript 配置
```

## 安装与运行 | Installation & Running

### 前置条件 | Prerequisites

- Node.js (推荐 v20+)
- pnpm (推荐 v10+)

### 安装步骤 | Installation Steps

```bash
# 克隆仓库 | Clone the repository
git clone <repository-url>
cd random-emoji

# 安装依赖 | Install dependencies
pnpm install
```

### 运行应用程序 | Running the Application

```bash
# 开发模式运行 | Development mode
pnpm start:dev

# 调试模式运行 | Debug mode
pnpm start:debug

# 构建项目 | Build the project
pnpm build

# 生产模式运行 | Production mode
pnpm start:prod
```

### 环境变量配置 | Environment Variables

应用程序支持以下环境变量：

The application supports the following environment variables:

- `HOST` - 服务器主机地址（默认：0.0.0.0）| Server host address (default: 0.0.0.0)
- `PORT` - 服务器端口（默认：3000）| Server port (default: 3000)

### 测试 | Testing

```bash
# 运行单元测试 | Run unit tests
pnpm test

# 观察模式运行测试 | Run tests in watch mode
pnpm test:watch

# 运行测试覆盖率报告 | Generate test coverage report
pnpm test:cov

# 运行端到端测试 | Run end-to-end tests
pnpm test:e2e
```

## API 接口 | API Endpoints

### GET /

获取随机或指定索引的表情符号。

Retrieves a random emoji or one at the specified index.

**请求参数 | Request Parameters:**
- `index` (查询参数，可选 | query parameter, optional): 表情符号的索引，范围 0-10 | Index of the emoji, range 0-10

**请求头 | Request Headers:**
- `x-api-key` (必需 | required): API 密钥用于认证，值必须为 "SECRET" | API key for authentication, value must be "SECRET"
- `user-agent` (可选 | optional): 用户代理信息，用于检测浏览器类型 | User agent information, used to detect browser type

**成功响应 | Success Response:**
```json
{
  "data": {
    "emoji": "😀",
    "browser": "Chrome"
  }
}
```

**错误响应 | Error Response:**
```json
{
  "message": "Validation failed: 15 is out of range",
  "statusCode": 400,
  "timestamp": "2023-11-15T12:34:56.789Z",
  "path": "/"
}
```

**示例请求 | Example Requests:**

使用 cURL 获取随机表情:
```bash
curl -X GET "http://localhost:3000/" -H "x-api-key: SECRET"
```

通过索引获取特定表情:
```bash
curl -X GET "http://localhost:3000/?index=5" -H "x-api-key: SECRET"
```

## 项目特性详细说明 | Feature Details

### 表情符号服务 | Emoji Service
`AppService` 提供表情符号数据和检索功能：
- `getEmoji(index?: number)`: 返回随机或特定索引的表情
- `getEmojis()`: 返回所有可用表情的完整列表（共39个表情）

The `AppService` provides emoji data and retrieval functions:
- `getEmoji(index?: number)`: Returns a random emoji or one at a specific index
- `getEmojis()`: Returns the complete list of all available emojis (39 emojis in total)

### 验证管道 | Validation Pipe
`EmojiValidationPipe` 实现了 `PipeTransform` 接口，用于验证索引参数：
- 检查参数是否为数字
- 验证索引是否在允许的范围内（0-10）
- 超出范围会抛出 `BadRequestException` 异常

The `EmojiValidationPipe` implements the `PipeTransform` interface to validate the index parameter:
- Checks if the parameter is a number
- Validates if the index is within the allowed range (0-10)
- Throws a `BadRequestException` if the value is out of range

### 认证守卫 | Authentication Guard
`AuthGuard` 实现了 `CanActivate` 接口，用于API认证：
- 检查请求头中的 `x-api-key` 是否等于 "SECRET"
- 认证失败时返回 false，阻止请求继续处理
- 通过 `APP_GUARD` 提供者在全局范围内应用

The `AuthGuard` implements the `CanActivate` interface for API authentication:
- Checks if the `x-api-key` in the request header equals "SECRET"
- Returns false on authentication failure, preventing the request from being processed
- Applied globally through the `APP_GUARD` provider

### 浏览器拦截器 | Browser Interceptor
`BrowserInterceptor` 实现了 `NestInterceptor` 接口：
- 从 `user-agent` 头解析浏览器信息
- 将解析的浏览器信息添加到请求头的 `browser` 字段中
- 通过 `APP_INTERCEPTOR` 提供者在全局范围内应用

The `BrowserInterceptor` implements the `NestInterceptor` interface:
- Parses browser information from the `user-agent` header
- Adds the parsed browser information to the `browser` field in the request headers
- Applied globally through the `APP_INTERCEPTOR` provider

### 响应转换拦截器 | Response Transform Interceptor
`TransformResponseInterceptor` 实现标准化响应格式：
- 将所有响应包装在 `data` 属性中
- 确保所有 API 响应具有一致的结构
- 通过 `APP_INTERCEPTOR` 提供者在全局范围内应用

The `TransformResponseInterceptor` implements standardized response format:
- Wraps all responses in a `data` property
- Ensures all API responses have a consistent structure
- Applied globally through the `APP_INTERCEPTOR` provider

### 日志中间件 | Logger Middleware
`LoggerMiddleware` 记录每个传入请求的详细信息：
- 记录请求的 URL 和 HTTP 方法
- 在每个请求开始处理前执行
- 通过 `AppModule.configure()` 在全局范围内应用于所有路由

The `LoggerMiddleware` logs details of each incoming request:
- Records the URL and HTTP method of the request
- Executes before each request is processed
- Applied globally to all routes through `AppModule.configure()`

### 异常过滤器 | Exception Filter
`AllExceptionsFilter` 统一处理异常响应：
- 捕获所有 `HttpException` 类型的异常
- 构建标准化的错误响应格式
- 包含错误消息、状态码、时间戳和请求路径
- 通过 `APP_FILTER` 提供者在全局范围内应用

The `AllExceptionsFilter` unifies exception responses:
- Catches all exceptions of type `HttpException`
- Builds a standardized error response format
- Includes error message, status code, timestamp, and request path
- Applied globally through the `APP_FILTER` provider

## 开发指南 | Development Guide

### 添加新表情 | Adding New Emojis

要添加新的表情符号，请修改 `app.service.ts` 文件中的 `getEmojis()` 方法，将新表情添加到返回的数组中。

To add new emojis, modify the `getEmojis()` method in the `app.service.ts` file by adding new emojis to the returned array.

### 修改验证规则 | Modifying Validation Rules

要更改索引的有效范围，请修改 `src/common/emoji-validation/emoji-validation.pipe.ts` 文件中的验证逻辑。

To change the valid range for the index, modify the validation logic in the `src/common/emoji-validation/emoji-validation.pipe.ts` file.

### 自定义认证逻辑 | Customizing Authentication Logic

要修改认证逻辑，请更新 `src/common/auth/auth.guard.ts` 文件中的 `canActivate()` 方法。

To modify the authentication logic, update the `canActivate()` method in the `src/common/auth/auth.guard.ts` file.

## 生产环境部署 | Production Deployment

为了在生产环境中部署应用程序，请遵循以下最佳实践：

For deploying the application in a production environment, follow these best practices:

1. 使用环境变量设置不同的端口和主机 | Use environment variables to set different ports and hosts
2. 确保使用安全的 API 密钥 | Ensure you use a secure API key
3. 考虑使用 PM2 或 Docker 进行容器化和进程管理 | Consider using PM2 or Docker for containerization and process management
4. 设置适当的监控和日志记录 | Set up proper monitoring and logging

### Docker 部署示例 | Docker Deployment Example

项目可以轻松地使用 Docker 进行部署。以下是一个基本的 Dockerfile 示例：

The project can be easily deployed using Docker. Here's a basic Dockerfile example:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start:prod"]
```

## 许可证 | License

此项目基于 MIT 许可证 | This project is licensed under the MIT license.

## 贡献指南 | Contributing

欢迎贡献！请遵循以下步骤：

Contributions are welcome! Please follow these steps:

1. Fork 仓库 | Fork the repository
2. 创建功能分支 | Create a feature branch
3. 提交更改 | Commit your changes
4. 推送到分支 | Push to the branch
5. 创建 Pull Request | Create a Pull Request
