// detail in an array one object for each question
/** object structure
   * id,
   * question,
   * answers (array of objects itself),
   * correctAnswer,
   * explanation
 * 
 * answers' objects structure
  * choice,
  * value
 */
let data = [
  {
    id: 0,
    question: 'What causes a runny nose when it is cold?',
    answers: [
      {
        choice: 0,
        value: 'A disease'
      },
      {
        choice: 1,
        value: 'The cold'
      },
      {
        choice: 2,
        value: 'Gravity'
      }
    ],
    correctAnswer: 1,
    explanation: 'If you don\'t have a cold, it is mostly the cold which is at blame. A runny nose is caused by water produced from a phenomenon of condensation; this water forms itself between the outside and the body and not inside of this last one. It is the same phenomenon which explains mist, that is to say water in the form of very fine droplets in suspension, which escapes the mouth when one it outside, or again the creation of clouds.'
  },
  {
    id: 1,
    question: 'Is it necessary to eat more when it is cold?',
    answers: [
      {
        choice: 0,
        value: 'Yes'
      },
      {
        choice: 1,
        value: 'No'
      }
    ],
    correctAnswer: 1,
    explanation: 'Eating healthy is essential especially in this period of the year since a bad alimentation can cause tiredness, itself reinforced in this period of the year for the poor brightness. On the other hand, eating too much tires the organism and causes difficult digestion. There is however no link between alimentation and risk of infection, except cleary for people undernourished.'
  },
  {
    id: 2,
    question: 'Does skin hair retain warmth?',
    answers: [
      {
        choice: 0,
        value: 'Yes'
      },
      {
        choice: 1,
        value: 'No'
      }
    ],
    correctAnswer: 0,
    explanation: 'Skin hair plays an important role in the heating of the body. Indeed, a miniscule muscle is attached at the base of every hair. The contraction from these muscles in case of chill generates a heat capable of increasing the temperature of the body by a small amount, explains the site of the Health-Insurance. It is what we describe with the phenomenon of goosebumbs: the hair stands up, the skin is covered by small bumbs, it\'s a pilomotor reflex. For context, the sollicited muscle is called the arrector pili.'
  },
  {
    id: 3,
    question: 'Christmas on the balcony, Easter by the fire?',
    answers: [
      {
        choice: 0,
        value: 'Yes'
      },
      {
        choice: 1,
        value: 'No'
      }
    ],
    correctAnswer: 1,
    explanation: 'According to the data from Meteo France, the correlation does not exist between unusually soft temperatures on the 25th of December and chill temperatures for the following Easter (the date of which varies every year). Over a century, it is possible to observe this opposite relation on three occasions.'
  },
  {
    id: 4,
    question: 'Does the perceived temperature matters?',
    answers: [
      {
        choice: 0,
        value: 'Yes'
      },
      {
        choice: 1,
        value: 'No'
      },
      {
        choice: 2,
        value: 'Depends for whom'
      }
    ],
    correctAnswer: 2,
    explanation: 'The perceived temperature considers the feeling of the wind on the skin; it is systematically lower than the temperature in Celsius degrees. With this index, we reach equivalent measures in the order of -20°C. This notion has more value in Canada or the United States, where the temperature can reach below -40°C. In France, the measure was introduced in the measurement by Meteo France at the beginning of the years 2000, to raise awareness for those categories of the population with increasing exposition to the cold, like for homeless people.'
  },
  {
    id: 5,
    question: 'A small glass helps warming up, right?',
    answers: [
      {
        choice: 0,
        value: 'Yes'
      },
      {
        choice: 1,
        value: 'No'
      }
    ],
    correctAnswer: 1,
    explanation: 'Alcohol causes the dilation of blood verssels on the surface of the body and blood circulates then closer to the epidermis. It is what brings heat on the surface of the skin and the sensation of warming up. Except from this dilation, it causes mostly a loss of warmth for the drinker: the temperature of teh body diminishes about half a degre for every 50 grams of alcohol. The sansation of warmth disappear once the blood vessels are no longer dilated.'
  },
  {
    id: 6,
    question: 'Does the cold temperature causes diseases?',
    answers: [
      {
        choice: 0,
        value: 'Mostly yes'
      },
      {
        choice: 1,
        value: 'Mostly no'
      }
    ],
    correctAnswer: 1,
    explanation: 'If it alters our immune system (the inhalation of cold air causes a cooling of the mucus of the upper respiratory tract) viruses prolong their \'life expectancy\', since they benefit from the lowering of temperature and brightness. On the other hand, it is the tendency toward the concentration of the population in spaces confined and poorly ventilated to increase the risk of cross infection.'
  },
  {
    id: 7,
    question: 'Can vitamines help against infections?',
    answers: [
      {
        choice: 0,
        value: 'Yes'
      },
      {
        choice: 1,
        value: 'No'
      }
    ],
    correctAnswer: 1,
    explanation: '"There isn\'t any scientific study which really justifies the assumption of food supplements - outside of specific medical indications (iron or folate for women, vitamin D for children, adolescents and elderly for instance)" assured Serge Herberg, specialist on nutritional immunology. As regards the famous vitamin C, qhich allows to fight against the cold, strong doses adminstered for curative purposes following the appearance of symptoms do not demonstrate any constant effect on the duration or the gravity of the symptoms.'
  },
  {
    id: 8,
    question: 'Are there more deaths in winter?',
    answers: [
      {
        choice: 0,
        value: 'Yes'
      },
      {
        choice: 1,
        value: 'No'
      }
    ],
    correctAnswer: 0,
    explanation: 'From the data compiled by the INSEE on the last forty years, January is the most "deadly" month of the year in mainland France. The number of deaths registered is 15% higher than the yearly average. When the ambient temperature is sufficiently lower to cause a decrease in body temperature below 37°C, it is possible to observe vasoconstriction (a constriction of blood vessels), which can cause vascular accidents touching the brain or the heart.'
  },
  {
    id: 9,
    question: 'Are roads more dangerous in winter?',
    answers: [
      {
        choice: 0,
        value: 'Yes'
      },
      {
        choice: 1,
        value: 'No'
      },
      {
        choice: 2,
        value: 'Yes and no'
      }
    ],
    correctAnswer: 2,
    explanation: 'Winter time increases the periods of darkness between peak hours, hours where road users are more numerous and more tired, causing increasing accidents for pedestrians on at dawn (between 8 and 10am) and at dusk (between 5 and 9pm). On the other hand, mortal accidents on the road are less numerous for drivers, which reach a peak in summer.'
  },
  {
    id: 10,
    question: 'Are leaves in autum "dead"?',
    answers: [
      {
        choice: 0,
        value: 'Yes'
      },
      {
        choice: 1,
        value: 'No'
      }
    ],
    correctAnswer: 1,
    explanation: 'As natural light decreases, chlorophyll fades, and the green with it. This change prefaces an approaching end, anticipating the fall of a leaf, but it is above all the sign of a reflex of a surviving plant. It acts as a defense mechanism against insects, which decide, with the arrival of winter, to go repairing themselves in the warmth of a tree trunk. This last one, which needs to save its resouces, renders itself the least attractive possible. It "brings back" the amino acides (which attract insects), contained in the leaves from the branches toward the trunk to reinforce this part of the tree during the winter.'
  },
  {
    id: 11,
    question: 'Are snowflakes unique in shape?',
    answers: [
      {
        choice: 0,
        value: 'Yes'
      },
      {
        choice: 1,
        value: 'No'
      }
    ],
    correctAnswer: 1,
    explanation: 'If the shape of the snowflake approaches the one of a start, it is not possible to determine a single model. All depends on the temperature: between 0° and 4°, snowflakes resembles hexagonal prisms, and between -4° and -6° it assumes more the look of a needle.'
  },
  {
    id: 12,
    question: 'Is snow white?',
    answers: [
      {
        choice: 0,
        value: 'Yes'
      },
      {
        choice: 1,
        value: 'No'
      }
    ],
    correctAnswer: 1,
    explanation: 'Snow is seemingly white because it reflects light instead of absorbing it. It is the same phenomenon for clouds. It reality, it is transparent. As the snow reflects around 95% of visible solar rays, it is possible to obtain a white light which is actually a mix of the different colors of the light spectrum.'
  }
];

// create a function which returns true or false depending on chance
const fiftyFifty = () => Math.random() > 0.5;
// randomize the data for the position of the answers
data.forEach(question => question.answers.sort(() => (fiftyFifty()) ? 1 : -1));
// randomize the data for the position of the questions
data = data.sort(() => (fiftyFifty()) ? 1 : -1);

// export the now-randomized data
export default data;
