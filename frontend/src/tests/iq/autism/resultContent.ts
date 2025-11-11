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
    title: 'High Social Awareness',
    summary: 'You demonstrate strong awareness of social signals, emotions, and patterns in communication. You naturally recognize subtle cues like tone, gestures, and unspoken context, allowing you to connect easily with others. Your empathy and attention to details help you navigate complex social situations smoothly. To keep improving, continue exploring new perspectives and environments — creativity grows when curiosity meets empathy.',
    insights: [
      'Practice active listening in conversations.',
      'Try new group activities that challenge your adaptability.',
      'Reflect on how your awareness can help others feel more understood.'
    ],
    sections: {
      strengths: 'You think in systems, not fragments. Your mind sees invisible links between ideas and builds elegant bridges others miss. You can adapt creativity to real-world problems, turning abstract thought into action.',
      growthAreas: 'Sometimes your ideas move faster than your plans. Learn to slow down your process just enough to refine what matters. Focus brings your creativity from "brilliant" to "unforgettable."',
      practicalApplications: 'Use your vision in places where innovation meets people — design, leadership, communication, and strategic planning. Your creative insight can inspire, organize, and transform teams.',
      futurePotential: 'If you continue expanding your creative discipline, you could become a pioneer — someone who not only imagines change but engineers it. The next big idea might already be in your notebook.'
    }
  },
  good: {
    level: 'good',
    title: 'Balanced Social Perception',
    summary: 'You often understand how others feel and what they mean, though sometimes social cues might be less clear to you. You have an intuitive sense of connection but might need extra time in fast-changing or emotional settings. Your logical approach helps you analyze situations calmly — a strength in both personal and professional life. To grow further, try blending emotional and logical understanding when communicating with others.',
    insights: [
      'Slow down and observe emotional details during conversations.',
      'Ask clarifying questions instead of assuming meaning.',
      'Balance logical thinking with emotional awareness.'
    ],
    sections: {
      strengths: 'You\'re curious, adaptive, and brave enough to challenge the ordinary. You mix logic and imagination to produce fresh, useful ideas. You see patterns quickly and apply them practically.',
      growthAreas: 'You sometimes doubt your originality or second-guess bold choices. Trust your instincts more. Creativity grows through confident risk-taking, not endless revision.',
      practicalApplications: 'Apply creative thinking to small, everyday situations — workflow, conversations, problem-solving. Every daily innovation strengthens your creative mindset.',
      futurePotential: 'By strengthening your courage to experiment and lead with your ideas, you can move from "creative thinker" to "creative leader." Your next version is bolder and freer.'
    }
  },
  developing: {
    level: 'developing',
    title: 'Unique Perception Style',
    summary: 'You tend to process the world differently — noticing patterns, structures, and ideas that others often miss. Social cues may sometimes feel confusing or irrelevant, but this difference can be a deep creative strength. You might connect better through ideas, honesty, and clear logic rather than emotional hints. With small, mindful steps, you can improve comfort in social interactions while keeping your authentic perspective.',
    insights: [
      'Observe body language and tone gradually without pressure.',
      'Engage in one-on-one conversations rather than large groups.',
      'Use your clarity and focus to create meaningful, logical connections.'
    ],
    sections: {
      strengths: 'You have an observant mind and deep curiosity — two pillars of creativity. You notice details others miss and often see how things could be improved.',
      growthAreas: 'Fear of failure can block your creative growth. Start by sharing small ideas, testing them, and learning. Momentum matters more than perfection.',
      practicalApplications: 'Try creative exercises daily: brainstorming, journaling, or rethinking ordinary tasks. Train your brain to connect new patterns naturally.',
      futurePotential: 'Your creativity is waking up. As you practice expressing it more freely, you\'ll surprise yourself — not with what you imagine, but with how powerfully you can build it.'
    }
  }
};

