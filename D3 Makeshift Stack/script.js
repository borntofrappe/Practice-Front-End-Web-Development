/* globals d3 */
const juice = {
  tomato: [
    {
      country: 'France',
      value: 12602202
    },
    {
      country: 'Germany',
      value: 37737490
    },
    {
      country: 'Italy',
      value: 55450103
    },
    {
      country: 'United Kingdom',
      value: 10985990
    },
    {
      country: 'Denmark',
      value: 758389
    },
    {
      country: 'Spain',
      value: 5162755
    },
    {
      country: 'Finland',
      value: 826341
    },
    {
      country: 'Estonia',
      value: 2724000
    },
    {
      country: 'Lithuania',
      value: 1933060
    },
    {
      country: 'Poland',
      value: 37317700
    },
    {
      country: 'Hungary',
      value: 3023000
    }
  ],
  orange: [
    {
      country: 'Italy',
      value: 25444368
    },
    {
      country: 'Denmark',
      value: 13724
    },
    {
      country: 'Greece',
      value: 9186143
    },
    {
      country: 'Portugal',
      value: 853092
    },
    {
      country: 'Spain',
      value: 59633491
    },
    {
      country: 'Finland',
      value: 150888
    },
    {
      country: 'Estonia',
      value: 45000
    },
    {
      country: 'Lithuania',
      value: 42449
    }
  ],
  grapefruit: [
    {
      country: 'France',
      value: 24512558
    },
    {
      country: 'Germany',
      value: 28152251
    },
    {
      country: 'Italy',
      value: 12385441
    },
    {
      country: 'United Kingdom',
      value: 5296699
    },
    {
      country: 'Denmark',
      value: 1991881
    },
    {
      country: 'Greece',
      value: 422614
    },
    {
      country: 'Spain',
      value: 4542927
    },
    {
      country: 'Belgium',
      value: 5808779
    },
    {
      country: 'Austria',
      value: 2276487
    },
    {
      country: 'Poland',
      value: 5072100
    },
    {
      country: 'Slovakia',
      value: 162499
    }
  ],
  pineapple: [
    {
      country: 'France',
      value: 39866613
    },
    {
      country: 'Germany',
      value: 24109398
    },
    {
      country: 'Italy',
      value: 46082242
    },
    {
      country: 'Denmark',
      value: 725179
    },
    {
      country: 'Portugal',
      value: 179183
    },
    {
      country: 'Spain',
      value: 52316599
    },
    {
      country: 'Belgium',
      value: 3100365
    },
    {
      country: 'Finland',
      value: 3457947
    },
    {
      country: 'Austria',
      value: 5014809
    },
    {
      country: 'Estonia',
      value: 29000
    },
    {
      country: 'Poland',
      value: 78400
    },
    {
      country: 'Slovakia',
      value: 440058
    },
    {
      country: 'Bulgaria',
      value: 2619864
    },
    {
      country: 'Croatia',
      value: 865600
    }
  ],
  grape: [
    {
      country: 'France',
      value: 25473315
    },
    {
      country: 'Germany',
      value: 57310272
    },
    {
      country: 'Italy',
      value: 432063478
    },
    {
      country: 'Denmark',
      value: 59509
    },
    {
      country: 'Spain',
      value: 590427729
    },
    {
      country: 'Austria',
      value: 3213351
    },
    {
      country: 'Lithuania',
      value: 10477
    },
    {
      country: 'Hungary',
      value: 15000
    }
  ],
  apple: [
    {
      country: 'France',
      value: 144621040
    },
    {
      country: 'Netherlands',
      value: 29162000
    },
    {
      country: 'Germany',
      value: 789358223
    },
    {
      country: 'Italy',
      value: 63289255
    },
    {
      country: 'United Kingdom',
      value: 172579988
    },
    {
      country: 'Denmark',
      value: 31094484
    },
    {
      country: 'Greece',
      value: 2121356
    },
    {
      country: 'Portugal',
      value: 10117688
    },
    {
      country: 'Spain',
      value: 103475432
    },
    {
      country: 'Belgium',
      value: 33416943
    },
    {
      country: 'Norway',
      value: 28736438
    },
    {
      country: 'Sweden',
      value: 21772900
    },
    {
      country: 'Finland',
      value: 14893319
    },
    {
      country: 'Austria',
      value: 75844387
    },
    {
      country: 'Estonia',
      value: 1783000
    },
    {
      country: 'Lithuania',
      value: 8011002
    },
    {
      country: 'Poland',
      value: 436067800
    },
    {
      country: 'Hungary',
      value: 62624000
    },
    {
      country: 'Romania',
      value: 7015724
    },
    {
      country: 'Bulgaria',
      value: 6950592
    },
    {
      country: 'Slovenia',
      value: 5938800
    },
    {
      country: 'Croatia',
      value: 792700
    }
  ]
};

