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
- step 0:
  - install Meteor and test locally (TODO: link toevoegen naar meteor of anders de stappen)
  - follow the instructions and run it.
  - change some things in the code and see what happens
- step 1: setup the Tic tac toe project
  - copy the content of the css in the css file generated in your folder
  - you can rename the template in your `.html` file, for example `<template name="gameboard"></template>` instead of the `hello` template
  - begin with `<div class="gameboard"></div>` in this template(Now you should see a nice green schoolboard)
  - you can add `<div class="box"></div>` into the `gameboard` div
  - The js code is not doing a lot. Server and Client part(TODO: Link to it) The most part we will do today will be on the client.
  - There are event and helper function for every template that is made in the html. The hello template is not there anymore. Change the functions so that the new templates are used.
  - read about template events in [the documentation](http://docs.meteor.com/#/full/template_events)
  - Tip: with F12 you can open the developers tools of your browser. And if you use console.log (TODO: Link to console.log) in the js file you can print to the console.
  - try to display something in the browser's console by `console.log()` (You can then open the browser's console by right clicking on the page and selecting `Inspect` - it looks like this) ![console](https://developer.chrome.com/devtools/docs/console-files/log-element.png)
- step 2: display the grid (3 x 3)
  - there is only one box on our gameboard. For tictactoe we need 9 of them. But we don't want to write 9 divs in our code.
  - you probably want to use a loop in order to create a scalable application, like this:
  ```javascript
  for(var i = 0; i < CellsCount; i++){}
    ```
  - And you need a place to store all the boxes. You can use for example, [Mongo Collection](http://docs.meteor.com/#/full/mongo_collection)
  - you can follow the steps explained in [Meteor tutorial](https://www.meteor.com/tutorials/blaze/templates). Instead of tasks from the tutorial, we want to make boxes
  - You would want to update the collection only once
  - make sure you register this collection in the server part of the code. Can you predict / test what happens if you register the collection on the client side?
  - Create a new template 'box' which should be included in the gameboard.
  - use css classname `class="box"` for each box to take advantage of the provided styling (tictactoe.css)
  - now try to display the box's index in the console; to do this, you need the special object of javascript called `this`
- step 3
  - register the click event on a box element by using an event handler for its template
  - the notation is `{ key: value }`
  - note about `this` which is always related to the context of where you are at this moment. Read more about `this` on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- step 4
  - display a value in the box
  - set the player on the `Session` [Session](http://docs.meteor.com/#/full/session). Make sure you have the player initialized on the Session
  - Session is independent of templates or events and it has to live in the Client
  - when the player is set on the session you can also use it in other templates
  - Note that method within template is not directly available for template events, so you would want to make a separate helper function
  - Note that the property of one template is not directly available for other templates
  - You would want to use methods of the Meteor Collection `.update()` to set a property on an item and `.findOne()` to retrieve an item with the property
  - a way to retrieve a property is `Object.property` or `Object['property']`
- step 5
  - change the current Player between 'X' and 'O' every time you click in a box
  - only add a symbol to a box if it is empty (link to if statements in js)
  - after you added a symbol to a box switch the player
  - Determine whose turn it is (current player symbol)?
  - (optional) display some nice icon instead of X or O
- step 6 disable clicking if box already filled
  - if statements can also be used in the html {{#if true}} {{/if}}
  - use this to show that it is not allowed to add a new symbol into a filled box.
  - `disabled` is a class already defined in the css file. You can put this class on a box.  
- step 7: determine game rules (when do we have 3 in a row)
  - using a Meteor Collection?
  - using a [plain javascript Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)?
  - using a [two-dimensional javascript Array](http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript)?
  - using a [javascript object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)?
  - any other nice way?
  - check every time a new symbol is added if there is a winning state
  - put the winner on the session, so that other parts of the code can also know that there is a winner
  - Log if there is a winner
- step 8: Display gamestatus
  - Display the winner above the board
  - also make sure that you cannot add a symbol anymore when there is a winner
- step 9: reset button
  - add a button add the bottom of the gameboard which clears the board
-step 10 (optional): multiplayer game
  - allow 2 users to join the game using [Meteor Users](http://docs.meteor.com/#/full/meteor_user)
  - tip: you might want to begin using the `Meteor.isServer()` block
  - assign a symbol to each user (X or O)
  - whose turn is it now?
