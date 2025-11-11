export interface DisorderResult {
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

export const resultContent: Record<'excellent' | 'good' | 'developing', DisorderResult> = {
  excellent: {
    level: 'excellent',
    title: 'Creative Visionary – The Innovative Mind',
    summary: 'Your mind operates like an open creative laboratory. You perceive the world not as a fixed structure but as raw material waiting to be rearranged. Your ideas rarely emerge from thin air—they evolve through deep curiosity, divergent exploration, and a willingness to challenge norms. You see possibilities where others see limitations, and your creativity blends logic, imagination, and intuition seamlessly. This level of insight gives you a natural advantage in problem-solving, storytelling, design, leadership, and innovation. However, your next evolution lies not in generating more ideas—but in choosing which ones deserve your energy.',
    insights: [
      'Strategic focus: You may have dozens of creative sparks every week, but mastery comes from turning one spark into a sustained flame. Learn to prioritize creative projects that align with long-term goals.',
      'Protect your inspiration cycle: You thrive in autonomy. Overly rigid systems or micromanagement drain you. Build environments—mental and physical—that allow unstructured exploration.',
      'Balance freedom with structure: Discipline is not the enemy of creativity—it\'s the scaffolding that keeps your best ideas from collapsing under their own weight.',
      'Collaborate with contrast: Surround yourself with people who challenge you analytically. Their structure sharpens your vision instead of limiting it.',
      'Regenerate your creativity: True visionaries know when to pause. Protect rest, solitude, and play—they are the oxygen of your imagination.'
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
    title: 'Boundary Pusher – The Adaptive Creator',
    summary: 'You have strong creative potential, often seeing the world through lenses that others overlook. You\'re resourceful and adaptive—someone who can take an idea, reshape it, and make it more effective. You\'re likely the "go-to" person when teams get stuck because your brain links concepts fluidly. Yet, you occasionally hesitate to trust your own originality or settle for practicality over brilliance. You\'re standing at the midpoint between imagination and innovation—close enough to greatness that the only barrier left is self-permission.',
    insights: [
      'Build creative confidence: Stop assuming that "unique" means "risky." The world rewards originality, not replication. Practice small acts of creative courage—share your ideas even before they\'re perfect.',
      'Create through constraint: Paradoxically, boundaries make you more inventive. Use time limits, themes, or restrictions as creative catalysts.',
      'Embrace imperfection: Perfectionism kills momentum. Treat every unfinished idea as a prototype—each iteration refines your style and voice.',
      'Observe like an anthropologist: Watch people, systems, and problems with fresh eyes. Creativity often hides in plain sight.',
      'Feed your brain crosswise: Read, travel, and learn outside your comfort zones. The best innovators are intellectual omnivores—they mix disciplines fearlessly.',
      'From adaptable to exceptional: You already think outside the box—now learn when to burn the box completely. Practice risk-taking through experimentation, not theory.'
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
    title: 'Emerging Innovator – The Growing Mind',
    summary: 'You have creative instincts, but they\'re still buried under layers of self-doubt, overthinking, or fear of judgment. You might label yourself as "not creative" simply because you compare your beginnings to others\' mastery. Yet, creativity isn\'t a rare talent—it\'s a muscle, and like any muscle, it grows through consistent use. Every thought you explore, every "what if" you entertain, strengthens your capacity to think freely. The key to unlocking your creative potential lies not in more talent, but in more trust—in your voice, your curiosity, and your process.',
    insights: [
      'Start small, stay consistent: Don\'t wait for grand inspiration. Begin with 10 minutes a day—write, draw, brainstorm, or question something ordinary. Repetition rewires creativity faster than epiphanies.',
      'Silence the inner critic: Perfection is the enemy of progress. Creativity blooms in psychological safety—give yourself permission to fail publicly, experiment privately, and learn continuously.',
      'Consume intentionally: The internet floods you with other people\'s creativity. Choose fewer, deeper sources. What you feed your brain shapes the originality of your output.',
      'Redefine creativity: It\'s not just painting or writing—it\'s how you solve problems, lead conversations, and express empathy. Recognize your creative acts in daily life.',
      'Train your pattern recognition: Pay attention to what fascinates you. Collect fragments—quotes, visuals, questions—and revisit them. Innovation is often the recombination of forgotten thoughts.',
      'Find your medium: Maybe you\'re not bad at creating—you\'re just using the wrong tool. Try different modes: visual, verbal, spatial, digital. Your voice emerges when the medium fits your mind.'
    ],
    sections: {
      strengths: 'You have an observant mind and deep curiosity — two pillars of creativity. You notice details others miss and often see how things could be improved.',
      growthAreas: 'Fear of failure can block your creative growth. Start by sharing small ideas, testing them, and learning. Momentum matters more than perfection.',
      practicalApplications: 'Try creative exercises daily: brainstorming, journaling, or rethinking ordinary tasks. Train your brain to connect new patterns naturally.',
      futurePotential: 'Your creativity is waking up. As you practice expressing it more freely, you\'ll surprise yourself — not with what you imagine, but with how powerfully you can build it.'
    }
  }
};

