export interface AmbitionResult {
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

export const resultContent: Record<'excellent' | 'good' | 'developing', AmbitionResult> = {
  excellent: {
    level: 'excellent',
    title: '', // Will be filled via localization: tests.ambition.result.excellent.title
    summary: '', // Will be filled via localization: tests.ambition.result.excellent.summary
    insights: [], // Will be filled via localization: tests.ambition.result.excellent.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.ambition.result.excellent.strengths.text
      growthAreas: '', // Will be filled via localization: tests.ambition.result.excellent.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.ambition.result.excellent.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.ambition.result.excellent.futurePotential.text
    }
  },
  good: {
    level: 'good',
    title: '', // Will be filled via localization: tests.ambition.result.good.title
    summary: '', // Will be filled via localization: tests.ambition.result.good.summary
    insights: [], // Will be filled via localization: tests.ambition.result.good.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.ambition.result.good.strengths.text
      growthAreas: '', // Will be filled via localization: tests.ambition.result.good.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.ambition.result.good.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.ambition.result.good.futurePotential.text
    }
  },
  developing: {
    level: 'developing',
    title: '', // Will be filled via localization: tests.ambition.result.developing.title
    summary: '', // Will be filled via localization: tests.ambition.result.developing.summary
    insights: [], // Will be filled via localization: tests.ambition.result.developing.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.ambition.result.developing.strengths.text
      growthAreas: '', // Will be filled via localization: tests.ambition.result.developing.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.ambition.result.developing.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.ambition.result.developing.futurePotential.text
    }
  }
};
