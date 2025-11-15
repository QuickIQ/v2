export interface TeamPlayerResult {
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

export const resultContent: Record<'excellent' | 'good' | 'developing', TeamPlayerResult> = {
  excellent: {
    level: 'excellent',
    title: '', // Will be filled via localization: tests.teamPlayer.result.excellent.title
    summary: '', // Will be filled via localization: tests.teamPlayer.result.excellent.summary
    insights: [], // Will be filled via localization: tests.teamPlayer.result.excellent.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.teamPlayer.result.excellent.strengths.text
      growthAreas: '', // Will be filled via localization: tests.teamPlayer.result.excellent.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.teamPlayer.result.excellent.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.teamPlayer.result.excellent.futurePotential.text
    }
  },
  good: {
    level: 'good',
    title: '', // Will be filled via localization: tests.teamPlayer.result.good.title
    summary: '', // Will be filled via localization: tests.teamPlayer.result.good.summary
    insights: [], // Will be filled via localization: tests.teamPlayer.result.good.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.teamPlayer.result.good.strengths.text
      growthAreas: '', // Will be filled via localization: tests.teamPlayer.result.good.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.teamPlayer.result.good.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.teamPlayer.result.good.futurePotential.text
    }
  },
  developing: {
    level: 'developing',
    title: '', // Will be filled via localization: tests.teamPlayer.result.developing.title
    summary: '', // Will be filled via localization: tests.teamPlayer.result.developing.summary
    insights: [], // Will be filled via localization: tests.teamPlayer.result.developing.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.teamPlayer.result.developing.strengths.text
      growthAreas: '', // Will be filled via localization: tests.teamPlayer.result.developing.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.teamPlayer.result.developing.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.teamPlayer.result.developing.futurePotential.text
    }
  }
};