const colors = {
  tomato: 'e83a30',
  orange: 'ee8f66',
  grapefruit: 'ee66aa',
  pineapple: 'eee966',
  grape: 'a866ee',
  apple: 'ee6d66',
};

// introductory HTML elements
const container = d3
  .select('.container');

container
  .append('h1')
  .text('🍅🍊🍒 Juice 🍍🍇🍎');

container
  .append('p')
  .text('The european countries squeezing the most');

// tooltip
const tooltip = container
  .append('div')
  .attr('id', 'tooltip');

// select element to change the displayed data
const containerSelect = container
  .append('select');

containerSelect
  .selectAll('option')
  .data(Object.keys(juice))
  .enter()
  .append('option')
  .attr('value', d => d)
  .text(d => d);

// SVG container
const margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50,
};
const width = 500 - (margin.left + margin.right);
const height = 700 - (margin.top + margin.bottom);


const containerFrame = container
  .append('svg')
  .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// clip path to give the resemblance of a simple glass
const clip = containerFrame
  .append('clipPath')
  .attr('id', 'clip');

clip
  .append('path')
  .attr('d', `M 0 0 h ${width} L ${width * 7 / 8} ${height}  H ${width / 8}Z`);

containerFrame
  .attr('clip-path', 'url(#clip)');

// function drawing the stacked rectangles based on an array of data and a color value
function drawGlass(data, color) {
  // sort the array of data from biggest to smallest value
  // consider only the first 5 observations
  const sortedData = data.sort((a, b) => ((a.value > b.value) ? -1 : 1)).slice(0, 5);
  // compute the total for the linear scale
  const total = sortedData.reduce((acc, curr) => acc + curr.value, 0);

  // build an array to emulate a stack, adding an origin property based on the values of the previous observation
  // 0 for the first
  const stackData = [];
  for (let i = 0; i < sortedData.length; i += 1) {
    if (i !== 0) {
      stackData.push(Object.assign(sortedData[i], { origin: sortedData[i - 1].value + sortedData[i - 1].origin }));
    } else {
      stackData.push(Object.assign(sortedData[i], { origin: 0 }));
    }
  }

  // linear scale
  const yScale = d3
    .scaleLinear()
    .domain([0, total])
    .range([0, height]);

  // divide the update (read: existing elements) from the enter (read: new elements) selection
  const update = containerFrame
    .selectAll('rect');

  const enter = update
    .data(stackData)
    .enter();

  // when drawing the elements introduce them as a flowing from the top
  enter
    .append('rect')
    .attr('x', 0)
    .attr('y', d => yScale(d.origin))
    .attr('width', width)
    .transition()
    .duration(100)
    .delay((d, i) => i * 100)
    .ease(d3.easeLinear)
    .attr('height', d => yScale(d.value))
    .attr('fill', `#${color}`)
    .attr('opacity', (d, i) => {
      // first one opacity 1, then in decrements according to the number of observations
      const { length } = stackData;
      return 1 - (1 / length) * i;
    });

  // when updating the visualization, transition the properties which change with the same pattern
  update
    .transition()
    .duration(100)
    .delay((d, i) => i * 100)
    .ease(d3.easeLinear)
    .attr('y', d => yScale(d.origin))
    .attr('height', d => yScale(d.value))
    .attr('fill', `#${color}`)
    .attr('opacity', (d, i) => {
      const { length } = stackData;
      return 1 - (1 / length) * i;
    });

  // select all rectangle elements and show connected information in the tooltip
  d3.selectAll('rect')
    .on('mouseenter', (d) => {
      const format = d3.format(',');
      tooltip
        .append('p')
        .text(`Country: ${d.country}`);

      tooltip
        .append('p')
        .text(`Quantity Produced: ${format(d.value)}L`);

      tooltip
        .style('opacity', 1)
        .style('left', `${d3.event.pageX}px`)
        .style('top', `${d3.event.pageY}px`);
    })
    .on('mouseout', () => {
      tooltip
        .style('opacity', 0)
        .selectAll('p')
        .remove();
    });
}

// immediately call the function for the first selected option
drawGlass(juice.tomato, colors.tomato);

// target the select element and when changing its value call the function to alter the displayed data
containerSelect
  .on('input', () => {
    const { value } = d3.event.target;
    drawGlass(juice[value], colors[value]);
  });
