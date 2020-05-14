import React, { Component } from "react";
import Sudoker from "./Sudoker.js";

function countBits(n) {
  let cnt = 0;
  while (n !== 0) {
    cnt += 1;
    n &= n - 1;
  }
  return cnt;
}

function selectCandidate(cases, lsets, csets, bsets) {
  let cand = -1;
  let candCount = 1000;
  let curr = 1;
  while (curr < cases.length) {
    let cell = cases[curr];
    let l = cell[0];
    let c = cell[1];
    let b = cell[2];
    let currCount = countBits(lsets[l] & csets[c] & bsets[b]);
    if (currCount < candCount) {
      cand = curr;
      candCount = currCount;
    }
    curr += 1;
  }
  return cases.splice(cand, 1);
}

export default class Grid3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solved: false
    };
  }

  async step(change, sync, cases, lsets, csets, bsets) {
    if (cases.length > 0) {
      let cell = selectCandidate(cases, lsets, csets, bsets)[0];
      let l = cell[0];
      let c = cell[1];
      let b = cell[2];

      let values = lsets[l] & csets[c] & bsets[b];

      let v = 1;
      let witness = 1;
      while (values !== 0) {
        if (values % 2 === 1) {
          //   essaye valeur
          await change(oldGrid => {
            let grid = [...oldGrid];
            let line = [...grid[l]];
            line[c] = v;
            grid[l] = line;
            return grid;
          });
          await sync();
          lsets[l] ^= witness;
          csets[c] ^= witness;
          bsets[b] ^= witness;
          await this.step(change, sync, cases, lsets, csets, bsets);
          lsets[l] ^= witness;
          csets[c] ^= witness;
          bsets[b] ^= witness;
        }
        v += 1;
        witness *= 2;
        values >>= 1;

        if (this.state.solved) {
          return;
        }
      }

      await change(oldGrid => {
        let grid = [...oldGrid];
        let line = [...grid[l]];
        line[c] = 0;
        grid[l] = line;
        return grid;
      });
      await sync();

      cases.unshift(cell);
    } else {
      this.setState({ solved: true });
    }
  }

  async solve(sync, change) {
    // Initialisation
    let lsets = [511, 511, 511, 511, 511, 511, 511, 511, 511];
    let csets = [511, 511, 511, 511, 511, 511, 511, 511, 511];
    let bsets = [511, 511, 511, 511, 511, 511, 511, 511, 511];

    let cases = [];
    let standby = false;

    this.setState({ solved: false });

    await change(grid => {
      [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(l => {
        [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(c => {
          let b = 3 * Math.floor(l / 3) + Math.floor(c / 3);
          let v = grid[l][c];
          if (v < 20) {
            // empty cell
            cases.push([l, c, b]);
          } else {
            v %= 10;
            v = 2 ** (v - 1);
            lsets[l] ^= v;
            csets[c] ^= v;
            bsets[b] ^= v;
          }
        });
      });
      return grid.map(l => {
        return l.map(c => {
          if (c < 20) {
            if (c > 0) {
              standby = true;
            }
            return 0;
          } else {
            return c;
          }
        });
      });
    });

    if (standby) {
      await sync();
    }

    // Résolution
    await this.step(change, sync, cases, lsets, csets, bsets);
  }

  render() {
    return <Sudoker {...this.props} solve={this.solve.bind(this)} />;
  }
}
