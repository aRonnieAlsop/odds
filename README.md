# Crapless Craps Strategy Simulator

> **“Probability is not a promise.”**  
> This project started with curiosity and confidence in the math — and ended with a humbling reminder that even the best odds can lose.

## Overview

This simulator was built to test a real-world betting strategy for Crapless Craps — a game variation where players can bet on every number *except* 7, which clears the board.

The strategy seemed statistically strong:
- Cover every bettable number (2, 3, 4, 5, 6, 8, 9, 10, 11, 12)
- Use consistent bet sizes
- Walk away at a predetermined cash-out goal

Over thousands of runs, simulations showed high win rates, stable profit curves, and solid average outcomes. It looked, at first, like a beatable game.

## What Was Simulated

- A player starting with a fixed bankroll (e.g., $200 or $4,000)
- Consistent bets on all numbers except 7
- Rebuys allowed up to a fixed cap (e.g., $600 per session)
- A hard exit when profits reached a target (e.g., $4,000 or $8,000)
- Long-term behaviors, such as playing weekly or monthly over a year

## What We Learned

In simulation:
- Win rates per session often exceeded 90%
- Larger starting bankrolls provided strong protection from variance
- A disciplined player with firm exit rules could walk away a consistent winner

But in real life:
- The rare 0.01% outcome showed up
- A cluster of 7s — or a streak of nothing but missed numbers — drained the bankroll
- The simulation’s confidence didn't protect against the reality of randomness

## The Hard Truth

No matter how good the math looks:
- **Variance always exists**
- The longer you play, the more likely you are to meet that outlier
- **Casinos are built on “eventually”**

Even smart strategies can fail. Especially if you start believing they can’t.

## Why This Project Exists

To learn.  
To test ideas.  
To understand risk.  
To appreciate that even a logical system can be wrong in the short term.  
And to respect randomness instead of trying to out-clever it.

## Usage

To simulate the strategy and see outcomes over time, run:

```bash
node src/doubleOrBustBatches.js
