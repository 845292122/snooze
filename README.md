# Snooze

saas快速开发模板

| 部署方式 | ✔ 单体部署，不拆服务 |
| 前端 | Next + Chakra + SWR |
| 后端 | Hono + Drizzle |
| 验证 | Yup（前后端共用） |
| 认证 | NextAuth |
| API 方式 | 全 REST（Hono） |

## 技术栈

- 前端: React Next.js
- 后端: Hono
- UI: Chakra UI
- 数据库: Drizzle ORM + Mysql
- 通信: swr + fetch
- Lint: Biome
- 部署: Docker + Github Actions

## 快速开始

```bash
# 安装依赖
bun install

# 启动开发服务器
bun run dev

# 访问 http://localhost:3000
```

## TODO
- [ ] Drizzle
- [ ] Auth
- [ ] Yup
- [ ] Swr
- [ ] Formik + Chakra UI 封装组件
- [ ] 用户登录流程 & 保护路由
