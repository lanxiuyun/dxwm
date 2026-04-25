# AGENTS.md

## Project

轻量级React答题quiz游戏，测试大学生基础知识水平。支持三个主题：`glass` `kawaii` `anime`。

## Commands

```bash
pnpm dev      # 开发服务器
pnpm build    # 生产构建
```

如无pnpm，使用 `npx vite build` 作为fallback。

## Structure

- `src/main.jsx` - React入口
- `src/App.jsx` - 全部游戏逻辑、状态、主题切换（单文件，无路由）
- `src/data/questions.js` - 本地题目库
- `src/styles.css` - 主题样式变量和UI skin

## Principles (karpathy-guidelines)

1. **Think Before Coding** - 不假设，不懂就问。多解释器存在时，说出各自利弊。
2. **Simplicity First** - 最少代码解决问题。不做未请求的"灵活性"。200行能解决就不写50行以外的。
3. **Surgical Changes** - 只改必须改的。不要"改进"邻接代码。改动的每一行都应追溯到用户请求。
4. **Goal-Driven** - 定义可验证的成功标准再动手。

## Constraints

- 不添加路由库、全局状态库、后端代码（除非明确要求）
- 题目数据与渲染逻辑分离
- 移动端优先验证
- 主题逻辑放 `App.jsx`，主题样式放 `styles.css`

## Validation

构建后手动验证：
1. 主题切换（glass/kawaii/anime）
2. 科目选择
3. 答题锁定和100ms自动转场
4. 结果页显示和复玩流程