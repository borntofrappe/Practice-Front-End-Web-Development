# D3 Makeshift Stack

Link to the working pen right [here](https://codepen.io/borntofrappe/pen/vQbjGJ).

## Preface

Starting from [this dataset](http://appsso.eurostat.ec.europa.eu/nui/show.do?query=BOOKMARK_DS-066341_QID_1B1BBC04_UID_-3F171EB0&layout=INDICATORS,C,X,0;DECL,L,Y,0;PRCCODE,B,Z,0;PERIOD,L,Z,1;&zSelection=DS-066341PRCCODE,10521000;DS-066341PERIOD,201752;&rankName1=PRCCODE_1_0_-1_2&rankName2=PERIOD_1_0_0_0&rankName3=INDICATORS_1_2_0_0&rankName4=DECL_1_0_0_1&sortR=ASC_1&rStp=&cStp=&rDCh=&cDCh=&rDM=true&cDM=true&footnes=false&empty=false&wai=false&time_mode=ROLLING&time_most_recent=false&lang=EN&cfo=%23%23%23%2C%23%23%23.%23%23%23) I got a change to tinker with D3 and JavaScript while building a simple visualization.

Among the labels I choose those related to juice, be it orange, tomato, apple juice, and a selection of european countries. By using a clip path and altering the opacity of each successive rectangle I then created a simple stacked structure.

Instead of using `d3.stack()` I ended up rolling my own solution. I never considered the particular layout function to be that helpful, but I assume it relates more to my own deficiency than a problem with the library.
