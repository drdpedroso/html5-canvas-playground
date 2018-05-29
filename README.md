# html5-canvas-playground

### Live sample
https://drdpedroso.github.io/html5-canvas-playground

## How to:
The project is quite simple:
 - Click on 3 spots inside the light blue area (that's the canvas)
 - Click a fourth time anywhere to place 2 shapes (a parallelogram and a circle, both with the same center of mass and area)
 - Feel free to move the points around the screen :)
 - You can also reset what you did by clicking the red scary button lol
 - Start over again!

## Project Approach
For the last couple of weeks, I've been studying functional programming. I saw this test as a good possibility
to experiment something with that paradigm.

#### Architecture
The code is divided into two parts, one made of fully pure functions and the other with impure functions. 
That's means (in this particular case) that the first part it's not going to deal with any kind of interaction with the canvas or de DOM, for example, it will
only work receiving data and return a new one. Same input = Same output. The second half its totally related to printing,
painting and creating elements on the DOM (that's the impure part of it).

I found this work structure very clean and easy to maintain and debug (having bugs? look at the "dirty" part of your code)
and also very fun to write :)

Inside `index.js` you can find a simple `Flux Architecture` implementation (similar to React) using a general `state`
that's used by your impure functions. Also, the code is fully commented to explain what I was thinking when I wrote it.

The style it's very simple (I focused more on the JavaScript part), but I made a simple `BEM` structure inside `styles/index.css`.
Was my first time using it, since I'm not using CSS as-is for quite a time haha (the style in JS it's coming in hot)

Also wrote some tests for the pure functions as an example of how easy they are to test.

#### Tests
I wrote some tests using `Jest`, but, since the test requirements asked to be simple to open it in a regular browser,
you need to `export` the pure functions before running the tests because I'm not using modules :(
