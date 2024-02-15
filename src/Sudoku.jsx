import { useState } from 'react';
function SudokuSolver() {
    const [sudokuGrid, setSudokuGrid] = useState(Array(9).fill(Array(9).fill(0)));

    // Function to handle changes in cell values
    const handleCellValueChange = (row, col, value) => {
        const newGrid = sudokuGrid.map((r, i) =>
            r.map((cell, j) => (i === row && j === col ? parseInt(value) || 0 : cell))
        );
        setSudokuGrid(newGrid);
    };

    // Function to solve the Sudoku puzzle using backtracking
    const solveSudoku = () => {
        if (solve()) {
            setSudokuGrid([...sudokuGrid]);
        } else {
            alert('No solution exists!');
        }
    };

    // Recursive function to solve the Sudoku puzzle using backtracking
    const solve = () => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (sudokuGrid[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValidMove(row, col, num)) {
                            sudokuGrid[row][col] = num;
                            if (solve()) {
                                return true;
                            }
                            sudokuGrid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    // Function to check if a move is valid
    const isValidMove = (row, col, num) => {
        // Check if the number exists in the row
        for (let i = 0; i < 9; i++) {
            if (sudokuGrid[row][i] === num) {
                return false;
            }
        }

        // Check if the number exists in the column
        for (let i = 0; i < 9; i++) {
            if (sudokuGrid[i][col] === num) {
                return false;
            }
        }

        // Check if the number exists in the 3x3 box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (sudokuGrid[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    };

    // Function to render the Sudoku grid
    const renderGrid = () => {
        return sudokuGrid.map((row, i) => (
            <div className="row" key={i}>
                {row.map((cell, j) => (
                    <input
                        key={j}
                        type="number"
                        min="1"
                        max="9"
                        value={cell === 0 ? '' : cell}
                        onChange={(e) => handleCellValueChange(i, j, e.target.value)}
                    />
                ))}
            </div>
        ));
    };

    return (
        <div>
            <h1>Sudoku Solver</h1>
            <div className="grid">{renderGrid()}</div>
            <button onClick={solveSudoku}>Solve</button>
        </div>
    );
}

export default SudokuSolver;
