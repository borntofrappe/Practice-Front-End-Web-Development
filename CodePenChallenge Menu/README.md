Link to the working pen right [here](https://codepen.io/borntofrappe/full/qKLLjG/).

# The task 

The purpose of this project is the creation of an entry for the weekly #codepenchallenge. Build a menu out of the provided HTML structure.

```HTML
<nav class="menu">
  <ol>
    <li class="menu-item"><a href="#0">Home</a></li>
    <li class="menu-item"><a href="#0">About</a></li>
    <li class="menu-item">
      <a href="#0">Widgets</a>
      <ol class="sub-menu">
        <li class="menu-item"><a href="#0">Big Widgets</a></li>
        <li class="menu-item"><a href="#0">Bigger Widgets</a></li>
        <li class="menu-item"><a href="#0">Huge Widgets</a></li>
      </ol>
    </li>
    <li class="menu-item">
      <a href="#0">Kabobs</a>
      <ol class="sub-menu">
        <li class="menu-item"><a href="#0">Shishkabobs</a></li>
        <li class="menu-item"><a href="#0">BBQ kabobs</a></li>
        <li class="menu-item"><a href="#0">Summer kabobs</a></li>
      </ol>
    </li>
    <li class="menu-item"><a href="#0">Contact</a></li>
  </ol>
</nav>
```

# My Take

For the weekly #codepenchallenge I had a couple of ideas. This is the one I finally chose.

Show through several cards the options regarding the first level of the menu. Hide the nested, sub-menus.

As the page loads, show these cards as cells of a grid. Show them as cells of a grid randomly positioned in an arbitrary number of columns and rows. Leave empty spaces, but avoid keeping two cells from having the same position.

As the visitor interacts with one of the high-level options, the cell should be flipped, hiding the respective text and showing the additional menu.

Update: as the project's design was indeed a little bare, I spent some time picking a nice color palette, as well as including appropriate column and row sizes, to always display the content. This even at the price of having cells displayed as rectangles instead of squares. I also chose to include a couple of SVG icons, as background in the middle of each cell. 

While far from being the most delightful, pleasant menu, I do consider it rather neat. Especially from the development side, as it allowed me to tinker with grid and variables alike. I am rather fond of the random positioning of the initial cells, even if most people not reading the code won't actually know about it.