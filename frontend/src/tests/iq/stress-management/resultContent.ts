export interface StressManagementResult {
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

export const resultContent: Record<'excellent' | 'good' | 'developing', StressManagementResult> = {
  excellent: {
    level: 'excellent',
    title: '', // Will be filled via localization: tests.stressManagement.result.excellent.title
    summary: '', // Will be filled via localization: tests.stressManagement.result.excellent.summary
    insights: [], // Will be filled via localization: tests.stressManagement.result.excellent.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.stressManagement.result.excellent.strengths.text
      growthAreas: '', // Will be filled via localization: tests.stressManagement.result.excellent.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.stressManagement.result.excellent.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.stressManagement.result.excellent.futurePotential.text
    }
  },
  good: {
    level: 'good',
    title: '', // Will be filled via localization: tests.stressManagement.result.good.title
    summary: '', // Will be filled via localization: tests.stressManagement.result.good.summary
    insights: [], // Will be filled via localization: tests.stressManagement.result.good.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.stressManagement.result.good.strengths.text
      growthAreas: '', // Will be filled via localization: tests.stressManagement.result.good.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.stressManagement.result.good.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.stressManagement.result.good.futurePotential.text
    }
  },
  developing: {
    level: 'developing',
    title: '', // Will be filled via localization: tests.stressManagement.result.developing.title
    summary: '', // Will be filled via localization: tests.stressManagement.result.developing.summary
    insights: [], // Will be filled via localization: tests.stressManagement.result.developing.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.stressManagement.result.developing.strengths.text
      growthAreas: '', // Will be filled via localization: tests.stressManagement.result.developing.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.stressManagement.result.developing.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.stressManagement.result.developing.futurePotential.text
    }
  }
};
