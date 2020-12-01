function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      const status = 'Simply connect Four Game(Put from the bottom to top.)';
      
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
          </div>
          <div className="board-row">
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
          </div>
          <div className="board-row">
            {this.renderSquare(14)}
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
            {this.renderSquare(20)}
          </div>
          <div className="board-row">
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
            {this.renderSquare(25)}
            {this.renderSquare(26)}
            {this.renderSquare(27)}
          </div>
          <div className="board-row">
            {this.renderSquare(28)}
            {this.renderSquare(29)}
            {this.renderSquare(30)}
            {this.renderSquare(31)}
            {this.renderSquare(32)}
            {this.renderSquare(33)}
            {this.renderSquare(34)}
          </div>
          <div className="board-row">
            {this.renderSquare(35)}
            {this.renderSquare(36)}
            {this.renderSquare(37)}
            {this.renderSquare(38)}
            {this.renderSquare(39)}
            {this.renderSquare(40)}
            {this.renderSquare(41)}
          </div>
          <div className="board-row">
            {this.renderSquare(42)}
            {this.renderSquare(43)}
            {this.renderSquare(44)}
            {this.renderSquare(45)}
            {this.renderSquare(46)}
            {this.renderSquare(47)}
            {this.renderSquare(48)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
      constructor(props){
      super(props);
      this.state={
        history: [{
          squares: Array(49).fill(null)
        }],
        stepNumber: 0,
        RisNext: true,
      };
    }
    
     handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]){
          return;
        }
        squares[i] = this.state.RisNext ? 'R' : 'Y';
      
       this.setState({
        history: history.concat([{
          squares: squares
        }]),
         stepNumber: history.length,
         RisNext: !this.state.RisNext,});
      }
    
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        RIsNext: (step % 2) === 0,
      });
    }
  
    
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.RisNext ? 'R' : 'Y');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [7, 15, 23, 31],
      [15, 23, 31, 39],
      [23, 31, 39, 47],
      [14, 22, 30, 38],
      [22, 30, 38, 46],
      [21, 29, 37, 45],
      [0, 8, 16,24],
      [8, 16, 24, 32],
      [16, 24, 32, 40],
      [24, 32, 40, 48],
      [1, 9, 17, 25],
      [9, 17, 25, 33],
      [17, 25, 33, 41],
      [2, 10, 18, 26],
      [10, 18, 26, 34],
      [3, 11, 19, 27],
      [35, 29, 23, 17],
      [29, 23, 17, 11],
      [23, 17, 11, 5],
      [4, 10, 16, 22],
      [10, 16, 22, 28],
      [3, 9, 15, 21],
      [42, 36, 30, 24],
      [36, 30, 24, 18],
      [30, 24, 18, 12],
      [24, 18, 12, 6],
      [43, 37, 31, 25],
      [37, 31, 25, 19],
      [31, 25, 19, 13],
      [44, 38, 32, 26],
      [38, 32, 26, 20],
      [45, 39, 33, 27]
     ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a]=== squares[d]) {
        return squares[a];
      }
    }
    return null;
  }