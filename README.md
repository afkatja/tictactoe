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

In order to see the nice font as we used in the demo, add the following rule in the `<head>` of your `html` file:
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
    - you can use for example, [Mongo Collection](http://docs.meteor.com/#/full/mongo_collection)
    - you can follow the steps explained in [Meteor tutorial](https://www.meteor.com/tutorials/blaze/templates). Instead of tasks from the tutorial, we want to make boxes
    - you probably want to use a loop in order to create a scalable application, like this:
    ```javascript
    for(var i = 0; i < CellsCount; i++){}
    ```
    - You would want to update the collection only once
    - make sure you register this collection in the server part of the code. Can you predict / test what happens if you register the collection on the client side?
    - use css classname `.box` for each cell to take advantage of the provided styling (tictactoe.css)
- step 3
  - register the click event on a box element by using an event handler for its template
  - read about template events in [the documentation](http://docs.meteor.com/#/full/template_events)
  - the notation is `{ key: value }`
  - try to display something in the browser's console by `console.log()` (You can then open the browser's console by right clicking on the page and selecting `Inspect` - it looks like this) ![console](https://developer.chrome.com/devtools/docs/console-files/log-element.png)
  - now try to display the box's index in the console; to do this, you need the special object of javascript called `this`
  - note about `this` which is always related to the context of where you are at this moment. Read more about `this` on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- step 4
  - display a value in the box
  - Note that method within template is not directly available for template events, so you would want to make a separate helper function
  - Note that the property of one template is not directly available for other templates
  - You would want to use methods of the Meteor Collection `.update()` to set a property on an item and `.findOne()` to retrieve an item with the property
  - a way to retrieve a property is `Object.property` or `Object['property']`
- step 5
  - display X or O depending on the current player symbol using [Session](http://docs.meteor.com/#/full/session) variable
  - Session is independent of templates or events and it has to live in the Client
  - Determine whose turn is it now (current player symbol)?
  - (optional) display some nice icon instead of X or O
- step 6: determine game rules (when do we have 3 in a row)
  - using a Meteor Collection?
  - using a [plain javascript Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)?
  - using a [two-dimensional javascript Array](http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript)?
  - using a [javascript object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)?
  - any other nice way?
- step 7: game status
  - determine whether we have a winner on click cell using the defined rules from step 4
  - game finished in a draw (all cells filled but no winner)
  - display game status
  - implement a reset button
- step 8 (optional): multiplayer game
  - allow 2 users to join the game using [Meteor Users](http://docs.meteor.com/#/full/meteor_user)
  - tip: you might want to begin using the `Meteor.isServer()` block
  - assign a symbol to each user (X or O)
  - whose turn is it now?
