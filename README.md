# tictactoe
## GirlCode meets Meteor workshop

## Installation
### Windows
Download the official Meteor installer: https://install.meteor.com/windows

### OS X or Linux
Install the latest official Meteor release from your terminal:
``` sh
$ curl https://install.meteor.com/ | sh
```

Once Meteor is installed, run the following code in your Terminal:
```sh
$ mkdir Projects
$ cd Projects
$ meteor create tictactoe
```

The, run the project from your terminal:
``` sh
$ cd tictactoe
$ meteor
```

You can test the app at `http://localhost:3000`

Now, open your favorite text editor (for example, [Atom](https://atom.io/)) where you can edit your project.

In order to see the nice font as we used in the demo, add the following rule in your `.html` file:
```html
<link href="https://fonts.googleapis.com/css?family=Amatic+SC:700" rel="stylesheet" type="text/css">
```

## Workshop steps
- step 0: install Meteor and test locally
- step 1: setup the Tic tac toe project
  - you can rename the template in your `.html` file, for example `<template name="gameboard"></template>` instead of the `hello` template
  - begin with `<div class="gameboard"></div>` (Now you should see a nice green schoolboard)
  - you can add `<div class="box"></div>` into the `.gameboard` in your template
- step 2: display the grid (3 x 3) 
    - you can use for example, [Meteor Collection](http://docs.meteor.com/#/full/mongo_collection)
    - you can follow the steps explained in [Meteor tutorial](https://www.meteor.com/tutorials/blaze/templates). Instead of tasks from the tutorial, we want to make boxes
    - you probably want to use a loop in order to create a scalable application, like this: 
    ```javascript
    for(var i = 0; i < CellsCount; i++){}
    ```
    - use css classname `.box` for each cell to take advantage of the provided styling (tictactoe.css)
- step 3
  - register the click event to a cell
- step 4  
  - display X or O depending on the current player symbol using [Session](http://docs.meteor.com/#/full/session) variable (is there any other nice way?)
  - whose turn is it now (current player symbol)?
  - (optional) display some nice icon instead of X or O
- step 4: determine game rules (when do we have 3 in a row)
  - using a Meteor Collection?
  - using a [plain javascript Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)?
  - using a [two-dimensional javascript Array](http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript)?
  - using a [javascript object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)?
  - any other nice way?
- step 5: game status
  - determine whether we have a winner on click cell using the defined rules from step 4
  - game finished in a draw (all cells filled but no winner)
  - display game status
  - implement a reset button
- step 6 (optional): multiplayer game
  - allow 2 users to join the game using [Meteor Users](http://docs.meteor.com/#/full/meteor_user)
  - tip: you might want to begin using the `Meteor.isServer()` block
  - assign a symbol to each user (X or O)
  - whose turn is it now?
