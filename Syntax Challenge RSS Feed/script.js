const URL = 'https://feed.syntax.fm/rss';

// the duration is found between the <itunes:duration> tags
function extractDuration(body) {
  // find the tags for the duration (String.match returns an array of results)
  const regexDuration = /<itunes:duration>(\d+)(:\d+)+?<\/itunes:duration>/g;
  const matchesDuration = body.match(regexDuration);
  // map through the array of results and extract the hours/minutes/seconds (removing the colons)
  const matchesDurationTime = matchesDuration.map(matchDuration => matchDuration.match(/\d+/g));

  // declare variables used to compute the total
  let secondsTotal = 0;
  let minutesTotal = 0;
  let hoursTotal = 0;

  // loop through the array of hours/minutes/seconds
  // ! some show are less than 1 hour long
  for (let i = 0; i < matchesDurationTime.length; i += 1) {
    // destructure the seconds, minutes and hours (since some array have 2 items, reverse the array first, as to access the values in a crescendo)
    const matchesDurationTimeReverse = matchesDurationTime[i].reverse();
    const [seconds, minutes, hours] = matchesDurationTimeReverse;

    // increase the total by the newfound values
    secondsTotal += parseInt(seconds, 10);
    minutesTotal += parseInt(minutes, 10);
    // hours might be undefined (and it is for those show lasting less than an hour)
    hoursTotal += (hours) ? parseInt(hours, 10) : 0;
  }

  // since seconds and minutes undoubtedly stretch past the 60 mark, add minutes and hours accordingly
  while (secondsTotal >= 60) {
    secondsTotal -= 60;
    minutesTotal += 1;
  }
  while (minutesTotal >= 60) {
    minutesTotal -= 60;
    hoursTotal += 1;
  }

  // append to the body a heading in which the hours and total are shown side by side
  // ! minutes and seconds might provide one digit values, resulting in a rather annoying asymmetry
  // simply prepend a 0 in such instances
  document.documentElement.innerHTML += `
    <h2>
      ${hoursTotal}
      :
      ${(minutesTotal >= 10) ? minutesTotal : `0${minutesTotal}`}
      :
      ${(secondsTotal >= 10) ? secondsTotal : `0${secondsTotal}`}
    </h2>`;
}

// retrieve the text from the RSS feed, call the function to extract the duration from said text
fetch(URL)
  .then(response => response.text())
  .then(text => extractDuration(text));
