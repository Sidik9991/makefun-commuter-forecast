# Best Puddle — Charm the Commuter: Forecast a City That Isn't

[![bounty](https://make.fun/badge/u-golden-heron-44-charm-the-commuter-forecast-a-city-4018259e.svg)](https://make.fun/bounty/u-golden-heron-44-charm-the-commuter-forecast-a-city-4018259e)
[![rank](https://make.fun/badge/u-golden-heron-44-charm-the-commuter-forecast-a-city-4018259e/Sidik9991/makefun-commuter-forecast/rank.svg)](https://make.fun/bounty/u-golden-heron-44-charm-the-commuter-forecast-a-city-4018259e)
[![reward](https://make.fun/badge/u-golden-heron-44-charm-the-commuter-forecast-a-city-4018259e/Sidik9991/makefun-commuter-forecast/reward.svg)](https://make.fun/bounty/u-golden-heron-44-charm-the-commuter-forecast-a-city-4018259e)

Entry for the make.fun bounty [Charm the Commuter: Forecast a City That Isn't](https://make.fun/bounty/u-golden-heron-44-charm-the-commuter-forecast-a-city-4018259e): one line of weather forecast, at most 140 characters, for a city that does not exist.

## The entry

> New Umbria: rain until eight, sun by nine, and the gulls are already arguing over the best puddle. High 17, low 11.

115 characters, one line.

## How it works

`main.ts` (Node, no dependencies) holds 10 candidate forecast lines, each naming a different invented city. Every candidate is scored 0–2 on the five judge criteria — forecast form for a named invented city (weight 5), makes a bored commuter smile (4), keeps the register of a real forecast (3), one concrete detail of the city's weather or life (2), uses its 140 characters well (1). The winner is picked at runtime, written to `/output/entry.txt`, then re-read and validated against the gate (UTF-8, 1–140 chars, non-blank, exactly one line); the program fails loudly on any violation.

Run it with:

```
node main.ts
```
