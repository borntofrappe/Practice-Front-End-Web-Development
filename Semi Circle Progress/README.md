Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/full/yKrqMe).

# Preface 

The purpose of this project is to create a simple HTML + CSS solution, while leveraging two additional tools in my workflow: Git and Stylus. They have different purposes, but they are incorporated into a single project in order to be efficient.

For the project itself, the goal is to create a progress bar which is actually represented by the outline of a semi-circle instead of a straight line. Inspired by [Artboard.studio](https://artboard.studio).

# Plan

- [x] create the outline of a semi circle
- [x] figure out which values are to be modified as to move 
- [x] animate progress changing these values.

Bonus points: animate progress with a range input, which visitors can manouver left and right to change the displayed progress.


# Lessons Learned

## Progress Bar

To create the desired progress bar, replicating the outline of a semi-circle, a bit of CSS trickery is applied to an empty `div` container.

Indeed the way the progress bar and its animation are achieved leverage pseudo-elements and `background` properties including linear gradients made of solid colors. 

The idea is to overlap circles of different width one on top of another, apply a solid linear gradient which matches the background of the page for half of the circle and have the container rotate to introduce the differently-colored portion of the solid.

It may sound cumbersome, but in the code it should appear much cleaner, especially with the bounty of comments included.

## Stylus

Stylus is a node based CSS pre-processor based on removing stuff. Think of curly braces, think of semicolons, think of removing them all from your stylesheet.

**Installation**

To use stylus, you need to first install its package. To install its package, you need to first install node.

1. Install [node](https://nodejs.org/en/)
1. Install [stylus](http://stylus-lang.com/)

    ```
    $ npm install stylus -g
    ```

Once done, *stylus* is available to use.

**Extension.styls**

To work with stylus syntax, simply create a file with the `.styls` extension.

A couple of notes in this regard:

- the code editor may not highlight the stylus syntax as clearly as it would with CSS. 

    You can install a package/extension to easily fix this nuisance.

- once you write your stylesheet, you need to compile the file to a browser-compliant CSS file.

    You can compile one file at a time, or even watch a file for changes, with command line tools.

    ```
    stylus -w style.styl
    ```

    The stylus package will henceforth compile the selected file to a CSS file with the same name, and with CSS property-value pairs which can be easily read from the HTML document.

**Stylus Syntax**

The project in question is small in weight and importance, but makes use of several stylus essentials. 

- braces and semicolons are removed. The minimalistic structure that remains is based solely on the indentation of selectors and properties.

    The following snippet gives an idea of how stylus stereotypically works:

    ```
    *
        box-sizing border-box
        margin 0
        padding 0
    ```

    It may look strange at first, especially with media queries, but it does present a much cleaner structure

- it is possible to style nested HTML elements simply by nesting CSS selectors, just like with SASS/SCSS. Once again this nested structure is solely based on indentation.

    In this snippet, an element of `input` which is a child of the `.container` class is targeted.

    ```
    .container
        // include properties for .container
    
        input 
            // include properties for .container input
    ```

- the parent element can be referred to with an ampersand sign &.

    ```
    .container
        // include properties for .container
    
        &:after
            // include properties for .container:after
    ```


- it is possible to build variables, defined at the top of the document and used repeatedly all across the stylesheet.

    Define a variable first (remember to "assign" a value to the variable with an equal sign):

    ```
    primary-color = #ee0000
    ```

    And then use it at will:

    ```
    border primary-color 2px solid
    ```

## Git 

Git is easily and already included in the VSCode editor. The third button from the top of the left sidebar indeed offers the option to source control.

From this panel, it is possible to leverage git-related commands. For the project in question, a simple workflow has allowed to conclude the project easily and with the simple use of few commands, but for larger instances, additional attention might be required to the tool.

**Initialize repository**

The button right next to source control allows to pick and choose which repository is the subject of tracking.

**Add files**

In order for files and their modification to be tracked you need to add them (+) to the staging area and commit them with a message.

**Modify files**

After all the required files are committed, you can then modify them as needed to create the features/ progress wanted.

For every modified file you'll notice that VSCode prompts you with a notification regarding the number of altered files.

**Add to staging area**

You can add modifications to the staging area much alike you added files to Git the first time around.

**Commit changes**

To commit changes you can specify a commit message, select the tick icon (v) or the chosen shortcut (ctrl+enter). This will clear any outstanding notification in the source control panel.

**Branches**

While so far you have managed your workflow in a main, master branch, you can create separate version of the folder to develop further/separate features. (you can check the current branch in the left section of bottom bar).

Opening the *action menu* in VSCode (under View -> Command Palette or with the shortcut ctrl-shift-p) will provide with the miajority of the instructions hereby defined. Just type Git + the commands here specified.

- create branch: create a branch separate from the master. This can also be achieved by clicking on the branch in the left section of the bottom bar. Just type the name of the new branch and create it by pressing enter.

- merge branch: from the branch which you want to inherit changes, merge the branch with the new modified files. 

- delete brach: if changes are merged, or you just want to delete the branch, select the branch to be deleted, through the same-name command.

**Terminal**

VSCode provides with easy integration with Git, but any and all actions here specified can be achieved through command line instructions. 
