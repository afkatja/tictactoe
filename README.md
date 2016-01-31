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

Once Meteor is installed, run the following code in your Terminal (for mac or Linux users) or the command prompt (for Windows users):
```sh
$ mkdir Projects
$ cd Projects
$ meteor create tictactoe
```

Then, run the project from your terminal / command prompt:
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
  - install Meteor and create a new project called tictactoe
  - look at the files that are generated and chang some things to see what happens in the browser
- step 1: setup the Tic tac toe project
  - copy the content of the css in the css file generated in your folder
  - a new project will include three new files: <project-name>.html, <project-name>.css and <project-name>.js
  - Notice that you don't have to update your browser. Meteor does that for you automagically
  - you can rename the template in your `.html` file, for example `<template name="gameboard"></template>` instead of the `hello` template
  - begin with `<div class="gameboard"></div>` in this template(Now you should see a nice green schoolboard)
  - you can add `<div class="box"></div>` into the `gameboard` div
- step 2: create a Boxes collection
  - there is only one box on our gameboard. For tictactoe we need 9 of them. But we don't want to write 9 divs in our code.
  - you probably want to use a loop in order to create a scalable application, like this:
  ```javascript
  for(var i = 0; i < Boxes.find().count(); i++){}
    ```
  - In the js code create a Mongo collection as it is described [here](http://docs.meteor.com/#/full/mongo_collection).
  - In the server code you can fill the collection. Add an object with a boxIndex to it. (code snippet)
  - we add it to the server code so that it is only exectud once.
  - log to console everytime you add a new item into the collection.
  - TIP: try to display something in the browser's console by `console.log()` (You can then open the browser's console by right clicking on the page and selecting `Inspect` - it looks like this) ![console](https://developer.chrome.com/devtools/docs/console-files/log-element.png)
step 3: link the Box collection to the html
  - create a box template and include it into the gamboard template just like the gameboard is included into the body of the html
  - wrap the box into a {{# each boxes}} function to loop over the boxes
  - see the task example given on the meteor page [task tutorial - templates](https://www.meteor.com/tutorials/blaze/templates) to get an idea how to do that
  - in the js code add a helper function 'boxes' which should return the whole boxes collection Boxes.find({}) will do the trick
  - In the collection step of the [task tutorial - collections](https://www.meteor.com/tutorials/blaze/collections) you can see how a function is added to the template helpers
  - can you display the index of a box in the box itself?
- step 4: Register the click event
  - register the click event on a box element by using the template events
  - read about template events in [the documentation](http://docs.meteor.com/#/full/template_events)
  - log to the console which box you have clicked
  - you can access a box whitin the template events easily with the this command
  - note about `this` which is always related to the context of where you are at this moment. Read more about `this` on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- step 5: Display an x when you click on it
  - display an 'X' in the box
  - set the player on the `Session` [Session](http://docs.meteor.com/#/full/session). Set the player to 'X'
  - Session is independent of templates or events and it has to live in the Client
  - when the player is set on the session you can also use it in other templates
  - Note that method within template is not directly available for template events, so you would want to make a separate helper function
  - Note that the property of one template is not directly available for other templates
  - You would want to use methods of the Meteor Collection `.update()` to set a property on an item and `.findOne()` to retrieve an item with the property
  - a way to retrieve a property is `Object.property` or `Object['property']`
- step 6: Switch between 'X' and 'O'
  - change the current Player between 'X' and 'O' every time you click in a box
  - only add a symbol to a box if it is empty (link to if statements in js)
  - after you added a symbol to a box switch the player
  - Determine whose turn it is (current player symbol)?
  - (optional) display some nice icon instead of X or O
- step 7: Disable clicking if box already filled
  - if statements can also be used in the html {{#if true}} {{/if}}
  - use this to show that it is not allowed to add a new symbol into a filled box.
  - `disabled` is a class already defined in the css file. You can put this class on a box.  
- step 8: determine game rules (when do we have 3 in a row)
  - using a Meteor Collection?
  - using a [plain javascript Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)?
  - using a [two-dimensional javascript Array](http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript)?
  - using a [javascript object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)?
  - any other nice way?
  - check every time a new symbol is added if there is a winning state
  - put the winner on the session, so that other parts of the code can also know that there is a winner
  - Log if there is a winner
- step 9: Display gamestatus
  - Display the winner above the board
  - also make sure that you cannot add a symbol anymore when there is a winner
- step 10: reset button
  - add a button add the bottom of the gameboard which clears the board
-step 11 (optional): multiplayer game
  - use a timeout to reset the game
  - allow 2 users to join the game using [Meteor Users](http://docs.meteor.com/#/full/meteor_user)
  - tip: you might want to begin using the `Meteor.isServer()` block
  - assign a symbol to each user (X or O)
  - whose turn is it now?
