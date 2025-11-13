export interface RiskToleranceResult {
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

export const resultContent: Record<'excellent' | 'good' | 'developing', RiskToleranceResult> = {
  excellent: {
    level: 'excellent',
    title: '', // Will be filled via localization: tests.riskTolerance.result.excellent.title
    summary: '', // Will be filled via localization: tests.riskTolerance.result.excellent.summary
    insights: [], // Will be filled via localization: tests.riskTolerance.result.excellent.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.riskTolerance.result.excellent.strengths.text
      growthAreas: '', // Will be filled via localization: tests.riskTolerance.result.excellent.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.riskTolerance.result.excellent.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.riskTolerance.result.excellent.futurePotential.text
    }
  },
  good: {
    level: 'good',
    title: '', // Will be filled via localization: tests.riskTolerance.result.good.title
    summary: '', // Will be filled via localization: tests.riskTolerance.result.good.summary
    insights: [], // Will be filled via localization: tests.riskTolerance.result.good.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.riskTolerance.result.good.strengths.text
      growthAreas: '', // Will be filled via localization: tests.riskTolerance.result.good.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.riskTolerance.result.good.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.riskTolerance.result.good.futurePotential.text
    }
  },
  developing: {
    level: 'developing',
    title: '', // Will be filled via localization: tests.riskTolerance.result.developing.title
    summary: '', // Will be filled via localization: tests.riskTolerance.result.developing.summary
    insights: [], // Will be filled via localization: tests.riskTolerance.result.developing.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.riskTolerance.result.developing.strengths.text
      growthAreas: '', // Will be filled via localization: tests.riskTolerance.result.developing.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.riskTolerance.result.developing.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.riskTolerance.result.developing.futurePotential.text
    }
  }
};



