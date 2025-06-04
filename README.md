# 🧠 Teams Quiz Platform

一个基于 React + Vite 的智能题库系统，支持中英日三语词典提示、Markdown 渲染、乱序答题、CI/CD 自动部署，适配 PC 与移动端。

---

## 🚀 功能特性

- ✅ 单选、多选题支持
- ✅ 词典高亮提示（中 / 英 / 日）
- ✅ Markdown 题目与解析支持
- ✅ 自动乱序出题，避免重复
- ✅ 提交结果统计饼图
- ✅ 可选答题数量（10、30、50、全部）
- ✅ 支持答题后立刻显示解析 or 全部答完再显示
- ✅ 响应式设计，适配移动端

---

## 🧱 技术栈

| 技术 | 说明 |
|------|------|
| [React 18](https://reactjs.org/) | 前端框架 |
| [Vite](https://vitejs.dev/) | 快速开发构建工具 |
| [TypeScript](https://www.typescriptlang.org/) | 类型系统 |
| [Tailwind CSS](https://tailwindcss.com/)（可选） | 样式快速开发 |
| [React Markdown](https://github.com/remarkjs/react-markdown) | Markdown 渲染支持 |
| [Fluent UI Tooltip](https://react.fluentui.dev/) | 词典提示气泡 |
| [GCP App Engine](https://cloud.google.com/appengine) | 云端部署平台 |
| [GCP Cloud Build](https://cloud.google.com/build) | CI/CD 自动部署 |
| [GitHub Trigger](https://cloud.google.com/build/docs/automating-builds/github) | 与 GitHub 集成构建触发器 |

---

## 🧪 本地开发与测试

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 本地预览
npm run preview

# 运行单元测试（需配置测试框架）
npm run test

## 项目结构


src/
├── components/         # 页面组件（题卡、分析图等）
├── data/               # 题库 JSON、词典 JSON
├── pages/              # 页面模块（首页、结果页）
├── utils/              # 工具函数（随机选题、分词等）
├── types/              # TypeScript 类型定义
├── App.tsx             # 主入口
└── main.tsx            # 渲染入口
```

## 数据结构

```json
{
  "id": "A01",
  "question": "以下哪种是云计算的优势？",
  "options": [
    { "id": "A", "text": "弹性伸缩" },
    { "id": "B", "text": "低可靠性" },
    { "id": "C", "text": "高复杂度" },
    { "id": "D", "text": "固定资源" }
  ],
  "answer": ["A"],
  "type": "single",
  "explanation": "云计算的核心优势之一是弹性伸缩，可以根据需求自动调整资源。"
}
```

