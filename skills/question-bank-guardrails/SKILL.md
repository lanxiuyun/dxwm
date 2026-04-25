---
name: question-bank-guardrails
description: Use when generating, rewriting, expanding, or reviewing quiz questions for this project. Enforces elementary school scope, knowledge-point-first planning, mixed question types, simple wording, and bans off-syllabus or overly hard questions.
---

# Question Bank Guardrails

Use this skill when the task is to create, expand, revise, filter, or review the local quiz question bank.

This skill is for the `dxwm` project and should be treated as a hard constraint, not a suggestion.

## Goals

- Keep the question bank inside a clear syllabus boundary
- Make questions simple, fast to answer, and suitable for a lightweight quiz game
- Avoid batches full of the same question pattern
- Prefer "knowledge point -> question" instead of "想到什么就出什么"

## Hard Constraints

- Default scope is `小学一到六年级`
- If the user does not explicitly ask for a harder scope, do not write初中 / 高中 / 大学难度题
- Questions must stay inside common school knowledge points, not olympiad, competition, trivia traps, or weird edge cases
- Wording must be direct and short
- One question should test one main knowledge point
- Avoid ambiguous answers
- Avoid questions that depend on regional textbook corner cases unless the user asks for them
- Avoid "脑筋急转弯式"题目
- Avoid repeated stems with only numbers mechanically swapped unless the user explicitly wants drill-style repetition

## Required Workflow

When adding or rewriting a batch of questions, follow this order:

1. Identify the subject
2. Write or confirm the knowledge-point list first
3. Group knowledge points by grade band when useful
4. Generate questions from those knowledge points
5. Check whether the batch has enough type diversity
6. Remove off-syllabus, duplicate, vague, or overly hard items

Do not skip the knowledge-point step for large batches.

## Scope Rules

For this project, default to these subjects:

- 语文
- 数学
- 英语
- 物理
- 化学

When a subject naturally exceeds小学范围:

- `物理` and `化学` should be treated as `生活常识化、启蒙化、送分化`
- Do not write formal high-school-style calculation chains unless the user explicitly asks for them
- Prefer everyday phenomena, basic units, simple formulas, common materials, and obvious experiments

## Question-Type Diversity

A batch should not be dominated by one pattern.

Prefer mixing these types:

- 基础记忆题
- 常识判断题
- 简单计算题
- 对应关系题
- 生活场景题
- 词义/概念识别题

When generating `10` questions for one round, aim to cover at least `3` different question types.

## Difficulty Rules

Default difficulty should feel like:

- 看过课本就能答
- 不需要长推理
- 不需要多步计算
- 不需要偏门记忆

Reject or rewrite a question if it has one of these problems:

- 需要两步以上复杂推理
- 干扰项过于接近，容易变成猜文字游戏
- 题干太长
- 一个题同时考多个知识点
- 答案虽然对，但不像“小学送分题”

## Knowledge-Point-First Pattern

Before generating a large batch, first produce a compact outline like:

### 示例

`数学 / 小学`

- 一年级：20以内加减法，认识钟表，长度比较
- 二年级：乘法口诀，简单除法，米和厘米
- 三年级：周长，分数初步认识，时分秒
- 四年级：整数四则运算，平行四边形，平均数
- 五年级：小数，分数加减，面积
- 六年级：百分数，比和比例，圆的基础

Then generate questions from that list.

## Output Rules For This Repo

When editing `src/data/questions.js` or `src/data/generatedQuestions.js`:

- Keep the existing data shape:
  - `id`
  - `subject`
  - `prompt`
  - `options`
  - `answer`
  - `explanation`
  - `level`
- Prefer concise explanations
- Keep options readable at mobile width
- Make distractors plausible but not maliciously tricky

## Review Checklist

Before finishing a question-bank task, check:

- Is every question inside the requested scope?
- Did I list or infer knowledge points first?
- Does the batch contain different question types?
- Are there obvious duplicates or near-duplicates?
- Are any questions too hard, too long, too weird, or too textbook-specific?
- Would this still feel like a fast quiz game instead of an exam paper?

## Default Assumption

Unless the user says otherwise, use this rule:

`先列小学 1-6 年级知识点，再按知识点出简单题，并保证一批题里有不同题型。`
