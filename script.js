"use strict";

const Player = (sign) => {
  const getSign = () => {
    return sign;
  };

  return { getSign };
};

const gamePlay = (() => {
  const boardArr = Array(9).fill("");

  const setMarker = (index, sign) => {
    boardArr[index] = sign;
  };

  const getMarker = () => {
    return boardArr;
  };

  return { setMarker, getMarker };
})();

const displayController = (() => {
  const allBoxes = Array.from(document.querySelectorAll(".box"));

  const xPlayer = Player("X");
  const oPlayer = Player("O");

  let round = 1;

  const currentPlayerChance = () => {
    return round % 2 == 1 ? xPlayer.getSign() : oPlayer.getSign();
  };

  allBoxes.forEach((box) => {
    box.addEventListener("click", function (e) {
      //   console.log(e.target.dataset.index);
      gamePlay.setMarker(e.target.dataset.index, currentPlayerChance());
      if (e.target.textContent !== "") return;
      e.target.textContent = currentPlayerChance();

      console.log(gamePlay.getMarker());
      const winCheckerArray = gamePlay.getMarker();
      if (gameController.checkWin("X", winCheckerArray) === true) {
        console.log("XXXXXXXXXXX");
        let xAccArray = gameController.getAllIndexes(winCheckerArray, "X");
        console.log(xAccArray);
      } else if (gameController.checkWin("O", winCheckerArray) === true) {
        console.log("OOOOOOOOOOOOO");
        let oAccArray = gameController.getAllIndexes(winCheckerArray, "O");
        console.log(oAccArray);
      }

      round++;
    });
  });
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

  //   let xValue = "X";
  //   let oValue = "O";

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

  return { checkWin, getAllIndexes };
})();

// console.log(gamePlay.boardArr);

// const xPlayer = Player("X").getSign();
// const oPlayer = Player("O").getSign();

// let round = 1;

/*
const Gameboard = (() => {
  const allBoxes = Array.from(document.querySelectorAll(".box"));

  return { allBoxes: allBoxes };
})();

console.log(Gameboard.allBoxes);
const gameBoxes = Gameboard.allBoxes;

const marker = (() => {
  let currentMarker = "O";

  gameBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (box.textContent !== "") {
        return;
      }

      if (currentMarker === "O") {
        box.textContent = "X";
        box.dataset.marker = "X";
        currentMarker = "X";
      } else if (currentMarker === "X") {
        box.textContent = "O";
        box.dataset.marker = "O";
        currentMarker = "O";
      }
    });
  });
})();

// Mark "X"
const xMarker = (arr) => ({
  xMark: () =>
    arr.forEach((item) =>
      item.addEventListener("click", () => {
        item.textContent = "X";
        item.dataset.marker = "X";
      })
    ),
});

// xMarker(test).xMark();

//Mark "O"
const oMarker = (arr) => ({
  oMark: () =>
    arr.forEach((item) =>
      item.addEventListener("click", () => {
        item.textContent = "O";
        item.dataset.marker = "O";
      })
    ),
});

// oMarker(test).oMark();
*/
