## SCHMEMORY

### Overview
This is a card game where pairs of cards
contain images, such that for each card, there is exactly one other card with the same image. The
cards are placed face-down on a surface. A player chooses any two cards and flips them face-up. If
they happen to have the same image, they will stay face-up — otherwise they should be flipped back.
This continues until all cards are face-up.

Images are retrieved from the local image server: if server is not running, cards will have a random color (as fallback)

At the state of art, game is in single player mode. 
When player flip a card, he will have five seconds to find related match (a simple countdown informs user).  
If user find the match, score is raised otherwise attempts increase.

Cards layout is managed by Grid component (material-ui) so is pretty good both for desktop (4 cards per row) and for mobile (2 cards per row)


### Future implementations

#### Animations
An easy UX boost could be reach using animation during card flip: this can be done in many ways, such as a simple css animation or using react spring library

#### Scoreboard    
Although a sort of scoreboard is already available, could be improved saving best score, for instance. (local storage or redux)

#### Multiplayer
This feature requires more time and could be implemented in many ways.  
In each case, a `Player` interface will be needed. This new interface will embed a score.  
For the 'local multi player' case, the solution is not difficult.  
The 'network multi player' case is more complex and requires a server able to manage notifications/subscriptions (WebSockets).

### Installation

```
git clone
cd 
npm i && npm start
```