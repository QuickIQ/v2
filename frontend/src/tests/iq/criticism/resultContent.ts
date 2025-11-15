export interface CriticismResult {
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

export const resultContent: Record<'excellent' | 'good' | 'developing', CriticismResult> = {
  excellent: {
    level: 'excellent',
    title: '', // Will be filled via localization: tests.criticism.result.excellent.title
    summary: '', // Will be filled via localization: tests.criticism.result.excellent.summary
    insights: [], // Will be filled via localization: tests.criticism.result.excellent.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.criticism.result.excellent.strengths.text
      growthAreas: '', // Will be filled via localization: tests.criticism.result.excellent.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.criticism.result.excellent.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.criticism.result.excellent.futurePotential.text
    }
  },
  good: {
    level: 'good',
    title: '', // Will be filled via localization: tests.criticism.result.good.title
    summary: '', // Will be filled via localization: tests.criticism.result.good.summary
    insights: [], // Will be filled via localization: tests.criticism.result.good.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.criticism.result.good.strengths.text
      growthAreas: '', // Will be filled via localization: tests.criticism.result.good.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.criticism.result.good.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.criticism.result.good.futurePotential.text
    }
  },
  developing: {
    level: 'developing',
    title: '', // Will be filled via localization: tests.criticism.result.developing.title
    summary: '', // Will be filled via localization: tests.criticism.result.developing.summary
    insights: [], // Will be filled via localization: tests.criticism.result.developing.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.criticism.result.developing.strengths.text
      growthAreas: '', // Will be filled via localization: tests.criticism.result.developing.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.criticism.result.developing.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.criticism.result.developing.futurePotential.text
    }
  }
};
