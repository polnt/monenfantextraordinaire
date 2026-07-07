import TabSection, { type TabItem } from '@/components/TabSection';
import { R2_IMAGES_BASE } from '@/lib/images';

const tabs = [
  {
    id: 'general',
    label: 'Généralités',
    image: `${R2_IMAGES_BASE}/trouble-neuro.png`,
    imgPosition: 'center 0%',
  },
  {
    id: 'autisme',
    label: "L'autisme de A à Z",
    image: `${R2_IMAGES_BASE}/autisme-desk-bis.png`,
    imgPosition: 'center 37%',
  },
  {
    id: 'attention',
    label: "Trouble de l’attention (TDA/H)",
    image: `${R2_IMAGES_BASE}/tda_desktop.png`,
    imgPosition: 'center 10%',
  },
  {
    id: 'dys',
    label: "Troubles dys",
    image: `${R2_IMAGES_BASE}/dys_mobile.png`,
    imgPosition: 'center 30%',
  },
  {
    id: 'autres',
    label: "Autres troubles",
    image: `${R2_IMAGES_BASE}/autres.png`,
    imgPosition: 'center 30%',
  },
];

const content: Record<string, TabItem[]> = {
  general: [
    {
      key: 'Vue d\'ensemble',
      color: '#87ceeb',
      text: '#0f3d5a',
      desc: "Les troubles du neurodéveloppement (TND) sont des troubles qui apparaissent dès l’enfance et qui affectent le développement du cerveau. Ils peuvent entraîner des difficultés dans :",
      list: [
        "le langage",
        "les apprentissages",
        "l’attention",
        "les interactions sociales",
        "la motricité",
        "le comportement"
      ],
    },
    {
      key: 'Les principales catégories (DSM-5)',
      color: '#27ae60',
      text: 'white',
      desc: "Le DSM-5 (Manuel diagnostique et statistique des troubles mentaux) classe les troubles du neurodéveloppement en plusieurs catégories :",
      list: [
        "TSA (autisme) : Difficultés dans la communication, les interactions sociales et comportements répétitifs.",
        "TDA/H, trouble de l’attention : Difficultés d’attention, hyperactivité et impulsivité.",
        "Troubles des apprentissages : Dyslexie, dysorthographie, dyscalculie, dyspraxie...",
        "Troubles du langage : Difficultés à parler, comprendre ou communiquer.",
        "Trouble du développement intellectuel : Difficultés dans les apprentissages et l’autonomie."
      ]
    },
    {
      key: 'Quelques signes d’alerte',
      color: '#F90021',
      text: 'white',
      desc: "⚠️ Certains signes peuvent apparaître très tôt :",
      list: [
        "Retard de langage",
        "Difficultés à communiquer",
        "Peu de contact visuel",
        "Agitation ou manque d’attention",
        "Comportements répétitifs",
        "Difficultés scolaires",
        "Retard moteur"
      ]
    },
    {
      key: 'Un petit schéma pour mieux comprendre',
      color: '#EFD010',
      text: 'black',
      blocks: [
        {
          type: 'image',
          src: `${R2_IMAGES_BASE}/schema.png`,
          alt: 'Schéma explicatif',
          caption: 'Classification des troubles du neurodéveloppement'
        }
      ]
    },
    {
      key: 'Important',
      color: '#ff7043',
      text: 'white',
      desc: "Chaque enfant est différent. Un repérage et un accompagnement précoces peuvent aider l’enfant à mieux développer ses capacités et son autonomie."
    }
  ],
  autisme: [
    {
      key: "L'autisme",
      color: '#87ceeb',
      text: '#0f3d5a',
      sections: [
        {
          title: "Qu’est-ce que l’autisme ?",
          blocks: [
            { type: "paragraph", text: "L’autisme, aussi appelé Trouble du Spectre de l’Autisme (TSA), est un trouble du neurodéveloppement qui influence la manière dont une personne communique, interagit et perçoit le monde qui l’entoure." },
            { type: "paragraph", text: "On parle de « spectre » car l’autisme se manifeste de façon très différente d’une personne à l’autre. Les caractéristiques, les besoins et l’intensité des difficultés peuvent varier, aussi bien chez les garçons que chez les filles." },
            { type: "paragraph", text: "L’autisme n’est pas une maladie, mais un handicap neurodéveloppemental qui accompagne la personne tout au long de sa vie." }
          ]
        },
        {
          title: 'Comment se manifeste-t-il ?',
          blocks: [
            { type: "paragraph", text: "L’autisme se manifeste principalement par:" },
            {
              type: "list", items: [
                "Des difficultés dans les interactions sociales",
                "Des troubles de la communication verbale et non verbale",
                "Des comportements répétitifs ou inhabituels",
                "Des intérêts restreints ou très spécifiques"
              ]
            },
            { type: "paragraph", text: "Certains enfants peuvent également présenter des particularités sensorielles (hypersensibilité au bruit, à la lumière, au toucher, etc.)." },
            { type: "paragraph", text: "Ces manifestations peuvent avoir des conséquences sur plusieurs domaines du développement de l’enfant, notamment le langage, les apprentissages, l’autonomie et les relations sociales." }
          ]
        },
        {
          title: 'À quel âge se manifeste-t-il ?',
          blocks: [
            { type: "paragraph", text: "Les signes de l’autisme apparaissent généralement dès la petite enfance, souvent avant l’âge de 3 ans." },
            { type: "paragraph", text: "Chez certains enfants, le développement semble normal durant les premiers mois, puis certaines compétences diminuent ou disparaissent progressivement, notamment le langage ou les interactions sociales autour de l’âge de 2 ans." },
            { type: "paragraph", text: "Chez d’autres enfants certaines compétences ne se développent pas comme les interactions sociales, le langage ou la communication par exemple lorsque l’on appelle l’enfant il ne répond pas à son prénom." },
            { type: "paragraph", text: "Les manifestations varient selon chaque enfant et peuvent être plus ou moins visibles." },
          ]
        },
      ],
    },
    {
      key: 'Les causes',
      color: '#27ae60',
      text: 'white',
      sections: [
        {
          title: 'Causes biologiques et génétiques',
          blocks: [
            { type: "paragraph", text: "L’autisme possède une forte composante génétique. Certains gènes liés au développement du cerveau peuvent augmenter le risque de TSA." },
            { type: "paragraph", text: "On observe également :" },
            {
              type: "list", items: [
                "Des différences dans le développement et la connectivité du cerveau",
                "Des déséquilibres de certains neurotransmetteurs (sérotonine, dopamine, GABA)",
                "Parfois une inflammation cérébrale ou un stress oxydatif."
              ]
            }
          ],
        },
        {
          title: 'Facteurs environnementaux',
          blocks: [
            { type: "paragraph", text: "Certains facteurs peuvent influencer le développement du cerveau pendant la grossesse ou à la naissance" },
            {
              type: "list", items: [
                "Âge avancé des parents",
                "Exposition à des toxines ou certains médicaments pendant la grossesse",
                "Infections maternelles, diabète gestationnel ou stress important",
                "Prématurité, faible poids de naissance ou complications à l’accouchement"
              ]
            },
            { type: "paragraph", text: "Des recherches étudient aussi le rôle possible du microbiote intestinal et des polluants environnementaux." },
          ]
        },
        {
          title: 'Conclusion',
          content:
            "L’autisme n’a pas une cause unique. Il résulte d’une combinaison de facteurs génétiques et environnementaux qui influencent le développement du cerveau. Les mécanismes exacts restent encore partiellement compris.",
        },
      ],
    },
    {
      key: 'Les conséquences à l’école et au travail',
      color: '#F90021',
      text: 'white',
      sections: [
        {
          title: "À l'école",
          blocks: [
            { type: "paragraph", text: "Les enfants autistes peuvent rencontrer :" },
            {
              type: "list", items:
                [
                  "Des difficultés de communication et d’interactions sociales",
                  "Des difficultés à se faire des amis ou à participer aux activités de groupe",
                  "Des troubles de l’apprentissage, de l’attention ou de l’adaptation aux changements",
                  "Des comportements répétitifs pouvant gêner la concentration",
                  "Une hypersensibilité sensorielle (bruit, lumière, textures...)",
                  "Des intérêts restreints (il ne veulent que dessiner par exemple)"
                ]
            },
            { type: "paragraph", text: "Malgré ces difficultés, certains enfants développent aussi de grandes compétences dans des domaines spécifiques." }
          ]
        },
        {
          title: 'Au travail',
          blocks: [
            { type: "paragraph", text: "Les adultes autistes peuvent avoir :" },
            {
              type: "list", items: [
                "des difficultés dans les relations sociales et la communication",
                "du mal à s’adapter aux changements ou aux situations imprévues",
                "une sensibilité au bruit, à la lumière ou au stress",
                "un besoin d’organisation et de routines."
              ]
            },
            { type: "paragraph", text: "Cependant, beaucoup possèdent également des compétences particulières, notamment dans les domaines techniques, artistiques ou analytiques." }
          ]
        },
        {
          title: 'Adaptations possibles',
          blocks: [
            { type: "paragraph", text: "Un accompagnement adapté peut favoriser la réussite scolaire et professionnelle :" },
            {
              type: "list", items: [
                "Supports visuels et organisation claire",
                "Environnement calme et adapté aux besoins sensoriels",
                "Accompagnement spécialisé",
                "Sensibilisation des enseignants, collègues et employeurs"
              ]
            },
            { type: "paragraph", text: "Avec du soutien et des aménagements adaptés, les personnes autistes peuvent pleinement développer leurs capacités et s’épanouir." }
          ]
        }
      ],
    },
    {
      key: "Signes d'alerte",
      color: '#EFD010',
      text: 'black',
      sections: [
        {
          title: "Avant 18 mois",
          blocks: [
            { type: "paragraph", text: "Certains enfants peuvent présenter :" },
            {
              type: "list", items: [
                "des troubles du sommeil ou de l’alimentation",
                "des difficultés à gérer leurs émotions",
                "peu ou pas de babillage",
                "un manque de contact visuel",
                "l’absence de pointage ou d’attention conjointe",
                "peu de réactions sociales (ne répond pas à son prénom, ne fait pas coucou, ne sourit pas)",
                "des difficultés à interagir ou jouer avec les autres",
                "des comportements inhabituels ou répétitifs",
                "une sensibilité sensorielle particulière"
              ]
            },
          ]
        },
        {
          title: "Après 18 mois",
          blocks: [
            { type: "paragraph", text: "Les signes peuvent devenir plus visibles :" },
            {
              type: "list", items: [
                "retard ou absence de langage",
                "difficultés de communication et d’interactions sociales",
                "difficultés à jouer avec les autres enfants",
                "intérêts très spécifiques ou restreints",
                "comportements répétitifs"
              ]
            },
            { type: "paragraph", text: "Chaque enfant est différent. La présence de certains signes ne signifie pas forcément un diagnostic d’autisme, mais un accompagnement précoce peut être important." },
          ]
        }
      ]
    },
    {
      key: "Que faire en cas de signes d'autisme ?",
      color: '#ff7043',
      text: 'white',
      sections: [
        {
          title: "Diagnostic",
          blocks: [
            { type: "paragraph", text: "Si plusieurs signes d’autisme sont observés chez un enfant, il est important de réaliser une évaluation auprès d’une équipe spécialisée (pédopsychiatre, psychologue, orthophoniste, psychomotricien...). Cette démarche permet de confirmer ou non le diagnostic." },
            { type: "paragraph", text: "Une fois le diagnostic posé, la prise en charge peut commencer rapidement afin d’aider l’enfant dans :" },
            {
              type: "list", items: [
                "la communication",
                "les apprentissages",
                "les compétences sociales",
                "l’autonomie",
                "la gestion des comportements"
              ]
            },
          ]
        },
        {
          title: "Existe-t-il un traitement ?",
          blocks: [
            { type: "paragraph", text: "Il n’existe pas de traitement qui guérit l’autisme. Cependant, une prise en charge précoce et adaptée peut améliorer considérablement le développement et la qualité de vie de l’enfant." },
            { type: "paragraph", text: "Certains troubles associés, comme l’anxiété ou les troubles alimentaires, peuvent parfois nécessiter un traitement médical." },
          ]
        },
        {
          title: "Pourquoi la prise en charge précoce est-elle importante ?",
          blocks: [
            { type: "paragraph", text: "Plus l’accompagnement commence tôt, plus les progrès peuvent être importants, notamment avant l’âge de 4 ans grâce à la plasticité du cerveau." },
            { type: "paragraph", text: "Une prise en charge précoce permet de :" },
            {
              type: "list", items: [
                "développer le langage et la communication",
                "améliorer les interactions sociales",
                "favoriser l’autonomie",
                "réduire certaines difficultés comportementales",
                "faciliter l’intégration scolaire et sociale"
              ]
            },
          ]
        }
      ]
    },
    {
      key: "Conclusion",
      color: '#9c27b0',
      text: "white",
      blocks: [
        { type: "paragraph", text: "L’autisme fait partie de la diversité humaine et mérite d’être compris avec bienveillance et respect." },
        { type: "paragraph", text: "Avec un accompagnement adapté, chaque enfant peut progresser, développer ses compétences et s’épanouir à son rythme." },
        { type: "paragraph", text: "Mieux comprendre l’autisme, c’est aussi construire un environnement plus inclusif, rassurant et respectueux pour chaque famille." },
      ]
    }
  ],
  attention: [
    {
      key: "Definition",
      color: '#87ceeb',
      text: '#0f3d5a',
      blocks: [
        { type: "paragraph", text: "Le TDA/H est un trouble du neurodéveloppement qui affecte l’attention, le contrôle des impulsions et parfois l’activité motrice." },
        { type: "paragraph", text: "Il existe trois formes :" },
        {
          type: "list", items: [
            "Inattention : Difficulté à se concentrer, à suivre des instructions ou à organiser des tâches.",
            "TDA inattentif : difficultés de concentration, oublis fréquents",
            "TDA/H hyperactif-impulsif : agitation, impulsivité",
            "TDA/H combiné : mélange des deux"
          ]
        },
      ]
    },
    {
      key: "Symptômes fréquents",
      color: '#27ae60',
      text: 'white',
      sections: [
        {
          title: "Inattention",
          blocks: [
            {
              type: "list", items:
                [
                  "Difficulté à se concentrer sur une tâche",
                  "Oublis fréquents (objets, rendez-vous...)",
                  "Difficulté à suivre des instructions ou à terminer des tâches",
                  "Agitation ou difficulté à rester assis",
                  "Impulsivité (interrompre les autres, difficulté à attendre son tour...)"
                ]
            }
          ]
        },
        {
          title: "Hyperactivité",
          blocks: [
            {
              type: "list", items:
                [
                  "Agitation constante",
                  "Difficulté à rester assis",
                  "Parle beaucoup"
                ]
            }
          ]
        },
        {
          title: "Impulsivité",
          blocks: [
            {
              type: "list", items:
                [
                  "Coupe la parole",
                  "Difficulté à attendre son tour",
                  "Agit sans réfléchir"
                ]
            }
          ]
        },
        {
          title: "Émotions",
          blocks: [
            {
              type: "list", items:
                [
                  "grande sensibilité",
                  "difficultés à gérer la colère et les émotions."
                ]
            }
          ]
        },
      ]
    },
    {
      key: "Causes et conséquences",
      color: '#F90021',
      text: 'white',
      sections: [
        {
          title: "Causes possibles",
          blocks: [
            { type: "paragraph", text: "Le TDA/H est lié à plusieurs facteurs :" },
            {
              type: "list", items:
                [
                  "des facteurs génétiques",
                  "des facteurs neurobiologiques",
                  "des facteurs environnementaux"
                ]
            }
          ]
        },
        {
          title: "Conséquences possibles",
          blocks: [
            { type: "paragraph", text: "Le TDA/H peut entraîner :" },
            {
              type: "list", items:
                [
                  "des difficultés scolaires",
                  "des problèmes relationnels",
                  "une baisse de l’estime de soi",
                  "de l’anxiété ou des troubles du sommeil"
                ]
            }
          ]
        }
      ]

    },
    {
      key: "Prise en charge",
      color: '#EFD010',
      text: 'black',
      blocks: [
        { type: "paragraph", text: "L’accompagnement peut inclure :" },
        {
          type: "list", items:
            [
              "thérapies comportementales",
              "aide à la gestion des émotions",
              "aménagements scolaires",
              "guidance parentale",
              "parfois un traitement médical",
              "thérapie gestion du tda"
            ]
        }
      ]
    },
    {
      key: "Conseils au quotidien",
      color: '#ff7043',
      text: 'white',
      blocks: [
        {
          type: "list", items:
            [
              "Mettre en place des routines",
              "Donner des consignes simples",
              "Utiliser des supports visuels",
              "Valoriser les efforts de l’enfant",
              "Prévoir des pauses régulières"
            ]
        }
      ]
    },
    {
      key: "A retenir",
      color: '#9c27b0',
      text: 'white',
      blocks: [
        { type: "paragraph", text: "Le TDA/H n’est ni un caprice ni un manque d’éducation." },
        { type: "paragraph", text: "Avec un accompagnement adapté, les enfants et adultes avec un TDA/H peuvent progresser, apprendre et réussir pleinement." }
      ]
    }
  ],
  dys: [
    {
      key: "Qu’est-ce qu’un trouble Dys ?",
      color: '#87ceeb',
      text: '#0f3d5a',
      blocks: [
        { type: "paragraph", text: "Les troubles “Dys” sont des troubles du neurodéveloppement qui affectent certaines capacités d’apprentissage chez l’enfant ou l’adulte, malgré une intelligence normale." },
        { type: "paragraph", text: "Ils peuvent toucher :" },
        {
          type: "list", items:
            [
              "la lecture ;",
              "l’écriture ;",
              "le calcul ;",
              "le langage ;",
              "la coordination des gestes ;",
              "l’attention."
            ]
        },
        { type: "paragraph", text: "Chaque enfant est différent et peut présenter un ou plusieurs troubles Dys." },
      ]
    },
    {
      key: "Les principaux troubles Dys",
      color: '#27ae60',
      text: 'white',
      sections: [
        {
          title: "Dyslexie",
          blocks: [
            { type: "paragraph", text: "Trouble de la lecture." },
            { type: "paragraph", text: "L’enfant lit lentement, confond certaines lettres ou syllabes et a des difficultés à comprendre un texte." }
          ]
        },
        {
          title: "Dysorthographie",
          blocks: [
            { type: "paragraph", text: "Trouble de l’orthographe." },
            { type: "paragraph", text: "L’enfant fait beaucoup de fautes, oublie des lettres ou confond certains sons, même après apprentissage." }
          ]
        },
        {
          title: "Dyscalculie",
          blocks: [
            { type: "paragraph", text: "Trouble des mathématiques." },
            { type: "paragraph", text: "L’enfant a des difficultés avec les nombres, les calculs, les tables ou les problèmes." }
          ]
        },
        {
          title: "Dyspraxie",
          blocks: [
            { type: "paragraph", text: "Trouble de la coordination des gestes." },
            { type: "paragraph", text: "L’enfant peut être maladroit, avoir du mal à écrire, s’habiller ou utiliser certains objets." }
          ]
        },
        {
          title: "Dysphasie",
          blocks: [
            { type: "paragraph", text: "Trouble du langage oral." },
            { type: "paragraph", text: "L’enfant a des difficultés à parler, construire ses phrases ou comprendre le langage." }
          ]
        },
        {
          title: "Dysgraphie",
          blocks: [
            { type: "paragraph", text: "Trouble de l’écriture." },
            { type: "paragraph", text: "L’écriture est lente, fatigante et difficile à lire." }
          ]
        }
      ]
    },
    {
      key: "Autres troubles souvent associés",
      color: '#F90021',
      text: 'white',
      sections: [
        {
          title: "Trouble de l’attention (TDA/H)",
          blocks: [
            { type: "paragraph", text: "Difficultés d’attention, impulsivité et parfois hyperactivité." }
          ]
        },
        {
          title: "TSA (Autisme)",
          blocks: [
            { type: "paragraph", text: "Difficultés dans les interactions sociales, la communication et comportements répétitifs." }
          ]
        },
      ]
    },
    {
      key: "À retenir",
      color: '#EFD010',
      text: 'black',
      blocks: [
        { type: "paragraph", text: "Les troubles Dys ne sont ni un manque d’intelligence ni un manque d’effort." },
        { type: "paragraph", text: "Avec un accompagnement adapté, des outils et de la bienveillance, les enfants peuvent progresser et réussir pleinement." }
      ]
    }
  ],
  autres: [
    {
      key: "Syndrome d’Asperger",
      color: '#87ceeb',
      text: '#0f3d5a',
      blocks: [
        { type: "paragraph", text: "Le syndrome d’Asperger fait partie des troubles du spectre de l’autisme (TSA). Les personnes concernées ont souvent des difficultés dans les relations sociales et la compréhension des codes sociaux, mais possèdent généralement une intelligence normale voire élevée." }
      ]
    },
    {
      key: "Syndrome de Rett",
      color: '#27ae60',
      text: 'white',
      blocks: [
        { type: "paragraph", text: "Le syndrome de Rett est un trouble génétique rare qui touche principalement les filles. Après un développement normal, l’enfant perd progressivement certaines capacités motrices, langagières et cognitives." }
      ]
    },
    {
      key: "Syndrome de Gilles de la Tourette",
      color: '#F90021',
      text: 'white',
      blocks: [
        { type: "paragraph", text: "Ce trouble neurologique se caractérise par des tics moteurs et vocaux involontaires apparaissant durant l’enfance. Les tics peuvent varier en fréquence et en intensité." }
      ]
    },
    {
      key: "Syndrome de l’X fragile",
      color: '#EFD010',
      text: 'black',
      blocks: [
        { type: "paragraph", text: "Le syndrome de l’X fragile est une maladie génétique liée au chromosome X. Il peut entraîner des difficultés intellectuelles, des troubles du langage, de l’attention et parfois des traits autistiques." }
      ]
    },
    {
      key: "Troubles désintégratifs de l’enfance",
      color: '#ff7043',
      text: 'white',
      blocks: [
        { type: "paragraph", text: "Ce trouble rare se caractérise par une perte importante des acquis après plusieurs années de développement normal, notamment dans le langage, les interactions sociales et la motricité." }
      ]
    },
    {
      key: "A retenir",
      color: '#9c27b0',
      text: 'white',
      blocks: [
        { type: "paragraph", text: "Chaque trouble est différent et chaque enfant possède ses propres capacités et besoins." },
        { type: "paragraph", text: "Un repérage précoce, un accompagnement adapté et un environnement bienveillant sont essentiels pour favoriser le développement et l’épanouissement de l’enfant." }
      ]
    }
  ]
};

export const revalidate = 3600;

export default function ComprendrePage(): React.JSX.Element {
  return (
    <div style={{ paddingTop: 72 }}>
      <section style={{ background: '#0792dc', padding: '64px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 80% 0%, rgba(255,255,255,0.1) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ display: 'block' }}>
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48Z" fill="white" />
          </svg>
        </div>
        <div className="mef-container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'white', fontFamily: 'var(--font-nunito)', fontSize: 48, fontWeight: 900, marginBottom: 12 }}>Comprendre</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, maxWidth: 520 }}>
            Tout pour mieux comprendre les troubles du neurodéveloppement
          </p>
        </div>
      </section>
      <section style={{ background: 'white', padding: '48px 0 80px' }}>
        <div className="mef-container">
          <TabSection tabs={tabs} content={content} accentColor="#0792dc" imageHeight={360} />
        </div>
      </section>
    </div>
  );
}
