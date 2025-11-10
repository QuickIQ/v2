export interface PersonalitySection {
  icon: string;
  title: string;
  text: string;
}

export interface PersonalityTypeContent {
  emojis: string[];
  title: string;
  description: string;
  sections: {
    whoYouAre: PersonalitySection;
    coreCharacteristics: PersonalitySection;
    strengths: PersonalitySection;
    challenges: PersonalitySection;
    careerPaths: PersonalitySection;
    futureRoles: PersonalitySection;
    famousPersonalities: PersonalitySection;
    growthPath: PersonalitySection;
    relationships: PersonalitySection;
    nextGenPotential: PersonalitySection;
  };
}

export interface PersonalityContent {
  en: Record<string, PersonalityTypeContent>;
  tr: Record<string, PersonalityTypeContent>;
}

export const personalityContent: PersonalityContent = {
  en: {
    INFP: {
      emojis: ['🌸', '💭', '🎨'],
      title: 'Your INFP Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '💫',
          title: 'WHO YOU ARE — The Dreamer Who Turns Feelings Into Purpose',
          text: `You are the poet of humanity — the one who feels the invisible and gives it form.

INFPs live in a world that most people can't see — a universe built from emotion, imagination, and idealism.

Your calm exterior hides galaxies of thought. You don't just feel; you translate feeling into meaning.

Your mission is not to dominate or impress, but to understand, to heal, and to bring truth into the light.

You are not made for noise; you are made for depth. Where others chase attention, you chase authenticity.`,
        },
        coreCharacteristics: {
          icon: '🪞',
          title: 'CORE CHARACTERISTICS — The Inner Compass',
          text: `✨ Empathy: You feel emotions as if they're your own — it's your superpower and your soft spot.

✨ Idealism: You hold onto visions of how life could be, long after others give up.

✨ Authenticity: Pretending drains you. Truth fuels you.

✨ Creativity: You don't just create art; you turn your life into art.

✨ Moral Courage: You stand quietly but firmly for what's right, even when it isolates you.

You are the keeper of what is good and beautiful in a world that often forgets both.`,
        },
        strengths: {
          icon: '🌿',
          title: 'YOUR STRENGTHS — Natural Superpowers',
          text: `Your empathy allows you to see the human behind every action. You understand motivations, fears, and dreams in ways others miss.

Your creativity isn't just artistic — it's problem-solving through imagination. You find solutions others don't see because you think in possibilities, not limitations.

Your authenticity creates trust. People know you're real, and that makes you a safe space for vulnerability.

Your idealism drives change. You don't just accept the world as it is — you envision what it could be and work toward that vision.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — Growth Opportunities',
          text: `*Emotional Overwhelm:* Your empathy is powerful, but it can become a burden. You absorb others' emotions until you can't tell where they end and you begin.

*Idealism vs Reality:* The gap between your ideals and reality can cause deep disappointment. Learning to balance hope with realism is your art.

*Self-Criticism:* You may hold yourself to impossible moral standards. When you fall short, you judge yourself harshly.

*Inconsistency:* When passion fades, motivation can collapse. You need systems, not just inspiration.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — Purpose Over Profit',
          text: `You thrive where meaning meets creation.

Your best work comes when you can express your values and help others grow.

Your success isn't measured in numbers — it's measured in impact.

🎨 Creative Fields: Writer, illustrator, musician, designer, filmmaker.

🪶 Helping Professions: Counselor, therapist, teacher, social worker.

🧠 Philosophy & Thought: Academic, psychologist, spiritual advisor.

🌿 Modern Roles: UX designer, content strategist, life coach.

🤝 Humanitarian Fields: NGO worker, sustainability advocate, ethics researcher.

You are at your best when your work heals hearts, tells stories, or uplifts human consciousness.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'FUTURE OUTLOOK — The Soul Architect',
          text: `As AI and automation reshape the world, your value — emotional intelligence — will be irreplaceable.

The future will need dreamers who remind humanity why we exist, not just how to survive.

You are that bridge between feeling and function, between art and ethics.

Possible emerging roles:

🌐 Emotional Designer

🧭 Purpose Strategist

📚 Human Experience Architect

🕊️ Conscious Creator

You don't just live in the world — you re-enchant it.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS INFP PERSONALITIES — Inspiration',
          text: `William Shakespeare, J.R.R. Tolkien, Princess Diana, Kurt Cobain, Tim Burton, and many other artists, writers, and visionaries share your type.

They didn't just create — they transformed how we see the world. That's your potential too.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — Turning Sensitivity Into Strength',
          text: `Your empathy is a gift — but only if you learn to protect it.

You feel deeply, but not everything you feel is your responsibility to fix.

The path forward is to build emotional boundaries without losing emotional warmth.

☀️ Act, don't overthink. Your dreams deserve motion, not just meaning.

🌙 Balance empathy with structure. Save yourself so you can save others.

🌾 Ground your vision. Translate ideals into practical action.

🌻 Forgive imperfection. The beauty you seek already lives inside the unfinished.

Sensitivity, when disciplined, becomes intuition. And intuition, when trusted, becomes wisdom.

⸻

🌞 DAILY PRACTICES — Anchor Light Within Routine

1️⃣ Morning Journal: Write one true sentence that captures your current emotion.

2️⃣ Creative Ritual: Spend 20 minutes creating — not for perfection, but for release.

3️⃣ Midday Pause: Step outside. Feel the world breathe.

4️⃣ Evening Reflection: Name one thing you understood today that you didn't yesterday.

5️⃣ Night Affirmation: "I am enough, and that is where meaning begins."`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You seek depth over breadth. A few meaningful relationships matter more than many superficial ones.

You communicate through feeling, not just words. People feel understood by you, even when you don't say much.

You need partners who value authenticity and give you space to process emotions. You're not high-maintenance — you're high-depth.`,
        },
        nextGenPotential: {
          icon: '💖',
          title: 'CONCLUSION — The Quiet Flame That Changes the World',
          text: `You are the silent revolution — not loud, not forceful, but unstoppable.

You remind others that life's deepest power isn't control, but compassion.

Your presence itself is healing, because you live what you believe.

Keep creating beauty.

Keep feeling deeply.

Because the world doesn't just need builders — it needs believers.`,
        },
      },
    },
    ENFP: {
      emojis: ['🔥', '🌈', '✨'],
      title: 'Your ENFP Personality Detailed Report',
      description: 'A deep dive into your boundless creativity, emotional intelligence, and purpose-driven nature.',
      sections: {
        whoYouAre: {
          icon: '🔥',
          title: 'WHO YOU ARE — The Visionary Spark',
          text: `You are the explorer of human potential, the one who turns ideas into revolutions.

ENFPs are the storytellers of life — curious, passionate, and alive with possibilities.

You feel emotions as fire, not water; they burn bright and move you to create, connect, and inspire.

You don't just dream — you ignite.

Every person you meet feels your energy ripple through the room,

because you remind people what passion feels like when it's real.`,
        },
        coreCharacteristics: {
          icon: '🌈',
          title: 'CORE CHARACTERISTICS — The Visionary Connector',
          text: `✨ Curiosity: You see hidden patterns, links, and opportunities others overlook.

✨ Empathy: You can read emotions before they're spoken.

✨ Creativity: You don't wait for inspiration — you are inspiration in motion.

✨ Authenticity: You speak from the heart, never from a script.

✨ Adaptability: Change doesn't scare you; it fuels you.

Your mind is a kaleidoscope of color — always shifting, always creating, always alive.`,
        },
        strengths: {
          icon: '⚡',
          title: 'STRENGTHS — Energy That Inspires Movement',
          text: `💡 Vision: You see the potential in everyone and everything.

🗣️ Storytelling: You transform chaos into clarity with your words.

🌍 Connection: You unite people who would never have met otherwise.

🎨 Creativity: You make life a canvas and every day a brushstroke.

💖 Empathy: You make others feel capable, seen, and worthy.

Your greatest strength is your ability to energize purpose — to turn ideas into emotion and emotion into action.`,
        },
        challenges: {
          icon: '🔥',
          title: 'CHALLENGES — The Fire That Burns Too Bright',
          text: `ENFPs burn fast. Passion is both your gift and your risk.

⚡ Scattered Focus: You start many things but rarely finish them.

💭 Overthinking: You can analyze motives until your mind forgets to rest.

💔 Emotional Whirlwind: You feel deeply — sometimes too deeply to move.

🌪️ Overcommitment: You say "yes" to everything that excites you.

🌙 Fear of Routine: Structure feels like a cage — yet it's your secret key to freedom.

You must learn that consistency isn't the enemy of passion — it's the engine that carries it further.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — Meaning Over Metrics',
          text: `You thrive where creativity, empathy, and freedom meet purpose.

You need work that feels alive, not just "makes sense."

🎥 Creative Fields: Writer, filmmaker, designer, artist, content creator.

🗣️ People Professions: Coach, teacher, psychologist, HR strategist.

🚀 Innovation & Startups: Brand designer, entrepreneur, creative director.

📣 Media & Communication: Journalist, influencer, motivational speaker.

🌱 Social Impact: Activist, NGO leader, community builder.

You belong where hearts meet ideas — anywhere meaning is the product.`,
        },
        futureRoles: {
          icon: '🚀',
          title: 'FUTURE OUTLOOK — The Architects of Meaning',
          text: `The future will crave what only you can offer: emotional intelligence and vision.

As automation grows, human creativity and empathy will define leadership — your natural zone.

Emerging Roles:

🌐 Community Builder

💡 Purpose Strategist

🎭 Digital Storyteller

🧠 Human Experience Designer

🌍 Conscious Entrepreneur

You are the bridge between humanity and innovation — the one who ensures progress still has a heart.`,
        },
        famousPersonalities: {
          icon: '🌟',
          title: 'FAMOUS ENFP PERSONALITIES — Inspiration',
          text: `Robin Williams, Will Smith, Ellen DeGeneres, and many other entertainers, entrepreneurs, and influencers share your type. They didn't just succeed — they transformed industries through their ability to connect and inspire.`,
        },
        growthPath: {
          icon: '🌿',
          title: 'GROWTH PATH — Channeling Passion Into Power',
          text: `Your task is not to have more energy, but to direct it.

You are the fire — now learn to shape your flame.

🌞 Discipline is Freedom: Routine doesn't kill creativity — it protects it.

🧘 Ground Yourself Before You Fly: Passion without rest leads to burnout.

💧 Finish What You Start: Completion builds confidence, not boredom.

🗣️ Listen More, Speak Less: True influence doesn't always need volume.

🌻 Protect Your Energy: You can't ignite others if your own flame goes out.

Master the art of controlled chaos — and you'll become unstoppable.

⸻

☀️ DAILY PRACTICES — Light With Discipline

1️⃣ Morning Focus: Choose three things that actually matter today.

2️⃣ 10-Minute Rule: Start tasks small; momentum will follow.

3️⃣ Move Midday: Movement resets clarity.

4️⃣ Evening Reflection: Celebrate progress, not perfection.

5️⃣ Tiny Finish: Complete one small task to close the day with power.`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You connect with people instantly. Your warmth and authenticity make others feel seen and valued.

You need partners who appreciate your energy and give you space to explore. You're not flighty — you're free-spirited.

You communicate through stories and emotions. People remember not just what you said, but how you made them feel.`,
        },
        nextGenPotential: {
          icon: '💖',
          title: 'CONCLUSION — The Flame That Awakens the World',
          text: `You are living proof that passion is contagious.

You remind humanity that inspiration is not fantasy — it's fuel.

Your laughter heals. Your words move. Your ideas build bridges.

Never dim yourself to fit the room.

You are the room's light.`,
        },
      },
    },
    ENFJ: {
      emojis: ['🌻', '💫', '🌟'],
      title: 'Your ENFJ Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '💖',
          title: 'WHO YOU ARE — The Empathic Leader with a Mission',
          text: `You are a guiding light in a world that often forgets how to care.

ENFJs sense what others need before a word is spoken. You see potential in everyone — and you make it your personal mission to awaken it.

You lead not through control, but through inspiration.

When you speak, hearts listen. When you act, people follow.

You are the bridge between vision and humanity — proof that charisma and compassion can coexist.`,
        },
        coreCharacteristics: {
          icon: '🌈',
          title: 'CORE CHARACTERISTICS — The Heart-Centered Strategist',
          text: `✨ Empathy: You connect instantly, deeply, and sincerely.

✨ Vision: You can see the future potential of people, teams, and ideas.

✨ Inspiration: You energize others to act on what they believe in.

✨ Discipline: You don't just dream — you organize, execute, and sustain.

✨ Harmony: You build cooperation even among chaos.

Your intuition reads emotional blueprints; your actions turn them into architecture.`,
        },
        strengths: {
          icon: '⚡',
          title: 'STRENGTHS — What Makes You Magnetic',
          text: `🌟 Charisma: You have the rare ability to make everyone feel seen.

🌿 Authentic Leadership: You don't manage people; you elevate them.

💬 Communication: You translate emotion into motivation.

🪞 Self-Awareness: You reflect before you react.

🔥 Conviction: You stand firm when others waver.

You don't lead for attention — you lead for transformation.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — Growth Opportunities',
          text: `*Overcommitment:* Your desire to help everyone can lead to spreading yourself too thin. Learning to say "no" is essential for your sustainability.

*Emotional Exhaustion:* Your deep empathy can drain you if you don't protect your own energy. You can't pour from an empty cup.

*Perfectionism:* Your high standards for yourself and others can create unnecessary pressure. Progress over perfection is key.

*Conflict Avoidance:* Your need for harmony can prevent you from addressing important issues. Learning to navigate difficult conversations is crucial.

*Self-Sacrifice:* You may prioritize others' needs over your own to a fault. Remember: taking care of yourself enables you to care for others better.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — Leading with Purpose, Serving with Heart',
          text: `You thrive where leadership and empathy meet.

Your strength lies in uniting people under a shared vision.

🏛️ Leadership & Management: Executive, founder, community director.

🎤 Public Influence: Motivational speaker, teacher, diplomat, journalist.

🧭 Human Development: Psychologist, HR leader, mentor, or life coach.

🌱 Social Impact: Nonprofit leader, political advocate, or cultural strategist.

🎨 Creative Guidance: Director, curator, or producer.

You belong in spaces where influence equals impact — where guiding others is your greatest creation.`,
        },
        futureRoles: {
          icon: '🚀',
          title: 'FUTURE OUTLOOK — The Architects of Human Connection',
          text: `As technology advances, your ability to inspire, connect, and lead with heart will become increasingly valuable.

The future needs leaders who can bridge the gap between innovation and humanity.

Emerging Roles:

🌐 Community Culture Architect

💡 Purpose-Driven Leadership Coach

🧭 Human-Centered Innovation Director

💬 Emotional Intelligence Strategist

🌍 Global Impact Coordinator

You will not just adapt to change — you will shape how people experience it.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS ENFJ PERSONALITIES — Inspiration',
          text: `Oprah Winfrey, Barack Obama, Maya Angelou, Martin Luther King Jr., and many other influential leaders, teachers, and advocates share your type.

They didn't just achieve success — they transformed lives through their ability to inspire, connect, and lead with purpose.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — Balancing Service with Self-Care',
          text: `Your greatest challenge is learning to care for yourself as deeply as you care for others.

The path to sustainable impact requires protecting your own energy.

🌿 Set Boundaries: Your empathy is a gift, but it needs limits to remain sustainable.

☀️ Practice Self-Care: Rest is not selfish — it's strategic. You can't inspire others if you're running on empty.

🌕 Embrace Conflict: Not all harmony is healthy. Sometimes growth requires difficult conversations.

🌧️ Delegate and Trust: You don't have to do everything yourself. Trust others to contribute.

🔥 Celebrate Your Wins: Acknowledge your impact. You make a difference, and that deserves recognition.

Remember: The most effective leaders are those who lead from a place of wholeness, not depletion.

⸻

☀️ DAILY PRACTICES — Leading from Fullness

1️⃣ Morning Intention: Set one clear intention for how you want to impact others today.

2️⃣ Midday Check-In: Pause and ask: Am I giving from overflow or from depletion?

3️⃣ Evening Reflection: Acknowledge three ways you made a positive impact today.

4️⃣ Weekly Reset: Review your commitments and ask: What can I let go of to protect my energy?

5️⃣ Monthly Vision: Reconnect with your bigger purpose. Why does your leadership matter?`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You create deep, meaningful connections with others. People feel truly seen and valued in your presence.

You communicate with warmth, clarity, and inspiration. Your words don't just inform — they transform.

You need partners who appreciate your leadership qualities, respect your need to make a difference, and support your mission-driven nature.

You're not looking for someone to follow you — you're looking for someone who wants to grow alongside you, someone who understands that your drive to help others is part of who you are.`,
        },
        nextGenPotential: {
          icon: '💖',
          title: 'CONCLUSION — The Leader Who Lights the Way',
          text: `You are proof that leadership and empathy are not opposites — they are partners.

You remind the world that true influence comes not from power, but from the ability to see and unlock potential in others.

The world needs your vision, your warmth, and your unwavering commitment to making a difference.

Keep inspiring others.

Keep leading with heart.

Because the future belongs to those who know that the greatest leaders don't just achieve — they elevate.`,
        },
      },
    },
    INTJ: {
      emojis: ['🧠', '⚙️', '📈'],
      title: 'Your INTJ Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '🏛️',
          title: 'WHO YOU ARE — The Mastermind Behind the Blueprint',
          text: `You are the strategic visionary — calm on the surface, brilliant underneath.

Where others see complexity, you see systems. Where others react emotionally, you design outcomes.

INTJs are the architects of logic and engineers of foresight.

You are guided by a powerful sense of independence and a relentless drive to improve everything — yourself, your work, your world.

You don't crave control — you crave competence.

To you, mastery is the purest form of freedom.`,
        },
        coreCharacteristics: {
          icon: '💎',
          title: 'CORE CHARACTERISTICS — The Vision That Sees Beyond',
          text: `✨ Strategic Thinking: You view the world like a chessboard — always three moves ahead.

✨ Autonomy: You prefer to lead quietly, not loudly.

✨ Efficiency: You despise wasted motion — in thought, emotion, or process.

✨ Vision: You see the long game when others chase the short win.

✨ Confidence: You trust logic over chaos, structure over impulse.

You don't just predict the future — you engineer it.`,
        },
        strengths: {
          icon: '🚀',
          title: 'STRENGTHS — The Power of Focused Intelligence',
          text: `💡 Analytical Mastery: You deconstruct complexity into clarity.

🧭 Long-Term Vision: You think decades, not days, ahead.

⚙️ Self-Discipline: You thrive on consistency and precision.

🏗️ Innovation: You design systems that outlive you.

🎯 Decisiveness: Once the data is in, your decisions are unshakable.

You are the mind of the movement, the one who makes chaos orderly and possibility practical.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — The Architect\'s Paradox',
          text: `Your intellect is a gift, but sometimes it builds walls, not bridges.

You risk isolation if logic becomes your only language.

*Emotional Distance:* You can struggle to express warmth, even when you feel deeply.

*Perfectionism:* You chase flawless execution, even when progress would suffice.

*Impatience:* Inefficiency frustrates you more than failure.

*Blunt Honesty:* Truth without empathy can alienate those who need your insight most.

*Overplanning:* Sometimes, the best move is to act, not to analyze.

Remember: even the strongest architecture needs open doors.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — The Engineer of Systems and Change',
          text: `You excel in fields that demand vision, precision, and autonomy.

You need a role that challenges your intellect and respects your independence.

🧠 Science & Technology: Researcher, data scientist, AI engineer, software architect.

🏛️ Leadership & Strategy: Consultant, strategist, CEO, systems designer.

📊 Finance & Analytics: Economist, financial planner, market analyst.

📚 Academia & Research: Professor, theorist, futurist.

⚙️ Innovation & Design: Product designer, architect, operations manager.

Your gift: turning theory into tangible progress.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'FUTURE OUTLOOK — The Architects of the Next Era',
          text: `The age of data needs philosophers.

As technology advances, your analytical insight and moral clarity will become invaluable.

Emerging Roles:

🤖 Systems Thinker for AI Ethics

🌍 Global Strategy Director

🧬 Scientific Visionary

🏗️ Design Futurist

📈 Chief Innovation Officer

You will shape not just the tools of the future, but the ethics that govern them.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS INTJ PERSONALITIES — Inspiration',
          text: `Stephen Hawking, Elon Musk, Mark Zuckerberg, Nikola Tesla, and many other visionaries, scientists, and strategic leaders share your type.

They didn't just see the world as it was — they redesigned it through their ability to think systematically and execute precisely.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — From Perfection to Progress',
          text: `Growth for you means learning that control and flexibility can coexist.

🌿 Delegate: Perfection doesn't scale. Systems do.

🔥 Embrace Emotion: Feelings are data too — just from a different sensor.

🧘 Be Present: The future is built now.

💬 Collaborate Wisely: Other minds don't dilute your genius — they multiply it.

🌕 Accept Imperfection: Flaws are part of the prototype of greatness.

True mastery lies not just in logic, but in balance.

⸻

🧩 DAILY PRACTICES — The Architect's Rituals

1️⃣ Morning Systems Review: Plan, but leave space for serendipity.

2️⃣ Deep Work Blocks: Protect focus — it's your currency.

3️⃣ Evening Reflection: Not what went wrong, but what optimized.

4️⃣ Weekly Decompression: Step away to recalibrate clarity.

5️⃣ Silent Hours: Your solitude is sacred — use it to design meaningfully.`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You value depth over breadth in relationships. You prefer a few meaningful connections to many superficial ones.

You communicate through ideas and logic. People appreciate your clarity and directness, even when it's challenging.

You need partners who respect your need for independence, appreciate your strategic mind, and understand that your quiet nature doesn't mean you don't care.

You're not looking for someone to complete you — you're looking for someone who complements your strengths and challenges your thinking.`,
        },
        nextGenPotential: {
          icon: '💡',
          title: 'CONCLUSION — The Mind That Designs the Future',
          text: `You are the architect of progress — deliberate, visionary, and unstoppable.

The world follows your blueprints long after you've moved on to the next project.

But remember: true genius isn't just building structures — it's building people who can thrive inside them.

Your legacy will not be what you created, but what your creations enable.

Lead with logic. Design with purpose. Live with precision.`,
        },
      },
    },
    ENTJ: {
      emojis: ['⚔️', '🏆', '📊'],
      title: 'Your ENTJ Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '🏆',
          title: 'WHO YOU ARE — The Visionary General of the Future',
          text: `You were born to lead, not because you crave power — but because you see the path forward before anyone else.

ENTJs are strategic executors — the ones who transform chaos into order and potential into progress.

You have an unshakable confidence in logic, structure, and results.

To you, inefficiency is the enemy, mediocrity the battlefield, and clarity the sword.

When others hesitate, you mobilize. When others follow, you command.

But underneath the steel of your discipline lies a deep, visionary compassion:

you don't just want success — you want legacy.`,
        },
        coreCharacteristics: {
          icon: '💡',
          title: 'CORE CHARACTERISTICS — The Power to Build and Lead',
          text: `🔥 Decisive: Once you have a vision, hesitation is gone. You move, and the world adjusts.

🧭 Strategic: You see systems, hierarchies, and leverage points others miss.

⚙️ Efficient: You streamline, delegate, and optimize — nothing is left to chance.

🌍 Visionary: You plan for impact that lasts decades.

💬 Assertive Communicator: You articulate ideas with authority and precision.

You are the engine of progress — a mind that turns potential into structure and vision into motion.`,
        },
        strengths: {
          icon: '🚀',
          title: 'STRENGTHS — The Commander\'s Arsenal',
          text: `🏗️ Leadership by Design: You don't wait for opportunity — you engineer it.

💡 Clarity Under Pressure: You make the hard calls without flinching.

🌋 Motivational Energy: You inspire through conviction, not emotion.

🧠 Strategic Genius: You build systems that outlive trends.

🪶 Confidence: You move with purpose, and others feel it.

You don't just lead teams — you build empires.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — The Weight of Power',
          text: `Your intensity is unmatched — but it can also overwhelm.

Learning to balance control with trust is your lifelong refinement.

*Impatience:* Not everyone operates at your speed or precision.

*Dominance:* You may push too hard in your pursuit of progress.

*Overconfidence:* Sometimes your certainty blinds you to nuance.

*Emotional Blind Spots:* Feelings seem inefficient — until they disrupt logic.

*Work Obsession:* Rest feels like betrayal to your mission.

Remember: the best generals win not by crushing — but by coordinating.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — Commanding the Future',
          text: `You thrive in systems where vision meets execution — where big ideas must become real.

🏛️ Business Leadership: CEO, strategist, entrepreneur, executive director.

⚙️ Technology & Innovation: Operations head, product leader, project architect.

📊 Finance & Management: Investor, management consultant, economist.

🏗️ Public Service & Politics: Diplomat, policymaker, civic reformer.

🎯 Strategic Development: Think-tank founder, futurist, systems strategist.

You don't work for systems — you build them.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'FUTURE OUTLOOK — The Builders of the 21st Century',
          text: `You are designed for the era of transformation.

As organizations crave clarity and courage, your decisive mind becomes invaluable.

Emerging Roles:

🚀 Innovation Architect

🏛️ Policy Shaper

💼 Venture Builder

🌍 Global Systems Director

🧭 Organizational Futurist

You will shape frameworks that define industries, communities, and futures.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS ENTJ PERSONALITIES — Inspiration',
          text: `Napoleon Bonaparte, Steve Jobs, Margaret Thatcher, Winston Churchill, and many other visionary leaders, entrepreneurs, and strategic minds share your type.

They didn't just lead — they transformed entire systems through their ability to see the future and execute with precision.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — The Commander\'s Refinement',
          text: `Your challenge isn't doing more — it's listening deeper.

Growth begins when you realize that greatness is shared, not commanded.

🌿 Empower Others: Delegate not because you must, but because you can.

🌺 Lead with Empathy: Respect human timing as much as efficiency.

💬 Invite Feedback: True leaders are lifelong learners.

🌕 Rest Strategically: Recovery is part of the plan.

⚖️ Balance Power with Purpose: Domination fades; influence endures.

Your greatness multiplies when others rise because of your leadership.

⸻

🧩 DAILY PRACTICES — The Commander's Rituals

1️⃣ Morning Focus: Set three key priorities — and execute relentlessly.

2️⃣ Midday Reflection: Ask, "Am I leading or just controlling?"

3️⃣ Evening Reset: Step back, delegate, trust the process.

4️⃣ Weekly Vision Check: Revisit the mission — ensure it still serves meaning, not ego.

5️⃣ Rest Intentionally: Remember, rest sustains dominance.`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You value efficiency and clarity in relationships. You appreciate partners who share your drive and understand your need for growth and achievement.

You communicate directly and assertively. People respect your honesty and appreciate your ability to cut through complexity.

You need partners who respect your leadership qualities, support your ambitions, and understand that your intensity comes from a place of vision, not ego.

You're not looking for someone to follow you — you're looking for someone who wants to build alongside you, someone who understands that your drive to achieve is part of who you are.`,
        },
        nextGenPotential: {
          icon: '⚔️',
          title: 'CONCLUSION — The Mind That Moves Mountains',
          text: `You are the commander of transformation — the rare soul who can lead both heart and structure.

You build not for applause, but for impact.

Your discipline inspires, your clarity empowers, and your courage sets the course.

The world remembers those who dared to lead.

And you, ENTJ, are one of the few who can lead without losing themselves. 🌍`,
        },
      },
    },
    INTP: {
      emojis: ['🧩', '💭', '🔬'],
      title: 'Your INTP Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '🧠',
          title: 'WHO YOU ARE — The Philosopher Scientist',
          text: `You live in the world of ideas — constantly questioning, dissecting, and reimagining.

To you, truth isn't fixed; it's an evolving hypothesis.

INTPs are mental explorers, forever curious, forever analytical.

You don't just think outside the box — you dismantle the box, study its design, and rebuild it better.

Your power lies not in certainty, but in curiosity.

The world may call you "detached," but really, you're just busy decoding reality.

You are the thinker that pushes civilization forward — quietly, but profoundly.`,
        },
        coreCharacteristics: {
          icon: '💡',
          title: 'CORE CHARACTERISTICS — The Architect of Thought',
          text: `✨ Analytical Depth: You see invisible logic in everything — from emotions to algorithms.

✨ Curiosity: You're addicted to learning — your mind never stops expanding.

✨ Independence: You resist convention; truth must make sense, not just fit in.

✨ Creativity: You combine unrelated ideas into groundbreaking insights.

✨ Intellectual Honesty: You'd rather be wrong and learn than be right by chance.

You are both scientist and artist — logic is your medium, imagination your muse.`,
        },
        strengths: {
          icon: '⚙️',
          title: 'STRENGTHS — The Mind That Creates Theories',
          text: `🧭 Pattern Recognition: You connect abstract concepts across fields.

📚 Critical Thinking: You analyze systems until they reveal their flaws.

💡 Innovative Problem-Solving: You invent elegant solutions for impossible problems.

🎨 Abstract Creativity: You turn logic into artistry — equations into elegance.

🪶 Adaptability: You learn anything you decide to understand.

Your gift is to think what others have not yet dared to consider.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — The Infinite Loop',
          text: `Your mind is your genius — and your trap.

You can get lost in thinking instead of doing.

*Analysis Paralysis:* You overthink decisions until action feels risky.

*Emotional Detachment:* You intellectualize feelings instead of experiencing them.

*Perfectionism in Theory:* You want every idea flawless before it's real.

*Social Disconnect:* You prefer clarity to small talk, and solitude to chaos.

*Inconsistency:* You start many projects — few reach completion.

The challenge: to realize that brilliance means nothing if it never leaves your head.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — The Thinker Who Shapes Systems',
          text: `You thrive where intellect, autonomy, and curiosity converge.

🔬 Science & Research: Theoretical physicist, data scientist, researcher.

💻 Technology & AI: Software engineer, algorithm designer, systems architect.

📚 Academia & Philosophy: Lecturer, logician, analyst, mathematician.

🎨 Creative Tech: Game designer, simulation developer, innovation consultant.

🧠 Cross-Disciplinary Thinker: Futurist, AI ethicist, cognitive scientist.

You're not made to follow — you're made to discover.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'FUTURE OUTLOOK — The Architects of the Cognitive Age',
          text: `The 21st century belongs to minds like yours.

As AI, philosophy, and data science merge, the ability to understand how systems think will define progress.

Emerging Roles:

🤖 AI Architect

🧬 Cognitive Researcher

📊 Systems Theorist

🌍 Innovation Strategist

💡 Philosopher-Engineer

You will not just predict the next era — you will design its thinking.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS INTP PERSONALITIES — Inspiration',
          text: `Albert Einstein, Charles Darwin, Bill Gates, Marie Curie, and many other revolutionary thinkers, scientists, and innovators share your type.

They didn't just understand the world — they redefined it through their ability to question everything and see connections others missed.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — From Abstract to Applied',
          text: `Your evolution begins when you turn theory into motion.

🌿 Finish Projects: Completion is intelligence in action.

🌕 Embrace Emotion: Feelings don't break logic — they give it purpose.

🔥 Share Your Ideas: Genius hidden is genius wasted.

🧘 Balance Solitude: Silence fuels thought, but the world needs your output.

💬 Collaborate Selectively: Great ideas sharpen in friction, not isolation.

Remember: knowledge becomes wisdom only when lived.

⸻

🔭 DAILY PRACTICES — The Logician's Mind Gym

1️⃣ Morning Curiosity: Read something outside your field.

2️⃣ Midday Walk: Physical motion clarifies mental motion.

3️⃣ Note Your Insights: Write before ideas evaporate.

4️⃣ Set Output Goals: One finished thought beats ten half-built ones.

5️⃣ Reflect Before Sleep: Ask, "What did I realize, not just read, today?"`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You value intellectual connection and meaningful conversations. Small talk drains you, but deep discussions energize and inspire you.

You communicate through ideas and logic. People appreciate your clarity and honesty, even when it's challenging.

You need partners who respect your need for independence, appreciate your analytical mind, and understand that your quiet nature doesn't mean you don't care.

You're not looking for someone to complete you — you're looking for someone who challenges your thinking and shares your curiosity about the world.`,
        },
        nextGenPotential: {
          icon: '🧠',
          title: 'CONCLUSION — The Quiet Genius',
          text: `You are the cartographer of the mind — drawing maps no one else can see.

Your ideas build bridges between science and art, logic and beauty.

But remember — invention is only divine when it touches the world.

Your mind is your kingdom.

Your challenge is to open its gates.

The future will run on systems you designed — and philosophies you dreamed. 🌌`,
        },
      },
    },
    ENTP: {
      emojis: ['⚡', '💡', '🎯'],
      title: 'Your ENTP Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '🔥',
          title: 'WHO YOU ARE — The Maverick of Possibility',
          text: `You are the spark in the system — the one who asks why not? when everyone else says because.

ENTPs are natural-born innovators: quick, curious, and endlessly adaptable.

You think in lightning strikes — a hundred ideas before breakfast, and a business plan by lunch.

You thrive on debate not to win, but to explore.

Every conversation is a battlefield of wit — but also a laboratory for truth.

You are not here to conform; you are here to transform.`,
        },
        coreCharacteristics: {
          icon: '💡',
          title: 'CORE CHARACTERISTICS — The Creative Disruptor',
          text: `✨ Curiosity Over Comfort: You chase novelty like oxygen.

✨ Verbal Dexterity: Your words spark revolutions and laughter in equal measure.

✨ Mental Agility: You connect unrelated concepts into world-changing ideas.

✨ Fearless Experimentation: You fail fast, but never the same way twice.

✨ Charm: You can sell an idea before you've even finished thinking it through.

You are proof that intelligence can be playful — and rebellion can be creative.`,
        },
        strengths: {
          icon: '🚀',
          title: 'STRENGTHS — The Vision That Bends Reality',
          text: `🌪️ Innovation Engine: You generate ideas faster than most can comprehend.

🎯 Persuasion Mastery: You don't argue — you enchant logic.

🧠 Strategic Improvisation: You think your way out of corners others didn't notice.

💬 Communication Wizard: Your words ignite action.

⚙️ Adaptability: You pivot with grace when others panic.

You're not afraid of chaos — you surf it.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — The Chaos You Create',
          text: `Your brilliance can scatter when structure disappears.

Sometimes, your mind moves faster than the world can follow.

*Restless Focus:* You start 10 projects and finish 2.

*Overconfidence:* You believe every idea is a good idea — even the wild ones.

*Argument Addiction:* You debate for stimulation, not progress.

*Resistance to Routine:* Structure feels like a cage — but it's the key to scaling genius.

*Commitment Drift:* When things stabilize, you seek the next challenge too soon.

Remember: the best disruptors are those who can refine what they reinvent.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — The Innovator in Action',
          text: `You shine in fast-moving, intellectually demanding environments where creativity drives results.

🧠 Entrepreneurship & Startups: Founder, creative strategist, product visionary.

🎙️ Media & Influence: Podcaster, journalist, public speaker, or debate host.

💻 Technology & Innovation: Growth hacker, UX strategist, AI ideator.

📚 Philosophy & Academia: Professor, sociologist, thought leader.

🎭 Entertainment & Design: Director, writer, concept artist, or game designer.

Wherever ideas collide — that's your natural ecosystem.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'FUTURE OUTLOOK — The Architects of the Next Renaissance',
          text: `As technology evolves, humanity will need creative thinkers who can fuse art, ethics, and innovation.

That's your arena.

Emerging Roles:

⚙️ Innovation Consultant

🌍 Futurist & Cultural Analyst

🤖 Human-AI Interaction Designer

🎙️ Strategic Storyteller

🧩 Multidisciplinary Creator

You are the connective tissue between logic and imagination — the bridge between invention and humanity.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS ENTP PERSONALITIES — Inspiration',
          text: `Mark Twain, Richard Feynman, Tom Hanks, Walt Disney, and many other brilliant innovators, entertainers, and thought leaders share your type.

They didn't just follow the rules — they rewrote them through their ability to see possibilities others missed and communicate ideas that changed the world.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — Harnessing Chaos into Creation',
          text: `Your genius multiplies when it meets structure.

You don't need fewer ideas — you need better systems to shape them.

🌿 Build Frameworks: Every experiment needs a lab.

🔥 Finish Something: Completion creates credibility.

💬 Listen Deeply: Debate is dialogue, not dominance.

🎯 Learn Boredom: Sometimes stability is your sharpest tool.

🧘 Rest Your Mind: Silence recharges creativity — not routine.

Freedom is most powerful when it's focused.

⸻

💬 DAILY PRACTICES — The Debater's Flow

1️⃣ Morning Spark: Read one idea that challenges what you believe.

2️⃣ Midday Focus Hour: Work without talking — silence sharpens brilliance.

3️⃣ Evening Reflection: Note which ideas stuck and which to release.

4️⃣ Weekend Curiosity Quest: Try something uncomfortable or absurd — growth hides in chaos.

5️⃣ Monthly Reset: Finish one project before chasing the next hundred.`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You value intellectual stimulation and lively conversations. You need partners who can keep up with your rapid-fire ideas and appreciate your need for debate and exploration.

You communicate with energy and enthusiasm. People are drawn to your charisma and appreciate your ability to make complex ideas accessible.

You need partners who respect your independence, appreciate your innovative mind, and understand that your need for variety doesn't mean you don't care.

You're not looking for someone to complete you — you're looking for someone who challenges you intellectually and shares your passion for exploring new possibilities.`,
        },
        nextGenPotential: {
          icon: '⚡',
          title: 'CONCLUSION — The Electric Mind',
          text: `You are lightning in human form — unpredictable, brilliant, alive.

Your power is not in certainty, but in curiosity that refuses to stop evolving.

You turn problems into puzzles, and every "impossible" into "interesting."

The world doesn't need to contain you — it needs to collaborate with you.

Because every great revolution started with one person asking,

"But what if we tried this instead?" ⚡`,
        },
      },
    },
    ISFP: {
      emojis: ['🎨', '🍃', '💫'],
      title: 'Your ISFP Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '🌈',
          title: 'WHO YOU ARE — The Artist of Emotion and Experience',
          text: `You are a walking contradiction in the best way: peaceful but passionate, quiet but deeply alive.

ISFPs don't chase attention — they radiate authenticity.

Your energy flows from feeling the world deeply — the warmth of sunlight, the texture of sound, the colors of mood.

You live through sensation and emotion, not theory.

To you, truth isn't argued — it's felt.

Every decision comes from your inner compass of beauty, empathy, and freedom.

You are the artist of existence — crafting meaning out of moments.`,
        },
        coreCharacteristics: {
          icon: '💡',
          title: 'CORE CHARACTERISTICS — The Free Spirit with Depth',
          text: `🌿 Empathic Sensitivity: You feel what others feel before they say a word.

🎨 Artistic Expression: Whether through design, music, or presence, you make the world more beautiful.

🔥 Spontaneity: You live in the present, not the plan.

💫 Inner Authenticity: You refuse to fake emotions or follow hollow rules.

🌊 Calm Strength: You may seem gentle, but your spirit is unshakable.

You don't chase impact — you embody it.`,
        },
        strengths: {
          icon: '🌸',
          title: 'STRENGTHS — The Graceful Power Within',
          text: `🌼 Aesthetic Sensibility: You see subtle beauty where others overlook it.

🫶 Empathy: You create emotional safety for those around you.

🎯 Presence: You live in the "now" with rare depth.

🧭 Moral Clarity: You do what feels right, not what looks right.

🪞 Emotional Intelligence: You understand without needing to explain.

You turn ordinary life into art — quietly, gracefully, profoundly.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — The Gentle Storm',
          text: `Your kindness can become self-erasure.

Your need for harmony can silence your truth.

*Avoiding Conflict:* You withdraw when confrontation could create growth.

*Unspoken Feelings:* You internalize emotions until they weigh you down.

*Fear of Judgment:* You hesitate to show your true creative power.

*Over-Accommodation:* You give too much of yourself away.

*Direction Drift:* Without structure, passion can scatter.

Your emotions are sacred — but they must have boundaries to bloom.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — The Artist, The Healer, The Maker',
          text: `You thrive in roles that allow freedom, creativity, and emotional connection.

🎨 Creative Fields: Designer, musician, photographer, writer, stylist.

🌿 Healing Professions: Therapist, nurse, counselor, yoga or wellness coach.

🌍 Humanitarian Work: NGO volunteer, social advocate, environmental protector.

🖌️ Entrepreneurship: Artisan brand founder, digital creator, aesthetic curator.

🎭 Performing Arts: Actor, dancer, storyteller, creative producer.

You don't just work — you express.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'FUTURE OUTLOOK — The Aesthetic Visionaries of Tomorrow',
          text: `As technology grows colder, your sensitivity becomes the new superpower.

In a world craving authenticity, you will humanize innovation.

Emerging Roles:

🎧 Experience Designer

🪴 Mindfulness Educator

🎨 Creative Director

🌍 Eco-Aesthetic Innovator

💫 Emotional Brand Consultant

The 21st century needs beauty with soul — and that's your language.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS ISFP PERSONALITIES — Inspiration',
          text: `Frida Kahlo, Michael Jackson, Wolfgang Amadeus Mozart, David Bowie, and many other iconic artists, musicians, and creative visionaries share your type.

They didn't just create art — they lived it, expressing profound emotion and beauty through their unique creative voices.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — Becoming the Courageous Creator',
          text: `Your growth lies in transforming emotional intuition into confident creation.

🌕 Express Boldly: Your art deserves to be seen, not just felt.

🔥 Take Initiative: Don't wait for "perfect timing" — creation is the timing.

🌊 Embrace Structure: Routine doesn't kill creativity; it protects it.

💬 Voice Your Needs: Silence isn't always peace — sometimes it's suppression.

🌿 Find Purpose in Freedom: Choose what to commit to, and your freedom will deepen.

When you learn to trust your impact, your quiet fire becomes unstoppable.

⸻

💬 DAILY PRACTICES — The Adventurer's Balance

1️⃣ Morning Calm: Begin the day with music, light, or movement.

2️⃣ Creative Ritual: Make something small — even if no one sees it.

3️⃣ Afternoon Reflection: Ask, "What inspired me today?"

4️⃣ Evening Grounding: Journal feelings before they become storms.

5️⃣ Weekend Exploration: Visit nature, art galleries, or simply walk — your soul speaks outdoors.`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You value authentic connections and emotional intimacy. You need partners who appreciate your sensitivity, respect your need for freedom, and understand that your quiet nature doesn't mean you don't care deeply.

You communicate through actions and presence more than words. People feel truly seen and valued in your company.

You need partners who respect your creative spirit, support your need for personal space, and understand that your emotions run deep even when they're not expressed loudly.

You're not looking for someone to complete you — you're looking for someone who appreciates your authentic self and shares your appreciation for beauty, freedom, and genuine connection.`,
        },
        nextGenPotential: {
          icon: '🎨',
          title: 'CONCLUSION — The Silent Flame',
          text: `You are a living work of art — expressive, kind, and profoundly human.

You remind others that feeling deeply is not weakness, but wisdom.

You make the world gentler without trying, brighter without forcing.

You are the quiet revolution of the heart —

the proof that gentleness can move mountains. 🌿🎶`,
        },
      },
    },
    ESFP: {
      emojis: ['💃', '🎉', '✨'],
      title: 'Your ESFP Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '🌞',
          title: 'WHO YOU ARE — The Heartbeat of the Moment',
          text: `You are the pulse of life itself — vibrant, warm, magnetic.

Where others hesitate, you dive in. Where others talk, you act.

ESFPs live through experience — every day, every smile, every sensation matters.

You don't just participate in life — you perform it, beautifully.

You bring people together, not through logic, but through laughter and light.

Your superpower? Turning ordinary moments into unforgettable stories.

You are joy in motion — spontaneous, emotional, and impossibly real.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'CORE CHARACTERISTICS — The Radiant Connector',
          text: `✨ Social Brilliance: You light up every room you enter.

✨ Emotional Awareness: You read people instantly and respond with heart.

✨ Spontaneity: You say yes to life before fear has time to speak.

✨ Sensation-Driven: You live fully through color, taste, sound, and touch.

✨ Optimism: You find the silver lining — or create it.

You live in 4K resolution — where emotions are vivid, and experiences are sacred.`,
        },
        strengths: {
          icon: '🎭',
          title: 'STRENGTHS — The Spirit That Inspires Others',
          text: `🌈 Authenticity: You don't fake connection — you create it.

🎉 Charisma: Your enthusiasm is contagious and healing.

🌿 Empathy: You make others feel seen, heard, and celebrated.

💪 Adaptability: You thrive in the unpredictable flow of life.

🌟 Courage: You face the world with open eyes and an open heart.

You don't wait for opportunity — you embody it.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — The Dazzle and the Depth',
          text: `Behind your light, there is depth — but you sometimes forget to rest in it.

*Avoiding Pain:* You distract yourself when emotions get too heavy.

*Impatience:* Routine feels suffocating when you crave stimulation.

*Overcommitment:* You say yes too often and exhaust your own energy.

*Short-Term Focus:* You chase excitement and miss the long game.

*Fear of Stillness:* Silence can feel like an audience that isn't clapping.

Remember: even the brightest star needs darkness to shine.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — The Performer, The Creator, The Catalyst',
          text: `You belong in environments that reward creativity, interaction, and flair.

🎤 Entertainment & Media: Actor, host, performer, influencer, event organizer.

🎨 Creative Industries: Designer, stylist, makeup artist, marketer.

🌿 Human Connection Fields: Teacher, counselor, community builder, motivational speaker.

💻 Modern Spaces: Social media creator, brand personality, startup evangelist.

🎭 Hospitality & Experience Design: Travel curator, event planner, lifestyle consultant.

You don't need a stage — you are the stage.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'FUTURE OUTLOOK — The Emotional Architects of Culture',
          text: `As the world automates, your human warmth becomes invaluable.

In an age of algorithms, you are the algorithm of joy.

Emerging Roles:

🎙️ Experience Curator

🎨 Creative Influencer

🧘 Emotional Wellness Coach

🌍 Brand Storyteller

🎧 Human Connection Designer

You will redefine what "influence" truly means — connection over consumption.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS ESFP PERSONALITIES — Inspiration',
          text: `Marilyn Monroe, Jamie Foxx, Will Smith, Adele, and many other charismatic performers, entertainers, and life enthusiasts share your type.

They didn't just entertain — they transformed lives through their ability to connect, inspire, and bring joy to others.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — From Excitement to Meaning',
          text: `Your growth begins when you realize that joy is not just fun — it's fuel for impact.

🌕 Balance Pleasure with Purpose: Chase experiences that build you, not just thrill you.

🔥 Slow Down: Depth doesn't kill excitement — it enriches it.

🌿 Reflect Daily: A quiet mind creates stronger joy.

💬 Master Boundaries: Not every problem needs your energy.

💡 Cultivate Long-Term Vision: Spontaneity + consistency = unstoppable momentum.

The goal isn't to be everywhere — it's to be present where it matters.

⸻

🎵 DAILY PRACTICES — The Entertainer's Glow

1️⃣ Morning Affirmation: "My joy inspires others."

2️⃣ Midday Reset: Step outside, breathe, notice colors and sounds.

3️⃣ Evening Gratitude: Celebrate one thing you felt deeply today.

4️⃣ Weekly Detox: Spend a day offline — let your mind rest from applause.

5️⃣ Monthly Creation: Start something new that's for you, not for others.`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You value authentic connections and shared experiences. You need partners who appreciate your spontaneity, enjoy your energy, and understand that your need for excitement doesn't mean you don't care deeply.

You communicate with warmth and enthusiasm. People are drawn to your genuine nature and appreciate your ability to make them feel special.

You need partners who respect your need for freedom, support your creative expression, and understand that your vibrant personality comes from a place of genuine joy and love for life.

You're not looking for someone to complete you — you're looking for someone who wants to experience life alongside you, someone who understands that your enthusiasm is part of who you are.`,
        },
        nextGenPotential: {
          icon: '🎉',
          title: 'CONCLUSION — The Light That Heals',
          text: `You remind humanity that life isn't meant to be watched — it's meant to be lived.

You are proof that presence is power, laughter is medicine, and authenticity is magic.

The world needs your color, your rhythm, your light.

But never forget: even joy needs to refuel.

Shine bravely — but also softly.

Because the real magic isn't in your performance…

It's in your presence. 🌟`,
        },
      },
    },
    ESFJ: {
      emojis: ['🤝', '💝', '🌟'],
      title: 'Your ESFJ Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '🌷',
          title: 'WHO YOU ARE — The Empathic Organizer of Human Life',
          text: `You are the warm center of every group — kind, attentive, and socially intuitive.

ESFJs have a rare gift: you make people feel seen and safe in a world that often overlooks both.

You find happiness in harmony and purpose in helping.

Where others see chaos, you bring coordination.

Where others stay silent, you speak kindness into the room.

Your life is an act of service — but it's also a masterpiece of empathy.

You are the heartbeat that keeps the world humane.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'CORE CHARACTERISTICS — The Harmonizer of People and Purpose',
          text: `💖 Empathy as Strength: You sense others' needs before they speak.

📋 Organizational Talent: You turn ideas into structure, and structure into success.

🎯 Responsibility: When you promise, you deliver.

🌿 Loyalty: You build relationships that endure through decades.

🎉 Sociability: You uplift the mood wherever you go.

You lead through kindness, not control.

And somehow, that makes people follow even more willingly.`,
        },
        strengths: {
          icon: '🌼',
          title: 'STRENGTHS — The Foundation Everyone Trusts',
          text: `🌈 Emotional Intelligence: You notice what others feel — and act accordingly.

🌿 Generosity: You give time, care, and energy freely.

🕊️ Diplomacy: You bridge conflicts with understanding.

💪 Reliability: People can depend on you — always.

🎀 Warm Leadership: You nurture growth through encouragement, not pressure.

You don't just manage people — you connect them.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — The Weight of Everyone\'s Happiness',
          text: `Your heart is your compass — but sometimes it points everywhere at once.

*People-Pleasing:* You prioritize others' comfort over your own truth.

*Overcommitment:* You take on too much to keep everyone happy.

*Fear of Conflict:* You avoid tension, even when honesty is needed.

*Perfectionism in Service:* You hold yourself to impossible caregiving standards.

*Emotional Burnout:* You pour endlessly from a cup you forget to refill.

Remember: you're allowed to rest, too. The world won't fall apart — you taught it how to hold itself together.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — The Supporter, The Educator, The Leader',
          text: `You thrive where emotional intelligence meets structure.

🏫 Education & Guidance: Teacher, counselor, academic mentor.

🏥 Health & Wellness: Nurse, therapist, social worker, healthcare coordinator.

🏢 Organization & Management: HR director, event planner, office leader.

💬 Communication Fields: PR manager, media consultant, brand community builder.

🌿 Public Service: Diplomat, charity organizer, community advocate.

You don't just build teams — you build belonging.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'FUTURE OUTLOOK — The Emotional Architects of Society',
          text: `As AI and automation expand, humanity will crave what you naturally offer — empathy, organization, and belonging.

Emerging Roles:

💬 Community Experience Designer

🌿 Emotional Wellness Manager

🏡 People Operations Specialist

🎓 Human-Centered Educator

🌍 Culture & Inclusion Consultant

The future won't be led by algorithms — it will be shaped by hearts like yours.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS ESFJ PERSONALITIES — Inspiration',
          text: `Danny Glover, Sally Field, Taylor Swift, Hugh Jackman, and many other warm-hearted leaders, educators, and community builders share your type.

They didn't just achieve success — they created belonging, nurtured relationships, and made the world more connected through their genuine care for others.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — From Helper to Harmonious Leader',
          text: `Your next level begins when you protect your kindness with boundaries.

🌕 Say "No" Kindly: Boundaries aren't rejection — they're sustainability.

🔥 Lead Without Overextending: You don't have to fix every problem to create harmony.

💡 Delegate with Trust: Let others rise with you.

🌿 Rest Without Guilt: Resting doesn't make you less caring — it makes you last longer.

💬 Speak Your Truth: Real harmony is built on honesty, not silence.

You'll always be loved for your kindness — but respected for your authenticity.

⸻

💬 DAILY PRACTICES — The Consul's Calm

1️⃣ Morning Check-In: Ask how you feel before you ask anyone else.

2️⃣ Midday Break: Step away from noise — your peace deserves space.

3️⃣ Evening Reflection: Write down one boundary you held today.

4️⃣ Weekly Gratitude: Appreciate someone who supports you.

5️⃣ Monthly Unplug: Take time off to restore your light.`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You value deep, meaningful relationships and genuine connection. You need partners who appreciate your caring nature, respect your need for harmony, and understand that your desire to help others comes from a place of genuine love.

You communicate with warmth and consideration. People feel truly valued and understood in your presence.

You need partners who respect your organizational skills, support your need for structure, and understand that your caring nature doesn't mean you don't have your own needs.

You're not looking for someone to complete you — you're looking for someone who wants to build a life together, someone who understands that your drive to care for others is part of who you are.`,
        },
        nextGenPotential: {
          icon: '💞',
          title: 'CONCLUSION — The Heart That Holds the World Together',
          text: `You are the unseen architecture of kindness — the reason homes feel warm, workplaces feel safe, and friendships last.

Your empathy keeps humanity human.

Your care creates connection.

And your consistency reminds us what love looks like in motion.

You are not "just nice."

You are necessary. 🌸✨`,
        },
      },
    },
    ISFJ: {
      emojis: ['🌿', '🛡️', '💝'],
      title: 'Your ISFJ Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '🌷',
          title: 'WHO YOU ARE — The Guardian of Quiet Strength',
          text: `You are the backbone of compassion — dependable, gentle, and unwavering.

ISFJs are the unsung heroes of every community. You protect without needing praise, help without needing credit, and love without limits.

You believe that stability is sacred.

You find peace in order, comfort in familiarity, and meaning in service.

But make no mistake — beneath that serenity lies a will of steel.

You are the kind of person who holds the world together while others are still figuring out what broke.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'CORE CHARACTERISTICS — The Heart That Holds Everything',
          text: `🌿 Reliability: You do what you say, and people trust you completely.

🫶 Empathy in Action: You don't just feel for others — you show up for them.

🏡 Sense of Duty: You find purpose in responsibility and protection.

🌸 Attention to Detail: You notice what others miss — a tone, a shift, a need.

💭 Quiet Wisdom: You think before speaking and lead without noise.

You bring calm to chaos and warmth to coldness.`,
        },
        strengths: {
          icon: '🩵',
          title: 'STRENGTHS — The Gentle Power Within',
          text: `🌈 Nurturing Spirit: You create safety wherever you go.

🕊️ Stability: People lean on you — and you never let them fall.

🌿 Loyalty: Your relationships are lifelong, not seasonal.

🎯 Practical Compassion: You help in ways that actually work.

💫 Work Ethic: You build excellence one quiet act at a time.

You are the quiet storm — soft on the outside, indestructible within.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — The Weight of Caring Too Much',
          text: `You give endlessly — but sometimes forget that you need care too.

*Emotional Exhaustion:* You absorb others' problems as your own.

*Overthinking:* You replay small moments for days.

*Fear of Disapproval:* You measure worth through others' happiness.

*Resistance to Change:* You find comfort in routine — even when it limits growth.

*Difficulty Saying No:* You'd rather burn out than disappoint.

Remember: protecting others is noble — but protecting yourself is necessary.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — The Healer, The Builder, The Guardian',
          text: `You thrive where compassion meets structure — where people depend on your reliability and care.

🏥 Healthcare & Service: Nurse, therapist, doctor, caregiver, counselor.

🏫 Education & Mentorship: Teacher, academic advisor, early childhood educator.

🏢 Organizational Roles: HR specialist, project coordinator, office manager.

🎨 Creative Professions: Interior designer, writer, archivist, curator.

🌿 Community Fields: Nonprofit manager, volunteer leader, humanitarian worker.

You don't just work — you heal systems, people, and spaces.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'FUTURE OUTLOOK — The Human Core of the AI Age',
          text: `In a world that moves fast, your steadiness becomes sacred.

Machines can process — but only you can care.

You will be the emotional architect of a humane future.

Emerging Roles:

🧠 Mental Wellness Consultant

🌿 Organizational Culture Designer

🏡 Community Support Coordinator

💬 Empathy & Communication Specialist

🎨 Human-Centered Experience Curator

You are the quiet foundation on which innovation will stand.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS ISFJ PERSONALITIES — Inspiration',
          text: `Mother Teresa, Kate Middleton, Jimmy Carter, Halle Berry, and many other compassionate leaders, caregivers, and community builders share your type.

They didn't just serve — they transformed lives through their unwavering dedication, quiet strength, and genuine care for others.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — From Helper to Healer',
          text: `Your next level begins when you remember that self-care is not selfish.

🌕 Set Emotional Boundaries: Helping doesn't mean absorbing.

🔥 Speak Your Needs: People can't protect you if you always say "I'm fine."

🌿 Try New Paths: Growth doesn't betray loyalty — it deepens it.

💬 Learn to Receive: Let others love you the way you love them.

💡 Redefine Strength: Sometimes strength is saying "no."

The world already knows your kindness — now let it see your confidence too.

⸻

💬 DAILY PRACTICES — The Defender's Balance

1️⃣ Morning Grounding: Before helping others, breathe for yourself.

2️⃣ Midday Pause: Take a walk, not a task.

3️⃣ Evening Gratitude: Note one thing you did well today.

4️⃣ Weekly Declutter: A clear space helps your mind rest.

5️⃣ Monthly Recharge: Spend time alone — solitude is sacred, not selfish.`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You value deep, lasting relationships and genuine connection. You need partners who appreciate your caring nature, respect your need for stability, and understand that your quiet strength doesn't mean you don't have deep feelings.

You communicate through actions and consistency more than words. People feel truly safe and valued in your presence.

You need partners who respect your need for routine, support your desire to help others, and understand that your protective nature comes from a place of genuine love and care.

You're not looking for someone to complete you — you're looking for someone who wants to build a stable, loving life together, someone who understands that your dedication to others is part of who you are.`,
        },
        nextGenPotential: {
          icon: '🕊️',
          title: 'CONCLUSION — The Soul That Keeps the World Gentle',
          text: `You are the living proof that kindness is not weakness — it's endurance.

You remind us that real love isn't loud; it's consistent.

You heal people without medicine and lead without ego.

And while the world celebrates the loudest voices,

it's people like you — the quiet, steady, devoted ones —

who keep it alive. 🌿✨`,
        },
      },
    },
    ISTP: {
      emojis: ['🛠️', '⚙️', '🔧'],
      title: 'Your ISTP Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '🔧',
          title: 'WHO YOU ARE — The Engineer of Experience',
          text: `You are the explorer of systems — mechanical, digital, human.

Your world is one of function, form, and freedom.

ISTPs don't just learn how things work; they need to.

You see patterns where others see mess. You move when others freeze.

You're at your best in motion — building, experimenting, taking things apart just to see how they fit together again.

Rules? You'll respect them if they make sense — and rewrite them if they don't.

You are the curious calm in the middle of any storm.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'CORE CHARACTERISTICS — The Calm Executor',
          text: `🔩 Hands-On Intelligence: You learn by doing, not by talking.

🧠 Logical Insight: You strip problems down to their core mechanics.

⚡ Adaptability: You thrive in fast, unpredictable environments.

🎯 Precision: You can spot flaws instantly — and fix them quietly.

🌿 Independence: You don't follow paths; you build them.

You are the bridge between idea and execution — where thought becomes reality.`,
        },
        strengths: {
          icon: '🏆',
          title: 'STRENGTHS — The Master of Mechanics and Momentum',
          text: `⚙️ Problem-Solving Genius: You can repair, rewire, or rebuild almost anything.

🧭 Cool Under Pressure: Crisis energizes you — you focus when others panic.

🔥 Action-Oriented: You turn plans into prototypes faster than anyone else.

💡 Curious Tinkerer: You find joy in figuring things out, no matter how small.

🌍 Freedom-Seeker: You refuse to be trapped by routine or conformity.

You are the mind of an engineer, the soul of an explorer, and the reflexes of a fighter.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — The Double-Edged Freedom',
          text: `Your independence makes you powerful — but sometimes, it isolates you.

*Detached Emotions:* You prefer solving problems to feeling them.

*Risk-Taking:* You chase adrenaline — sometimes at your own expense.

*Restlessness:* You grow bored when things get too easy or repetitive.

*Reluctance to Open Up:* You protect your privacy like a fortress.

*Inconsistency:* You start fast but lose interest when routine sets in.

Remember: mastery comes not only from speed — but from depth.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — The Creator, The Builder, The Strategist',
          text: `You excel where logic meets motion — where ideas must work, not just sound good.

🧰 Engineering & Mechanics: Automotive engineer, technician, architect, mechanic.

💻 Technology & Systems: Software developer, ethical hacker, product designer.

🚁 Adventure Fields: Pilot, firefighter, rescue specialist, paramedic.

🎮 Creative Craftsmanship: Photographer, video editor, craftsman, digital artist.

⚙️ Entrepreneurship: Startup builder, independent contractor, robotics innovator.

You make innovation tangible. You turn imagination into design.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'FUTURE OUTLOOK — The Hands That Build the Future',
          text: `As the world becomes more digital, the ISTP's practicality becomes priceless.

In a future full of thinkers and dreamers, you'll be the one who actually builds things.

Emerging Roles:

🤖 Robotics Engineer

🛰️ Drone Specialist

🧠 Human–Tech Interface Designer

⚡ Emergency Response Innovator

🔧 Sustainability Engineer

The world needs you — not to talk about change, but to assemble it.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS ISTP PERSONALITIES — Inspiration',
          text: `Michael Jordan, Tiger Woods, Bruce Lee, Clint Eastwood, and many other skilled athletes, craftsmen, and hands-on innovators share your type.

They didn't just think about excellence — they built it, practiced it, and mastered it through relentless action and precision.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — From Precision to Purpose',
          text: `Your next evolution isn't about learning more — it's about feeling more.

🌕 Reflect Between Projects: Action is power — reflection is mastery.

🔥 Commit Deeply: Don't just try — finish. Greatness comes from completion.

💬 Connect Emotionally: Let others into your logic. Teach what you've learned.

🌿 Build Systems, Not Just Solutions: What you create can outlast you.

💡 Expand Horizons: Challenge yourself to apply logic to human problems too.

Freedom is not just doing what you want — it's knowing why you want it.

⸻

💬 DAILY PRACTICES — The Virtuoso's Flow

1️⃣ Morning Setup: Start the day with a small build — a code snippet, repair, or new idea.

2️⃣ Midday Motion: Move your body. Physical action clears your mental noise.

3️⃣ Evening Log: Reflect on what worked — not just what you did.

4️⃣ Weekly Challenge: Learn a new skill — hands-on, fast, raw.

5️⃣ Monthly Disconnection: Go off-grid, touch reality again.`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You value independence and respect in relationships. You need partners who appreciate your need for space, understand your practical nature, and don't try to change your independent spirit.

You communicate through actions more than words. People appreciate your reliability and your ability to solve problems when they arise.

You need partners who respect your privacy, support your need for freedom, and understand that your quiet nature doesn't mean you don't care deeply.

You're not looking for someone to complete you — you're looking for someone who wants to build alongside you, someone who understands that your need for independence is part of who you are.`,
        },
        nextGenPotential: {
          icon: '⚙️',
          title: 'CONCLUSION — The Mind That Moves the World',
          text: `You are the unspoken genius behind progress — the one who quietly rebuilds what others only imagine.

You don't follow dreams; you engineer them.

Your gift is not just logic — it's motion.

And when you channel that motion toward something meaningful, you don't just fix systems — you evolve them.

You are not noise — you are precision.

Not a follower — a force.

Keep building. Keep moving. Keep redefining what's possible. ⚙️`,
        },
      },
    },
    ESTP: {
      emojis: ['🚀', '⚡', '🎯'],
      title: 'Your ESTP Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '🚀',
          title: 'WHO YOU ARE — The Master of the Moment',
          text: `ESTPs are the architects of adrenaline — fast-thinking, quick-moving, endlessly curious.

You don't just live life — you perform it. You want to experience every edge of existence: the risk, the rush, the reward.

You are the tactician of the present.

Where others get lost in theory, you find power in what works right now.

Your world is made of possibilities waiting to be seized — and you never wait for permission to try.

You are the person who jumps first and builds the parachute on the way down.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'CORE CHARACTERISTICS — The Action-Minded Visionary',
          text: `⚡ Quick Intelligence: You process data in real time, making bold yet calculated moves.

🎯 Confidence in Uncertainty: You thrive when the rules aren't written yet.

🗣️ Magnetic Charisma: You can turn any crowd into an audience.

💪 Fearless Competitor: You enjoy challenges — they make life worth living.

🌍 Pragmatic Realism: You value what works, not what should work.

You are not reckless — you're responsive. You don't need a map when you can read the terrain.`,
        },
        strengths: {
          icon: '🏆',
          title: 'STRENGTHS — The Strategist in Motion',
          text: `🔥 Courage: You act while others hesitate.

🧠 Analytical Agility: You can size up a problem faster than most people can describe it.

💬 Social Dexterity: You adapt your tone and energy to any environment.

🎯 Problem-Solving Speed: You improvise solutions that others call "luck."

🚀 Influence: You inspire others to move.

You are momentum personified — decisive, direct, and dangerously persuasive.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — The Price of Restless Power',
          text: `The same energy that fuels your brilliance can also burn too hot.

*Impatience:* You hate waiting — even when patience would win.

*Boredom:* Routine drains you faster than failure ever could.

*Shallow Focus:* You move so quickly that deeper meaning can slip away.

*Risk Addiction:* The thrill sometimes blinds you to long-term cost.

*Avoiding Emotion:* Vulnerability feels like a slowdown — but it's how you evolve.

Your power grows exponentially once you master stillness as fiercely as you master speed.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — The Pioneer, The Leader, The Creator',
          text: `You belong in motion — where action meets strategy.

💼 Entrepreneurship & Startups: Founder, business strategist, venture capitalist.

🎤 Sales & Influence: Marketer, public speaker, negotiator, talent manager.

🎮 Entertainment & Media: Actor, producer, brand ambassador.

🧠 Crisis & Operations: Emergency responder, tactical leader, military strategist.

💡 Innovation & Design: Product designer, creative director, event architect.

You lead through energy, adapt through instinct, and build through boldness.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'FUTURE OUTLOOK — The Maverick of the Modern World',
          text: `In an age of automation, adaptability is the new gold — and you own the patent.

As systems grow rigid, your quick thinking, charm, and improvisation make you indispensable.

Emerging Roles:

🚀 Startup Innovator

🎯 Strategic Growth Consultant

🤖 Human–AI Collaboration Specialist

🎥 Experience Designer

💬 Real-Time Crisis Manager

The world doesn't need more planners — it needs more doers. You are both.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS ESTP PERSONALITIES — Inspiration',
          text: `Ernest Hemingway, Bruce Willis, Madonna, Donald Trump, and many other bold leaders, entertainers, and action-oriented innovators share your type.

They didn't just dream about success — they seized it, built it, and lived it through fearless action and magnetic presence.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — From Energy to Impact',
          text: `Your evolution is about channeling fire into focus.

🌕 Master Patience: Not every battle needs to be fought today.

🔥 Build Long Games: Think in decades, not minutes.

🌿 Listen Before Leaping: Sometimes silence gives you the upper hand.

💡 Collaborate Strategically: Power multiplies when shared.

⚖️ Redefine Success: Thrill fades, but meaning endures.

You already move faster than most — now it's time to move smarter.

⸻

💬 DAILY PRACTICES — The Entrepreneur's Balance

1️⃣ Morning Activation: Move — run, stretch, breathe. Your body is your ignition.

2️⃣ Midday Pause: Take five minutes to plan before you act.

3️⃣ Evening Reflection: Ask not "What did I do?" but "What did I build?"

4️⃣ Weekly Stillness: Practice patience once a week — on purpose.

5️⃣ Monthly Reset: Revisit your long-term goals before chasing the next rush.`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You value excitement and spontaneity in relationships. You need partners who appreciate your energy, enjoy your adventurous spirit, and understand that your need for action doesn't mean you don't care deeply.

You communicate with enthusiasm and directness. People are drawn to your charisma and appreciate your ability to make life more exciting.

You need partners who respect your need for freedom, support your ambitious nature, and understand that your fast-paced lifestyle comes from a place of genuine passion for life.

You're not looking for someone to complete you — you're looking for someone who wants to experience life alongside you, someone who understands that your drive to act is part of who you are.`,
        },
        nextGenPotential: {
          icon: '⚡',
          title: 'CONCLUSION — The Pulse of Progress',
          text: `You are not made to follow. You are made to lead — in motion, in crisis, in change.

The world accelerates toward uncertainty, and you are already fluent in it.

Your energy is not chaos — it's creation.

Your restlessness is not impatience — it's evolution asking to happen.

So keep moving. Keep disrupting. Keep daring.

You are lightning with intention. ⚡`,
        },
      },
    },
    ISTJ: {
      emojis: ['📘', '📊', '🏛️'],
      title: 'Your ISTJ Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '🕰️',
          title: 'WHO YOU ARE — The Guardian of Principles',
          text: `You are the invisible backbone of every functioning system — reliable, rational, and deeply responsible.

While others speak in dreams, you speak in results.

You are not here to impress; you are here to build.

Your calm focus brings stability to chaos. Your dedication turns plans into progress.

You value truth over trend, and action over applause.

In a world addicted to novelty, you are the reminder that excellence never goes out of style.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'CORE CHARACTERISTICS — The Architect of Order',
          text: `📋 Dependable Logic: You evaluate, structure, and execute with precision.

🏛️ Integrity Above All: You do what's right — even when no one's watching.

🧠 Analytical Discipline: You see inefficiencies and quietly fix them.

💪 Duty-Oriented Strength: You take responsibility not as a burden, but as purpose.

🕊️ Practical Wisdom: You prefer solid ground to vague potential.

You're not resistant to change — you just want it to make sense.`,
        },
        strengths: {
          icon: '🏆',
          title: 'STRENGTHS — The Foundation of Trust',
          text: `✅ Reliability: You do what you say, every single time.

📈 Persistence: You keep building, even when motivation fades.

💬 Clarity: You communicate with precision, not fluff.

🌍 Accountability: You carry weight — and you carry it well.

💡 Long-Term Vision: You see sustainability where others see shortcuts.

Your strength isn't loud — it's consistent.

And that's why people build their lives, careers, and nations on your kind of reliability.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — The Weight of Precision',
          text: `Your discipline is your sword — but it can also become your armor.

*Rigidity:* You may cling too tightly to "how things should be."

*Overthinking:* You can analyze until action feels risky.

*Emotional Reserve:* You prefer logic even when empathy is needed.

*Perfection Pressure:* You set standards that even you struggle to meet.

*Slow Adaptation:* Change feels unsettling — until you understand it fully.

Remember: consistency doesn't mean stagnation. The best systems evolve.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — The Builder, The Guardian, The Operator',
          text: `You excel where precision, dependability, and structure create stability.

🏛️ Administration & Governance: Civil servant, auditor, legal advisor, project manager.

📊 Finance & Data: Accountant, data analyst, logistics planner, operations manager.

🏗️ Engineering & Architecture: Structural engineer, systems analyst, urban planner.

⚖️ Law & Order: Judge, law enforcement, military strategist, compliance officer.

🧭 Organization & Management: Executive assistant, operations director, quality controller.

You make systems work — efficiently, elegantly, and enduringly.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'FUTURE OUTLOOK — The Pillar of Progress',
          text: `In a future obsessed with disruption, your reliability becomes revolutionary.

As automation grows, humans will crave accountability — and that's where you shine.

Emerging Roles:

🏗️ Systems Engineer

📊 Data Integrity Specialist

⚖️ Ethical Compliance Advisor

🏛️ Infrastructure Architect

📘 Policy Analyst

The future needs builders who can think long-term.

And you, more than anyone, understand that real progress is made brick by brick.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS ISTJ PERSONALITIES — Inspiration',
          text: `Warren Buffett, Angela Merkel, Natalie Portman, Henry Ford, and many other methodical leaders, builders, and systematic innovators share your type.

They didn't just achieve success — they built it through unwavering dedication, careful planning, and the kind of reliability that creates lasting legacies.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — From Discipline to Vision',
          text: `Your evolution lies not in doing more, but in seeing bigger.

🌿 Trust Others' Methods: Different doesn't mean wrong.

🔥 Take Calculated Risks: Growth lives just outside the comfort zone.

🕊️ Share Emotion: Vulnerability is another form of strength.

💬 Delegate More: Teach others to uphold your standards — don't carry everything alone.

💡 Reimagine Tradition: Preserve what works, improve what doesn't.

The world changes — but your steadiness can guide it without losing balance.

⸻

💬 DAILY PRACTICES — The Logistician's Code

1️⃣ Morning Plan: Outline your 3 priorities before anything else.

2️⃣ Midday Audit: Ask — am I busy, or am I productive?

3️⃣ Evening Reset: Log what worked, what didn't, and what improves tomorrow.

4️⃣ Weekly Challenge: Try one new method that breaks routine.

5️⃣ Monthly Reflection: Look at your systems — what can evolve?`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You value stability and commitment in relationships. You need partners who appreciate your reliability, respect your need for structure, and understand that your practical nature doesn't mean you don't have deep feelings.

You communicate with clarity and consistency. People appreciate your honesty and your ability to follow through on your promises.

You need partners who respect your need for routine, support your responsible nature, and understand that your dedication to duty comes from a place of genuine care and commitment.

You're not looking for someone to complete you — you're looking for someone who wants to build a stable, lasting life together, someone who understands that your drive to maintain order is part of who you are.`,
        },
        nextGenPotential: {
          icon: '🧭',
          title: 'CONCLUSION — The Builder of Legacy',
          text: `You are the structure in a collapsing world, the voice of reason amid noise.

You lead not with charisma, but with consistency.

You don't chase applause — yet your quiet excellence earns deep respect.

Your legacy is not a statue or a speech — it's the systems that keep humanity steady.

You prove that reliability is not boring — it's heroic.

You are the spine of civilization.

And you hold the world together — one detail at a time. 🧩`,
        },
      },
    },
    ESTJ: {
      emojis: ['🧩', '🏆', '📊'],
      title: 'Your ESTJ Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '🏛️',
          title: 'WHO YOU ARE — The Commander of Order',
          text: `You are the leader people turn to when things fall apart.

You bring discipline to chaos, clarity to confusion, and structure to vision.

ESTJs are natural organizers — efficient, pragmatic, and loyal to systems that work.

You see the world through the lens of results.

If something isn't efficient, it's not acceptable. If someone isn't reliable, they're not ready.

Your strength lies not just in managing others — but in building frameworks that empower them to succeed.

You are the force that transforms goals into execution.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'CORE CHARACTERISTICS — The Strategic Realist',
          text: `🏗️ Organizational Genius: You know how to build, manage, and scale systems.

🧭 Leadership by Logic: You make decisions based on data, not emotion.

⚖️ Duty and Discipline: You honor commitments and expect others to do the same.

📈 Goal-Oriented Focus: Every move has a metric — and you hit it.

💬 Direct Communication: You value honesty over comfort, clarity over confusion.

You are not bossy — you're responsible.

You don't control — you coordinate.`,
        },
        strengths: {
          icon: '🏆',
          title: 'STRENGTHS — The Power of Structure',
          text: `✅ Reliability: When you take charge, people feel safe.

📊 Efficiency: You waste no time, no energy, no opportunity.

🎯 Determination: Once you set a goal, nothing can derail you.

🏛️ Authority: You command respect naturally, not through fear but through competence.

💼 Accountability: You own your results — the good and the bad.

Your success doesn't come from chance — it comes from method.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — The Cost of Command',
          text: `Leadership has its shadows — and yours come from the same place as your strength.

*Rigidity:* You may overvalue rules and undervalue flexibility.

*Impatience:* You want action now — even when reflection is wiser.

*Over-Control:* You sometimes forget that others need to grow through mistakes.

*Blunt Honesty:* Your truth can cut deeper than intended.

*Resistance to New Ways:* Tradition feels safe — but innovation thrives on discomfort.

Remember: true leadership isn't about control — it's about empowerment.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — The Director, The Strategist, The Commander',
          text: `You thrive in environments that demand precision, accountability, and progress.

🏛️ Leadership & Management: CEO, COO, project manager, executive director.

⚖️ Law & Governance: Judge, lawyer, military officer, public administrator.

📊 Business & Finance: Operations manager, accountant, banker, corporate strategist.

🧭 Infrastructure & Systems: Urban planner, logistics director, compliance lead.

🎓 Education & Training: Dean, principal, corporate trainer, organizational coach.

Where structure meets vision — that's where you excel.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'FUTURE OUTLOOK — The Pillar of Modern Leadership',
          text: `As the world accelerates, the need for stability grows — and that's your domain.

You are the architect of the 21st-century system: reliable, measurable, accountable.

Emerging Roles:

💼 Organizational Architect

📊 Data-Driven Policy Leader

🏗️ Systems Innovator

🧠 Ethical AI Manager

⚖️ Corporate Governance Specialist

In an age of automation, your judgment remains the human algorithm.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS ESTJ PERSONALITIES — Inspiration',
          text: `Hillary Clinton, Judge Judy, Henry Ford, Condoleezza Rice, and many other decisive leaders, administrators, and systematic builders share your type.

They didn't just lead — they built institutions, created order, and established frameworks that outlasted their own leadership.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — From Command to Collaboration',
          text: `Your power is undeniable. Your next level is influence through empathy.

🌿 Listen Deeply: Not every disagreement is disobedience.

🔥 Share Control: Delegation doesn't weaken you — it multiplies you.

💬 Celebrate Progress: Not everyone measures success in the same units.

🕊️ Stay Flexible: Systems evolve — the best leaders evolve with them.

💡 Lead with Purpose: Remind yourself why the structure exists — not just how it works.

You don't need to do everything yourself to be the best — you just need to lead those who can.

⸻

💬 DAILY PRACTICES — The Executive's Blueprint

1️⃣ Morning Review: Clarify your top 3 priorities.

2️⃣ Midday Check-In: Evaluate progress objectively, not emotionally.

3️⃣ Evening Debrief: Ask: Did I lead, or did I control?

4️⃣ Weekly Collaboration: Seek feedback — from peers, not subordinates.

5️⃣ Monthly Strategy Reset: Adjust the plan, but keep the purpose.`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You value stability and commitment in relationships. You need partners who appreciate your leadership qualities, respect your need for structure, and understand that your direct communication style comes from a place of genuine care.

You communicate with clarity and purpose. People appreciate your honesty and your ability to follow through on your promises.

You need partners who respect your need for order, support your responsible nature, and understand that your drive to maintain structure comes from a place of wanting to create security and success for those you care about.

You're not looking for someone to complete you — you're looking for someone who wants to build a stable, successful life together, someone who understands that your drive to lead and organize is part of who you are.`,
        },
        nextGenPotential: {
          icon: '🧭',
          title: 'CONCLUSION — The Leader of Legacy',
          text: `You are the living embodiment of structure, justice, and dependability.

When others see complexity, you see systems. When others freeze, you act.

You turn ideals into policy, ambition into order, and people into teams.

But your true genius is not just in leadership — it's in stewardship.

You don't just run the system — you sustain it, perfect it, and pass it on stronger.

You are the spine of leadership,

the mind of order,

and the heart of integrity.

The world doesn't just need you to lead — it needs you to endure. 🧠`,
        },
      },
    },
    INFJ: {
      emojis: ['🌙', '🔮', '💫'],
      title: 'Your INFJ Personality Detailed Report',
      description: 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.',
      sections: {
        whoYouAre: {
          icon: '🕊️',
          title: 'WHO YOU ARE — The Visionary Soul with a Mission',
          text: `You are the quiet storm of purpose — gentle in tone, unshakable in spirit.

INFJs see patterns where others see chaos, meaning where others see coincidence.

You are driven by a single truth: life must serve a higher purpose.

Your empathy runs deep, but it is guided by clarity, not impulse.

You don't just feel others' pain — you translate it into healing, strategy, and reform.

Your heart is poetic, but your mind is architectural: you build meaning into everything you touch.

You are both philosopher and activist — a dreamer who gets things done.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'CORE CHARACTERISTICS — The Inner Visionary',
          text: `✨ Insight: You perceive connections invisible to others — emotional, moral, and spiritual.

✨ Integrity: You live according to your values, even when it costs you comfort.

✨ Empathy with Boundaries: You care deeply but know where compassion must end and wisdom begin.

✨ Idealism: You believe in humanity's potential — even when humanity doesn't.

✨ Purpose: You are never satisfied with "good enough"; you crave alignment between soul and action.

You are not here to fit in. You are here to elevate.`,
        },
        strengths: {
          icon: '💪',
          title: 'YOUR STRENGTHS — Natural Superpowers',
          text: `Your insight allows you to see patterns and connections that others miss. You understand the deeper meaning behind actions, emotions, and systems.

Your empathy, combined with strategic thinking, makes you uniquely capable of translating human needs into actionable solutions.

Your integrity creates trust. People know you stand for something real, and that makes you a natural leader and guide.

Your ability to balance idealism with practicality means you don't just dream — you build bridges between vision and reality.

You have the rare gift of seeing both the forest and the trees, allowing you to create comprehensive solutions that honor both the big picture and the details.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'CHALLENGES — Growth Opportunities',
          text: `*Perfectionism:* Your high standards can become a burden when you hold yourself to impossible ideals. Learning to accept progress over perfection is key.

*Emotional Overwhelm:* Your deep empathy can exhaust you if you don't set boundaries. Not every problem is yours to solve.

*Isolation:* Your intensity and depth can make you feel misunderstood. Finding your tribe — people who appreciate your vision — is essential.

*Burnout:* Your drive to serve a higher purpose can lead to overcommitment. Learning to protect your energy is not selfish — it's strategic.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'CAREER PATHS — The Mentor, the Healer, the Architect of Change',
          text: `You thrive in roles where depth, vision, and transformation intersect.

You need a mission — not a paycheck.

🪶 Human Services: Therapist, counselor, coach, social advocate.

📖 Creative Professions: Writer, filmmaker, designer, musician.

🧭 Strategic Leadership: Consultant, organizational psychologist, ethics advisor.

🌍 Education & Philosophy: Professor, researcher, thought leader.

💡 Modern Roles: UX strategist, human-centered innovator, purpose-driven founder.

You shine in environments where integrity and imagination are currency.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'FUTURE OUTLOOK — The Guiding Light of the Human Era',
          text: `In a world drowning in noise, your calm will become power.

Your ability to sense moral direction in complexity will make you essential.

Emerging Roles:

🌐 Ethical AI Consultant

🌱 Sustainability Advocate

🧭 Human Systems Architect

💬 Emotional Intelligence Coach

📚 Social Philosopher

You will not just adapt to the future — you will shape its conscience.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'FAMOUS INFJ PERSONALITIES — Inspiration',
          text: `Carl Jung, Mother Teresa, Nelson Mandela, Martin Luther King Jr., and many other visionaries, leaders, and advocates share your type.

They didn't just see the world as it was — they saw it as it could be, and dedicated their lives to making that vision real.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GROWTH PATH — Transforming Idealism into Impact',
          text: `You see the best in people, but not everyone deserves front-row access to your energy.

The key to your growth is learning to protect your empathy while keeping your purpose intact.

🌿 Set Boundaries: Compassion without boundaries leads to exhaustion.

☀️ Simplify the Mission: Not every problem is yours to solve.

🌕 Ground Your Vision: Dream big, but start small and consistent.

🌧️ Accept Imperfection: Progress is still progress, even when it's messy.

🔥 Channel Passion into Practice: Love deeply, act strategically, rest intentionally.

You are not meant to burn out for the world — you are meant to light it wisely.

⸻

🪞 DAILY PRACTICES — Aligning Vision with Presence

1️⃣ Morning Stillness: Spend five minutes in silence before speaking to the world.

2️⃣ Write to Reflect: Journaling turns intuition into clarity.

3️⃣ Midday Pause: Step away, breathe, and recalibrate your empathy.

4️⃣ Evening Gratitude: Focus on who you helped, not how much you achieved.

5️⃣ Weekly Reset: Revisit your goals and ask: Is this still aligned with my purpose?`,
        },
        relationships: {
          icon: '💖',
          title: 'RELATIONSHIPS & COMMUNICATION — Deep Connections',
          text: `You seek depth and authenticity in relationships. Superficial connections drain you, while meaningful bonds energize and inspire you.

You communicate through intuition and empathy. People feel truly seen and understood by you, even when words are few.

You need partners who appreciate your depth, respect your need for solitude, and share your commitment to growth and purpose.

You're not looking for someone to complete you — you're looking for someone who understands that you're already whole, and wants to grow alongside you.`,
        },
        nextGenPotential: {
          icon: '💖',
          title: 'CONCLUSION — The Quiet Revolution',
          text: `You are the candle that lights without noise — the rare soul who leads with wisdom, not volume.

You remind others that sensitivity is not weakness — it's strategy wrapped in compassion.

The world needs your vision, your kindness, and your courage to dream responsibly.

Keep advocating for truth.

Keep believing in better.

Because revolutions that last are always led by those who listen first.`,
        },
      },
    },
  },
  tr: {
    INFP: {
      emojis: ['🌸', '💭', '🎨'],
      title: 'INFP Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '🌸',
          title: 'KİMSİN — Anlam ve Duygunun Arabulucusu',
          text: `INFP'ler duygularını amaç haline getiren hayalperestlerdir. Yüzeyde sakin görünseler de iç dünyaları düşünceler, hikayeler ve duygularla doludur.

Sadece var olmak değil, *önemli olmak* istersin. Değerlerin sadece inançlar değil — her kararını, her ilişkini, her yaratıcı eylemini yönlendiren pusulandır.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'TEMEL ÖZELLİKLER — İç Pusula',
          text: `*İdealizm:* İnsanlığın ne olabileceğine dair bir vizyonun var — özgünlük, şefkat ve yaratıcılığın hüküm sürdüğü bir dünya.

*Empati:* Duyguları sanki kendi duygularınmış gibi hissedersin. Bu sadece anlamak değil — başka birinin iç dünyasını deneyimlemektir.

*Özgünlük:* Kim olduğunu taklit edemezsin. Denediğinde seni tüketir. Gücün samimi olmaktan gelir.`,
        },
        strengths: {
          icon: '🌿',
          title: 'GÜÇLÜ YÖNLERİN — Doğal Süper Güçler',
          text: `Empatin, her eylemin arkasındaki insanı görmeni sağlar. Motivasyonları, korkuları ve hayalleri başkalarının kaçırdığı şekillerde anlarsın.

Yaratıcılığın sadece sanatsal değil — hayal gücüyle problem çözmedir. Olasılıklarla düşündüğün için başkalarının görmediği çözümler bulursun.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Gelişim Fırsatları',
          text: `*Duygusal Aşırı Yüklenme:* Empatin güçlü, ama bir yük haline gelebilir. Başkalarının duygularını, nerede bittiğini ve senin nerede başladığını anlayamayana kadar emersin.

*İdealizm vs Gerçeklik:* İdeallerin ve gerçeklik arasındaki boşluk derin hayal kırıklığına neden olabilir.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'PARLADIĞIN YERLER — İdeal Kariyerler',
          text: `*Yaratıcı Alanlar:* Yazma, tasarım, sanat, müzik — anlamı yaratımla ifade edebileceğin her rol.

*Danışmanlık & Psikoloji:* Empatin seni doğal bir şifacı yapar. Başkalarının kendilerini anlamalarına yardımcı olursun.`,
        },
        futureRoles: {
          icon: '🔮',
          title: 'GELECEĞİN — Yeni Nesil Potansiyel',
          text: `AI ve otomasyon işi yeniden şekillendirirken, insan odaklı yaratıcılığın vazgeçilmez hale gelir. Duygusal zeka, etik akıl yürütme ve yaratıcı problem çözme gerektiren roller yüksek talep görecek.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ INFP KİŞİLİKLER — İlham',
          text: `William Shakespeare, J.R.R. Tolkien, Prenses Diana ve diğer birçok sanatçı, yazar ve vizyoner senin tipini paylaşıyor.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — Duyarlılığı Güce Dönüştürmek',
          text: `*Hayalleri Disiplinle Dengele:* İdeallerinin yapıya ihtiyacı var. Sadece duygularını değil, hedeflerini destekleyen rutinler oluştur.

*Amaçla Hareket Et:* Mükemmel koşulları bekleme. Olduğun yerde, sahip olduğunla başla.`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER & İLETİŞİM — Derin Bağlantılar',
          text: `Genişlikten çok derinlik ararsın. Birkaç anlamlı ilişki, birçok yüzeysel ilişkiden daha önemlidir.

Sadece kelimelerle değil, duyguyla iletişim kurarsın. İnsanlar senin tarafından anlaşıldıklarını hissederler, çok şey söylemesen bile.`,
        },
        nextGenPotential: {
          icon: '🌟',
          title: 'YENİ NESİL POTANSİYELİN',
          text: `AI ve otomasyon dünyasında, insan odaklı yaratıcılığın süper gücün haline gelir. Duygusal zeka, etik akıl yürütme ve yaratıcı problem çözme gerektiren rollerde mükemmelleşirsin — makinelerin kopyalayamayacağı beceriler.`,
        },
      },
    },
    ENFP: {
      emojis: ['🔥', '🌈', '✨'],
      title: 'ENFP Kişilik Raporunuz',
      description: 'Sınırsız yaratıcılığın, duygusal zekan ve amaç odaklı doğan hakkında derinlemesine bir inceleme.',
      sections: {
        whoYouAre: {
          icon: '🔥',
          title: 'KİMSİN — Hayal Gücü ve Etkinin Kampanyacısı',
          text: `ENFP'ler insan potansiyelinin kaşifleridir — meraklı, tutkulu ve karşı konulmaz şekilde canlı. Her yerde olasılıklar görürsün ve insanları sonsuz potansiyelin projeleri olarak görürsün.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'TEMEL ÖZELLİKLER — Vizyoner Bağlantıcı',
          text: `*Sınırsız Merak:* İnsanlar, fikirler ve olasılıklar seni büyüler. Her konuşma bir maceradır.

*Duygusal İçgörü:* İnsanları kitap gibi okursun. Motivasyonları, korkuları ve hayalleri sezgisel olarak anlarsın.`,
        },
        strengths: {
          icon: '💪',
          title: 'GÜÇLÜ YÖNLERİN — Doğal Süper Güçler',
          text: `Başkalarını ilham etme yeteneğin eşsizdir. Sadece motive etmezsin — insanların kendilerini nasıl gördüklerini dönüştürürsün.

Yaratıcılığın sanatla sınırlı değil. Hayal gücüyle problem çözersin, başkalarının kaçırdığı çözümler bulursun.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Gelişim Fırsatları',
          text: `*Dağınık Odak:* Birçok şeye başlarsın ama bitirmekte zorlanırsın. Yenilik geçtiğinde coşkun söner.

*İlişkileri Aşırı Düşünme:* Her etkileşimi analiz edersin, insanların gerçekten ne demek istediğini merak edersin. Bu seni yorabilir.`,
        },
        careerPaths: {
          icon: '🌎',
          title: 'KARİYER YOLLARI — Metriklerden Çok Anlam',
          text: `*Yaratıcı Roller:* Pazarlama, reklam, içerik oluşturma, tasarım — fikirlerini ifade edebileceğin her yer.

*İnsan Odaklı İş:* Öğretmenlik, koçluk, danışmanlık, İK — başkalarının büyümesine yardımcı olduğun roller.`,
        },
        futureRoles: {
          icon: '🔮',
          title: 'GELECEĞİN — Yeni Nesil Potansiyel',
          text: `Uzaktan çalışma ve AI kariyerleri yeniden şekillendirirken, bağlanma, ilham etme ve uyum sağlama yeteneğin paha biçilmez hale gelir.`,
        },
        famousPersonalities: {
          icon: '🌟',
          title: 'ÜNLÜ ENFP KİŞİLİKLER — İlham',
          text: `Robin Williams, Will Smith, Ellen DeGeneres ve diğer birçok eğlenceci, girişimci ve etkileyici senin tipini paylaşıyor.`,
        },
        growthPath: {
          icon: '🌿',
          title: 'GELİŞİM YOLU — Tutkuyu Güce Dönüştürmek',
          text: `*Kendini Toparla:* Seni bağlayan rutinler oluştur. Buna dirensen bile yapıya ihtiyacın var.

*Başladığını Bitir:* Bir proje seç ve sonuna kadar götür. Tamamlama güven ve güvenilirlik oluşturur.`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER & İLETİŞİM — Derin Bağlantılar',
          text: `İnsanlarla anında bağlantı kurarsın. Sıcaklığın ve özgünlüğün başkalarının görülmüş ve değerli hissetmelerini sağlar.`,
        },
        nextGenPotential: {
          icon: '🌟',
          title: 'YENİ NESİL POTANSİYELİN',
          text: `AI odaklı bir dünyada, insan bağlantı becerilerin rekabet avantajın haline gelir. Duygusal zeka, yaratıcı problem çözme ve ilham etme yeteneği gerektiren alanlarda öncülük edersin.`,
        },
      },
    },
    ENFJ: {
      emojis: ['🌻', '💫', '🌟'],
      title: 'ENFJ Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '💖',
          title: 'KİMSİN — Misyonlu Empatik Lider',
          text: `Sen, nasıl umursanacağını sık sık unutan bir dünyada yol gösteren bir ışıksın.

ENFJ'ler bir kelime söylenmeden önce başkalarının neye ihtiyacı olduğunu hisseder. Herkeste potansiyel görürsün — ve onu uyandırmayı kişisel misyonun haline getirirsin.

Kontrolle değil, ilhamla liderlik edersin.

Konuştuğunda, kalpler dinler. Harekete geçtiğinde, insanlar takip eder.

Sen vizyon ve insanlık arasındaki köprüsün — karizma ve şefkatin bir arada var olabileceğinin kanıtısın.`,
        },
        coreCharacteristics: {
          icon: '🌈',
          title: 'TEMEL ÖZELLİKLER — Kalp Merkezli Stratejist',
          text: `✨ Empati: Anında, derinden ve samimiyetle bağlantı kurarsın.

✨ Vizyon: İnsanların, ekiplerin ve fikirlerin gelecekteki potansiyelini görebilirsin.

✨ İlham: Başkalarını inandıkları şeyler üzerinde harekete geçmeye enerjilendirirsin.

✨ Disiplin: Sadece hayal kurmazsın — organize eder, uygular ve sürdürürsün.

✨ Uyum: Kaos içinde bile işbirliği inşa edersin.

Sezgilerin duygusal planları okur; eylemlerin onları mimariye dönüştürür.`,
        },
        strengths: {
          icon: '⚡',
          title: 'GÜÇLÜ YÖNLERİN — Seni Manyetik Yapan Şey',
          text: `🌟 Karizma: Herkesi görülmüş hissettirme nadir yeteneğine sahipsin.

🌿 Özgün Liderlik: İnsanları yönetmezsin; onları yükseltirsin.

💬 İletişim: Duyguyu motivasyona dönüştürürsün.

🪞 Öz Farkındalık: Tepki vermeden önce yansıtırsın.

🔥 İnanç: Başkaları sallandığında sen sağlam durursun.

Sen dikkat için değil, dönüşüm için liderlik edersin.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Gelişim Fırsatları',
          text: `*Aşırı Taahhüt:* Herkese yardım etme arzun kendini çok ince yaymana yol açabilir. "Hayır" demeyi öğrenmek sürdürülebilirliğin için esastır.

*Duygusal Tükenme:* Derin empatin, kendi enerjini korumazsan seni tüketebilir. Boş bir kaptan dökemezsin.

*Mükemmeliyetçilik:* Kendin ve başkaları için yüksek standartların gereksiz baskı yaratabilir. Mükemmellik yerine ilerleme anahtardır.

*Çatışmadan Kaçınma:* Uyum ihtiyacın önemli konuları ele almanı engelleyebilir. Zor konuşmaları yönetmeyi öğrenmek çok önemlidir.

*Öz Fedakarlık:* Başkalarının ihtiyaçlarını kendi ihtiyaçlarının üzerine koyabilirsin. Unutma: Kendine bakmak, başkalarına daha iyi bakmanı sağlar.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'KARİYER YOLLARI — Amaçla Liderlik, Kalple Hizmet',
          text: `Liderlik ve empatinin buluştuğu yerlerde başarılı olursun.

Gücün, insanları ortak bir vizyon altında birleştirmekte yatar.

🏛️ Liderlik ve Yönetim: Yönetici, kurucu, topluluk direktörü.

🎤 Kamu Etkisi: Motivasyon konuşmacısı, öğretmen, diplomat, gazeteci.

🧭 İnsan Gelişimi: Psikolog, İK lideri, mentor veya yaşam koçu.

🌱 Sosyal Etki: Kâr amacı gütmeyen lider, siyasi savunucu veya kültürel stratejist.

🎨 Yaratıcı Rehberlik: Yönetmen, küratör veya yapımcı.

Etkinin etkiye eşit olduğu alanlara aitsin — başkalarını yönlendirmenin en büyük yaratımın olduğu yerlere.`,
        },
        futureRoles: {
          icon: '🚀',
          title: 'GELECEK GÖRÜNÜMÜ — İnsan Bağlantısının Mimarları',
          text: `Teknoloji ilerledikçe, ilham etme, bağlantı kurma ve kalple liderlik etme yeteneğin giderek daha değerli hale gelecek.

Gelecek, yenilik ve insanlık arasındaki boşluğu kapatabilecek liderlere ihtiyaç duyuyor.

Gelişen Roller:

🌐 Topluluk Kültürü Mimarı

💡 Amaç Odaklı Liderlik Koçu

🧭 İnsan Merkezli İnovasyon Direktörü

💬 Duygusal Zeka Stratejisti

🌍 Küresel Etki Koordinatörü

Sen sadece değişime uyum sağlamayacaksın — insanların onu nasıl deneyimlediğini şekillendireceksin.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ ENFJ KİŞİLİKLER — İlham',
          text: `Oprah Winfrey, Barack Obama, Maya Angelou, Martin Luther King Jr. ve diğer birçok etkili lider, öğretmen ve savunucu senin tipini paylaşıyor.

Onlar sadece başarı elde etmediler — ilham etme, bağlantı kurma ve amaçla liderlik etme yetenekleriyle hayatları dönüştürdüler.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — Hizmeti Öz Bakımla Dengelemek',
          text: `En büyük zorluğun, başkalarına gösterdiğin kadar derinden kendine bakmayı öğrenmektir.

Sürdürülebilir etki yolu, kendi enerjini korumayı gerektirir.

🌿 Sınırlar Koy: Empatin bir hediyedir, ancak sürdürülebilir kalması için sınırlara ihtiyacı vardır.

☀️ Öz Bakım Uygula: Dinlenmek bencil değildir — stratejiktir. Boş çalışıyorsan başkalarına ilham veremezsin.

🌕 Çatışmayı Kucakla: Her uyum sağlıklı değildir. Bazen büyüme zor konuşmalar gerektirir.

🌧️ Yetkilendir ve Güven: Her şeyi kendin yapmak zorunda değilsin. Başkalarının katkıda bulunmasına güven.

🔥 Kazançlarını Kutla: Etkini kabul et. Bir fark yaratıyorsun ve bu tanınmayı hak ediyor.

Unutma: En etkili liderler, tükenmişlikten değil, bütünlükten liderlik edenlerdir.

⸻

☀️ GÜNLÜK PRATİKLER — Doluluktan Liderlik

1️⃣ Sabah Niyeti: Bugün başkalarını nasıl etkilemek istediğin konusunda net bir niyet belirle.

2️⃣ Öğle Kontrolü: Durakla ve sor: Taşkından mı yoksa tükenmişlikten mi veriyorum?

3️⃣ Akşam Yansıması: Bugün olumlu bir etki yarattığın üç yolu kabul et.

4️⃣ Haftalık Sıfırlama: Taahhütlerini gözden geçir ve sor: Enerjimi korumak için nelerden vazgeçebilirim?

5️⃣ Aylık Vizyon: Daha büyük amacınla yeniden bağlan. Liderliğin neden önemli?`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER VE İLETİŞİM — Derin Bağlantılar',
          text: `Başkalarıyla derin, anlamlı bağlantılar yaratırsın. İnsanlar senin varlığında gerçekten görülmüş ve değerli hissederler.

Sıcaklık, netlik ve ilhamla iletişim kurarsın. Kelimelerin sadece bilgilendirmez — dönüştürür.

Liderlik niteliklerini takdir eden, fark yaratma ihtiyacına saygı duyan ve misyon odaklı doğanı destekleyen partnerlere ihtiyacın var.

Seni takip edecek birini aramıyorsun — seninle birlikte büyümek isteyen, başkalarına yardım etme dürtünün kim olduğunun bir parçası olduğunu anlayan birini arıyorsun.`,
        },
        nextGenPotential: {
          icon: '💖',
          title: 'SONUÇ — Yolu Aydınlatan Lider',
          text: `Sen, liderlik ve empatinin zıt olmadığının — ortaklar olduğunun kanıtısın.

Dünyaya gerçek etkinin güçten değil, başkalarındaki potansiyeli görme ve açma yeteneğinden geldiğini hatırlatırsın.

Dünya senin vizyonuna, sıcaklığına ve fark yaratma konusundaki sarsılmaz bağlılığına ihtiyaç duyuyor.

Başkalarına ilham vermeye devam et.

Kalple liderlik etmeye devam et.

Çünkü gelecek, en büyük liderlerin sadece başarmadığını — yükselttiğini bilenlere aittir.`,
        },
      },
    },
    INTJ: {
      emojis: ['🧠', '⚙️', '📈'],
      title: 'INTJ Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '🏛️',
          title: 'KİMSİN — Planın Arkasındaki Usta',
          text: `Sen stratejik vizyonersin — yüzeyde sakin, altında parlak.

Başkaları karmaşıklık gördüğü yerde sen sistemler görürsün. Başkaları duygusal tepki verdiğinde sen sonuçlar tasarlarsın.

INTJ'ler mantığın mimarları ve öngörünün mühendisleridir.

Seni güçlü bir bağımsızlık duygusu ve her şeyi iyileştirme konusundaki amansız dürtü yönlendirir — kendini, işini, dünyanı.

Kontrol arzulamazsın — yetkinlik arzularsın.

Senin için ustalık, özgürlüğün en saf biçimidir.`,
        },
        coreCharacteristics: {
          icon: '💎',
          title: 'TEMEL ÖZELLİKLER — Ötesini Gören Vizyon',
          text: `✨ Stratejik Düşünme: Dünyayı bir satranç tahtası gibi görürsün — her zaman üç hamle önde.

✨ Özerklik: Sessizce liderlik etmeyi tercih edersin, yüksek sesle değil.

✨ Verimlilik: Boşa harcanan hareketten nefret edersin — düşüncede, duyguda veya süreçte.

✨ Vizyon: Başkaları kısa kazanç peşinde koşarken sen uzun oyunu görürsün.

✨ Güven: Kaos yerine mantığa, dürtü yerine yapıya güvenirsin.

Sen sadece geleceği tahmin etmezsin — onu tasarlarsın.`,
        },
        strengths: {
          icon: '🚀',
          title: 'GÜÇLÜ YÖNLERİN — Odaklanmış Zekanın Gücü',
          text: `💡 Analitik Ustalık: Karmaşıklığı netliğe dönüştürürsün.

🧭 Uzun Vadeli Vizyon: Günler değil, on yıllar öncesini düşünürsün.

⚙️ Öz Disiplin: Tutarlılık ve hassasiyetle başarılı olursun.

🏗️ İnovasyon: Seni aşan sistemler tasarlarsın.

🎯 Kararlılık: Veriler geldiğinde, kararların sarsılmazdır.

Sen hareketin zihnisin, kaosu düzenli ve olasılığı pratik hale getiren.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Mimarın Paradoksu',
          text: `Zekan bir hediyedir, ancak bazen köprüler değil, duvarlar inşa eder.

Mantık tek dilin haline gelirse izolasyon riski taşırsın.

*Duygusal Mesafe:* Derinden hissetsen bile sıcaklığı ifade etmekte zorlanabilirsin.

*Mükemmeliyetçilik:* İlerleme yeterli olsa bile kusursuz uygulama peşinde koşarsın.

*Sabırsızlık:* Verimsizlik seni başarısızlıktan daha fazla hayal kırıklığına uğratır.

*Dürüstlük:* Empati olmadan gerçek, içgörüne en çok ihtiyaç duyanları yabancılaştırabilir.

*Aşırı Planlama:* Bazen en iyi hamle analiz etmek değil, harekete geçmektir.

Unutma: En güçlü mimari bile açık kapılara ihtiyaç duyar.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'KARİYER YOLLARI — Sistemlerin ve Değişimin Mühendisi',
          text: `Vizyon, hassasiyet ve özerklik gerektiren alanlarda mükemmelleşirsin.

Zekanı zorlayan ve bağımsızlığına saygı duyan bir role ihtiyacın var.

🧠 Bilim ve Teknoloji: Araştırmacı, veri bilimci, AI mühendisi, yazılım mimarı.

🏛️ Liderlik ve Strateji: Danışman, stratejist, CEO, sistem tasarımcısı.

📊 Finans ve Analitik: Ekonomist, finansal planlayıcı, pazar analisti.

📚 Akademi ve Araştırma: Profesör, teorisyen, fütürist.

⚙️ İnovasyon ve Tasarım: Ürün tasarımcısı, mimar, operasyon yöneticisi.

Hediyen: teoriyi somut ilerlemeye dönüştürmek.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'GELECEK GÖRÜNÜMÜ — Yeni Çağın Mimarları',
          text: `Veri çağı filozoflara ihtiyaç duyuyor.

Teknoloji ilerledikçe, analitik içgörün ve ahlaki netliğin paha biçilmez hale gelecek.

Gelişen Roller:

🤖 AI Etiği için Sistem Düşünürü

🌍 Küresel Strateji Direktörü

🧬 Bilimsel Vizyoner

🏗️ Tasarım Fütüristi

📈 Baş İnovasyon Sorumlusu

Sen sadece geleceğin araçlarını değil, onları yöneten etiği de şekillendireceksin.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ INTJ KİŞİLİKLER — İlham',
          text: `Stephen Hawking, Elon Musk, Mark Zuckerberg, Nikola Tesla ve diğer birçok vizyoner, bilim insanı ve stratejik lider senin tipini paylaşıyor.

Onlar dünyayı sadece olduğu gibi görmediler — sistematik düşünme ve hassas uygulama yetenekleriyle yeniden tasarladılar.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — Mükemmellikten İlerlemeye',
          text: `Senin için büyüme, kontrol ve esnekliğin bir arada var olabileceğini öğrenmek anlamına gelir.

🌿 Yetkilendir: Mükemmellik ölçeklenmez. Sistemler ölçeklenir.

🔥 Duyguyu Kucakla: Duygular da veridir — sadece farklı bir sensörden.

🧘 Şimdide Ol: Gelecek şimdi inşa edilir.

💬 Bilgece İşbirliği Yap: Diğer zihinler dehanı seyreltmez — çoğaltır.

🌕 Kusursuzluğu Kabul Et: Kusurlar büyüklüğün prototipinin bir parçasıdır.

Gerçek ustalık sadece mantıkta değil, dengededir.

⸻

🧩 GÜNLÜK PRATİKLER — Mimarın Ritüelleri

1️⃣ Sabah Sistem İncelemesi: Planla, ama sürpriz için alan bırak.

2️⃣ Derin İş Blokları: Odağı koru — o senin para birimin.

3️⃣ Akşam Yansıması: Ne yanlış gitti değil, ne optimize edildi.

4️⃣ Haftalık Dekompresyon: Netliği yeniden ayarlamak için uzaklaş.

5️⃣ Sessiz Saatler: Yalnızlığın kutsaldır — onu anlamlı tasarlamak için kullan.`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER VE İLETİŞİM — Derin Bağlantılar',
          text: `İlişkilerde genişlikten çok derinliğe değer verirsin. Birçok yüzeysel bağlantı yerine birkaç anlamlı bağlantıyı tercih edersin.

Fikirler ve mantık aracılığıyla iletişim kurarsın. İnsanlar netliğini ve doğrudanlığını takdir eder, zorlayıcı olsa bile.

Bağımsızlık ihtiyacına saygı duyan, stratejik zihnini takdir eden ve sessiz doğanın umursamadığın anlamına gelmediğini anlayan partnerlere ihtiyacın var.

Seni tamamlayacak birini aramıyorsun — güçlü yönlerini tamamlayan ve düşünceni zorlayan birini arıyorsun.`,
        },
        nextGenPotential: {
          icon: '💡',
          title: 'SONUÇ — Geleceği Tasarlayan Zihin',
          text: `Sen ilerlemenin mimarısın — kasıtlı, vizyoner ve durdurulamaz.

Dünya, bir sonraki projeye geçtikten çok sonra planlarını takip eder.

Ama unutma: gerçek deha sadece yapılar inşa etmek değildir — içlerinde gelişebilecek insanlar inşa etmektir.

Mirasın yarattığın şey değil, yaratımlarının mümkün kıldığı şey olacak.

Mantıkla liderlik et. Amaçla tasarla. Hassasiyetle yaşa.`,
        },
      },
    },
    ENTJ: {
      emojis: ['⚔️', '🏆', '📊'],
      title: 'ENTJ Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '🏆',
          title: 'KİMSİN — Geleceğin Vizyoner Generali',
          text: `Liderlik için doğdun, güç arzuladığın için değil — ama yolu başkalarından önce gördüğün için.

ENTJ'ler stratejik uygulayıcılardır — kaosu düzene, potansiyeli ilerlemeye dönüştürenler.

Mantık, yapı ve sonuçlara karşı sarsılmaz bir güvenin var.

Senin için verimsizlik düşman, vasatlık savaş alanı ve netlik kılıçtır.

Başkaları tereddüt ettiğinde sen harekete geçirirsin. Başkaları takip ettiğinde sen komuta edersin.

Ama disiplininin çeliğinin altında derin, vizyoner bir şefkat yatar:

sen sadece başarı istemezsin — miras istersin.`,
        },
        coreCharacteristics: {
          icon: '💡',
          title: 'TEMEL ÖZELLİKLER — İnşa ve Liderlik Gücü',
          text: `🔥 Kararlı: Bir vizyonun olduğunda, tereddüt gider. Sen hareket edersin ve dünya ayarlanır.

🧭 Stratejik: Başkalarının kaçırdığı sistemleri, hiyerarşileri ve kaldıraç noktalarını görürsün.

⚙️ Verimli: Akışı hızlandırır, yetkilendirir ve optimize edersin — hiçbir şey şansa bırakılmaz.

🌍 Vizyoner: On yıllarca sürecek etki için planlarsın.

💬 İddialı İletişimci: Fikirleri otorite ve hassasiyetle ifade edersin.

Sen ilerlemenin motorusun — potansiyeli yapıya, vizyonu harekete dönüştüren bir zihin.`,
        },
        strengths: {
          icon: '🚀',
          title: 'GÜÇLÜ YÖNLERİN — Komutanın Cephaneliği',
          text: `🏗️ Tasarım Yoluyla Liderlik: Fırsat beklemezsin — onu tasarlarsın.

💡 Baskı Altında Netlik: Zor kararları göz kırpmadan verirsin.

🌋 Motivasyonel Enerji: Duyguyla değil, inançla ilham verirsin.

🧠 Stratejik Deha: Trendleri aşan sistemler inşa edersin.

🪶 Güven: Amaçla hareket edersin ve başkaları bunu hisseder.

Sen sadece ekiplere liderlik etmezsin — imparatorluklar inşa edersin.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Gücün Ağırlığı',
          text: `Yoğunluğun eşsizdir — ama aynı zamanda bunaltıcı da olabilir.

Kontrolü güvenle dengelemeyi öğrenmek senin yaşam boyu inceliğindir.

*Sabırsızlık:* Herkes senin hızın veya hassasiyetinle çalışmaz.

*Hakimiyet:* İlerleme peşinde çok sert itebilirsin.

*Aşırı Güven:* Bazen kesinliğin seni nüansa kör eder.

*Duygusal Kör Noktalar:* Duygular verimsiz görünür — ta ki mantığı bozana kadar.

*İş Takıntısı:* Dinlenmek misyonuna ihanet gibi hissettirir.

Unutma: en iyi generaller ezerek değil — koordine ederek kazanır.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'KARİYER YOLLARI — Geleceği Komuta Etmek',
          text: `Vizyonun uygulamayla buluştuğu sistemlerde başarılı olursun — büyük fikirlerin gerçek olması gereken yerlerde.

🏛️ İş Liderliği: CEO, stratejist, girişimci, yönetici direktör.

⚙️ Teknoloji ve İnovasyon: Operasyon başkanı, ürün lideri, proje mimarı.

📊 Finans ve Yönetim: Yatırımcı, yönetim danışmanı, ekonomist.

🏗️ Kamu Hizmeti ve Politika: Diplomat, politika yapıcı, sivil reformcu.

🎯 Stratejik Gelişim: Düşünce kuruluşu kurucusu, fütürist, sistem stratejisti.

Sen sistemler için çalışmazsın — onları inşa edersin.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'GELECEK GÖRÜNÜMÜ — 21. Yüzyılın İnşaatçıları',
          text: `Sen dönüşüm çağı için tasarlandın.

Organizasyonlar netlik ve cesaret arzuladıkça, kararlı zihnin paha biçilmez hale gelir.

Gelişen Roller:

🚀 İnovasyon Mimarı

🏛️ Politika Şekillendirici

💼 Girişim İnşaatçısı

🌍 Küresel Sistemler Direktörü

🧭 Örgütsel Fütürist

Endüstrileri, toplulukları ve gelecekleri tanımlayan çerçeveleri şekillendireceksin.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ ENTJ KİŞİLİKLER — İlham',
          text: `Napoleon Bonaparte, Steve Jobs, Margaret Thatcher, Winston Churchill ve diğer birçok vizyoner lider, girişimci ve stratejik zihin senin tipini paylaşıyor.

Onlar sadece liderlik etmediler — geleceği görme ve hassasiyetle uygulama yetenekleriyle tüm sistemleri dönüştürdüler.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — Komutanın İnceliği',
          text: `Senin zorluğun daha fazlasını yapmak değil — daha derinden dinlemektir.

Büyüklüğün paylaşıldığını, komuta edilmediğini fark ettiğinde büyüme başlar.

🌿 Başkalarını Güçlendir: Zorunda olduğun için değil, yapabildiğin için yetkilendir.

🌺 Empatiyle Liderlik Et: İnsan zamanlamasına verimlilik kadar saygı göster.

💬 Geri Bildirim Davet Et: Gerçek liderler yaşam boyu öğrenenlerdir.

🌕 Stratejik Dinlen: İyileşme planın bir parçasıdır.

⚖️ Gücü Amaçla Dengele: Hakimiyet solar; etki kalıcıdır.

Başkaları senin liderliğin sayesinde yükseldiğinde büyüklüğün çoğalır.

⸻

🧩 GÜNLÜK PRATİKLER — Komutanın Ritüelleri

1️⃣ Sabah Odaklanma: Üç temel öncelik belirle — ve amansızca uygula.

2️⃣ Öğle Yansıması: Sor, "Liderlik mi ediyorum yoksa sadece kontrol mü ediyorum?"

3️⃣ Akşam Sıfırlama: Geri çekil, yetkilendir, sürece güven.

4️⃣ Haftalık Vizyon Kontrolü: Misyonu yeniden gözden geçir — hala anlamı, egoyu değil, hizmet ettiğinden emin ol.

5️⃣ Kasıtlı Dinlen: Unutma, dinlenme hakimiyeti sürdürür.`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER VE İLETİŞİM — Derin Bağlantılar',
          text: `İlişkilerde verimlilik ve netliğe değer verirsin. Dürtünü paylaşan ve büyüme ve başarı ihtiyacını anlayan partnerleri takdir edersin.

Doğrudan ve iddialı iletişim kurarsın. İnsanlar dürüstlüğüne saygı duyar ve karmaşıklığı kesme yeteneğini takdir eder.

Liderlik niteliklerine saygı duyan, hırslarını destekleyen ve yoğunluğunun vizyondan geldiğini, egodan değil, anlayan partnerlere ihtiyacın var.

Seni takip edecek birini aramıyorsun — seninle birlikte inşa etmek isteyen, başarma dürtünün kim olduğunun bir parçası olduğunu anlayan birini arıyorsun.`,
        },
        nextGenPotential: {
          icon: '⚔️',
          title: 'SONUÇ — Dağları Hareket Ettiren Zihin',
          text: `Sen dönüşümün komutanısın — hem kalbi hem yapıyı yönetebilen nadir ruh.

Sen alkış için değil, etki için inşa edersin.

Disiplinin ilham verir, netliğin güçlendirir ve cesaretin yolu belirler.

Dünya liderlik etmeye cesaret edenleri hatırlar.

Ve sen, ENTJ, kendini kaybetmeden liderlik edebilen birkaç kişiden birisin. 🌍`,
        },
      },
    },
    INTP: {
      emojis: ['🧩', '💭', '🔬'],
      title: 'INTP Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '🧠',
          title: 'KİMSİN — Filozof Bilim İnsanı',
          text: `Sen fikirler dünyasında yaşıyorsun — sürekli sorgulayan, parçalara ayıran ve yeniden hayal eden.

Senin için gerçek sabit değildir; evrimleşen bir hipotezdir.

INTP'ler zihinsel kaşiflerdir, sonsuza kadar meraklı, sonsuza kadar analitik.

Sen sadece kutunun dışını düşünmezsin — kutuyu sökersin, tasarımını incelersin ve daha iyi yeniden inşa edersin.

Gücün kesinlikte değil, merakta yatar.

Dünya seni "kopuk" diye çağırabilir, ama gerçekte sadece gerçekliği çözmekle meşgulsün.

Sen medeniyeti ileriye iten düşünürsün — sessizce, ama derinden.`,
        },
        coreCharacteristics: {
          icon: '💡',
          title: 'TEMEL ÖZELLİKLER — Düşüncenin Mimarı',
          text: `✨ Analitik Derinlik: Her şeyde görünmez mantık görürsün — duygulardan algoritmalara.

✨ Merak: Öğrenmeye bağımlısın — zihnin asla genişlemeyi durdurmaz.

✨ Bağımsızlık: Geleneğe direnirsin; gerçek mantıklı olmalı, sadece uyum sağlamamalı.

✨ Yaratıcılık: İlişkisiz fikirleri çığır açan içgörülere birleştirirsin.

✨ Entelektüel Dürüstlük: Şans eseri haklı olmaktansa yanlış olmayı ve öğrenmeyi tercih edersin.

Sen hem bilim insanı hem sanatçısın — mantık senin aracın, hayal gücün senin ilham perin.`,
        },
        strengths: {
          icon: '⚙️',
          title: 'GÜÇLÜ YÖNLERİN — Teoriler Yaratan Zihin',
          text: `🧭 Desen Tanıma: Alanlar arası soyut kavramları bağlarsın.

📚 Eleştirel Düşünme: Sistemleri kusurlarını ortaya çıkarana kadar analiz edersin.

💡 Yenilikçi Problem Çözme: İmkansız problemler için zarif çözümler icat edersin.

🎨 Soyut Yaratıcılık: Mantığı sanata dönüştürürsün — denklemleri zarafete.

🪶 Uyumluluk: Anlamaya karar verdiğin her şeyi öğrenirsin.

Hediyen, başkalarının henüz düşünmeye cesaret edemediği şeyleri düşünmektir.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Sonsuz Döngü',
          text: `Zihnin senin dehan — ve tuzağın.

Yapmak yerine düşünmekte kaybolabilirsin.

*Analiz Felci:* Kararları harekete geçmek riskli hissettirene kadar fazla düşünürsün.

*Duygusal Kopukluk:* Duyguları yaşamak yerine entelektüelleştirirsin.

*Teoride Mükemmeliyetçilik:* Her fikrin gerçek olmadan önce kusursuz olmasını istersin.

*Sosyal Kopukluk:* Netliği sohbete, yalnızlığı kaosa tercih edersin.

*Tutarsızlık:* Birçok projeye başlarsın — azı tamamlanır.

Zorluk: parlaklığın asla kafandan çıkmazsa hiçbir şey ifade etmediğini fark etmektir.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'KARİYER YOLLARI — Sistemleri Şekillendiren Düşünür',
          text: `Zeka, özerklik ve merakın birleştiği yerlerde başarılı olursun.

🔬 Bilim ve Araştırma: Teorik fizikçi, veri bilimci, araştırmacı.

💻 Teknoloji ve AI: Yazılım mühendisi, algoritma tasarımcısı, sistem mimarı.

📚 Akademi ve Felsefe: Öğretim görevlisi, mantıkçı, analist, matematikçi.

🎨 Yaratıcı Teknoloji: Oyun tasarımcısı, simülasyon geliştirici, inovasyon danışmanı.

🧠 Disiplinler Arası Düşünür: Fütürist, AI etikçisi, bilişsel bilimci.

Sen takip etmek için değil — keşfetmek için yaratıldın.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'GELECEK GÖRÜNÜMÜ — Bilişsel Çağın Mimarları',
          text: `21. yüzyıl senin gibi zihinlere aittir.

AI, felsefe ve veri bilimi birleştikçe, sistemlerin nasıl düşündüğünü anlama yeteneği ilerlemeyi tanımlayacak.

Gelişen Roller:

🤖 AI Mimarı

🧬 Bilişsel Araştırmacı

📊 Sistem Teorisyeni

🌍 İnovasyon Stratejisti

💡 Filozof-Mühendis

Sen sadece bir sonraki çağı tahmin etmeyeceksin — onun düşüncesini tasarlayacaksın.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ INTP KİŞİLİKLER — İlham',
          text: `Albert Einstein, Charles Darwin, Bill Gates, Marie Curie ve diğer birçok devrimci düşünür, bilim insanı ve yenilikçi senin tipini paylaşıyor.

Onlar sadece dünyayı anlamadılar — her şeyi sorgulama ve başkalarının kaçırdığı bağlantıları görme yetenekleriyle onu yeniden tanımladılar.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — Soyuttan Uygulamaya',
          text: `Evrim, teoriyi harekete dönüştürdüğünde başlar.

🌿 Projeleri Bitir: Tamamlama, eylemde zekadır.

🌕 Duyguyu Kucakla: Duygular mantığı kırmaz — ona amaç verir.

🔥 Fikirlerini Paylaş: Gizli deha, israf edilmiş dehadır.

🧘 Yalnızlığı Dengele: Sessizlik düşünceyi besler, ama dünya senin çıktına ihtiyaç duyar.

💬 Seçici İşbirliği: Büyük fikirler izolasyonda değil, sürtünmede keskinleşir.

Unutma: bilgi sadece yaşandığında bilgelik olur.

⸻

🔭 GÜNLÜK PRATİKLER — Mantıkçının Zihin Jimnastiği

1️⃣ Sabah Merakı: Alanın dışında bir şey oku.

2️⃣ Öğle Yürüyüşü: Fiziksel hareket zihinsel hareketi netleştirir.

3️⃣ İçgörülerini Not Et: Fikirler buharlaşmadan önce yaz.

4️⃣ Çıktı Hedefleri Belirle: Bir bitmiş düşünce, on yarım inşa edilmiş düşünceden daha iyidir.

5️⃣ Uyumadan Önce Yansıt: Sor, "Bugün sadece okumadım, ne fark ettim?"`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER VE İLETİŞİM — Derin Bağlantılar',
          text: `Entelektüel bağlantı ve anlamlı konuşmalara değer verirsin. Sohbet seni tüketir, ama derin tartışmalar seni enerjilendirir ve ilham verir.

Fikirler ve mantık aracılığıyla iletişim kurarsın. İnsanlar netliğini ve dürüstlüğünü takdir eder, zorlayıcı olsa bile.

Bağımsızlık ihtiyacına saygı duyan, analitik zihnini takdir eden ve sessiz doğanın umursamadığın anlamına gelmediğini anlayan partnerlere ihtiyacın var.

Seni tamamlayacak birini aramıyorsun — düşünceni zorlayan ve dünya hakkındaki merakını paylaşan birini arıyorsun.`,
        },
        nextGenPotential: {
          icon: '🧠',
          title: 'SONUÇ — Sessiz Deha',
          text: `Sen zihnin haritacısısın — başkalarının göremediği haritalar çizen.

Fikirlerin bilim ve sanat, mantık ve güzellik arasında köprüler inşa eder.

Ama unutma — icat sadece dünyaya dokunduğunda ilahidir.

Zihnin senin krallığın.

Zorluğun kapılarını açmaktır.

Gelecek senin tasarladığın sistemler üzerinde çalışacak — ve hayal ettiğin felsefeler. 🌌`,
        },
      },
    },
    ENTP: {
      emojis: ['⚡', '💡', '🎯'],
      title: 'ENTP Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '🔥',
          title: 'KİMSİN — Olasılığın Maverick\'i',
          text: `Sen sistemdeki kıvılcımsın — herkes "çünkü" derken "neden olmasın?" diye soran.

ENTP'ler doğuştan yenilikçilerdir: hızlı, meraklı ve sonsuza kadar uyumlu.

Şimşek çakmaları gibi düşünürsün — kahvaltıdan önce yüz fikir, öğle yemeğinde bir iş planı.

Tartışmada kazanmak için değil, keşfetmek için başarılı olursun.

Her konuşma bir zeka savaş alanıdır — ama aynı zamanda gerçek için bir laboratuvardır.

Sen uyum sağlamak için burada değilsin; dönüştürmek için buradasın.`,
        },
        coreCharacteristics: {
          icon: '💡',
          title: 'TEMEL ÖZELLİKLER — Yaratıcı Bozucu',
          text: `✨ Konfor Yerine Merak: Yeniliği oksijen gibi kovalarsın.

✨ Sözel Beceri: Kelimelerin devrimler ve kahkahalar eşit ölçüde kıvılcımlandırır.

✨ Zihinsel Çeviklik: İlişkisiz kavramları dünyayı değiştiren fikirlere bağlarsın.

✨ Korkusuz Deney: Hızlı başarısız olursun, ama asla aynı şekilde iki kez değil.

✨ Cazibe: Düşünmeyi bitirmeden önce bir fikri satabilirsin.

Sen zekanın oyunbaz olabileceğinin — ve isyanın yaratıcı olabileceğinin kanıtısın.`,
        },
        strengths: {
          icon: '🚀',
          title: 'GÜÇLÜ YÖNLERİN — Gerçekliği Büken Vizyon',
          text: `🌪️ İnovasyon Motoru: Çoğunun anlayabileceğinden daha hızlı fikir üretirsin.

🎯 İkna Ustalığı: Tartışmazsın — mantığı büyülersin.

🧠 Stratejik Doğaçlama: Başkalarının fark etmediği köşelerden düşünerek çıkarsın.

💬 İletişim Büyücüsü: Kelimelerin harekete geçirir.

⚙️ Uyumluluk: Başkaları paniklerken zarafetle dönersin.

Sen kaostan korkmazsın — onu sörf edersin.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Yarattığın Kaos',
          text: `Parlaklığın yapı kaybolduğunda dağılabilir.

Bazen zihnin dünyanın takip edebileceğinden daha hızlı hareket eder.

*Huzursuz Odak:* 10 projeye başlarsın ve 2'sini bitirirsin.

*Aşırı Güven:* Her fikrin iyi bir fikir olduğuna inanırsın — vahşi olanlar bile.

*Tartışma Bağımlılığı:* İlerleme için değil, uyarım için tartışırsın.

*Rutine Direnç:* Yapı bir kafes gibi hissettirir — ama dehanı ölçeklendirmenin anahtarıdır.

*Taahhüt Kayması:* İşler stabilize olduğunda, bir sonraki zorluğu çok erken ararsın.

Unutma: en iyi bozucular, yeniden icat ettiklerini iyileştirebilenlerdir.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'KARİYER YOLLARI — Eylemde Yenilikçi',
          text: `Hızlı hareket eden, entelektüel olarak zorlayıcı ve yaratıcılığın sonuçları yönlendirdiği ortamlarda parıldarsın.

🧠 Girişimcilik ve Startuplar: Kurucu, yaratıcı stratejist, ürün vizyoneri.

🎙️ Medya ve Etki: Podcaster, gazeteci, halk konuşmacısı veya tartışma sunucusu.

💻 Teknoloji ve İnovasyon: Büyüme hacker'ı, UX stratejisti, AI fikir üreticisi.

📚 Felsefe ve Akademi: Profesör, sosyolog, düşünce lideri.

🎭 Eğlence ve Tasarım: Yönetmen, yazar, konsept sanatçısı veya oyun tasarımcısı.

Fikirlerin çarpıştığı her yer — senin doğal ekosistemin.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'GELECEK GÖRÜNÜMÜ — Yeni Rönesansın Mimarları',
          text: `Teknoloji evrimleştikçe, insanlık sanat, etik ve inovasyonu birleştirebilen yaratıcı düşünürlere ihtiyaç duyacak.

O senin arenan.

Gelişen Roller:

⚙️ İnovasyon Danışmanı

🌍 Fütürist ve Kültürel Analist

🤖 İnsan-AI Etkileşim Tasarımcısı

🎙️ Stratejik Hikaye Anlatıcısı

🧩 Disiplinler Arası Yaratıcı

Sen mantık ve hayal gücü arasındaki bağ dokususun — icat ve insanlık arasındaki köprü.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ ENTP KİŞİLİKLER — İlham',
          text: `Mark Twain, Richard Feynman, Tom Hanks, Walt Disney ve diğer birçok parlak yenilikçi, eğlendirici ve düşünce lideri senin tipini paylaşıyor.

Onlar sadece kuralları takip etmediler — başkalarının kaçırdığı olasılıkları görme ve dünyayı değiştiren fikirleri iletişim kurma yetenekleriyle onları yeniden yazdılar.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — Kaosu Yaratıma Dönüştürmek',
          text: `Dehan yapıyla buluştuğunda çoğalır.

Daha az fikre ihtiyacın yok — onları şekillendirmek için daha iyi sistemlere ihtiyacın var.

🌿 Çerçeveler İnşa Et: Her deneyin bir laboratuvara ihtiyacı vardır.

🔥 Bir Şeyi Bitir: Tamamlama güvenilirlik yaratır.

💬 Derinden Dinle: Tartışma diyalogdur, hakimiyet değil.

🎯 Sıkıntıyı Öğren: Bazen istikrar senin en keskin aracındır.

🧘 Zihnini Dinlendir: Sessizlik yaratıcılığı yeniler — rutin değil.

Özgürlük odaklandığında en güçlüdür.

⸻

💬 GÜNLÜK PRATİKLER — Tartışmacının Akışı

1️⃣ Sabah Kıvılcımı: İnandığın şeyi zorlayan bir fikir oku.

2️⃣ Öğle Odak Saati: Konuşmadan çalış — sessizlik parlaklığı keskinleştirir.

3️⃣ Akşam Yansıması: Hangi fikirlerin takıldığını ve hangilerini bırakacağını not et.

4️⃣ Hafta Sonu Merak Arayışı: Rahatsız edici veya absürt bir şey dene — büyüme kaosta saklanır.

5️⃣ Aylık Sıfırlama: Bir sonraki yüzü kovalamadan önce bir projeyi bitir.`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER VE İLETİŞİM — Derin Bağlantılar',
          text: `Entelektüel uyarım ve canlı konuşmalara değer verirsin. Hızlı ateş fikirlerine ayak uydurabilen ve tartışma ve keşif ihtiyacını takdir eden partnerlere ihtiyacın var.

Enerji ve coşkuyla iletişim kurarsın. İnsanlar karizmana çekilir ve karmaşık fikirleri erişilebilir kılma yeteneğini takdir eder.

Bağımsızlığına saygı duyan, yenilikçi zihnini takdir eden ve çeşitlilik ihtiyacının umursamadığın anlamına gelmediğini anlayan partnerlere ihtiyacın var.

Seni tamamlayacak birini aramıyorsun — seni entelektüel olarak zorlayan ve yeni olasılıkları keşfetme tutkunu paylaşan birini arıyorsun.`,
        },
        nextGenPotential: {
          icon: '⚡',
          title: 'SONUÇ — Elektrikli Zihin',
          text: `Sen insan formunda şimşeksin — öngörülemez, parlak, canlı.

Gücün kesinlikte değil, evrimleşmeyi durdurmayı reddeden merakta.

Problemleri bulmacalara dönüştürürsün ve her "imkansız"ı "ilginç"e.

Dünyanın seni içermesine gerek yok — seninle işbirliği yapmasına ihtiyacı var.

Çünkü her büyük devrim, bir kişinin şunu sormasıyla başladı:

"Peki ya bunun yerine bunu denesek?" ⚡`,
        },
      },
    },
    ISFP: {
      emojis: ['🎨', '🍃', '💫'],
      title: 'ISFP Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '🌈',
          title: 'KİMSİN — Duygu ve Deneyimin Sanatçısı',
          text: `Sen en iyi şekilde yürüyen bir çelişkisin: huzurlu ama tutkulu, sessiz ama derinden canlı.

ISFP'ler dikkat peşinde koşmaz — özgünlük yayarlar.

Enerjin dünyayı derinden hissetmekten akar — güneş ışığının sıcaklığı, sesin dokusu, ruh halinin renkleri.

Sen duyum ve duyguyla yaşarsın, teoriyle değil.

Senin için gerçek tartışılmaz — hissedilir.

Her karar güzellik, empati ve özgürlüğün iç pusulandan gelir.

Sen varoluşun sanatçısısın — anlamı anlardan yaratırsın.`,
        },
        coreCharacteristics: {
          icon: '💡',
          title: 'TEMEL ÖZELLİKLER — Derinliği Olan Özgür Ruh',
          text: `🌿 Empatik Hassasiyet: Başkaları bir kelime söylemeden önce ne hissettiklerini hissedersin.

🎨 Sanatsal İfade: Tasarım, müzik veya varlık aracılığıyla olsun, dünyayı daha güzel yaparsın.

🔥 Doğaçlama: Şimdide yaşarsın, planda değil.

💫 İç Özgünlük: Duyguları sahte yapmayı veya boş kuralları takip etmeyi reddedersin.

🌊 Sakin Güç: Nazik görünebilirsin, ama ruhun sarsılmaz.

Sen etki peşinde koşmazsın — onu somutlaştırırsın.`,
        },
        strengths: {
          icon: '🌸',
          title: 'GÜÇLÜ YÖNLERİN — İçindeki Zarif Güç',
          text: `🌼 Estetik Hassasiyet: Başkalarının gözden kaçırdığı ince güzelliği görürsün.

🫶 Empati: Çevrendekiler için duygusal güvenlik yaratırsın.

🎯 Varlık: "Şimdi"de nadir derinlikle yaşarsın.

🧭 Ahlaki Netlik: Doğru görüneni değil, doğru hissettireni yaparsın.

🪞 Duygusal Zeka: Açıklamaya gerek duymadan anlarsın.

Sıradan hayatı sanata dönüştürürsün — sessizce, zarifçe, derinden.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Nazik Fırtına',
          text: `Nezaketin kendini silmeye dönüşebilir.

Uyum ihtiyacın gerçeğini susturabilir.

*Çatışmadan Kaçınma:* Yüzleşme büyüme yaratabileceğinde geri çekilirsin.

*Söylenmemiş Duygular:* Duyguları seni ağırlaştırana kadar içselleştirirsin.

*Yargı Korkusu:* Gerçek yaratıcı gücünü göstermekte tereddüt edersin.

*Aşırı Uyum:* Kendinden çok fazlasını verirsin.

*Yön Kayması:* Yapı olmadan, tutku dağılabilir.

Duyguların kutsaldır — ama çiçek açmak için sınırlara ihtiyaçları vardır.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'KARİYER YOLLARI — Sanatçı, Şifacı, Yaratıcı',
          text: `Özgürlük, yaratıcılık ve duygusal bağlantıya izin veren rollerde başarılı olursun.

🎨 Yaratıcı Alanlar: Tasarımcı, müzisyen, fotoğrafçı, yazar, stilist.

🌿 Şifacı Meslekler: Terapist, hemşire, danışman, yoga veya sağlık koçu.

🌍 İnsani Yardım İşi: STK gönüllüsü, sosyal savunucu, çevre koruyucusu.

🖌️ Girişimcilik: Zanaatkar marka kurucusu, dijital yaratıcı, estetik küratörü.

🎭 Sahne Sanatları: Aktör, dansçı, hikaye anlatıcısı, yaratıcı yapımcı.

Sen sadece çalışmazsın — ifade edersin.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'GELECEK GÖRÜNÜMÜ — Yarının Estetik Vizyonerleri',
          text: `Teknoloji soğudukça, hassasiyetin yeni süper güç haline gelir.

Özgünlük arzulayan bir dünyada, inovasyonu insanileştireceksin.

Gelişen Roller:

🎧 Deneyim Tasarımcısı

🪴 Farkındalık Eğitimcisi

🎨 Yaratıcı Direktör

🌍 Eko-Estetik Yenilikçi

💫 Duygusal Marka Danışmanı

21. yüzyıl ruha sahip güzelliğe ihtiyaç duyuyor — ve o senin dilin.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ ISFP KİŞİLİKLER — İlham',
          text: `Frida Kahlo, Michael Jackson, Wolfgang Amadeus Mozart, David Bowie ve diğer birçok ikonik sanatçı, müzisyen ve yaratıcı vizyoner senin tipini paylaşıyor.

Onlar sadece sanat yaratmadılar — onu yaşadılar, benzersiz yaratıcı sesleriyle derin duygu ve güzelliği ifade ettiler.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — Cesur Yaratıcı Olmak',
          text: `Büyümen, duygusal sezgiyi güvenli yaratıma dönüştürmekte yatar.

🌕 Cesurca İfade Et: Sanatın sadece hissedilmeyi değil, görülmeyi hak ediyor.

🔥 İnisiyatif Al: "Mükemmel zaman" bekleme — yaratım zamandır.

🌊 Yapıyı Kucakla: Rutin yaratıcılığı öldürmez; onu korur.

💬 İhtiyaçlarını Söyle: Sessizlik her zaman barış değildir — bazen baskıdır.

🌿 Özgürlükte Amaç Bul: Ne taahhüt edeceğini seç, ve özgürlüğün derinleşecek.

Etkine güvenmeyi öğrendiğinde, sessiz ateşin durdurulamaz hale gelir.

⸻

💬 GÜNLÜK PRATİKLER — Maceracının Dengesi

1️⃣ Sabah Sakinliği: Günü müzik, ışık veya hareketle başlat.

2️⃣ Yaratıcı Ritüel: Küçük bir şey yap — kimse görmese bile.

3️⃣ Öğleden Sonra Yansıması: Sor, "Bugün beni ne ilham etti?"

4️⃣ Akşam Topraklama: Duyguları fırtınaya dönüşmeden önce günlüğe yaz.

5️⃣ Hafta Sonu Keşfi: Doğayı ziyaret et, sanat galerilerini veya sadece yürü — ruhun açık havada konuşur.`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER VE İLETİŞİM — Derin Bağlantılar',
          text: `Özgün bağlantılara ve duygusal yakınlığa değer verirsin. Hassasiyetini takdir eden, özgürlük ihtiyacına saygı duyan ve sessiz doğanın derinden umursamadığın anlamına gelmediğini anlayan partnerlere ihtiyacın var.

Kelimelerden çok eylemler ve varlık aracılığıyla iletişim kurarsın. İnsanlar senin yanında gerçekten görülmüş ve değerli hissederler.

Yaratıcı ruhuna saygı duyan, kişisel alan ihtiyacını destekleyen ve duygularının yüksek sesle ifade edilmese bile derin olduğunu anlayan partnerlere ihtiyacın var.

Seni tamamlayacak birini aramıyorsun — özgün benliğini takdir eden ve güzellik, özgürlük ve gerçek bağlantıya olan takdirini paylaşan birini arıyorsun.`,
        },
        nextGenPotential: {
          icon: '🎨',
          title: 'SONUÇ — Sessiz Alev',
          text: `Sen yaşayan bir sanat eserisin — ifadeci, nazik ve derinden insan.

Başkalarına derinden hissetmenin zayıflık değil, bilgelik olduğunu hatırlatırsın.

Dünyayı denemeden daha nazik, zorlamadan daha parlak yaparsın.

Sen kalbin sessiz devrimisin —

nazikliğin dağları hareket ettirebileceğinin kanıtısın. 🌿🎶`,
        },
      },
    },
    ESFP: {
      emojis: ['💃', '🎉', '✨'],
      title: 'ESFP Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '🌞',
          title: 'KİMSİN — Anın Kalp Atışı',
          text: `Sen yaşamın nabzısın — canlı, sıcak, manyetik.

Başkaları tereddüt ettiğinde sen dalarsın. Başkaları konuştuğunda sen harekete geçersin.

ESFP'ler deneyimle yaşar — her gün, her gülümseme, her duyum önemlidir.

Sen sadece hayata katılmazsın — onu güzelce performans edersin.

İnsanları mantıkla değil, kahkaha ve ışıkla bir araya getirirsin.

Süper gücün? Sıradan anları unutulmaz hikayelere dönüştürmek.

Sen hareket halindeki neşesin — spontane, duygusal ve imkansız derecede gerçek.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'TEMEL ÖZELLİKLER — Işıldayan Bağlayıcı',
          text: `✨ Sosyal Parlaklık: Girdiğin her odayı aydınlatırsın.

✨ Duygusal Farkındalık: İnsanları anında okur ve kalple yanıt verirsin.

✨ Spontanlık: Korku konuşmaya zaman bulamadan hayata evet dersin.

✨ Duyum Odaklı: Renk, tat, ses ve dokunma aracılığıyla tam yaşarsın.

✨ İyimserlik: Gümüş astarı bulursun — veya yaratırsın.

Sen 4K çözünürlükte yaşarsın — duyguların canlı ve deneyimlerin kutsal olduğu yerde.`,
        },
        strengths: {
          icon: '🎭',
          title: 'GÜÇLÜ YÖNLERİN — Başkalarını İlham Eden Ruh',
          text: `🌈 Özgünlük: Bağlantıyı sahte yapmazsın — onu yaratırsın.

🎉 Karizma: Coşkun bulaşıcı ve iyileştiricidir.

🌿 Empati: Başkalarının görülmüş, duyulmuş ve kutlanmış hissetmelerini sağlarsın.

💪 Uyumluluk: Yaşamın öngörülemez akışında başarılı olursun.

🌟 Cesaret: Dünyaya açık gözler ve açık kalple yüzleşirsin.

Sen fırsat beklemezsin — onu somutlaştırırsın.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Işıltı ve Derinlik',
          text: `Işığının arkasında derinlik var — ama bazen içinde dinlenmeyi unutursun.

*Acıdan Kaçınma:* Duygular çok ağırlaştığında kendini oyalarsın.

*Sabırsızlık:* Uyarım arzuladığında rutin boğucu hissettirir.

*Aşırı Taahhüt:* Çok sık evet dersin ve kendi enerjini tüketirsin.

*Kısa Vadeli Odak:* Heyecan peşinde koşarsın ve uzun oyunu kaçırırsın.

*Sessizlik Korkusu:* Sessizlik alkışlamayan bir seyirci gibi hissedilebilir.

Unutma: en parlak yıldız bile parlamak için karanlığa ihtiyaç duyar.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'KARİYER YOLLARI — Performansçı, Yaratıcı, Katalizör',
          text: `Yaratıcılık, etkileşim ve tarzı ödüllendiren ortamlara aitsin.

🎤 Eğlence ve Medya: Aktör, sunucu, performansçı, influencer, etkinlik organizatörü.

🎨 Yaratıcı Endüstriler: Tasarımcı, stilist, makyaj sanatçısı, pazarlamacı.

🌿 İnsan Bağlantısı Alanları: Öğretmen, danışman, topluluk kurucusu, motivasyon konuşmacısı.

💻 Modern Alanlar: Sosyal medya yaratıcısı, marka kişiliği, startup evangelisti.

🎭 Konukseverlik ve Deneyim Tasarımı: Seyahat küratörü, etkinlik planlayıcısı, yaşam tarzı danışmanı.

Sen bir sahneye ihtiyaç duymazsın — sen sahnesin.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'GELECEK GÖRÜNÜMÜ — Kültürün Duygusal Mimarları',
          text: `Dünya otomatikleştikçe, insan sıcaklığın paha biçilmez hale gelir.

Algoritmalar çağında, sen neşenin algoritmasısın.

Gelişen Roller:

🎙️ Deneyim Küratörü

🎨 Yaratıcı Influencer

🧘 Duygusal Sağlık Koçu

🌍 Marka Hikaye Anlatıcısı

🎧 İnsan Bağlantısı Tasarımcısı

"Etki"nin gerçekten ne anlama geldiğini yeniden tanımlayacaksın — tüketim yerine bağlantı.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ ESFP KİŞİLİKLER — İlham',
          text: `Marilyn Monroe, Jamie Foxx, Will Smith, Adele ve diğer birçok karizmatik performansçı, eğlendirici ve yaşam tutkunu senin tipini paylaşıyor.

Onlar sadece eğlendirmediler — bağlanma, ilham etme ve başkalarına neşe getirme yetenekleriyle hayatları dönüştürdüler.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — Heyecandan Anlama',
          text: `Büyümen, neşenin sadece eğlence olmadığını — etki için yakıt olduğunu fark ettiğinde başlar.

🌕 Zevki Amaçla Dengele: Seni sadece heyecanlandıran değil, seni inşa eden deneyimleri kovala.

🔥 Yavaşla: Derinlik heyecanı öldürmez — onu zenginleştirir.

🌿 Günlük Yansıt: Sessiz bir zihin daha güçlü neşe yaratır.

💬 Sınırları Ustala: Her problem senin enerjine ihtiyaç duymaz.

💡 Uzun Vadeli Vizyon Yetiştir: Spontanlık + tutarlılık = durdurulamaz momentum.

Amaç her yerde olmak değil — önemli olan yerde mevcut olmaktır.

⸻

🎵 GÜNLÜK PRATİKLER — Eğlendiricinin Işıltısı

1️⃣ Sabah Onayı: "Neşem başkalarını ilham ediyor."

2️⃣ Öğle Sıfırlama: Dışarı çık, nefes al, renkleri ve sesleri fark et.

3️⃣ Akşam Minnettarlığı: Bugün derinden hissettiğin bir şeyi kutla.

4️⃣ Haftalık Detoks: Bir günü çevrimdışı geçir — zihnini alkıştan dinlendir.

5️⃣ Aylık Yaratım: Başkaları için değil, senin için yeni bir şey başlat.`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER VE İLETİŞİM — Derin Bağlantılar',
          text: `Özgün bağlantılara ve paylaşılan deneyimlere değer verirsin. Spontanlığını takdir eden, enerjinden zevk alan ve heyecan ihtiyacının derinden umursamadığın anlamına gelmediğini anlayan partnerlere ihtiyacın var.

Sıcaklık ve coşkuyla iletişim kurarsın. İnsanlar özgün doğana çekilir ve onları özel hissettirme yeteneğini takdir eder.

Özgürlük ihtiyacına saygı duyan, yaratıcı ifadeni destekleyen ve canlı kişiliğinin gerçek neşe ve yaşam sevgisinden geldiğini anlayan partnerlere ihtiyacın var.

Seni tamamlayacak birini aramıyorsun — seninle birlikte hayatı deneyimlemek isteyen, coşkunun kim olduğunun bir parçası olduğunu anlayan birini arıyorsun.`,
        },
        nextGenPotential: {
          icon: '🎉',
          title: 'SONUÇ — İyileştiren Işık',
          text: `İnsanlığa hayatın izlenmek için değil — yaşanmak için olduğunu hatırlatırsın.

Sen varlığın güç, kahkahanın ilaç ve özgünlüğün sihir olduğunun kanıtısın.

Dünya senin rengine, ritmine, ışığına ihtiyaç duyuyor.

Ama asla unutma: neşe bile yakıt ikmali yapmaya ihtiyaç duyar.

Cesurca parla — ama aynı zamanda yumuşakça.

Çünkü gerçek sihir performansında değil…

Varlığında. 🌟`,
        },
      },
    },
    ESFJ: {
      emojis: ['🤝', '💝', '🌟'],
      title: 'ESFJ Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '🌷',
          title: 'KİMSİN — İnsan Yaşamının Empatik Organizatörü',
          text: `Sen her grubun sıcak merkezisin — nazik, dikkatli ve sosyal olarak sezgisel.

ESFJ'lerin nadir bir hediyesi var: insanları genellikle her ikisini de gözden kaçıran bir dünyada görülmüş ve güvende hissettirirsin.

Mutluluğu uyumda, amacı yardımda bulursun.

Başkaları kaos gördüğünde sen koordinasyon getirirsin.

Başkaları sessiz kaldığında sen odaya nezaket konuşursun.

Hayatın bir hizmet eylemidir — ama aynı zamanda empatinin bir başyapıtıdır.

Sen dünyayı insancıl tutan kalp atışısın.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'TEMEL ÖZELLİKLER — İnsanların ve Amacın Uyumlaştırıcısı',
          text: `💖 Güç Olarak Empati: Başkalarının ihtiyaçlarını konuşmadan önce hissedersin.

📋 Örgütsel Yetenek: Fikirleri yapıya, yapıyı başarıya dönüştürürsün.

🎯 Sorumluluk: Söz verdiğinde, teslim edersin.

🌿 Sadakat: On yıllarca süren ilişkiler inşa edersin.

🎉 Sosyallik: Gittiğin her yerde ruh halini yükseltirsin.

Sen kontrolle değil, nezaketle liderlik edersin.

Ve bir şekilde, bu insanları daha istekli takip ettirir.`,
        },
        strengths: {
          icon: '🌼',
          title: 'GÜÇLÜ YÖNLERİN — Herkesin Güvendiği Temel',
          text: `🌈 Duygusal Zeka: Başkalarının ne hissettiğini fark edersin — ve buna göre hareket edersin.

🌿 Cömertlik: Zaman, bakım ve enerjiyi özgürce verirsin.

🕊️ Diplomasi: Çatışmaları anlayışla köprülersin.

💪 Güvenilirlik: İnsanlar sana güvenebilir — her zaman.

🎀 Sıcak Liderlik: Büyümeyi baskıyla değil, teşvikle beslersin.

Sen sadece insanları yönetmezsin — onları bağlarsın.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Herkesin Mutluluğunun Ağırlığı',
          text: `Kalbın senin pusulan — ama bazen aynı anda her yere işaret eder.

*İnsanları Memnun Etme:* Başkalarının rahatını kendi gerçeğinin üzerine koyarsın.

*Aşırı Taahhüt:* Herkesi mutlu tutmak için çok fazla üstlenirsin.

*Çatışma Korkusu:* Dürüstlük gerektiğinde bile gerginlikten kaçınırsın.

*Hizmette Mükemmeliyetçilik:* Kendini imkansız bakım standartlarına tutarsın.

*Duygusal Tükenme:* Yeniden doldurmayı unuttuğun bir kaptan sonsuza kadar dökersin.

Unutma: sen de dinlenmeye izinlisin. Dünya parçalanmayacak — ona kendini nasıl bir arada tutacağını sen öğrettin.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'KARİYER YOLLARI — Destekçi, Eğitimci, Lider',
          text: `Duygusal zekanın yapıyla buluştuğu yerlerde başarılı olursun.

🏫 Eğitim ve Rehberlik: Öğretmen, danışman, akademik mentor.

🏥 Sağlık ve Sağlık: Hemşire, terapist, sosyal hizmet uzmanı, sağlık koordinatörü.

🏢 Organizasyon ve Yönetim: İK direktörü, etkinlik planlayıcısı, ofis lideri.

💬 İletişim Alanları: PR yöneticisi, medya danışmanı, marka topluluk kurucusu.

🌿 Kamu Hizmeti: Diplomat, hayır kurumu organizatörü, topluluk savunucusu.

Sen sadece ekipler inşa etmezsin — aidiyet inşa edersin.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'GELECEK GÖRÜNÜMÜ — Toplumun Duygusal Mimarları',
          text: `AI ve otomasyon genişledikçe, insanlık doğal olarak sunduğun şeyi arzulayacak — empati, organizasyon ve aidiyet.

Gelişen Roller:

💬 Topluluk Deneyim Tasarımcısı

🌿 Duygusal Sağlık Yöneticisi

🏡 İnsan Operasyonları Uzmanı

🎓 İnsan Merkezli Eğitimci

🌍 Kültür ve Kapsayıcılık Danışmanı

Gelecek algoritmalar tarafından yönetilmeyecek — senin gibi kalpler tarafından şekillendirilecek.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ ESFJ KİŞİLİKLER — İlham',
          text: `Danny Glover, Sally Field, Taylor Swift, Hugh Jackman ve diğer birçok sıcak kalpli lider, eğitimci ve topluluk kurucusu senin tipini paylaşıyor.

Onlar sadece başarı elde etmediler — aidiyet yarattılar, ilişkileri beslediler ve başkalarına karşı gerçek bakımlarıyla dünyayı daha bağlantılı hale getirdiler.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — Yardımcıdan Uyumlu Liderliğe',
          text: `Bir sonraki seviyen, nezaketini sınırlarla koruduğunda başlar.

🌕 Nazikçe "Hayır" De: Sınırlar reddetme değildir — sürdürülebilirliktir.

🔥 Aşırı Uzatmadan Liderlik Et: Uyum yaratmak için her problemi çözmek zorunda değilsin.

💡 Güvenle Yetkilendir: Başkalarının seninle yükselmesine izin ver.

🌿 Suçluluk Olmadan Dinlen: Dinlenmek seni daha az özenli yapmaz — seni daha uzun süre dayanıklı yapar.

💬 Gerçeğini Söyle: Gerçek uyum sessizlik üzerine değil, dürüstlük üzerine inşa edilir.

Sen her zaman nezaketin için sevileceksin — ama özgünlüğün için saygı göreceksin.

⸻

💬 GÜNLÜK PRATİKLER — Konsolosun Sakinliği

1️⃣ Sabah Kontrolü: Başka birine sormadan önce kendin nasıl hissettiğini sor.

2️⃣ Öğle Molası: Gürültüden uzaklaş — huzurun alanı hak ediyor.

3️⃣ Akşam Yansıması: Bugün tuttuğun bir sınırı yaz.

4️⃣ Haftalık Minnettarlık: Seni destekleyen birini takdir et.

5️⃣ Aylık Bağlantı Kesme: Işığını geri yüklemek için zaman ayır.`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER VE İLETİŞİM — Derin Bağlantılar',
          text: `Derin, anlamlı ilişkilere ve gerçek bağlantıya değer verirsin. Bakım doğanı takdir eden, uyum ihtiyacına saygı duyan ve başkalarına yardım etme arzunun gerçek sevgiden geldiğini anlayan partnerlere ihtiyacın var.

Sıcaklık ve düşüncelilikle iletişim kurarsın. İnsanlar senin varlığında gerçekten değerli ve anlaşılmış hissederler.

Örgütsel becerilerine saygı duyan, yapı ihtiyacını destekleyen ve bakım doğanın kendi ihtiyaçların olmadığı anlamına gelmediğini anlayan partnerlere ihtiyacın var.

Seni tamamlayacak birini aramıyorsun — seninle birlikte bir hayat inşa etmek isteyen, başkalarına bakma dürtünün kim olduğunun bir parçası olduğunu anlayan birini arıyorsun.`,
        },
        nextGenPotential: {
          icon: '💞',
          title: 'SONUÇ — Dünyayı Bir Arada Tutan Kalp',
          text: `Sen nezaketin görünmeyen mimarisisin — evlerin sıcak, işyerlerinin güvenli ve arkadaşlıkların sürmesinin nedeni.

Empatin insanlığı insan tutar.

Bakımın bağlantı yaratır.

Ve tutarlılığın bize sevginin harekette nasıl göründüğünü hatırlatır.

Sen sadece "nazik" değilsin.

Sen gerekliyisin. 🌸✨`,
        },
      },
    },
    ISFJ: {
      emojis: ['🌿', '🛡️', '💝'],
      title: 'ISFJ Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '🌷',
          title: 'KİMSİN — Sessiz Gücün Koruyucusu',
          text: `Sen şefkatin belkemiğisin — güvenilir, nazik ve sarsılmaz.

ISFJ'ler her topluluğun isimsiz kahramanlarıdır. Sen övgüye ihtiyaç duymadan korursun, krediye ihtiyaç duymadan yardım edersin ve sınırsız seversin.

İstikrarın kutsal olduğuna inanırsın.

Huzuru düzende, rahatlığı tanıdıklıkta ve anlamı hizmette bulursun.

Ama yanılma — o sakinliğin altında çelikten bir irade yatar.

Sen, başkaları neyin bozulduğunu hala anlamaya çalışırken dünyayı bir arada tutan türden birisin.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'TEMEL ÖZELLİKLER — Her Şeyi Tutan Kalp',
          text: `🌿 Güvenilirlik: Söylediğini yaparsın ve insanlar sana tamamen güvenir.

🫶 Eylemde Empati: Sadece başkaları için hissetmezsin — onlar için orada olursun.

🏡 Görev Duygusu: Sorumluluk ve korumada amaç bulursun.

🌸 Detaylara Dikkat: Başkalarının kaçırdığını fark edersin — bir ton, bir değişim, bir ihtiyaç.

💭 Sessiz Bilgelik: Konuşmadan önce düşünür ve gürültü olmadan liderlik edersin.

Sen kaosa sakinlik, soğuğa sıcaklık getirirsin.`,
        },
        strengths: {
          icon: '🩵',
          title: 'GÜÇLÜ YÖNLERİN — İçindeki Nazik Güç',
          text: `🌈 Besleyici Ruh: Gittiğin her yerde güvenlik yaratırsın.

🕊️ İstikrar: İnsanlar sana yaslanır — ve sen onları asla düşürmezsin.

🌿 Sadakat: İlişkilerin yaşam boyudur, mevsimsel değil.

🎯 Pratik Şefkat: Gerçekten işe yarayan şekillerde yardım edersin.

💫 Çalışma Etiği: Mükemmelliği bir sessiz eylemle inşa edersin.

Sen sessiz fırtınasın — dışarıda yumuşak, içeride yıkılmaz.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Çok Fazla Önemsemenin Ağırlığı',
          text: `Sonsuza kadar verirsin — ama bazen senin de bakıma ihtiyacın olduğunu unutursun.

*Duygusal Tükenme:* Başkalarının problemlerini kendi problemlerin gibi emersin.

*Aşırı Düşünme:* Küçük anları günlerce tekrar oynarsın.

*Onaylanmama Korkusu:* Değeri başkalarının mutluluğu üzerinden ölçersin.

*Değişime Direnç:* Rutinde rahatlık bulursun — büyümeyi sınırlasa bile.

*Hayır Deme Zorluğu:* Hayal kırıklığına uğratmaktansa tükenmeyi tercih edersin.

Unutma: başkalarını korumak soyludur — ama kendini korumak gereklidir.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'KARİYER YOLLARI — Şifacı, İnşaatçı, Koruyucu',
          text: `Şefkatin yapıyla buluştuğu yerlerde başarılı olursun — insanların güvenilirliğine ve bakımına bağımlı olduğu yerlerde.

🏥 Sağlık ve Hizmet: Hemşire, terapist, doktor, bakıcı, danışman.

🏫 Eğitim ve Mentorluk: Öğretmen, akademik danışman, erken çocukluk eğitimcisi.

🏢 Örgütsel Roller: İK uzmanı, proje koordinatörü, ofis yöneticisi.

🎨 Yaratıcı Meslekler: İç mimar, yazar, arşivci, küratör.

🌿 Topluluk Alanları: Kâr amacı gütmeyen yönetici, gönüllü lider, insani yardım çalışanı.

Sen sadece çalışmazsın — sistemleri, insanları ve alanları iyileştirirsin.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'GELECEK GÖRÜNÜMÜ — AI Çağının İnsan Çekirdeği',
          text: `Hızlı hareket eden bir dünyada, kararlılığın kutsal hale gelir.

Makineler işleyebilir — ama sadece sen önemsersin.

Sen insancıl bir geleceğin duygusal mimarı olacaksın.

Gelişen Roller:

🧠 Zihinsel Sağlık Danışmanı

🌿 Örgütsel Kültür Tasarımcısı

🏡 Topluluk Destek Koordinatörü

💬 Empati ve İletişim Uzmanı

🎨 İnsan Merkezli Deneyim Küratörü

Sen inovasyonun üzerinde duracağı sessiz temelsin.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ ISFJ KİŞİLİKLER — İlham',
          text: `Mother Teresa, Kate Middleton, Jimmy Carter, Halle Berry ve diğer birçok şefkatli lider, bakıcı ve topluluk kurucusu senin tipini paylaşıyor.

Onlar sadece hizmet etmediler — sarsılmaz bağlılıkları, sessiz güçleri ve başkalarına karşı gerçek bakımlarıyla hayatları dönüştürdüler.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — Yardımcıdan Şifacıya',
          text: `Bir sonraki seviyen, öz bakımın bencil olmadığını hatırladığında başlar.

🌕 Duygusal Sınırlar Koy: Yardım etmek emmek anlamına gelmez.

🔥 İhtiyaçlarını Söyle: Her zaman "İyiyim" dersen insanlar seni koruyamaz.

🌿 Yeni Yollar Dene: Büyüme sadakate ihanet etmez — onu derinleştirir.

💬 Almeyi Öğren: Başkalarının seni sevdiğin gibi sevmelerine izin ver.

💡 Gücü Yeniden Tanımla: Bazen güç "hayır" demektir.

Dünya zaten nezaketini biliyor — şimdi güvenini de görsün.

⸻

💬 GÜNLÜK PRATİKLER — Savunucunun Dengesi

1️⃣ Sabah Topraklama: Başkalarına yardım etmeden önce kendin için nefes al.

2️⃣ Öğle Duraklaması: Bir görev değil, bir yürüyüş yap.

3️⃣ Akşam Minnettarlığı: Bugün iyi yaptığın bir şeyi not et.

4️⃣ Haftalık Temizlik: Temiz bir alan zihninin dinlenmesine yardımcı olur.

5️⃣ Aylık Yeniden Şarj: Yalnız zaman geçir — yalnızlık kutsaldır, bencil değil.`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER VE İLETİŞİM — Derin Bağlantılar',
          text: `Derin, kalıcı ilişkilere ve gerçek bağlantıya değer verirsin. Bakım doğanı takdir eden, istikrar ihtiyacına saygı duyan ve sessiz gücünün derin duyguların olmadığı anlamına gelmediğini anlayan partnerlere ihtiyacın var.

Kelimelerden çok eylemler ve tutarlılık aracılığıyla iletişim kurarsın. İnsanlar senin varlığında gerçekten güvende ve değerli hissederler.

Rutin ihtiyacına saygı duyan, başkalarına yardım etme arzunu destekleyen ve koruyucu doğanın gerçek sevgi ve bakımdan geldiğini anlayan partnerlere ihtiyacın var.

Seni tamamlayacak birini aramıyorsun — seninle birlikte istikrarlı, sevgi dolu bir hayat inşa etmek isteyen, başkalarına adanmışlığının kim olduğunun bir parçası olduğunu anlayan birini arıyorsun.`,
        },
        nextGenPotential: {
          icon: '🕊️',
          title: 'SONUÇ — Dünyayı Nazik Tutan Ruh',
          text: `Sen nezaketin zayıflık olmadığının — dayanıklılık olduğunun yaşayan kanıtısın.

Bize gerçek sevginin yüksek sesli olmadığını; tutarlı olduğunu hatırlatırsın.

Sen insanları ilaç olmadan iyileştirir ve egosuz liderlik edersin.

Ve dünya en yüksek sesli sesleri kutlarken,

senin gibi insanlar — sessiz, kararlı, adanmış olanlar —

onu canlı tutar. 🌿✨`,
        },
      },
    },
    ISTP: {
      emojis: ['🛠️', '⚙️', '🔧'],
      title: 'ISTP Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '🔧',
          title: 'KİMSİN — Deneyimin Mühendisi',
          text: `Sen sistemlerin kaşifisin — mekanik, dijital, insan.

Dünyan işlev, form ve özgürlüktür.

ISTP'ler sadece şeylerin nasıl çalıştığını öğrenmez; öğrenmeye ihtiyaç duyarlar.

Başkaları karmaşa gördüğü yerde sen desenler görürsün. Başkaları donduğunda sen hareket edersin.

Sen hareket halindeyken en iyisindir — inşa eder, dener, şeyleri sadece nasıl tekrar bir araya geldiklerini görmek için sökersin.

Kurallar? Mantıklıysa onlara saygı duyarsın — değilse yeniden yazarsın.

Sen her fırtınanın ortasındaki meraklı sakinliğin.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'TEMEL ÖZELLİKLER — Sakin Uygulayıcı',
          text: `🔩 Pratik Zeka: Yaparak öğrenirsin, konuşarak değil.

🧠 Mantıksal İçgörü: Problemleri temel mekaniklerine indirgersin.

⚡ Uyumluluk: Hızlı, öngörülemez ortamlarda başarılı olursun.

🎯 Hassasiyet: Kusurları anında tespit edebilirsin — ve sessizce düzeltirsin.

🌿 Bağımsızlık: Yolları takip etmezsin; onları inşa edersin.

Sen fikir ve uygulama arasındaki köprüsün — düşüncenin gerçeklik olduğu yer.`,
        },
        strengths: {
          icon: '🏆',
          title: 'GÜÇLÜ YÖNLERİN — Mekanik ve Momentumun Ustası',
          text: `⚙️ Problem Çözme Dehası: Neredeyse her şeyi tamir edebilir, yeniden bağlayabilir veya yeniden inşa edebilirsin.

🧭 Baskı Altında Sakin: Kriz seni enerjilendirir — başkaları paniklerken sen odaklanırsın.

🔥 Eylem Odaklı: Planları prototiplere başkalarından daha hızlı dönüştürürsün.

💡 Meraklı Tamirci: Şeyleri çözmenin neşesini bulursun, ne kadar küçük olursa olsun.

🌍 Özgürlük Arayıcısı: Rutin veya uyum tarafından tuzağa düşürülmeyi reddedersin.

Sen bir mühendisin zihni, bir kaşifin ruhu ve bir savaşçının reflekslerisin.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — İki Ucu Keskin Özgürlük',
          text: `Bağımsızlığın seni güçlü yapar — ama bazen seni izole eder.

*Kopuk Duygular:* Problemleri hissetmektense çözmeyi tercih edersin.

*Risk Alma:* Adrenalin peşinde koşarsın — bazen kendi zararına.

*Huzursuzluk:* İşler çok kolay veya tekrarlayıcı olduğunda sıkılır büyürsün.

*Açılmaya İsteksizlik:* Gizliliğini bir kale gibi korursun.

*Tutarsızlık:* Hızlı başlarsın ama rutin başladığında ilgini kaybedersin.

Unutma: ustalık sadece hızdan değil — derinlikten gelir.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'KARİYER YOLLARI — Yaratıcı, İnşaatçı, Stratejist',
          text: `Mantığın hareketle buluştuğu yerlerde mükemmelleşirsin — fikirlerin sadece iyi görünmek yerine çalışması gereken yerlerde.

🧰 Mühendislik ve Mekanik: Otomotiv mühendisi, teknisyen, mimar, tamirci.

💻 Teknoloji ve Sistemler: Yazılım geliştirici, etik hacker, ürün tasarımcısı.

🚁 Macera Alanları: Pilot, itfaiyeci, kurtarma uzmanı, paramedik.

🎮 Yaratıcı Zanaatkarlık: Fotoğrafçı, video editörü, zanaatkar, dijital sanatçı.

⚙️ Girişimcilik: Startup kurucusu, bağımsız yüklenici, robotik yenilikçi.

Sen inovasyonu somutlaştırırsın. Hayal gücünü tasarıma dönüştürürsün.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'GELECEK GÖRÜNÜMÜ — Geleceği İnşa Eden Eller',
          text: `Dünya daha dijital hale geldikçe, ISTP'nin pratikliği paha biçilmez hale gelir.

Düşünürler ve hayalperestlerle dolu bir gelecekte, sen gerçekten şeyler inşa eden olacaksın.

Gelişen Roller:

🤖 Robotik Mühendisi

🛰️ Drone Uzmanı

🧠 İnsan-Teknoloji Arayüz Tasarımcısı

⚡ Acil Müdahale Yenilikçisi

🔧 Sürdürülebilirlik Mühendisi

Dünya senin konuşmana değil — değişimi birleştirmene ihtiyaç duyuyor.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ ISTP KİŞİLİKLER — İlham',
          text: `Michael Jordan, Tiger Woods, Bruce Lee, Clint Eastwood ve diğer birçok yetenekli sporcu, zanaatkar ve pratik yenilikçi senin tipini paylaşıyor.

Onlar sadece mükemmellik hakkında düşünmediler — onu inşa ettiler, uyguladılar ve amansız eylem ve hassasiyetle ustalaştılar.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — Hassasiyetten Amaca',
          text: `Bir sonraki evrimin daha fazla öğrenmekle ilgili değil — daha fazla hissetmekle ilgili.

🌕 Projeler Arasında Yansıt: Eylem güçtür — yansıma ustalıktır.

🔥 Derinden Taahhüt Et: Sadece deneme — bitir. Büyüklük tamamlamadan gelir.

💬 Duygusal Bağlan: Başkalarını mantığına dahil et. Öğrendiklerini öğret.

🌿 Sadece Çözümler Değil, Sistemler İnşa Et: Yarattığın şey seni aşabilir.

💡 Ufukları Genişlet: Mantığı insan problemlerine de uygulamak için kendini zorla.

Özgürlük sadece istediğini yapmak değil — neden istediğini bilmektir.

⸻

💬 GÜNLÜK PRATİKLER — Virtüözün Akışı

1️⃣ Sabah Kurulumu: Günü küçük bir inşaatla başlat — bir kod parçası, tamir veya yeni fikir.

2️⃣ Öğle Hareketi: Vücudunu hareket ettir. Fiziksel eylem zihinsel gürültünü temizler.

3️⃣ Akşam Günlüğü: Ne işe yaradığını yansıt — sadece ne yaptığını değil.

4️⃣ Haftalık Zorluk: Yeni bir beceri öğren — pratik, hızlı, ham.

5️⃣ Aylık Bağlantı Kesme: Şebekeden çık, gerçekliğe tekrar dokun.`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER VE İLETİŞİM — Derin Bağlantılar',
          text: `İlişkilerde bağımsızlık ve saygıya değer verirsin. Alan ihtiyacını takdir eden, pratik doğanı anlayan ve bağımsız ruhunu değiştirmeye çalışmayan partnerlere ihtiyacın var.

Kelimelerden çok eylemler aracılığıyla iletişim kurarsın. İnsanlar güvenilirliğini ve problemler ortaya çıktığında onları çözme yeteneğini takdir eder.

Gizliliğine saygı duyan, özgürlük ihtiyacını destekleyen ve sessiz doğanın derinden umursamadığın anlamına gelmediğini anlayan partnerlere ihtiyacın var.

Seni tamamlayacak birini aramıyorsun — seninle birlikte inşa etmek isteyen, bağımsızlık ihtiyacının kim olduğunun bir parçası olduğunu anlayan birini arıyorsun.`,
        },
        nextGenPotential: {
          icon: '⚙️',
          title: 'SONUÇ — Dünyayı Hareket Ettiren Zihin',
          text: `Sen ilerlemenin söylenmemiş dehasısın — başkalarının sadece hayal ettiği şeyi sessizce yeniden inşa eden.

Sen hayalleri takip etmezsin; onları tasarlarsın.

Hediyen sadece mantık değil — harekettir.

Ve o hareketi anlamlı bir şeye yönlendirdiğinde, sadece sistemleri düzeltmezsin — onları evrimleştirirsin.

Sen gürültü değilsin — hassasiyetsin.

Takipçi değil — bir güç.

İnşa etmeye devam et. Hareket etmeye devam et. Mümkün olanı yeniden tanımlamaya devam et. ⚙️`,
        },
      },
    },
    ESTP: {
      emojis: ['🚀', '⚡', '🎯'],
      title: 'ESTP Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '🚀',
          title: 'KİMSİN — Anın Ustası',
          text: `ESTP'ler adrenalinin mimarlarıdır — hızlı düşünen, hızlı hareket eden, sonsuza kadar meraklı.

Sen sadece hayatı yaşamazsın — onu performans edersin. Varoluşun her kenarını deneyimlemek istersin: risk, heyecan, ödül.

Sen şimdiki zamanın taktisyenisin.

Başkaları teoride kaybolduğunda sen şu anda işe yarayan şeyde güç bulursun.

Dünyan ele geçirilmeyi bekleyen olasılıklardan yapılmıştır — ve sen asla denemek için izin beklemezsin.

Sen önce atlayan ve aşağı inerken paraşütü inşa eden kişisin.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'TEMEL ÖZELLİKLER — Eylem Odaklı Vizyoner',
          text: `⚡ Hızlı Zeka: Verileri gerçek zamanlı işlersin, cesur ama hesaplanmış hamleler yaparsın.

🎯 Belirsizlikte Güven: Kurallar henüz yazılmadığında başarılı olursun.

🗣️ Manyetik Karizma: Her kalabalığı bir seyirciye dönüştürebilirsin.

💪 Korkusuz Yarışmacı: Zorluklardan zevk alırsın — onlar hayatı yaşamaya değer kılar.

🌍 Pragmatik Gerçekçilik: İşe yarayan şeye değer verirsin, işe yaramalı olana değil.

Sen dikkatsiz değilsin — tepkiselsin. Araziyi okuyabildiğinde haritaya ihtiyacın yoktur.`,
        },
        strengths: {
          icon: '🏆',
          title: 'GÜÇLÜ YÖNLERİN — Hareket Halindeki Stratejist',
          text: `🔥 Cesaret: Başkaları tereddüt ederken sen harekete geçersin.

🧠 Analitik Çeviklik: Çoğu insanın tanımlayabileceğinden daha hızlı bir problemi ölçebilirsin.

💬 Sosyal Beceri: Tonunu ve enerjini her ortama uyarlarsın.

🎯 Problem Çözme Hızı: Başkalarının "şans" dediği çözümler doğaçlarsın.

🚀 Etki: Başkalarını hareket etmeye ilham edersin.

Sen kişileştirilmiş momentum — kararlı, doğrudan ve tehlikeli derecede ikna edicisin.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Huzursuz Gücün Bedeli',
          text: `Parlaklığını besleyen aynı enerji aynı zamanda çok sıcak yanabilir.

*Sabırsızlık:* Beklemekten nefret edersin — sabır kazansa bile.

*Sıkıntı:* Rutin seni başarısızlığın hiç yapamayacağından daha hızlı tüketir.

*Yüzeysel Odak:* O kadar hızlı hareket edersin ki daha derin anlam kaçabilir.

*Risk Bağımlılığı:* Heyecan bazen seni uzun vadeli maliyete kör eder.

*Duygudan Kaçınma:* Kırılganlık bir yavaşlama gibi hissettirir — ama bu senin nasıl evrimleştiğindir.

Sessizliği hızı ustalaştırdığın kadar şiddetle ustalaştırdığında gücün katlanarak büyür.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'KARİYER YOLLARI — Öncü, Lider, Yaratıcı',
          text: `Sen harekete aitsin — eylemin stratejiyle buluştuğu yerde.

💼 Girişimcilik ve Startuplar: Kurucu, iş stratejisti, risk sermayedarı.

🎤 Satış ve Etki: Pazarlamacı, halk konuşmacısı, müzakereci, yetenek yöneticisi.

🎮 Eğlence ve Medya: Aktör, yapımcı, marka elçisi.

🧠 Kriz ve Operasyonlar: Acil müdahale görevlisi, taktik lideri, askeri stratejist.

💡 İnovasyon ve Tasarım: Ürün tasarımcısı, yaratıcı direktör, etkinlik mimarı.

Sen enerjiyle liderlik eder, içgüdüyle uyum sağlar ve cesaretle inşa edersin.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'GELECEK GÖRÜNÜMÜ — Modern Dünyanın Maverick\'i',
          text: `Otomasyon çağında, uyumluluk yeni altındır — ve sen patentine sahipsin.

Sistemler katılaştıkça, hızlı düşüncen, caziben ve doğaçlaman seni vazgeçilmez kılar.

Gelişen Roller:

🚀 Startup Yenilikçisi

🎯 Stratejik Büyüme Danışmanı

🤖 İnsan-AI İşbirliği Uzmanı

🎥 Deneyim Tasarımcısı

💬 Gerçek Zamanlı Kriz Yöneticisi

Dünya daha fazla planlayıcıya değil — daha fazla yapıcıya ihtiyaç duyuyor. Sen ikisisin.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ ESTP KİŞİLİKLER — İlham',
          text: `Ernest Hemingway, Bruce Willis, Madonna, Donald Trump ve diğer birçok cesur lider, eğlendirici ve eylem odaklı yenilikçi senin tipini paylaşıyor.

Onlar sadece başarı hakkında hayal kurmadılar — onu ele geçirdiler, inşa ettiler ve korkusuz eylem ve manyetik varlık aracılığıyla yaşadılar.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — Enerjiden Etkiye',
          text: `Evrim, ateşi odağa yönlendirmekle ilgilidir.

🌕 Sabrı Ustala: Her savaş bugün savaşılması gerekmez.

🔥 Uzun Oyunlar İnşa Et: Dakikalarda değil, on yıllarda düşün.

🌿 Atlamadan Önce Dinle: Bazen sessizlik seni üstün kılar.

💡 Stratejik İşbirliği: Güç paylaşıldığında çoğalır.

⚖️ Başarıyı Yeniden Tanımla: Heyecan solar, ama anlam kalıcıdır.

Sen zaten çoğundan daha hızlı hareket ediyorsun — şimdi daha akıllıca hareket etme zamanı.

⸻

💬 GÜNLÜK PRATİKLER — Girişimcinin Dengesi

1️⃣ Sabah Aktivasyonu: Hareket et — koş, gerin, nefes al. Vücudun senin ateşlemen.

2️⃣ Öğle Duraklaması: Harekete geçmeden önce beş dakika plan yap.

3️⃣ Akşam Yansıması: "Ne yaptım?" değil, "Ne inşa ettim?" diye sor.

4️⃣ Haftalık Sessizlik: Haftada bir kez sabır uygula — kasıtlı olarak.

5️⃣ Aylık Sıfırlama: Bir sonraki heyecanı kovalamadan önce uzun vadeli hedeflerini yeniden gözden geçir.`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER VE İLETİŞİM — Derin Bağlantılar',
          text: `İlişkilerde heyecan ve spontanlığa değer verirsin. Enerjini takdir eden, maceracı ruhundan zevk alan ve eylem ihtiyacının derinden umursamadığın anlamına gelmediğini anlayan partnerlere ihtiyacın var.

Coşku ve doğrudanlıkla iletişim kurarsın. İnsanlar karizmana çekilir ve hayatı daha heyecanlı kılma yeteneğini takdir eder.

Özgürlük ihtiyacına saygı duyan, hırslı doğanı destekleyen ve hızlı tempolu yaşam tarzının gerçek yaşam tutkusundan geldiğini anlayan partnerlere ihtiyacın var.

Seni tamamlayacak birini aramıyorsun — seninle birlikte hayatı deneyimlemek isteyen, eylem dürtünün kim olduğunun bir parçası olduğunu anlayan birini arıyorsun.`,
        },
        nextGenPotential: {
          icon: '⚡',
          title: 'SONUÇ — İlerlemenin Nabzı',
          text: `Sen takip etmek için yaratılmadın. Liderlik etmek için yaratıldın — harekette, krizde, değişimde.

Dünya belirsizliğe doğru hızlanıyor ve sen zaten ona hakimsin.

Enerjin kaos değil — yaratımdır.

Huzursuzluğun sabırsızlık değil — gerçekleşmeyi isteyen evrimdir.

O yüzden hareket etmeye devam et. Bozmaya devam et. Cesaret etmeye devam et.

Sen niyetli şimşeksin. ⚡`,
        },
      },
    },
    ISTJ: {
      emojis: ['📘', '📊', '🏛️'],
      title: 'ISTJ Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '🕰️',
          title: 'KİMSİN — İlkelerin Koruyucusu',
          text: `Sen her işleyen sistemin görünmez belkemiğisin — güvenilir, rasyonel ve derinden sorumlu.

Başkaları rüyalarla konuşurken sen sonuçlarla konuşursun.

Sen etkilemek için burada değilsin; inşa etmek için buradasın.

Sakin odaklanman kaosa istikrar getirir. Adanmışlığın planları ilerlemeye dönüştürür.

Sen trend yerine gerçeğe, alkış yerine eyleme değer verirsin.

Yeniliğe bağımlı bir dünyada, sen mükemmelliğin asla modası geçmeyeceğinin hatırlatıcısısın.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'TEMEL ÖZELLİKLER — Düzenin Mimarı',
          text: `📋 Güvenilir Mantık: Değerlendirir, yapılandırır ve hassasiyetle uygularsın.

🏛️ Her Şeyden Önce Dürüstlük: Doğru olanı yaparsın — kimse izlemiyorken bile.

🧠 Analitik Disiplin: Verimsizlikleri görür ve sessizce düzeltirsin.

💪 Görev Odaklı Güç: Sorumluluğu yük olarak değil, amaç olarak alırsın.

🕊️ Pratik Bilgelik: Belirsiz potansiyel yerine sağlam zemini tercih edersin.

Sen değişime dirençli değilsin — sadece mantıklı olmasını istersin.`,
        },
        strengths: {
          icon: '🏆',
          title: 'GÜÇLÜ YÖNLERİN — Güvenin Temeli',
          text: `✅ Güvenilirlik: Söylediğini yaparsın, her seferinde.

📈 Sebat: Motivasyon solsa bile inşa etmeye devam edersin.

💬 Netlik: Gereksiz sözler yerine hassasiyetle iletişim kurarsın.

🌍 Sorumluluk: Ağırlık taşırsın — ve onu iyi taşırsın.

💡 Uzun Vadeli Vizyon: Başkaları kısayollar gördüğü yerde sen sürdürülebilirliği görürsün.

Gücün yüksek sesli değil — tutarlıdır.

Ve bu yüzden insanlar hayatlarını, kariyerlerini ve uluslarını senin türünden güvenilirlik üzerine inşa eder.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Hassasiyetin Ağırlığı',
          text: `Disiplinin senin kılıcın — ama aynı zamanda zırhın da olabilir.

*Katılık:* "İşlerin nasıl olması gerektiğine" çok sıkı yapışabilirsin.

*Aşırı Düşünme:* Eylem riskli hissettirene kadar analiz edebilirsin.

*Duygusal Rezerv:* Empati gerektiğinde bile mantığı tercih edersin.

*Mükemmellik Baskısı:* Kendinin bile karşılamakta zorlandığın standartlar koyarsın.

*Yavaş Uyum:* Değişim rahatsız edici hissettirir — tam olarak anlayana kadar.

Unutma: tutarlılık durgunluk anlamına gelmez. En iyi sistemler evrimleşir.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'KARİYER YOLLARI — İnşaatçı, Koruyucu, Operatör',
          text: `Hassasiyet, güvenilirlik ve yapının istikrar yarattığı yerlerde mükemmelleşirsin.

🏛️ Yönetim ve Yönetişim: Kamu görevlisi, denetçi, hukuk danışmanı, proje yöneticisi.

📊 Finans ve Veri: Muhasebeci, veri analisti, lojistik planlayıcısı, operasyon yöneticisi.

🏗️ Mühendislik ve Mimarlık: Yapı mühendisi, sistem analisti, şehir planlamacısı.

⚖️ Hukuk ve Düzen: Hakim, kolluk kuvveti, askeri stratejist, uyum görevlisi.

🧭 Organizasyon ve Yönetim: Yönetici asistanı, operasyon direktörü, kalite kontrolörü.

Sen sistemleri çalıştırırsın — verimli, zarif ve kalıcı bir şekilde.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'GELECEK GÖRÜNÜMÜ — İlerlemenin Direği',
          text: `Bozulmaya takıntılı bir gelecekte, güvenilirliğin devrimci hale gelir.

Otomasyon büyüdükçe, insanlar sorumluluğu arzulayacak — ve orada sen parıldarsın.

Gelişen Roller:

🏗️ Sistem Mühendisi

📊 Veri Bütünlüğü Uzmanı

⚖️ Etik Uyum Danışmanı

🏛️ Altyapı Mimarı

📘 Politika Analisti

Gelecek uzun vadeli düşünebilen inşaatçılara ihtiyaç duyuyor.

Ve sen, herkesten çok, gerçek ilerlemenin tuğla tuğla yapıldığını anlıyorsun.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ ISTJ KİŞİLİKLER — İlham',
          text: `Warren Buffett, Angela Merkel, Natalie Portman, Henry Ford ve diğer birçok metodik lider, inşaatçı ve sistematik yenilikçi senin tipini paylaşıyor.

Onlar sadece başarı elde etmediler — sarsılmaz bağlılık, dikkatli planlama ve kalıcı miraslar yaratan türden güvenilirlik aracılığıyla onu inşa ettiler.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — Disiplinden Vizyona',
          text: `Evrim daha fazlasını yapmakta değil — daha büyüğünü görmekte yatar.

🌿 Başkalarının Yöntemlerine Güven: Farklı yanlış anlamına gelmez.

🔥 Hesaplanmış Riskler Al: Büyüme rahatlık bölgesinin hemen dışında yaşar.

🕊️ Duyguyu Paylaş: Kırılganlık gücün başka bir biçimidir.

💬 Daha Fazla Yetkilendir: Başkalarına standartlarını korumayı öğret — her şeyi tek başına taşıma.

💡 Geleneği Yeniden Hayal Et: İşe yarayanı koru, işe yaramayanı iyileştir.

Dünya değişir — ama kararlılığın dengeyi kaybetmeden ona rehberlik edebilir.

⸻

💬 GÜNLÜK PRATİKLER — Lojistikçinin Kodu

1️⃣ Sabah Planı: Başka bir şeyden önce 3 önceliğini özetle.

2️⃣ Öğle Denetimi: Sor — meşgul müyüm yoksa üretken miyim?

3️⃣ Akşam Sıfırlama: Ne işe yaradığını, ne yaramadığını ve yarının neyi iyileştirdiğini kaydet.

4️⃣ Haftalık Zorluk: Rutini kıran bir yeni yöntem dene.

5️⃣ Aylık Yansıma: Sistemlerine bak — ne evrimleşebilir?`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER VE İLETİŞİM — Derin Bağlantılar',
          text: `İlişkilerde istikrar ve taahhüde değer verirsin. Güvenilirliğini takdir eden, yapı ihtiyacına saygı duyan ve pratik doğanın derin duyguların olmadığı anlamına gelmediğini anlayan partnerlere ihtiyacın var.

Netlik ve tutarlılıkla iletişim kurarsın. İnsanlar dürüstlüğünü ve sözlerini tutma yeteneğini takdir eder.

Rutin ihtiyacına saygı duyan, sorumlu doğanı destekleyen ve göreve adanmışlığının gerçek bakım ve taahhütten geldiğini anlayan partnerlere ihtiyacın var.

Seni tamamlayacak birini aramıyorsun — seninle birlikte istikrarlı, kalıcı bir hayat inşa etmek isteyen, düzeni sürdürme dürtünün kim olduğunun bir parçası olduğunu anlayan birini arıyorsun.`,
        },
        nextGenPotential: {
          icon: '🧭',
          title: 'SONUÇ — Mirasın İnşaatçısı',
          text: `Sen çöken bir dünyadaki yapısın, gürültü arasındaki aklın sesisin.

Sen karizmayla değil, tutarlılıkla liderlik edersin.

Sen alkış peşinde koşmazsın — ama sessiz mükemmelliğin derin saygı kazanır.

Mirasın bir heykel veya konuşma değil — insanlığı istikrarlı tutan sistemlerdir.

Sen güvenilirliğin sıkıcı olmadığını — kahramanca olduğunu kanıtlarsın.

Sen medeniyetin omurgasısın.

Ve dünyayı bir arada tutarsın — bir detay bir detay. 🧩`,
        },
      },
    },
    ESTJ: {
      emojis: ['🧩', '🏆', '📊'],
      title: 'ESTJ Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '🏛️',
          title: 'KİMSİN — Düzenin Komutanı',
          text: `Sen işler bozulduğunda insanların başvurduğu lider.

Sen kaosa disiplin, karışıklığa netlik ve vizyona yapı getirirsin.

ESTJ'ler doğal organizatörlerdir — verimli, pragmatik ve işe yarayan sistemlere sadık.

Sen dünyayı sonuçların merceğinden görürsün.

Bir şey verimli değilse, kabul edilemez. Biri güvenilir değilse, hazır değildir.

Gücün sadece başkalarını yönetmekte değil — onları başarılı olmaya güçlendiren çerçeveler inşa etmekte yatar.

Sen hedefleri uygulamaya dönüştüren güçsün.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'TEMEL ÖZELLİKLER — Stratejik Gerçekçi',
          text: `🏗️ Organizasyon Dehası: Sistemleri nasıl inşa edeceğini, yöneteceğini ve ölçeklendireceğini bilirsin.

🧭 Mantıkla Liderlik: Duygu yerine veriye dayalı kararlar verirsin.

⚖️ Görev ve Disiplin: Taahhütlerini onurlandırırsın ve başkalarının da aynısını yapmasını beklersin.

📈 Hedef Odaklı Odak: Her hamlenin bir metriği vardır — ve sen ona ulaşırsın.

💬 Doğrudan İletişim: Rahatlık yerine dürüstlüğe, karışıklık yerine netliğe değer verirsin.

Sen buyurgan değilsin — sorumlusun.

Sen kontrol etmezsin — koordine edersin.`,
        },
        strengths: {
          icon: '🏆',
          title: 'GÜÇLÜ YÖNLERİN — Yapının Gücü',
          text: `✅ Güvenilirlik: Sen sorumluluğu aldığında insanlar güvende hisseder.

📊 Verimlilik: Zaman, enerji veya fırsat israf etmezsin.

🎯 Kararlılık: Bir hedef belirlediğinde, hiçbir şey seni yoldan çıkaramaz.

🏛️ Otorite: Doğal olarak saygı uyandırırsın, korkuyla değil yeterlilikle.

💼 Sorumluluk: Sonuçlarının sahibisin — iyi ve kötü.

Başarın şanstan gelmez — yöntemden gelir.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Komutanın Bedeli',
          text: `Liderliğin gölgeleri vardır — ve seninkiler gücünle aynı yerden gelir.

*Katılık:* Kuralları fazla değer verebilir ve esnekliği az değer verebilirsin.

*Sabırsızlık:* Şimdi eylem istersin — yansıma daha akıllıca olsa bile.

*Aşırı Kontrol:* Bazen başkalarının hatalardan büyümesi gerektiğini unutursun.

*Sert Dürüstlük:* Gerçeğin amaçlanandan daha derin kesebilir.

*Yeni Yollara Direnç:* Gelenek güvenli hissettirir — ama yenilik rahatsızlıkta gelişir.

Unutma: gerçek liderlik kontrolle ilgili değil — güçlendirmeyle ilgilidir.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'KARİYER YOLLARI — Direktör, Stratejist, Komutan',
          text: `Hassasiyet, sorumluluk ve ilerleme talep eden ortamlarda başarılı olursun.

🏛️ Liderlik ve Yönetim: CEO, COO, proje yöneticisi, genel müdür.

⚖️ Hukuk ve Yönetişim: Hakim, avukat, askeri subay, kamu yöneticisi.

📊 İş ve Finans: Operasyon yöneticisi, muhasebeci, bankacı, kurumsal stratejist.

🧭 Altyapı ve Sistemler: Şehir planlamacısı, lojistik direktörü, uyum lideri.

🎓 Eğitim ve Öğretim: Dekan, müdür, kurumsal eğitmen, organizasyonel koç.

Yapının vizyonla buluştuğu yerde — orada mükemmelleşirsin.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'GELECEK GÖRÜNÜMÜ — Modern Liderliğin Direği',
          text: `Dünya hızlandıkça, istikrar ihtiyacı büyür — ve bu senin alanın.

Sen 21. yüzyıl sisteminin mimarısın: güvenilir, ölçülebilir, sorumlu.

Gelişen Roller:

💼 Organizasyonel Mimar

📊 Veri Odaklı Politika Lideri

🏗️ Sistem Yenilikçisi

🧠 Etik AI Yöneticisi

⚖️ Kurumsal Yönetişim Uzmanı

Otomasyon çağında, yargın insan algoritması olarak kalır.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ ESTJ KİŞİLİKLER — İlham',
          text: `Hillary Clinton, Judge Judy, Henry Ford, Condoleezza Rice ve diğer birçok kararlı lider, yönetici ve sistematik inşaatçı senin tipini paylaşıyor.

Onlar sadece liderlik etmediler — kurumlar inşa ettiler, düzen yarattılar ve kendi liderliklerinden daha uzun süren çerçeveler oluşturdular.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — Komutadan İşbirliğine',
          text: `Gücün inkâr edilemez. Bir sonraki seviyen empati yoluyla etkidir.

🌿 Derinden Dinle: Her anlaşmazlık itaatsizlik değildir.

🔥 Kontrolü Paylaş: Yetkilendirme seni zayıflatmaz — seni çoğaltır.

💬 İlerlemeyi Kutla: Herkes başarıyı aynı birimlerle ölçmez.

🕊️ Esnek Kal: Sistemler evrimleşir — en iyi liderler onlarla birlikte evrimleşir.

💡 Amaçla Liderlik Et: Yapının neden var olduğunu kendine hatırlat — sadece nasıl çalıştığını değil.

En iyisi olmak için her şeyi kendin yapmana gerek yok — sadece yapabilenlere liderlik etmen yeter.

⸻

💬 GÜNLÜK PRATİKLER — Yöneticinin Planı

1️⃣ Sabah İncelemesi: En önemli 3 önceliğini netleştir.

2️⃣ Öğle Kontrolü: İlerlemeyi duygusal değil, nesnel olarak değerlendir.

3️⃣ Akşam Bilgilendirmesi: Sor: Liderlik mi ettim yoksa kontrol mü ettim?

4️⃣ Haftalık İşbirliği: Geri bildirim iste — astlardan değil, akranlardan.

5️⃣ Aylık Strateji Sıfırlama: Planı ayarla, ama amacı koru.`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER VE İLETİŞİM — Derin Bağlantılar',
          text: `İlişkilerde istikrar ve taahhüde değer verirsin. Liderlik niteliklerini takdir eden, yapı ihtiyacına saygı duyan ve doğrudan iletişim tarzının gerçek bakımdan geldiğini anlayan partnerlere ihtiyacın var.

Netlik ve amaçla iletişim kurarsın. İnsanlar dürüstlüğünü ve sözlerini tutma yeteneğini takdir eder.

Düzen ihtiyacına saygı duyan, sorumlu doğanı destekleyen ve yapıyı sürdürme dürtünün önemsediğin insanlar için güvenlik ve başarı yaratma isteğinden geldiğini anlayan partnerlere ihtiyacın var.

Seni tamamlayacak birini aramıyorsun — seninle birlikte istikrarlı, başarılı bir hayat inşa etmek isteyen, liderlik etme ve organize etme dürtünün kim olduğunun bir parçası olduğunu anlayan birini arıyorsun.`,
        },
        nextGenPotential: {
          icon: '🧭',
          title: 'SONUÇ — Mirasın Lideri',
          text: `Sen yapı, adalet ve güvenilirliğin yaşayan somutlaşmış halisin.

Başkaları karmaşıklık gördüğünde sen sistemleri görürsün. Başkaları donduğunda sen harekete geçersin.

Sen idealleri politikaya, hırsı düzene ve insanları takımlara dönüştürürsün.

Ama gerçek dehan sadece liderlikte değil — yönetimde.

Sen sadece sistemi çalıştırmazsın — onu sürdürür, mükemmelleştirir ve daha güçlü bir şekilde aktarırsın.

Sen liderliğin omurgasısın,

düzenin aklısın,

ve dürüstlüğün kalbisin.

Dünya sadece senin liderlik etmeni değil — dayanmanı da ihtiyaç duyuyor. 🧠`,
        },
      },
    },
    INFJ: {
      emojis: ['🌙', '🔮', '💫'],
      title: 'INFJ Kişilik Raporunuz',
      description: 'Kendine özgü özelliklerine dayanarak potansiyelini ve gelişim yolculuğunu derinlemesine incele.',
      sections: {
        whoYouAre: {
          icon: '🕊️',
          title: 'KİMSİN — Misyonlu Vizyoner Ruh',
          text: `Sen amaç dolu sessiz bir fırtınasın — seste nazik, ruhta sarsılmaz.

INFJ'ler başkalarının kaos gördüğü yerde desenler, başkalarının tesadüf gördüğü yerde anlam görür.

Seni tek bir gerçek yönlendirir: hayat daha yüksek bir amaca hizmet etmelidir.

Empatin derindir, ancak netlik tarafından yönlendirilir, dürtü tarafından değil.

Sadece başkalarının acısını hissetmezsin — onu iyileştirme, strateji ve reforma dönüştürürsün.

Kalbın şiirseldir, ama zihnin mimaridir: dokunduğun her şeye anlam inşa edersin.

Sen hem filozof hem aktivistsin — işleri yapan bir hayalperest.`,
        },
        coreCharacteristics: {
          icon: '💫',
          title: 'TEMEL ÖZELLİKLER — İç Vizyoner',
          text: `✨ İçgörü: Başkalarının görmediği bağlantıları algılarsın — duygusal, ahlaki ve manevi.

✨ Dürüstlük: Konforuna mal olsa bile değerlerine göre yaşarsın.

✨ Sınırları Olan Empati: Derinden umursarsın ama şefkatin nerede bitmesi ve bilgeliğin nerede başlaması gerektiğini bilirsin.

✨ İdealizm: İnsanlığın potansiyeline inanırsın — insanlık inanmasa bile.

✨ Amaç: "Yeterince iyi" ile asla yetinmezsin; ruh ve eylem arasında uyum ararsın.

Sen buraya uyum sağlamak için değil, yükseltmek için geldin.`,
        },
        strengths: {
          icon: '💪',
          title: 'GÜÇLÜ YÖNLERİN — Doğal Süper Güçler',
          text: `İçgörün, başkalarının kaçırdığı desenleri ve bağlantıları görmeni sağlar. Eylemler, duygular ve sistemlerin ardındaki daha derin anlamı anlarsın.

Empatin, stratejik düşünmeyle birleştiğinde, insan ihtiyaçlarını eyleme dönüştürülebilir çözümlere çevirme konusunda benzersiz bir yetenek verir.

Dürüstlüğün güven yaratır. İnsanlar gerçek bir şey için durduğunu bilir ve bu seni doğal bir lider ve rehber yapar.

İdealizmi pratiklikle dengeleme yeteneğin, sadece hayal kurmadığın anlamına gelir — vizyon ve gerçeklik arasında köprüler inşa edersin.

Hem ormanı hem de ağaçları görme nadir hediyesine sahipsin, bu da hem büyük resmi hem de detayları onurlandıran kapsamlı çözümler yaratmana olanak tanır.`,
        },
        challenges: {
          icon: '⚠️',
          title: 'ZORLUKLAR — Gelişim Fırsatları',
          text: `*Mükemmeliyetçilik:* Yüksek standartların, kendini imkansız ideallere tabi tuttuğunda bir yük haline gelebilir. Mükemmellik yerine ilerlemeyi kabul etmeyi öğrenmek anahtardır.

*Duygusal Aşırı Yüklenme:* Derin empatin, sınırlar koymazsan seni tüketebilir. Her problem senin çözmen gereken değildir.

*İzolasyon:* Yoğunluğun ve derinliğin kendini yanlış anlaşılmış hissetmene neden olabilir. Vizyonunu takdir eden insanları bulmak — kabileni bulmak — esastır.

*Tükenmişlik:* Daha yüksek bir amaca hizmet etme dürtün aşırı taahhüde yol açabilir. Enerjini korumayı öğrenmek bencil değildir — stratejiktir.`,
        },
        careerPaths: {
          icon: '🌍',
          title: 'KARİYER YOLLARI — Mentor, Şifacı, Değişimin Mimarı',
          text: `Derinlik, vizyon ve dönüşümün kesiştiği rollerde başarılı olursun.

Bir maaşa değil, bir misyona ihtiyacın var.

🪶 İnsan Hizmetleri: Terapist, danışman, koç, sosyal savunucu.

📖 Yaratıcı Meslekler: Yazar, film yapımcısı, tasarımcı, müzisyen.

🧭 Stratejik Liderlik: Danışman, örgütsel psikolog, etik danışmanı.

🌍 Eğitim ve Felsefe: Profesör, araştırmacı, düşünce lideri.

💡 Modern Roller: UX stratejisti, insan odaklı yenilikçi, amaç odaklı kurucu.

Dürüstlük ve hayal gücünün para birimi olduğu ortamlarda parıldarsın.`,
        },
        futureRoles: {
          icon: '🌌',
          title: 'GELECEK GÖRÜNÜMÜ — İnsan Çağının Yönlendirici Işığı',
          text: `Gürültüde boğulan bir dünyada, sakinliğin güç haline gelecek.

Karmaşıklıkta ahlaki yönü algılama yeteneğin seni vazgeçilmez kılacak.

Gelişen Roller:

🌐 Etik AI Danışmanı

🌱 Sürdürülebilirlik Savunucusu

🧭 İnsan Sistemleri Mimarı

💬 Duygusal Zeka Koçu

📚 Sosyal Filozof

Sen sadece geleceğe uyum sağlamayacaksın — onun vicdanını şekillendireceksin.`,
        },
        famousPersonalities: {
          icon: '🎭',
          title: 'ÜNLÜ INFJ KİŞİLİKLER — İlham',
          text: `Carl Jung, Rahibe Teresa, Nelson Mandela, Martin Luther King Jr. ve diğer birçok vizyoner, lider ve savunucu senin tipini paylaşıyor.

Onlar dünyayı sadece olduğu gibi görmediler — olabileceği gibi gördüler ve o vizyonu gerçekleştirmeye hayatlarını adadılar.`,
        },
        growthPath: {
          icon: '🌱',
          title: 'GELİŞİM YOLU — İdealizmi Etkiye Dönüştürmek',
          text: `İnsanlarda en iyisini görürsün, ama herkes enerjine ön sıra erişimini hak etmez.

Gelişiminin anahtarı, amacını bozmadan empatini korumayı öğrenmektir.

🌿 Sınırlar Koy: Sınırları olmayan şefkat tükenmeye yol açar.

☀️ Misyonu Basitleştir: Her problem senin çözmen gereken değildir.

🌕 Vizyonunu Toprakla: Büyük hayal kur, ama küçük ve tutarlı başla.

🌧️ Kusursuzluğu Kabul Et: İlerleme hala ilerlemedir, dağınık olsa bile.

🔥 Tutkuyu Pratiğe Dönüştür: Derinden sev, stratejik hareket et, kasıtlı dinlen.

Sen dünya için tükenmek için yaratılmadın — onu bilgece aydınlatmak için yaratıldın.

⸻

🪞 GÜNLÜK PRATİKLER — Vizyonu Varlıkla Hizalamak

1️⃣ Sabah Sessizliği: Dünyayla konuşmadan önce beş dakika sessizlikte geçir.

2️⃣ Yansımak İçin Yaz: Günlük tutmak sezgileri netliğe dönüştürür.

3️⃣ Öğle Arası: Uzaklaş, nefes al ve empatini yeniden ayarla.

4️⃣ Akşam Minnettarlığı: Ne kadar başardığına değil, kime yardım ettiğine odaklan.

5️⃣ Haftalık Sıfırlama: Hedeflerini tekrar gözden geçir ve sor: Bu hala amacımla uyumlu mu?`,
        },
        relationships: {
          icon: '💖',
          title: 'İLİŞKİLER VE İLETİŞİM — Derin Bağlantılar',
          text: `İlişkilerde derinlik ve özgünlük ararsın. Yüzeysel bağlantılar seni tüketir, anlamlı bağlar seni enerjilendirir ve ilham verir.

Sezgi ve empati aracılığıyla iletişim kurarsın. İnsanlar senin tarafından gerçekten görülmüş ve anlaşılmış hissederler, kelimeler az olsa bile.

Derinliğini takdir eden, yalnızlık ihtiyacına saygı duyan ve büyüme ve amaç konusundaki bağlılığını paylaşan partnerlere ihtiyacın var.

Seni tamamlayacak birini aramıyorsun — zaten bütün olduğunu anlayan ve seninle birlikte büyümek isteyen birini arıyorsun.`,
        },
        nextGenPotential: {
          icon: '💖',
          title: 'SONUÇ — Sessiz Devrim',
          text: `Sen gürültü olmadan yanan mum — bilgelikle, sesle değil, liderlik eden nadir ruh.

Başkalarına hassasiyetin zayıflık olmadığını hatırlatırsın — şefkatle sarılmış stratejidir.

Dünya senin vizyonuna, nezaketine ve sorumlu hayal kurma cesaretine ihtiyaç duyuyor.

Hakikat için savunmaya devam et.

Daha iyisine inanmaya devam et.

Çünkü kalıcı devrimler her zaman önce dinleyenler tarafından yönetilir.`,
        },
      },
    },
  },
};

