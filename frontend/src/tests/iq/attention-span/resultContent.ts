export interface AttentionSpanResult {
  level: 'excellent' | 'good' | 'developing';
  title: string;
  summary: string;
  insights: string[];
  sections: {
    strengths: string;
    growthAreas: string;
    practicalApplications: string;
    futurePotential: string;
  };
}

export const resultContent: Record<'excellent' | 'good' | 'developing', AttentionSpanResult> = {
  excellent: {
    level: 'excellent',
    title: '', // Will be filled via localization: tests.attentionSpan.result.excellent.title
    summary: '', // Will be filled via localization: tests.attentionSpan.result.excellent.summary
    insights: [], // Will be filled via localization: tests.attentionSpan.result.excellent.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.attentionSpan.result.excellent.strengths.text
      growthAreas: '', // Will be filled via localization: tests.attentionSpan.result.excellent.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.attentionSpan.result.excellent.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.attentionSpan.result.excellent.futurePotential.text
    }
  },
  good: {
    level: 'good',
    title: '', // Will be filled via localization: tests.depression.result.good.title
    summary: '', // Will be filled via localization: tests.depression.result.good.summary
    insights: [], // Will be filled via localization: tests.depression.result.good.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.depression.result.good.strengths.text
      growthAreas: '', // Will be filled via localization: tests.depression.result.good.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.depression.result.good.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.depression.result.good.futurePotential.text
    }
  },
  developing: {
    level: 'developing',
    title: '', // Will be filled via localization: tests.depression.result.developing.title
    summary: '', // Will be filled via localization: tests.depression.result.developing.summary
    insights: [], // Will be filled via localization: tests.depression.result.developing.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.depression.result.developing.strengths.text
      growthAreas: '', // Will be filled via localization: tests.depression.result.developing.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.depression.result.developing.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.depression.result.developing.futurePotential.text
    }
  }
};
