export interface PerfectionismResult {
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

export const resultContent: Record<'excellent' | 'good' | 'developing', PerfectionismResult> = {
  excellent: {
    level: 'excellent',
    title: '', // Will be filled via localization: tests.perfectionism.result.excellent.title
    summary: '', // Will be filled via localization: tests.perfectionism.result.excellent.summary
    insights: [], // Will be filled via localization: tests.perfectionism.result.excellent.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.perfectionism.result.excellent.strengths.text
      growthAreas: '', // Will be filled via localization: tests.perfectionism.result.excellent.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.perfectionism.result.excellent.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.perfectionism.result.excellent.futurePotential.text
    }
  },
  good: {
    level: 'good',
    title: '', // Will be filled via localization: tests.perfectionism.result.good.title
    summary: '', // Will be filled via localization: tests.perfectionism.result.good.summary
    insights: [], // Will be filled via localization: tests.perfectionism.result.good.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.perfectionism.result.good.strengths.text
      growthAreas: '', // Will be filled via localization: tests.perfectionism.result.good.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.perfectionism.result.good.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.perfectionism.result.good.futurePotential.text
    }
  },
  developing: {
    level: 'developing',
    title: '', // Will be filled via localization: tests.perfectionism.result.developing.title
    summary: '', // Will be filled via localization: tests.perfectionism.result.developing.summary
    insights: [], // Will be filled via localization: tests.perfectionism.result.developing.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.perfectionism.result.developing.strengths.text
      growthAreas: '', // Will be filled via localization: tests.perfectionism.result.developing.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.perfectionism.result.developing.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.perfectionism.result.developing.futurePotential.text
    }
  }
};
