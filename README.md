# Casino Strategy Simulators

> **"Probability isn't a guarantee."**

This project started with curiosity: could solid betting strategies survive long-term randomness? It covers two games — **Crapless Craps** and **American Roulette** — and tests different approaches over thousands of simulated spins and rolls.

Even the most confident math gets tested when you run it a thousand times.

---

## 🎯 Games Simulated

### Crapless Craps

- Bets placed on **every number except 7**
- Fixed bankroll per session (e.g. $200, $4,000)
- Rebuys allowed up to a cap (e.g. $600/session)
- Player walks away once a profit goal is hit (e.g. $4,000 or $8,000)
- Simulated across weekly or monthly play over a year

### American Roulette

One example strategy:
- $250 on **1st 12** (1–12)
- $250 on **2nd 12** (13–24)
- $250 on **left column** (1, 4, 7...34)
- $250 on **right column** (3, 6, 9...36)

This adds up to a **$1,000 bet per spin**, testing how often the player can hit 2 or more winning areas.

---

## 🧪 How It Works

Each game strategy is simulated using JavaScript. You can run:

- **Single spin/roll tests** to debug logic
- **Batch simulations** to get the bigger picture

The batch tests:
- Run a **strategy 100 times per session**
- Repeat that session **1,000 times**
- Track net wins/losses for each
- Print an average result across all sessions

---

## 💡 What I Learned

- Covering more of the board *feels* safe but doesn’t guarantee anything
- Some strategies win often — but one bad streak can undo it all
- In batches, variance always shows up eventually
- The math may be right, but the timing still rules the outcome

---


