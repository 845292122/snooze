# SNOOZE

> 基于 Next.js + Hono 的单体 SaaS 脚手架，支持 API-first 架构、前后端类型安全、轻量认证和表单验证，可未来扩展移动端。

---

## 技术栈

| 层级     | 技术                 | 职责                               |
| -------- | -------------------- | ---------------------------------- |
| 前端     | Next.js (app-router) | 页面渲染、路由管理                 |
| UI       | Chakra UI            | 组件库、响应式布局                 |
| 图表     | React Charts         | 数据可视化                         |
| 图标     | React Icons          | 丰富图标                           |
| 表单     | ReactHookForm + Zod  | 表单管理与校验                     |
| 数据请求 | SWR                  | 数据缓存、请求管理                 |
| 后端 API | Hono                 | REST API 接口、中间件处理          |
| ORM      | Drizzle ORM          | MySQL 数据操作、类型安全           |
| 数据库   | MySQL                | 数据存储、多租户支持               |
| 认证     | Lucia Auth           | 本地登录 + OAuth、JWT/Session 管理 |
| 代码风格 | Biome                | 格式化与 Lint                      |
| 运行环境 | Bun                  | 高性能 JS runtime                  |

---

## TODO

- [ ] 系统日志pino
- [ ] 统一返回结果
- [ ] 封装权限开关
- [ ] worker
- [ ] csv解析
- [ ] jwt/lucia封装
- [ ] swr+fetch封装
- [ ] 限流
- [ ] 接口幂等
- [ ] 防抖/节流
- [ ] 审计日志
- [ ] mysql索引
- [ ] 超时控制
- [ ] 错误兜底UI
