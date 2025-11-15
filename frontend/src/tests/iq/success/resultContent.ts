export interface SuccessResult {
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

export const resultContent: Record<'excellent' | 'good' | 'developing', SuccessResult> = {
  excellent: {
    level: 'excellent',
    title: '', // Will be filled via localization: tests.success.result.excellent.title
    summary: '', // Will be filled via localization: tests.success.result.excellent.summary
    insights: [], // Will be filled via localization: tests.success.result.excellent.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.success.result.excellent.strengths.text
      growthAreas: '', // Will be filled via localization: tests.success.result.excellent.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.success.result.excellent.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.success.result.excellent.futurePotential.text
    }
  },
  good: {
    level: 'good',
    title: '', // Will be filled via localization: tests.success.result.good.title
    summary: '', // Will be filled via localization: tests.success.result.good.summary
    insights: [], // Will be filled via localization: tests.success.result.good.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.success.result.good.strengths.text
      growthAreas: '', // Will be filled via localization: tests.success.result.good.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.success.result.good.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.success.result.good.futurePotential.text
    }
  },
  developing: {
    level: 'developing',
    title: '', // Will be filled via localization: tests.success.result.developing.title
    summary: '', // Will be filled via localization: tests.success.result.developing.summary
    insights: [], // Will be filled via localization: tests.success.result.developing.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.success.result.developing.strengths.text
      growthAreas: '', // Will be filled via localization: tests.success.result.developing.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.success.result.developing.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.success.result.developing.futurePotential.text
    }
  }
};
