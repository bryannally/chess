function reset() {
  board = document.getElementById("board")
  board.innerHTML = ""
  // chess board boxes
  for (let i=8; i>=1; i--) {
    for (let j=97; j <= 104; j++) {
      letter = String.fromCharCode(j)
      newdiv = document.createElement("div")
      newdiv.setAttribute("id", `${letter}${i}`)
      newdiv.classList.add("box")
      board = document.getElementById("board")
      board.appendChild(newdiv)
      if ((i%2 == 0 && j%2 == 1) || (i%2 == 1 && j%2 == 0)) {
        newdiv.classList.add("tan")
      }
      else {
        newdiv.classList.add("dark")
      }
    }
  }

  // Chess pieces 
  //pawns
  for (let i = 0; i < 2; i++) {
    for (let j = 97; j <= 104; j++) {
      letter = String.fromCharCode(j)
      pawn = document.createElement("img")
      pawn.classList.add("piece")
      pawn.classList.add("pawn")
      pawn.classList.add("unselect")
      if (i == 0) {
        document.getElementById(`${letter}7`).appendChild(pawn)
        // pawn.classList.add(`p${letter}7`)
        pawn.src = "images/pawnb.jpg"
        pawn.classList.add("black")
      }
      else {
        document.getElementById(`${letter}2`).appendChild(pawn)
        // pawn.classList.add(`p${letter}2`)
        pawn.src = "images/pawnw.jpg"
        pawn.classList.add("white")
      }
    }
  }

  //knights
  for (let i = 0; i < 2; i++) {
    for (let j = 98; j <= 103; j+=5) {
      letter = String.fromCharCode(j)
      knight = document.createElement("img")
      knight.classList.add("piece")
      knight.classList.add("knight")
      knight.classList.add("unselect")
      if (i == 0) {
        document.getElementById(`${letter}8`).appendChild(knight)
        knight.src = "images/knightb.jpg"
        knight.classList.add("black")
      }
      else {
        document.getElementById(`${letter}1`).appendChild(knight)
        knight.src = "images/knightw.jpg"
        knight.classList.add("white")
    }
    }
  }

  //rooks
  for (let i = 0; i < 2; i++) {
    for (let j = 97; j <= 104; j+=7) {
      letter = String.fromCharCode(j)
      rook = document.createElement("img")
      rook.classList.add("piece")
      rook.classList.add("rook")
      rook.classList.add("unselect")
      if (i == 0) {
        document.getElementById(`${letter}8`).appendChild(rook)
        rook.src = "images/rookb.jpg"
        rook.classList.add("black")
      }
      else {
        document.getElementById(`${letter}1`).appendChild(rook)
        rook.src = "images/rookw.jpg"
        rook.classList.add("white")
    }
    }
  }

  //bishops
  for (let i = 0; i < 2; i++) {
    for (let j = 99; j <= 102; j+=3) {
      letter = String.fromCharCode(j)
      bishop = document.createElement("img")
      bishop.classList.add("piece")
      bishop.classList.add("bishop")
      bishop.classList.add("unselect")
      if (i == 0) {
        document.getElementById(`${letter}8`).appendChild(bishop)
        bishop.src = "images/bishopb.jpg"
        bishop.classList.add("black")
      }
      else {
        document.getElementById(`${letter}1`).appendChild(bishop)
        bishop.src = "images/bishopw.jpg"
        bishop.classList.add("white")
      }
    }
  }

  //queens
  for (let j = 100; j <= 101; j++) {
    letter = String.fromCharCode(100)
    queen = document.createElement("img")
    queen.classList.add("piece")
    queen.classList.add("queen")
    queen.classList.add("unselect")
    if (j == 100) {
      document.getElementById(`${letter}8`).appendChild(queen)
      queen.src = "images/queenb.jpg"
      queen.classList.add("black")
    }
    else {
      document.getElementById(`${letter}1`).appendChild(queen)
      queen.src = "images/queenw.jpg"
      queen.classList.add("white")
    }
  }

  //kings
  for (let j = 101; j <= 102; j++) {
    letter = String.fromCharCode(101)
    king = document.createElement("img")
    king.classList.add("piece")
    king.classList.add("king")
    king.classList.add("unselect")
    if (j == 101) {
      document.getElementById(`${letter}8`).appendChild(king)
      king.src = "images/kingb.jpg"
      king.classList.add("black")
    }
    else {
      document.getElementById(`${letter}1`).appendChild(king)
      king.src = "images/kingw.jpg"
      king.classList.add("white")
    }
  }

  piecemove = document.querySelectorAll(".piece")
  piecemove.forEach(piece => {
    piece.addEventListener("click", function(){
      findselect = item_selected()
      turn = document.getElementById("turn").classList[0]
      if (!findselect) {
        classes = Array.from(piece.classList)
        if (classes.includes(turn)) {
          piece.classList.remove("unselect")
          piece.setAttribute("id", "selected")
        }      
      }
      else {
        piece.classList.add("unselect")
        piece.removeAttribute("id", "selected")
      }
    })
  })

  //moves
  boxes = document.querySelectorAll(".box")
  boxes.forEach(box => {
    box.addEventListener("click", function() {
      findselect = item_selected()
      if (findselect) {
        classes = Array.from(findselect.classList)
        current = findselect.parentElement.id
      }
      else {
        classes = []
        current = ""
      }

      //determine new squares team color if it exists
      color = ""
      currcolor = ""
      if (box.children[0]) {
        npiece = Array.from(box.children[0].classList)
        if (npiece.includes("white")) {
          color = "white"
        }
        if (npiece.includes("black")) {
          color = "black"
        }
      }
      //determine current piece's color
      if (findselect) {
        cpiece = Array.from(findselect.classList)
        if (cpiece.includes("white")) {
          currcolor = "white"
        }
        if (cpiece.includes("black")) {
          currcolor = "black"
        }
      }
         
      // pawn moves
      if (classes.includes("pawn")) {
          if (classes.includes("black")) {
            if ((box.id[0] == current[0]) && (box.id[1] == (parseInt(current[1]) - 1)) && (box.innerHTML == "")) {
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
            if ((box.id[0] == current[0]) && (box.id[1] == (parseInt(current[1]) - 2)) && (box.innerHTML == "") && current[1] == "7") {
              if (document.getElementById(`${current[0]}6`).innerHTML == "") {
                box.innerHTML = ""
                box.appendChild(findselect)
                unselect_selected()
                change_turn()
              } 
            }
            if ((box.id.charCodeAt(0) == (current.charCodeAt(0) + 1) || (box.id.charCodeAt(0) == (current.charCodeAt(0) - 1))) && (box.id[1] == (parseInt(current[1]) - 1)) && (box.innerHTML != "") && (color != currcolor)) {
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
          }
          else {
            if ((box.id[0] == current[0]) && (box.id[1] == (parseInt(current[1]) + 1)) && (box.innerHTML == "")) {
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
            if ((box.id[0] == current[0]) && (box.id[1] == (parseInt(current[1]) + 2)) && (box.innerHTML == "") && current[1] == "2") {
              if (document.getElementById(`${current[0]}3`).innerHTML == "") {
                box.innerHTML = ""
                box.appendChild(findselect)
                unselect_selected()
                change_turn()
              } 
            }
            if((box.id.charCodeAt(0) == (current.charCodeAt(0) + 1) || (box.id.charCodeAt(0) == (current.charCodeAt(0) - 1))) && (box.id[1] == (parseInt(current[1]) + 1)) && (box.innerHTML != "") && (color != currcolor)) {
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
        }
      }
      // knight moves
      if (classes.includes("knight")) {
        if (color != currcolor) {
          if (((box.id.charCodeAt(0) == (current.charCodeAt(0) + 1) || (box.id.charCodeAt(0) == (current.charCodeAt(0) - 1))) && (box.id[1] == (parseInt(current[1]) + 2) || box.id[1] == (parseInt(current[1]) - 2))) || ((box.id.charCodeAt(0) == (current.charCodeAt(0) + 2) || (box.id.charCodeAt(0) == (current.charCodeAt(0) - 2))) && (box.id[1] == (parseInt(current[1]) + 1) || box.id[1] == (parseInt(current[1]) - 1))))  {  
            box.innerHTML = ""
            box.appendChild(findselect)
            unselect_selected()
            change_turn()
          }
        }
      }
      //rook moves
      if (classes.includes("rook")) {
        if (color != currcolor) {
          //vertical movement
          if(box.id[0] == current[0]) {
            blocked = false
            if (box.id[1] > current[1]) {
              for (let i = (parseInt(current[1]) + 1); i < box.id[1]; i++) {
                if (document.getElementById(`${box.id[0]}${i}`).innerHTML != "")
                  blocked = true
              }
            }
            if (box.id[1] < current[1]) {
              for (let i = (parseInt(current[1]) - 1); i > box.id[1]; i--) {
                if (document.getElementById(`${box.id[0]}${i}`).innerHTML != "")
                  blocked = true
              }
            }
            if (!blocked) { 
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
          }
          //horizontal movement
          if (box.id[1] == (parseInt(current[1]))) {
            blocked = false
            if (box.id.charCodeAt(0) > current.charCodeAt(0)) {
              for (let i = (current.charCodeAt(0) + 1); i < box.id.charCodeAt(0); i++) {
                if (document.getElementById(`${String.fromCharCode(i)}${current[1]}`).innerHTML != "")
                  blocked = true
              }
            }
            if (box.id.charCodeAt(0) < current.charCodeAt(0)) {
              for (let i = (current.charCodeAt(0) - 1); i > box.id.charCodeAt(0); i--) {
                if (document.getElementById(`${String.fromCharCode(i)}${current[1]}`).innerHTML != "")
                  blocked = true
              }
            }
            if (!blocked) {
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
          }
        }
      }
      //bishop moves
      if (classes.includes("bishop")){
        if (color != currcolor) {
          blocked = false
          row = parseInt(current[1])
          if ((box.id[1] > parseInt(current[1])) && (box.id.charCodeAt(0) > current.charCodeAt(0)) && ((box.id[1] - parseInt(current[1])) == (box.id.charCodeAt(0) - current.charCodeAt(0)))) {
            for (let i = (current.charCodeAt(0) + 1); i < box.id.charCodeAt(0); i++) {
              row += 1
              if (document.getElementById(`${String.fromCharCode(i)}${row}`).innerHTML != "") {
                blocked = true
              }
            }
            if (!blocked) {
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
          }
          if ((box.id[1] > parseInt(current[1])) && (box.id.charCodeAt(0) < current.charCodeAt(0)) && (-(box.id[1] - parseInt(current[1])) == (box.id.charCodeAt(0) - current.charCodeAt(0)))) {
            for (let i = (current.charCodeAt(0) - 1); i > box.id.charCodeAt(0); i--) {
              row += 1
              if (document.getElementById(`${String.fromCharCode(i)}${row}`).innerHTML != "") {
                blocked = true
              }
            }
            if (!blocked) {
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
          }
          if ((box.id[1] < parseInt(current[1])) && (box.id.charCodeAt(0) > current.charCodeAt(0)) && (-(box.id[1] - parseInt(current[1])) == (box.id.charCodeAt(0) - current.charCodeAt(0)))) {
            for (let i = (current.charCodeAt(0) + 1); i < box.id.charCodeAt(0); i++) {
              row -= 1
              if (document.getElementById(`${String.fromCharCode(i)}${row}`).innerHTML != "") {
                blocked = true
              }
            }
            if (!blocked) {
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
          }
          if ((box.id[1] < parseInt(current[1])) && (box.id.charCodeAt(0) < current.charCodeAt(0)) && ((box.id[1] - parseInt(current[1])) == (box.id.charCodeAt(0) - current.charCodeAt(0)))) {
            for (let i = (current.charCodeAt(0) - 1); i > box.id.charCodeAt(0); i--) {
              row -= 1
              if (document.getElementById(`${String.fromCharCode(i)}${row}`).innerHTML != "") {
                blocked = true
              }
            }
            if (!blocked) {
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
          }
        }
      }
      //queen moves
      if (classes.includes("queen")) {
        if (color != currcolor) {
          blocked = false
          row = parseInt(current[1])
          if ((box.id[1] > parseInt(current[1])) && (box.id.charCodeAt(0) > current.charCodeAt(0)) && ((box.id[1] - parseInt(current[1])) == (box.id.charCodeAt(0) - current.charCodeAt(0)))) {
            for (let i = (current.charCodeAt(0) + 1); i < box.id.charCodeAt(0); i++) {
              row += 1
              if (document.getElementById(`${String.fromCharCode(i)}${row}`).innerHTML != "") {
                blocked = true
              }
            }
            if (!blocked) {
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
          }
          if ((box.id[1] > parseInt(current[1])) && (box.id.charCodeAt(0) < current.charCodeAt(0)) && (-(box.id[1] - parseInt(current[1])) == (box.id.charCodeAt(0) - current.charCodeAt(0)))) {
            for (let i = (current.charCodeAt(0) - 1); i > box.id.charCodeAt(0); i--) {
              row += 1
              if (document.getElementById(`${String.fromCharCode(i)}${row}`).innerHTML != "") {
                blocked = true
              }
            }
            if (!blocked) {
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
          }
          if ((box.id[1] < parseInt(current[1])) && (box.id.charCodeAt(0) > current.charCodeAt(0)) && (-(box.id[1] - parseInt(current[1])) == (box.id.charCodeAt(0) - current.charCodeAt(0)))) {
            for (let i = (current.charCodeAt(0) + 1); i < box.id.charCodeAt(0); i++) {
              row -= 1
              if (document.getElementById(`${String.fromCharCode(i)}${row}`).innerHTML != "") {
                blocked = true
              }
            }
            if (!blocked) {
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
          }
          if ((box.id[1] < parseInt(current[1])) && (box.id.charCodeAt(0) < current.charCodeAt(0)) && ((box.id[1] - parseInt(current[1])) == (box.id.charCodeAt(0) - current.charCodeAt(0)))) {
            for (let i = (current.charCodeAt(0) - 1); i > box.id.charCodeAt(0); i--) {
              row -= 1
              if (document.getElementById(`${String.fromCharCode(i)}${row}`).innerHTML != "") {
                blocked = true
              }
            }
            if (!blocked) {
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
          }
          //vertical movement
          if(box.id[0] == current[0]) {
            blocked = false
            if (box.id[1] > current[1]) {
              for (let i = (parseInt(current[1]) + 1); i < box.id[1]; i++) {
                if (document.getElementById(`${box.id[0]}${i}`).innerHTML != "")
                  blocked = true
              }
            }
            if (box.id[1] < current[1]) {
              for (let i = (parseInt(current[1]) - 1); i > box.id[1]; i--) {
                if (document.getElementById(`${box.id[0]}${i}`).innerHTML != "")
                  blocked = true
              }
            }
            if (!blocked) { 
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
          }
          //horizontal movement
          if (box.id[1] == (parseInt(current[1]))) {
            blocked = false
            if (box.id.charCodeAt(0) > current.charCodeAt(0)) {
              for (let i = (current.charCodeAt(0) + 1); i < box.id.charCodeAt(0); i++) {
                if (document.getElementById(`${String.fromCharCode(i)}${current[1]}`).innerHTML != "")
                  blocked = true
              }
            }
            if (box.id.charCodeAt(0) < current.charCodeAt(0)) {
              for (let i = (current.charCodeAt(0) - 1); i > box.id.charCodeAt(0); i--) {
                if (document.getElementById(`${String.fromCharCode(i)}${current[1]}`).innerHTML != "")
                  blocked = true
              }
            }
            if (!blocked) {
              box.innerHTML = ""
              box.appendChild(findselect)
              unselect_selected()
              change_turn()
            }
          }
        }
      }
      //kingmoves
      if (classes.includes("king")){
        if (color != currcolor) {
          if (((box.id.charCodeAt(0) - current.charCodeAt(0)) == 1 || (box.id.charCodeAt(0) - current.charCodeAt(0)) == -1 ||(box.id.charCodeAt(0) - current.charCodeAt(0)) == 0) && ((parseInt(current[1]) - parseInt(box.id[1])) == 1 || (parseInt(current[1]) - parseInt(box.id[1])) == 0 || (parseInt(current[1]) - parseInt(box.id[1])) == -1) && !(box.id.charCodeAt(0) == current.charCodeAt(0) && box.id[1] == current[1])) {
            box.innerHTML = ""
            box.appendChild(findselect)
            unselect_selected()
            change_turn()
          }
        }
      }
    })
  })
  }

function change_turn() {
  turn = document.getElementById("turn")
  if (turn.classList[0] == "white"){
      turn.classList.add("black")
      turn.classList.remove("white")
    }
  else {
    turn.classList.add("white")
    turn.classList.remove("black")
  }
}

function start_game() {
  menu_div = document.getElementById("menu")
  menu_div.classList.remove("view")
  menu_div.classList.add("hide")
  board = document.getElementById("board")
  board.classList.remove("hide")
  board.classList.add("view")
  console.log(board)
  reset()
}

function menu_return() {
  menu_div = document.getElementById("menu")
  menu_div.classList.remove("hide")
  menu_div.classList.add("view")
  board = document.getElementById("board")
  board.classList.remove("view")
  board.classList.add("hide")
}

function item_selected() {
  findselect = document.getElementById("selected")
  return findselect
}

function unselect_selected() {
  findselect = document.getElementById("selected")
  findselect.classList.add("unselect")
  findselect.removeAttribute("id", "selected")
}

































document.getElementById("playbutton").addEventListener("click", start_game)
document.getElementById("reset").addEventListener("click", menu_return)
