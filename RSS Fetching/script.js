const URL = 'https://podcast.freecodecamp.org/rss';
const containerEpisodes = document.querySelector('.episodes');

// function called to display the RSS information in the DOM
const extractRSSFeed = (text) => {
  // DOMParser allows to retrieve the HTML structure from the RSS feed text (which is written in XML)
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'application/xml');

  // information for the different episodes is stored in a <item> element
  const items = doc.querySelectorAll('item');
  /* relevant information is found under
    <title>
    <pubDate>
    <enclosure> for the audio, and right next to it, <itunes:duration>

    display the title atop the date and next to this date the duration
  */
  const markup = [...items].map((item, index) => {
    const { textContent: title } = item.querySelector('title');
    const { textContent: pubDate } = item.querySelector('pubDate');
    // for the date create a new date object as to easily format the lengthy text with the method .toDateString()
    const date = new Date(pubDate);
    // for the duration the element follows the <enclosure> element
    const { textContent: time } = item.querySelector('enclosure').nextElementSibling;

    // separate the seconds, minutes and hours
    // ! hours might be undefined given that for some items the podcast lasts less then an hour
    const timeComponents = time.split(':');
    const [, minutes, hours] = timeComponents.reverse();

    // compute the total minutes
    const totalMinutes = (hours) ? parseInt(hours, 10) * 60 + parseInt(minutes, 10) : parseInt(minutes, 10);

    // for each subsequent item add an increasing delay
    return `
      <div class="episode" style="animation-delay: ${0.05 * index + 0.5}s;">
        <h3>${title}</h3>
        <div class="episode__details">
          <p>
            ${date.toDateString()}
          </p>
          <p>
            ${totalMinutes} mins
          </p>
        </div>
      </div>`;
  }).join('');

  // append the detailed block in the selected continer
  containerEpisodes.innerHTML = markup;
};

// fetch the information from the defined URL and call the function passing the content returned as a string
fetch(URL)
  .then(response => response.text())
  .then(text => extractRSSFeed(text));
