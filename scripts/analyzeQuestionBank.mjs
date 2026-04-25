import { QUESTIONS_BY_SUBJECT } from '../src/data/questions.js';
import { KNOWLEDGE_POINT_PLANS } from '../src/data/knowledgePlans.js';

const BAND_PREFIXES = [
  ['小学', 'primary'],
  ['初中', 'middle'],
  ['高中', 'high'],
  ['大学', 'college'],
];

function getBand(level) {
  for (const [prefix, band] of BAND_PREFIXES) {
    if (level.startsWith(prefix)) return band;
  }
  return 'unknown';
}

function normalizePrompt(prompt) {
  return prompt
    .replace(/\s+/g, '')
    .replace(/[“”"'‘’《》【】（）()，。？！、：；,.!?;:]/g, '')
    .replace(/\d+/g, '#');
}

function topEntries(map, limit = 5) {
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit);
}

const report = {};
const duplicateBuckets = [];

for (const [subjectKey, questions] of Object.entries(QUESTIONS_BY_SUBJECT)) {
  const subjectReport = {
    total: questions.length,
    bands: {},
  };

  for (const band of ['primary', 'middle', 'high', 'college']) {
    const bandQuestions = questions.filter((question) => getBand(question.level) === band);
    const typeCounts = new Map();
    const normalizedPromptCounts = new Map();

    for (const question of bandQuestions) {
      typeCounts.set(question.type, (typeCounts.get(question.type) || 0) + 1);

      const normalized = normalizePrompt(question.prompt);
      if (!normalizedPromptCounts.has(normalized)) normalizedPromptCounts.set(normalized, []);
      normalizedPromptCounts.get(normalized).push(question.id);
    }

    for (const [normalized, ids] of normalizedPromptCounts.entries()) {
      if (ids.length > 1) {
        duplicateBuckets.push({
          subjectKey,
          band,
          normalized,
          ids,
        });
      }
    }

    const knowledgePointTarget = KNOWLEDGE_POINT_PLANS[subjectKey]?.[band]?.length ?? 0;

    subjectReport.bands[band] = {
      questionCount: bandQuestions.length,
      knowledgePointTarget,
      distinctTypes: typeCounts.size,
      topTypes: topEntries(typeCounts),
    };
  }

  report[subjectKey] = subjectReport;
}

console.log('Question Bank Analysis');
console.log('=====================');

for (const [subjectKey, subjectReport] of Object.entries(report)) {
  console.log(`\n[${subjectKey}] total=${subjectReport.total}`);
  for (const band of ['primary', 'middle', 'high', 'college']) {
    const bandReport = subjectReport.bands[band];
    const topTypeText = bandReport.topTypes
      .map(([type, count]) => `${type}:${count}`)
      .join(', ');

    console.log(
      `  ${band} questions=${bandReport.questionCount} knowledge_points=${bandReport.knowledgePointTarget} distinct_types=${bandReport.distinctTypes}`,
    );
    console.log(`    top_types ${topTypeText}`);
  }
}

console.log('\nPotential normalized prompt collisions');
console.log('-------------------------------------');

if (duplicateBuckets.length === 0) {
  console.log('none');
} else {
  for (const bucket of duplicateBuckets.slice(0, 20)) {
    console.log(
      `${bucket.subjectKey}/${bucket.band} ids=${bucket.ids.join(', ')}`,
    );
  }
  if (duplicateBuckets.length > 20) {
    console.log(`... ${duplicateBuckets.length - 20} more`);
  }
}
