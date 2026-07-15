# MaxitHome v1.0 重构设计方案

> 版本：v1.0  
> 更新时间：2026-07-15  
> 项目名称：MaxitHome  
> 部署方式：Cloudflare Pages（Frontend Only）

---

# 一、项目定位

## 1.1 项目背景

MaxitHome 是一个 Web App 聚合平台。

平台本身**并不提供具体的 Web App 功能**，而是作为统一入口，对各种有助于提升人类认知能力（Cognitive Skills）和人类智能（Human Intelligence）的在线应用进行组织、分类、展示与推荐。

每个 Web App 都作为一个**完全独立的项目**部署在自己的子域名下运行，例如：

```
https://minecraft.maxithome.com
https://memory.maxithome.com
https://typing.maxithome.com
```

而聚合平台：

```
https://maxithome.com
```

仅负责：

- 展示应用
- 分类应用
- 搜索应用
- 展示应用详情
- 引导用户进入具体应用

平台自身不承载任何具体 App 的业务逻辑。

---

## 1.2 项目目标

打造一个现代化、易扩展、易维护、移动端友好的 Web App 聚合平台，让不同年龄层的用户能够方便地发现适合自己的 Cognitive Apps。

目标用户包括：

- 儿童（8岁以上）
- 青少年
- 大学生
- 上班族
- 中老年用户

整体设计风格应更加亲民，而不是偏向程序员或 Geek 风格。

---

# 二、总体技术架构

## 2.1 技术栈

整个项目采用现代前端技术栈。

建议如下：

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- shadcn/ui
- Lucide Icons
- Framer Motion（仅用于轻量动画）

---

## 2.2 部署方式

本项目采用：

**Cloudflare Pages**

进行部署。

因此整个项目必须满足以下原则：

- Frontend Only
- 不依赖任何 Backend
- 不需要 Server
- 不需要数据库
- 不需要 Node Runtime
- 所有页面均由静态资源组成

未来即使需要接入 CMS 或 API，也应保持平台主体仍然能够作为纯前端项目运行。

---

## 2.3 总体架构

```
                maxithome.com
                      │
        ┌─────────────┴─────────────┐
        │                           │
     首页(Home)                应用详情(Detail)
        │                           │
        └──────────────┬────────────┘
                       │
                   apps.json
                       │
      ┌────────────────┼────────────────┐
      │                │                │
 minecraft.       memory.         typing.
 maxithome.com    maxithome.com   maxithome.com
```

聚合平台与各个 Web App 完全解耦。

每个 App 都可以独立开发、独立部署、独立升级。

---

# 三、数据驱动架构

整个聚合平台应采用**Metadata Driven**设计。

所有应用信息统一维护在：

```
apps.json
```

整个网站只维护这一份元数据。

包括：

- 首页
- 搜索
- 标签
- 分类
- 应详情
- SEO 页面
- 收藏功能
- 推荐功能（未来）

全部基于该文件动态生成。

因此：

新增一个 App：

只需要修改：

```
apps.json
```

无需修改 React 代码。

---

# 四、建议的 Metadata 结构

建议每个 App 至少包含以下字段：

```json
{
  "id": "minecraft",

  "name": "Minecraft",

  "subdomain": "minecraft.maxithome.com",

  "icon": "/icons/minecraft.png",

  "shortDescription": "Build and explore an infinite sandbox world.",

  "longDescription": "",

  "howToUse": "",

  "screenshots": [],

  "tags": {

    "type": [],

    "skills": [],

    "difficulty": [],

    "age": []

  },

  "officialWebsite": "",

  "featured": true,

  "new": false
}
```

后续新增字段时，应尽量保持向后兼容。

---

# 五、首页信息架构

目前网站按照：

- Learning Tools
- Games Arcade

进行二元分类。

建议取消这种划分。

改为统一 App 列表，并使用多维 Tag 描述每个应用。

首页每张 Card 建议包含

- Icon
- 名称
- 一句话简介
- Tags
- Launch 按钮
- Details 按钮

例如：

```
Minecraft

Build and explore an infinite sandbox world.

Game
Spatial
Logic

[ Launch ]

[ Details ]
```

---

# 六、多维 Tag 体系

建议使用多个维度对每个 App 进行分类，而不是单一分类。

## 第一维：应用类型

例如：

- Tool
- Game
- Learning
- Assessment
- Other

一个 App 可以属于多个类型。

---

