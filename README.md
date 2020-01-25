# minesweeper-api
A node js REST API for a minesweeeper game
## Decisions taken
* It was decided to reserve one hour to build the client, so only four hours where used to build the API
* A data layer was implemented in the case that time was enough to apply persistence
* Some features are implemented in the API but not in the client, like the ability for users to resume a previous game
* The client can be found on this repository: https://github.com/hlogran/minesweeper-client
* The game can be played at: https://festive-thompson-76989f.netlify.com/

## Important notes
Implemented features:
* Design and implement  a documented RESTful API for the game (think of a mobile app for your API)
* Implement an API client library for the API designed above. Ideally, in a different language, of your preference, to the one used for the API
* When a cell with no adjacent mines is revealed, all adjacent squares will be revealed (and repeat)
* Detect when game is over
* Ability to start a new game and preserve/resume the old ones
* Ability to select the game parameters: number of rows, columns, and mines

## API documentation
### CREATE A NEW GAME
Starts a new game and returns its information

* **URL**

  /games

* **Method:**

  `POST`
    
* **Data Params**

   **Optional:**
 
   `rows=[integer]`

   `cols=[integer]`
   
   `bombs=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
   "id":"03258b70-3fc9-11ea-af7f-81c5ad2ed232",
   "rows":2,
   "cols":2,
   "bombs":1,
   "cells":[
      {
         "row":0,
         "col":0,
         "hidden":true,
         "hasBomb":false,
         "state":"HIDDEN",
         "adjacentBombs":1
      },
      {
         "row":0,
         "col":1,
         "hidden":true,
         "hasBomb":true,
         "state":"HIDDEN",
         "adjacentBombs":0
      },
      {
         "row":1,
         "col":0,
         "hidden":true,
         "hasBomb":false,
         "state":"HIDDEN",
         "adjacentBombs":1
      },
      {
         "row":1,
         "col":1,
         "hidden":true,
         "hasBomb":false,
         "state":"HIDDEN",
         "adjacentBombs":1
      }
   ],
   "state":"UNINITIALIZED"
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Number of [rows/cols/bombs] not valid" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/games",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
### REVEAL A CELL
Reveals the content of a single cell

* **URL**

  /games/:gameId/cells/:cellId/reveal

* **Method:**

  `POST`
    
* **URL Params**

   **Required:**
 
   `gameId=[UUID]`

   `cellId=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
   "id":"03258b70-3fc9-11ea-af7f-81c5ad2ed232",
   "rows":2,
   "cols":2,
   "bombs":1,
   "cells":[
      {
         "row":0,
         "col":0,
         "hidden":true,
         "hasBomb":false,
         "state":"HIDDEN",
         "adjacentBombs":1
      },
      {
         "row":0,
         "col":1,
         "hidden":true,
         "hasBomb":true,
         "state":"HIDDEN",
         "adjacentBombs":0
      },
      {
         "row":1,
         "col":0,
         "hidden":true,
         "hasBomb":false,
         "state":"HIDDEN",
         "adjacentBombs":1
      },
      {
         "row":1,
         "col":1,
         "hidden":true,
         "hasBomb":false,
         "state":"HIDDEN",
         "adjacentBombs":1
      }
   ],
   "state":"UNINITIALIZED"
}`
 
* **Error Response:**

  * **Code:** 404 BAD REQUEST <br />
    **Content:** `{ error : "[game/cell] not found" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/games/03258b70-3fc9-11ea-af7f-81c5ad2ed232/cells/2/reveal",
      dataType: "json",
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
### RETRIEVE AN EXISTING GAME
Returns the information of a given game

* **URL**

  /games/:gameId

* **Method:**

  `GET`
    
* **URL Params**

   **Required:**
 
   `gameId=[UUID]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
   "id":"03258b70-3fc9-11ea-af7f-81c5ad2ed232",
   "rows":2,
   "cols":2,
   "bombs":1,
   "cells":[
      {
         "row":0,
         "col":0,
         "hidden":true,
         "hasBomb":false,
         "state":"HIDDEN",
         "adjacentBombs":1
      },
      {
         "row":0,
         "col":1,
         "hidden":true,
         "hasBomb":true,
         "state":"HIDDEN",
         "adjacentBombs":0
      },
      {
         "row":1,
         "col":0,
         "hidden":true,
         "hasBomb":false,
         "state":"HIDDEN",
         "adjacentBombs":1
      },
      {
         "row":1,
         "col":1,
         "hidden":true,
         "hasBomb":false,
         "state":"HIDDEN",
         "adjacentBombs":1
      }
   ],
   "state":"UNINITIALIZED"
}`
 
* **Error Response:**

  * **Code:** 404 BAD REQUEST <br />
    **Content:** `{ error : "game not found" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/games/03258b70-3fc9-11ea-af7f-81c5ad2ed232",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
