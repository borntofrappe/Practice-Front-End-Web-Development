// export the slides 
// the slides are built as an array of objects, with different content defined in different fields
export const slides  = [
  {
    title: 'React.js',
    subtitle: 'Exploring the popular library'
  },
  {
    header: 'What is it',
    text: [
      'React is a JavaScript library which allows to easily build web applications.'
    ]
  },
  {
    header: 'Setup',
    text: [
      'Browsers are not equipped to directly include React.js.',
      'The easiest way to get started is with the create-react-app utility'
    ]
  },
  {
    header: 'create-react-app',
    code: [
      'npm install -g create-react-app',
      'create-react-app nameofproject',
      'cd nameofproject',
      'npm start'
    ]
  },
  {
    header: 'Project structure',
    text: [
      'package.json: the packages currently being used.',
      'public: the manifest, index file and icon.',
      'src: the script and stylesheet files.'
    ]
  },
  {
    header: 'Components',
    text: [
      'Everyting in React is a component.',
      'In the create-react-app utility you can immediately find index.js and App.js.',
      'For any feature of the project, create a new JavaScript file.'
    ]
  },
  {
    header: 'Well...',
    text: [
      'This was meant to be a short demo, mostly to practice with React.js.',
      'Good job in getting so far :)'
    ]
  }
];

