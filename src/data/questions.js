const questions = [
  {
    question: "How would you rate the graphics of this game?",
    answers: {
      a: { text: "Excellent", quantifier: 5 },
      b: { text: "Good", quantifier: 4 },
      c: { text: "Fair or average", quantifier: 3 },
      d: { text: "Poor", quantifier: 2 },
      e: { text: "Horrible", quantifier: 1 },
    },
  },
  {
    question: "What is your favorite feature of this game?",
    answers: {
      a: { text: "Storyline" },
      b: { text: "Graphics" },
      c: { text: "Gameplay" },
      d: { text: "Multiplayer" },
      e: { text: "Soundtrack" },
    },
  },
  {
    question: "How would you rate the difficulty level of this game?",
    answers: {
      a: { text: "Too easy" },
      b: { text: "Easy" },
      c: { text: "Just right" },
      d: { text: "Hard" },
      e: { text: "Too hard" },
    },
  },
  {
    question: "How would you rate the replay value of this game?",
    answers: {
      a: { text: "Excellent", quantifier: 5 },
      b: { text: "Good", quantifier: 4 },
      c: { text: "Average", quantifier: 3 },
      d: { text: "Poor", quantifier: 2 },
      e: { text: "None", quantifier: 1 },
    },
  },
  {
    question: "What platform do you primarily play this game on?",
    answers: {
      a: { text: "PC" },
      b: { text: "PlayStation" },
      c: { text: "Xbox" },
      d: { text: "Nintendo" },
      e: { text: "Mobile" },
    },
  },
  {
    question: "How would you describe the game's soundtrack?",
    answers: {
      a: { text: "Amazing", quantifier: 5 },
      b: { text: "Good", quantifier: 4 },
      c: { text: "Average", quantifier: 3 },
      d: { text: "Bad", quantifier: 2 },
      e: { text: "Terrible", quantifier: 1 },
    },
  },
  {
    question: "Would you recommend this game to a friend?",
    answers: {
      a: { text: "Definitely", quantifier: 5 },
      b: { text: "Probably", quantifier: 4 },
      c: { text: "Not sure", quantifier: 3 },
      d: { text: "Probably not", quantifier: 2 },
      e: { text: "Definitely not", quantifier: 1 },
    },
  },
];

export { questions };
