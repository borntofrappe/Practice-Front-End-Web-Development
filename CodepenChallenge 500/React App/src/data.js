// detail the data in an array of objects
// each object nests a heading and an array for the description (each item will be a new paragraph)
const data = [
    {
        id: 0,
        heading: '500 Internal Server Error',
        description: [
            'We can\'t handle that, but do not fret.',
            'We have collected additional information and are working on it.'
        ]
    },
    {
        id: 1,
        heading: '501 Not Implemented',
        description: [
            'We do not support such a request, but thanks for your interest.',
            'We\'ll review adding such a feature.'
        ]
    },
    {
        id: 2,
        heading: '502 Bad Gateway',
        description: [
            'Good server, bad response.',
            'It might be an external server, but we are covering the situation.'
        ]
    },
    {
        id: 3,
        heading: '503 Service Unavailable',
        description: [
            'We blew a fuse, or are working as to repair one.',
            'Either way, we are sorry for the interruption and we\'ll be back soon.'
        ]
    },
    {
        id: 4,
        heading: '504 Gateway Timeout',
        description: [
            'We might have been a tad too hasty, but a server is taking too long to answer back.',
            'We\'ll analyse the situation posthaste.'
        ]
    },
    {
        id: 5,
        heading: '505 HTTP Version Not Supported',
        description: [
            'We don\'t support such an HTTP version.',
            'Our support page has more information, but feel free to contact us.'
        ]
    },
    {
        id: 6,
        heading: '506 Variant also Negotiates',
        description: [
            'Somewhere, somehow there\'s a circular reference in our server.',
            'We\'ll isolate the source and fix the problem.'
        ]
    },
    {
        id: 7,
        heading: '507 Insufficient Storage',
        description: [
            'We don\'t really understand what happened.',
            'We have some internal issues, but also an expert helping us through it.'
        ]
    },
    {
        id: 8,
        heading: '508 Loop Detected',
        description: [
            'You have encountered an infinite loop.',
            'You have encountered an infinite loop.',
            'You have encountered an infinite loop.',
            'We are working on it.'
        ]
    },
    {
        id: 9,
        heading: '509 Server Error',
        description: [
            '509?',
            '\nWe\'ll, that\'s a new one.',
            'We have however contacted the webmaster and luckily she likes riddles.'
        ]
    },
    {
        id: 10,
        heading: '510 Not Extended',
        description: [
            'We might need more information to handle such a request.',
            'We\'ll consider reducing requirements for future instances, but for now we need a couple more details'
        ]
    },
    {
        id: 11,
        heading: '511 Network Authentication Required',
        description: [
            'It seems you lost access to the server.',
            'If the problem persist fire off an email to support, they\'ll answer without delay.'
        ]
    }
];

export default data;