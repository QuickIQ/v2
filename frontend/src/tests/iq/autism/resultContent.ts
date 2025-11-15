export interface AutismResult {
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

export const resultContent: Record<'excellent' | 'good' | 'developing', AutismResult> = {
  excellent: {
    level: 'excellent',
    title: '', // Will be filled via localization: tests.autism.result.excellent.title
    summary: '', // Will be filled via localization: tests.autism.result.excellent.summary
    insights: [], // Will be filled via localization: tests.autism.result.excellent.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.autism.result.excellent.strengths.text
      growthAreas: '', // Will be filled via localization: tests.autism.result.excellent.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.autism.result.excellent.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.autism.result.excellent.futurePotential.text
    }
  },
  good: {
    level: 'good',
    title: '', // Will be filled via localization: tests.autism.result.good.title
    summary: '', // Will be filled via localization: tests.autism.result.good.summary
    insights: [], // Will be filled via localization: tests.autism.result.good.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.autism.result.good.strengths.text
      growthAreas: '', // Will be filled via localization: tests.autism.result.good.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.autism.result.good.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.autism.result.good.futurePotential.text
    }
  },
  developing: {
    level: 'developing',
    title: '', // Will be filled via localization: tests.autism.result.developing.title
    summary: '', // Will be filled via localization: tests.autism.result.developing.summary
    insights: [], // Will be filled via localization: tests.autism.result.developing.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.autism.result.developing.strengths.text
      growthAreas: '', // Will be filled via localization: tests.autism.result.developing.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.autism.result.developing.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.autism.result.developing.futurePotential.text
    }
  }
};

