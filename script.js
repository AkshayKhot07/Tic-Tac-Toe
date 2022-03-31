"use strict";

const Player = (sign) => {
  const getSign = () => {
    return sign;
  };

  return { getSign };
};

const gamePlay = (() => {
  let boardArr = Array(9).fill("");

  function setBoardArr() {
    boardArr = Array(9).fill("");
  }

  const setMarker = (index, sign) => {
    boardArr[index] = sign;
  };

  const getMarker = () => {
    return boardArr;
  };

  return { setMarker, getMarker, setBoardArr };
})();

const choosePlayerMove = (() => {
  const allBoxes = Array.from(document.querySelectorAll(".box"));
  const playerBtns = document.querySelector(".operator-btns");
  const xPlayerMove = document.querySelector(".xPlayerMove");
  const oPlayerMove = document.querySelector(".oPlayerMove");

  function currentPlayerMove() {
    playerBtns.addEventListener("click", function (e) {
      for (let i = 0; i < allBoxes.length; i++) {
        if (allBoxes[i].textContent == "X" || allBoxes[i].textContent == "O") {
          return;
        } else if (e.target.classList.contains("xPlayerMove")) {
          xPlayerMove.setAttribute("id", "pink-border");
          oPlayerMove.removeAttribute("id");
        } else if (e.target.classList.contains("oPlayerMove")) {
          oPlayerMove.setAttribute("id", "pink-border");
          xPlayerMove.removeAttribute("id");
        }
      }
    });
  }

  return { currentPlayerMove };
})();

const displayController = (() => {
  const allBoxes = Array.from(document.querySelectorAll(".box"));
  const winnerEl = document.querySelector(".winner");
  const restartGameButton = document.querySelector(".restart-game");

  const xPlayer = Player("X");
  const oPlayer = Player("O");

  let round = 1;
  let gameWon = false;

  function getAllBoxes() {
    return allBoxes;
  }

  function setAllBoxes() {
    allBoxes.forEach((item) => item.classList.remove("line-through"));
  }

  function getRound() {
    return round;
  }

  function getGameWon() {
    return gameWon;
  }

  function setRound(value) {
    round = value;
  }

  function setGameWon() {
    gameWon = false;
  }

  const xPlayerMove = document.querySelector(".xPlayerMove");
  const oPlayerMove = document.querySelector(".oPlayerMove");

  choosePlayerMove.currentPlayerMove();

  const currentPlayerChance = () => {
    if (xPlayerMove.id == "pink-border") {
      return round % 2 == 1 ? xPlayer.getSign() : oPlayer.getSign();
    } else if (oPlayerMove.id == "pink-border") {
      return round % 2 == 1 ? oPlayer.getSign() : xPlayer.getSign();
    }
  };

  allBoxes.forEach((box) => {
    box.addEventListener("click", function (e) {
      //   console.log(e.target.dataset.index);
      if (gameWon) return;
      gamePlay.setMarker(e.target.dataset.index, currentPlayerChance());
      if (e.target.textContent !== "") return;
      e.target.textContent = currentPlayerChance();

      console.log(gamePlay.getMarker());
      const winCheckerArray = gamePlay.getMarker();

      if (gameController.checkWin("X", winCheckerArray) === true) {
        console.log("XXXXXXXXXXX");
        const xAccArray = gameController.getAllIndexes(winCheckerArray, "X");
        console.log(xAccArray);

        const xWinPos = gameController.getWinPos("X", winCheckerArray);
        console.log(xWinPos);

        gameController.lineThrough(xWinPos, allBoxes);

        winnerEl.textContent = "❌ is a Winner 🎉";
        restartGameButton.className += " rainbow";
        gameWon = true;
      } else if (gameController.checkWin("O", winCheckerArray) === true) {
        console.log("OOOOOOOOOOOOO");
        const oAccArray = gameController.getAllIndexes(winCheckerArray, "O");
        console.log(oAccArray);

        const oWinPos = gameController.getWinPos("O", winCheckerArray);
        console.log(oWinPos);

        gameController.lineThrough(oWinPos, allBoxes);

        winnerEl.textContent = "⭕ is a Winner 🎉";
        restartGameButton.className += " rainbow";
        gameWon = true;
      }

      round++;
      console.log(round);
      if (round == 10 && winnerEl.textContent == "Winner of the Game is...") {
        winnerEl.textContent = "❌⭕ It's a Draw ...";
        restartGameButton.className += " rainbow";
      }
    });
  });

  return {
    getRound,
    getGameWon,
    setRound,
    setGameWon,
    getAllBoxes,
    setAllBoxes,
  };
})();

const gameController = (() => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function getWinPos(value, array) {
    return winConditions.find((cond) =>
      cond.every((index) => array[index] == value)
    );
  }

  function checkWin(value, array) {
    return winConditions.some((cond) =>
      cond.every((index) => array[index] == value)
    );
  }

  function getAllIndexes(arr, val) {
    let indexes = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        indexes.push(i);
      }
    }
    return indexes;
  }

  function lineThrough(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      arr2[arr1[i]].classList.add("line-through");
    }
  }

  return { checkWin, getAllIndexes, lineThrough, getWinPos };
})();

const gameReset = (() => {
  const restartGameButton = document.querySelector(".restart-game");
  const allBoxes = Array.from(document.querySelectorAll(".box"));
  const winnerEl = document.querySelector(".winner");

  const xPlayerMove = document.querySelector(".xPlayerMove");
  const oPlayerMove = document.querySelector(".oPlayerMove");

  restartGameButton.addEventListener("click", function (e) {
    restartGameButton.classList.remove("rainbow");

    displayController.setRound(1);
    displayController.setGameWon();

    gamePlay.setBoardArr();

    displayController.setAllBoxes();

    for (let i = 0; i < allBoxes.length; i++) {
      allBoxes[i].textContent = "";
    }

    winnerEl.textContent = `Winner of the Game is...`;

    xPlayerMove.setAttribute("id", "pink-border");
    oPlayerMove.removeAttribute("id");
  });
})();