## 第二维：认知能力

建议包括：

- Memory
- Focus
- Attention
- Logic
- Reasoning
- Spatial
- Processing Speed
- Language
- Mathematics
- Creativity
- Executive Function
- Decision Making

一个 App 可以拥有多个认知标签。

---

## 第三维：难度

例如：

- Beginner
- Intermediate
- Advanced

---

## 第四维：推荐年龄

例如：

- 8+
- 12+
- Adult
- Senior Friendly

---

# 七、应用详情页面

点击：

```
Details
```

进入应用详情页。

例如：

```
https://maxithome.com/apps/minecraft
```

需要注意：

**这里不是 Minecraft 应用本身。**

真正运行的地址仍然是：

```
https://minecraft.maxithome.com
```

详情页仅作为：

- 应用介绍
- 使用说明
- SEO 页面
- 收藏入口

所有内容均根据：

```
apps.json
```

动态生成。

建议包含：

- Icon
- 名称
- 长描述
- Tags
- 推荐年龄
- 难度
- 使用方法
- Screenshot Gallery
- 收藏按钮
- Launch App 按钮
- Related Apps

新增 App 时无需增加新的 React 页面。

---

# 八、搜索功能

提供全局搜索。

搜索内容包括：

- 名称
- 描述
- Tags

例如：

```
memory

typing

minecraft

logic

reaction
```

全部来自：

```
apps.json
```

---

# 九、筛选功能

支持多条件组合筛选。

例如：

```
Game

+

Spatial

+

Beginner
```

即时筛选出符合条件的 App。

所有数据来源于：

```
apps.json
```

---

# 十、收藏功能

初期无需用户登录。

使用：

```
LocalStorage
```

保存：

- Favourite Apps

以后可扩展到云端同步。

---

# 十一、SEO 设计

为了提高搜索引擎收录效果，需要为每个应用生成独立页面。

例如：

```
/apps/minecraft

/apps/chess

/apps/sudoku
```

此外，还应自动生成各类分类页面，例如：

```
/skills/memory

/skills/logic

/type/game

/type/tool
```

这些页面均应根据：

```
apps.json
```

自动生成。

新增 App 后：

- 自动拥有详情页
- 自动出现在相关分类页
- 无需修改任何页面代码

整个网站保持 Metadata Driven。

---

# 十二、UI / UX 设计原则

目标用户年龄跨度较大，因此整体设计应更加友好。

建议：

- 简洁
- 温暖
- 留白充足
- 大尺寸按钮
- 圆角设计
- 图标清晰
- 排版舒适

避免：

- 复杂 Dashboard 风格
- 过多专业术语
- Geek 风格界面

---

# 十三、响应式设计

整个网站采用：

Mobile First

支持：

- Mobile
- Tablet
- Desktop

重点保证：

- 手机单手操作方便
- Tablet 浏览舒适
- Desktop 信息展示充分

---

# 十四、障碍设计（Accessibility）

建议从设计初期即支持：

- Keyboard Navigation
- Screen Reader
- Dark Mode
- High Contrast
- 字体缩放
- 足够大的点击区域

保证不同年龄段用户均可使用。

---

# 十五、未来扩展性

虽然 v1.0 为纯前端项目，但整体架构应保留未来扩展能力。

例如：

- Headless CMS
- REST API
- GraphQL
- AI 推荐系统
- 云端收藏同步
- 用户账号体系

未来若引入新的数据来源，仅需替换数据读取层，而无需重构 UI。

---

# 十六、设计原则总结

整个项目应始终遵循以下原则：

## Frontend Only

平台完全基于 React 构建，通过 Cloudflare Pages 部署，不依赖任何后端服务。

---

## Metadata Driven

所有页面均由 `apps.json` 驱动生成。

---

## Decoupled

聚合平台与各 Web App 完全解耦。

---

## Extensible

新增应用原则上只需修改元数据，而无需修改业务代码。

---

## Responsive

优秀的手机、平板、桌面端体验。

---

## Accessible

适合 8 岁至 80 岁用户使用。

---

## Maintainable

清晰的目录结构，统一的数据来源，降低维护成本。

---

## SEO Friendly

应用详情页及分类页均由元数据动态生成，提高搜索引擎收录能力。

---

## Future Ready

为未来 AI 推荐、CMS、账号系统等能力预留扩展空间，同时保持当前版本作为纯静态前端项目的简洁性与可维护性。
