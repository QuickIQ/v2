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
  },
};

