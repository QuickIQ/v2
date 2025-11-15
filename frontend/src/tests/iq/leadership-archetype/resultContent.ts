export interface LeadershipArchetypeResult {
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

export const resultContent: Record<'excellent' | 'good' | 'developing', LeadershipArchetypeResult> = {
  excellent: {
    level: 'excellent',
    title: '', // Will be filled via localization: tests.leadershipArchetype.result.excellent.title
    summary: '', // Will be filled via localization: tests.leadershipArchetype.result.excellent.summary
    insights: [], // Will be filled via localization: tests.leadershipArchetype.result.excellent.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.leadershipArchetype.result.excellent.strengths.text
      growthAreas: '', // Will be filled via localization: tests.leadershipArchetype.result.excellent.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.leadershipArchetype.result.excellent.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.leadershipArchetype.result.excellent.futurePotential.text
    }
  },
  good: {
    level: 'good',
    title: '', // Will be filled via localization: tests.leadershipArchetype.result.good.title
    summary: '', // Will be filled via localization: tests.leadershipArchetype.result.good.summary
    insights: [], // Will be filled via localization: tests.leadershipArchetype.result.good.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.leadershipArchetype.result.good.strengths.text
      growthAreas: '', // Will be filled via localization: tests.leadershipArchetype.result.good.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.leadershipArchetype.result.good.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.leadershipArchetype.result.good.futurePotential.text
    }
  },
  developing: {
    level: 'developing',
    title: '', // Will be filled via localization: tests.leadershipArchetype.result.developing.title
    summary: '', // Will be filled via localization: tests.leadershipArchetype.result.developing.summary
    insights: [], // Will be filled via localization: tests.leadershipArchetype.result.developing.insights
    sections: {
      strengths: '', // Will be filled via localization: tests.leadershipArchetype.result.developing.strengths.text
      growthAreas: '', // Will be filled via localization: tests.leadershipArchetype.result.developing.growthAreas.text
      practicalApplications: '', // Will be filled via localization: tests.leadershipArchetype.result.developing.practicalApplications.text
      futurePotential: '', // Will be filled via localization: tests.leadershipArchetype.result.developing.futurePotential.text
    }
  }
};
