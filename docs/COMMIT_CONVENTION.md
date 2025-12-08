# Git 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范来管理 Git 提交信息。

## 工具集成

项目已集成以下工具来确保提交规范：

- **husky**: Git hooks 管理工具
- **commitlint**: 提交信息校验工具
- **commitizen**: 交互式提交工具
- **cz-conventional-changelog**: Commitizen 的 Conventional Commits 适配器
- **lint-staged**: 只对暂存文件运行检查，提高效率

## 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- **feat**: 新功能
- **fix**: 修复 bug
- **docs**: 文档变更
- **style**: 代码格式（不影响代码运行的变动，如空格、格式化等）
- **refactor**: 重构（既不是新增功能，也不是修改 bug 的代码变动）
- **perf**: 性能优化
- **test**: 增加测试
- **chore**: 构建过程或辅助工具的变动
- **revert**: 回退
- **build**: 打包相关变动

### Scope 范围（可选）

用于说明 commit 影响的范围，比如：`api`、`ui`、`auth`、`db` 等。

### Subject 主题

简短描述，不超过 50 个字符，建议使用中文。

### Body 正文（可选）

详细描述，说明代码变动的动机和与之前行为的对比。

### Footer 页脚（可选）

- 关闭 issue：`Closes #123`
- 破坏性变更：`BREAKING CHANGE: 描述`

## 使用方法

### 方式一：使用 commitizen（推荐）

```bash
# 添加文件到暂存区
git add .

# 使用交互式提交
bun run commit
```

这会启动一个交互式命令行工具，引导你完成规范的提交信息。

### 方式二：手动编写提交信息

```bash
git commit -m "feat(auth): 添加用户登录功能"
```

如果提交信息不符合规范，commitlint 会阻止提交并提示错误。

## 示例

### 新功能
```
feat(user): 添加用户个人资料编辑功能

允许用户编辑昵称、头像和个人简介
```

### 修复 bug
```
fix(api): 修复用户登录接口返回错误的问题

当用户密码错误时，应该返回 401 状态码而不是 500
```

### 文档更新
```
docs(readme): 更新项目安装说明
```

### 代码重构
```
refactor(utils): 优化日期格式化函数

使用 Intl.DateTimeFormat 替代 moment.js，减少包体积
```

### 破坏性变更
```
feat(api): 重构用户 API 接口

BREAKING CHANGE: 用户 API 的响应格式已更改，需要更新客户端代码
```

## Git Hooks

项目配置了以下 Git hooks：

### pre-commit
在提交前自动运行 lint-staged，只对暂存区的文件使用 Biome 检查代码质量：
```bash
bunx lint-staged
```

这样只会检查你修改的文件，而不是整个项目，大大提高了检查速度。

### commit-msg
在提交时自动验证提交信息格式是否符合规范。

## 注意事项

1. 提交信息的 type 和 subject 是必需的
2. subject 首字母小写，结尾不加句号
3. 尽量使用中文描述，清晰明了
4. 每次提交只做一件事，保持提交的原子性
5. 提交前确保代码通过 Biome 检查

## 跳过检查（不推荐）

在特殊情况下，可以使用以下命令跳过检查：

```bash
# 跳过 pre-commit hook
git commit --no-verify -m "提交信息"

# 或使用简写
git commit -n -m "提交信息"
```

**注意**：除非在紧急情况下，否则不建议跳过检查。