<!-- Link to the work-in-progress pen right [here](). -->

## Preface

With this project I plan to pick up once more the data driven library and practice with a line chart. An area chart actually.

This inspired by an article @lemondefr and using data from the French institute referenced in the article itself.

The article itself: an article on [French births, in and out of marriage](https://www.lemonde.fr/les-decodeurs/article/2018/09/04/six-enfants-sur-dix-naissent-hors-mariage-en-france-un-record-en-europe_5350153_4355770.html).

The data: handily provided by [INSEE](https://www.insee.fr/fr/statistiques/3599508?pk_campaign=avis-parution).

## Data

As briefly mentioned, the data relates to the number of children born in France, from 1901 to recent years, in and out of marriage.

The data is easily sorted in columns displaying the year, total number of births, births from married couples, births from unmarried couples and percentage of this last value. I realize how this last value might actually be superfluous, as it is easily retrieved from the other measurements.

|Année|Nombre de naissances|Dans le mariage|Hors mariage|Part des naissances hors mariage (en %)|
|---|---|---|---|---|
|1901|917,075|836,891|80,184|8.7|
|1902|904,434|824,916|79,518|8.8|
|1903|884,498|806,481|78,017|8.8|
|1904|877,091|799,923|77,168|8.8|
|1905|865,604|788,677|76,927|8.9|
|1906|864,745|788,528|76,217|8.8|
|1907|829,632|753,079|76,553|9.2|
|1908|848,982|773,277|75,705|8.9|
|1909|824,739|752,147|72,592|8.8|
|1910|828,140|756,278|71,862|8.7|
|1911|793,506|724,061|69,445|8.8|
|1912|801,642|731,576|70,066|8.7|
|1913|795,851|725,654|70,197|8.8|
|1914|757,931|693,429|64,502|8.5|
|1915|482,968|428,859|54,109|11.2|
|1916|384,676|331,710|52,966|13.8|
|1917|412,744|354,064|58,680|14.2|
|1918|472,816|407,436|65,380|13.8|
|1919|506,960|439,649|67,311|13.3|
|1920|838,137|754,844|83,293|9.9|
|1921|816,555|742,927|73,628|9.0|
|1922|764,373|698,421|65,952|8.6|
|1923|765,888|699,306|66,582|8.7|
|1924|757,873|693,165|64,708|8.5|
|1925|774,455|707,876|66,579|8.6|
|1926|771,690|706,452|65,238|8.5|
|1927|748,102|685,284|62,818|8.4|
|1928|753,570|690,173|63,397|8.4|
|1929|734,140|672,585|61,555|8.4|
|1930|754,020|691,304|62,716|8.3|
|1931|737,611|678,936|58,675|8.0|
|1932|726,299|669,723|56,576|7.8|
|1933|682,394|631,176|51,218|7.5|
|1934|681,518|632,324|49,194|7.2|
|1935|643,870|598,701|45,169|7.0|
|1936|634,344|592,946|41,398|6.5|
|1937|621,453|581,050|40,403|6.5|
|1938|615,582|576,828|38,754|6.3|
|1939|615,599|576,839|38,760|6.3|
|1940|561,281|521,143|40,138|7.2|
|1941|522,261|480,092|42,169|8.1|
|1942|575,261|530,911|44,350|7.7|
|1943|615,780|567,109|48,671|7.9|
|1944|629,878|570,611|59,267|9.4|
|1945|645,899|578,023|67,876|10.5|
|1946|843,904|770,629|73,275|8.7|
|1947|870,472|804,060|66,412|7.6|
|1948|870,836|807,649|63,187|7.3|
|1949|872,661|811,636|61,025|7.0|
|1950|862,310|801,880|60,430|7.0|
|1951|826,722|770,126|56,596|6.8|
|1952|822,204|766,713|55,491|6.7|
|1953|804,696|750,982|53,714|6.7|
|1954|810,754|757,284|53,470|6.6|
|1955|805,917|754,308|51,609|6.4|
|1956|806,916|755,707|51,209|6.3|
|1957|816,467|766,005|50,462|6.2|
|1958|812,215|762,306|49,909|6.1|
|1959|829,249|778,452|50,797|6.1|
|1960|819,819|770,043|49,776|6.1|
|1961|838,633|788,958|49,675|5.9|
|1962|832,353|783,030|49,323|5.9|
|1963|868,876|817,504|51,372|5.9|
|1964|877,804|825,853|51,951|5.9|
|1965|865,688|814,479|51,209|5.9|
|1966|863,527|812,005|51,522|6.0|
|1967|840,568|788,834|51,734|6.2|
|1968|835,796|782,431|53,365|6.4|
|1969|842,245|787,380|54,865|6.5|
|1970|850,381|792,227|58,154|6.8|
|1971|881,284|819,224|62,060|7.0|
|1972|877,506|811,345|66,161|7.5|
|1973|857,186|786,972|70,214|8.2|
|1974|801,218|733,460|67,758|8.5|
|1975|745,065|681,636|63,429|8.5|
|1976|720,395|658,926|61,469|8.5|
|1977|744,744|679,346|65,398|8.8|
|1978|737,062|667,841|69,221|9.4|
|1979|757,354|679,521|77,833|10.3|
|1980|800,376|709,261|91,115|11.4|
|1981|805,483|703,337|102,146|12.7|
|1982|797,223|683,825|113,398|14.2|
|1983|748,525|629,674|118,851|15.9|
|1984|759,939|624,674|135,265|17.8|
|1985|768,431|617,939|150,492|19.6|
|1986|778,468|607,786|170,682|21.9|
|1987|767,828|582,902|184,926|24.1|
|1988|771,268|568,202|203,066|26.3|
|1989|765,473|549,410|216,063|28.2|
|1990|762,407|533,300|229,107|30.1|
|1991|759,056|517,428|241,628|31.8|
|1992|743,658|496,791|246,867|33.2|
|1993|711,610|463,279|248,331|34.9|
|1994|710,993|454,340|256,653|36.1|
|1995|729,609|455,399|274,210|37.6|
|1996|734,338|448,824|285,514|38.9|
|1997|726,768|435,920|290,848|40.0|
|1998|738,080|437,534|300,546|40.7|
|1999|744,791|433,905|310,886|41.7|
|2000|774,782|444,667|330,115|42.6|
|2001|770,945|433,938|337,007|43.7|
|2002|761,630|424,508|337,122|44.3|
|2003|761,464|417,246|344,218|45.2|
|2004|767,816|411,490|356,326|46.4|
|2005|774,355|407,561|366,794|47.4|
|2006|796,896|402,348|394,548|49.5|
|2007|785,985|387,207|398,778|50.7|
|2008|796,044|384,994|411,050|51.6|
|2009|793,420|374,018|419,402|52.9|
|2010|802,224|368,063|434,161|54.1|
|2011|792,996|356,906|436,090|55.0|
|2012|790,290|349,103|441,187|55.8|
|2013|781,621|341,005|440,616|56.4|
|2014|781,167|332,641|448,526|57.4|
|2015|760,421|320,147|440,274|57.9|
|2016|744,697|309,228|435,469|58.5|
|2017|730,242|301,988|428,254|58.6|


The horizontal axis ought to display the years, while the vertical axis the number of births. Two line charts with the area beneath the line should be displayed. The areas should be one on top of the other, and not overlap (one of the line chart starts where the other ends and continues based on its values).

Turning the markdown table into a readable JS data structure, into an array of objects each detailing the four (or five) values in appropriate properties. Something along the lines of

{
    year: 1900,
    total: 300,
    married: 150,
    unmarried: 150
}

By removing the last column, the commas delimiting the thousand mark and the vertical lines separating the columns, a regular express allows to easily turn the four numbers, laid each in a new line, into the desired object.

// target four lines each detailing one or more numbers
^(\d.+)\n(\d.+)\n(\d.+)\n(\d.+)\n$
// cast the four values as values of an object, with hard coded properties
{\n\tyear: $1,\n\ttotal: $2,\n\tmarried: $3,\n\tunmarried: $4\n}


From there, it is a simple matter of including a comma after each object (which can actually be incorporated in the regex) and the data structure is set up for D3.

## Design

The style of the project is took directly from a recent pen I created to practice with pie and bar charts. You can find it right [here](https://codepen.io/borntofrappe/full/MqpmPO).

Two colors are simply added for the two lines:

- yellow #FFC832
- blue #1890C8

With lighter variations for the area below each line.

## Layout

A first layout solution makes use of the line() and area() function, to plot two lines on the same chart. To display one line **atop** the other, meaning starting from the line and detailing its value from there, it is possible to simply augment the charted value by the other line's value, and have the other line overlayed on top of it. Basically, if a line has a value of x and the other of y, plot the latter on top of the former, which interprets a value of x + y.

```JS
// include a path element for the first line, based on an array of values which consider the married+unmarried value
svgContainer
    .append("path")
    .attr("class", "married")
    .attr("d", line(data.map((d) => d.married + d.unmarried)))
    .attr("fill", "none")
    .attr("stroke", "#FFC832")
    .attr("stroke-width", "2px");

// include a path element for the first line, based on an array of values which consider the unmarried value
svgContainer
    .append("path")
    .attr("class", "unmarried")
    .attr("d", line(data.map((d) => d.unmarried)))
    .attr("fill", "none")
    .attr("stroke", "#1890C8")
    .attr("stroke-width", "2px");
```

A possibly better solution makes use of the stack() function, to actually make good on the structure of a stacked chart.

A stack layout requires an object for each data point (which is luckily how the data is already structured).

The function details the **keys** used in the visualization through the chained `keys()` method.

```JS
const stack = d3
    .stack()
    .keys(["married", "unmarried"]);
```

The solidity of the function is easily tested by logging the data as passed through the layout function. The following:

```JS
console.log(stack(data));
```

In a rather lengthy array, it is possible to find two essential values for each data point, in the first and second values of an array. These detail the value of the data point, starting from the previous data point. For the first item for instance:

```JS
married[0] = 0;
married[1] = 836891;

unmarried[0] = 836891;
unmarried[1] = 917075;
```

_Please note_: the previous snippet isn't actually how the data is structured, but a simple rendition to cement the idea behind the stack layout. The latter key is literally stacked on the previous one.

With the newly formatted data, it is a simple matter of understanding the structure of the data and add elements accordingly.

```JS
// add a rectangle for each data point of the first array (the one carrying the values for the first key)
svgStacked
    .selectAll("rect.unmarried")
    .data(stack(data)[0])
    .enter()
    .append("rect")
    .attr("class", "unmarried")
    // each rectangle spans a portion of the width
    .attr("x", (d, i) => width/data.length*i)
    .attr("width", width/data.length)
    // each rectangle considers a height based on the difference between the items of the array (which each nest the starting/ending point of the stack)
    .attr("y", (d, i) => yScale(d[1]))
    .attr("height", (d, i) => yScale(d[0]) - yScale(d[1]))
    .attr("fill", "#FFC832");
```
