(()=>{"use strict";var e={913:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DELAY=t.STATUSCOLOR=t.HOUSECARD=t.MAINFIELD=t.STARTPAGE=void 0,t.STARTPAGE=document.getElementById("startPage"),t.MAINFIELD=document.getElementById("mainPage"),t.HOUSECARD=document.getElementById("houseCardDiv"),t.STATUSCOLOR={SURRENDER:"bg-gradient-to-br from-red-500 via-red-600 to-red-700",STAND:"bg-gradient-to-br from-green-500 via-green-600 to-green-700",HIT:"bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600",DOUBLE:"bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",BUST:"bg-gradient-to-br from-pink-700 via-pink-800 to-pink-900",BROKEN:"bg-black",BLACKJACK:"bg-gradient-to-br from-cyan-500 to-blue-500","ON TURN":"bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600"},t.DELAY=function(e){return new Promise((t=>setTimeout(t,e)))}},603:function(e,t,n){var s=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))((function(r,i){function a(e){try{l(s.next(e))}catch(e){i(e)}}function o(e){try{l(s.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,o)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Controller=void 0;const r=n(693),i=n(47),a=n(766),o=n(217),l=n(487),d=n(913),c=n(594),u=n(489);class h{static renderStartPage(){r.StartView.render()}static startBlackJack(e){const t=new c.Table(e.getGameType());t.setPlayers([e]),t.blackjackAssignPlayerHands(),a.MainView.render(t),o.BetView.render(t)}static playerActingPhase(e,t){return s(this,void 0,void 0,(function*(){e.setGamePhase("acting"),a.MainView.setStatusField("ON TURN","player"),l.ActionView.render(e,t),o.BetView.setTurnColor("player","house"),yield(0,d.DELAY)(500),i.CardView.rotateCards("houseCardDiv","initial"),i.CardView.rotateCards("userCardDiv"),a.MainView.setHouseScore(e,"initial"),a.MainView.setPlayerScore(e)}))}static houseActionPhase(e){return s(this,void 0,void 0,(function*(){yield(0,d.DELAY)(700),o.BetView.setTurnColor("house","player"),a.MainView.setStatusField("ON TURN","house"),yield(0,d.DELAY)(1e3),i.CardView.rotateCards("houseCardDiv"),a.MainView.setHouseScore(e);const t=e.getHouse();for(yield(0,d.DELAY)(1e3);t.getHandScore()<17;)yield(0,d.DELAY)(1e3),l.ActionView.addNewCardToPlayer(t,e,"house"),a.MainView.setStatusField("HIT","house"),yield(0,d.DELAY)(700),i.CardView.rotateCards("houseCardDiv"),yield(0,d.DELAY)(1e3),a.MainView.setHouseScore(e),yield(0,d.DELAY)(700);const n=()=>21===t.getHandScore()&&2===t.getHand().length?"blackjack":t.getHandScore()>=17&&t.getHandScore()<=21?"stand":"bust";a.MainView.setStatusField(n().toUpperCase(),"house"),t.setGameStatus(n()),h.evaluatingWinnersPhase(e)}))}static evaluatingWinnersPhase(e){return s(this,void 0,void 0,(function*(){e.setGamePhase("evaluatingWinners"),yield(0,d.DELAY)(2e3),u.ResultModalView.render(e)}))}static roundOverPhase(e){e.setGamePhase("roundOver"),e.incrementRound(),a.MainView.setStatusField("WAITING","house"),a.MainView.setStatusField("WAITING","player"),e.blackjackClearHandsAndBets(),e.blackjackAssignPlayerHands(),a.MainView.render(e),o.BetView.render(e)}}t.Controller=h},863:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Card=void 0,t.Card=class{constructor(e,t){this.suit=e,this.rank=t}getSuit(){return this.suit}getRank(){return this.rank}getRankNumber(){return"string"==typeof this.rank?"A"===this.rank?11:"J"===this.rank||"Q"===this.rank||"K"===this.rank?10:parseInt(this.rank,10):0}}},511:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Deck=void 0;const s=n(863);class r{constructor(e){this.gameType=e,this.deck=[],"blackjack"===this.gameType&&(this.deck=r.generateDeck())}static generateDeck(){const e=[],t=["H","D","C","S"],n=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];for(const r of t)for(const t of n)e.push(new s.Card(r,t));return e}shuffle(){for(let e=this.deck.length-1;e>=0;e--){const t=Math.floor(Math.random()*(e+1));[this.deck[e],this.deck[t]]=[this.deck[t],this.deck[e]]}}resetDeck(){this.deck=r.generateDeck(),this.shuffle()}drawOne(){return this.deck.shift()}}t.Deck=r},37:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameDecision=void 0,t.GameDecision=class{constructor(e,t){this.action=e,this.amount=t}getAction(){return this.action}getAmount(){return this.amount}setAction(e){this.action=e}setAmount(e){this.amount=e}}},430:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Player=void 0;const s=n(37);t.Player=class{constructor(e,t,n,s=400){this.name=e,this.type=t,this.gameType=n,this.chips=s,this.hand=[],this.bet=0,this.winAmount=0,this.gameStatus="betting"}getName(){return this.name}getGameStatus(){return this.gameStatus}getGameType(){return this.gameType}getChips(){return this.chips}setChips(e){this.chips=e}getWinAmount(){return this.winAmount}setWinAmount(e){this.winAmount=e}getBet(){return this.bet}setBet(e){this.bet=e}getHand(){return this.hand}addHand(e){this.hand.push(e)}setHand(e){this.hand=e}setGameStatus(e){this.gameStatus=e}clearHand(){this.hand=[]}clearBet(){this.bet=0}promptPlayer(){const e=this.gameStatus,t=this.bet;return new s.GameDecision(e,t)}isBlackJack(){return 21===this.getHandScore()&&2===this.hand.length}getHandScore(){let e=0,t=0;for(const n of this.hand)e+=n.getRankNumber(),"A"===n.getRank()&&t++;for(;e>21&&t>0;)e-=10,t--;return e}}},594:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Table=void 0;const s=n(511),r=n(430);t.Table=class{constructor(e,t=[5,20,50,100]){this.gameType=e,this.betDenomination=t,this.gamePhase="betting",this.deck=new s.Deck(e),this.deck.shuffle(),this.turnCorner=0,this.round=1,this.resultsLog=[],this.players=[],this.house=new r.Player("house","house",this.gameType)}getPlayers(){return this.players}setPlayers(e){this.players=e}getHouse(){return this.house}getBetDenomation(){return this.betDenomination}getGamePhase(){return this.gamePhase}setGamePhase(e){this.gamePhase=e}getDeck(){return this.deck}getRound(){return this.round}incrementRound(){this.round++}evaluateTable(e){}blackjackEvaluateAndGetRoundResults(){return""}blackjackAssignPlayerHands(){for(const e of this.players){const t=this.checkNotUndefinedAndGetTwo();void 0!==t&&e.setHand(t)}const e=this.checkNotUndefinedAndGetTwo();void 0!==e&&this.house.setHand(e)}checkNotUndefinedAndGetTwo(){const e=this.deck.drawOne(),t=this.deck.drawOne();return void 0!==e&&void 0!==t?[e,t]:void 0}blackjackClearHandsAndBets(){for(const e of this.players)e.clearHand(),e.clearBet();this.house.clearHand(),this.house.clearBet()}getTurnPlayer(){return this.players[this.turnCorner%this.players.length]}haveTurn(e){"roundOver"!==this.gamePhase&&(this.getTurnPlayer().promptPlayer(),this.turnCorner++)}onFirstPlayer(){return this.turnCorner%this.players.length==0}onLastPlayer(){return this.turnCorner%this.players.length==2}allPlayerActionsResolved(){return this.players.filter((e=>{const t=e.getGameStatus().toLowerCase();return"broken"===t||"stand"===t||"bust"===t||"surrender"===t||"blackjack"===t||"double"===t})).length===this.players.length}}},487:function(e,t,n){var s=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))((function(r,i){function a(e){try{l(s.next(e))}catch(e){i(e)}}function o(e){try{l(s.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,o)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.ActionView=void 0;const r=n(766),i=n(913),a=n(47),o=n(913),l=n(603);class d{static render(e,t){var n,i,c,u;return s(this,void 0,void 0,(function*(){const h=e.getPlayers()[0];t.innerHTML='\n        <div class="flex justify-around items-center pt-[3rem]">\n            <div class="flex flex-col items-center justify-center px-6">\n                <button id="surrenderBtn" class="btn bg-gradient-to-br from-red-500 to-red-800 h-[4.5rem] w-[4.5rem] rounded-full hover:opacity-60">\n                    <i class="fas fa-flag fa-2xl"></i>\n                </button>\n                <div class="font-bold text-center pt-2">SURRENDER</div>\n            </div>\n            <div class="flex flex-col items-center justify-center px-8">\n                <button id="standBtn" class="btn btn-sp bg-gradient-to-br from-green-600 to-green-800 h-[4.5rem] w-[4.5rem] rounded-full hover:opacity-60">\n                    <i class="fas fa-hand fa-2xl"></i>\n                </button>\n                <div class="font-bold text-center pt-2">STAND</div>\n            </div>\n            <div class="flex flex-col items-center justify-center px-8">\n                <button id="hitBtn" class="btn btn-sp bg-gradient-to-br from-yellow-300 to-yellow-500 h-[4.5rem] w-[4.5rem] rounded-full hover:opacity-60">\n                    <i class="fa-solid fa-copy fa-2xl"></i>\n                </button>\n                <div class="font-bold text-center pt-2">HIT</div>\n            </div>\n            <div class="flex flex-col items-center justify-center px-8">\n                <button id="doubleBtn" class="btn bg-gradient-to-br from-blue-500 to-blue-800 h-[4.5rem] w-[4.5rem] rounded-full hover:opacity-60">\n                    <i class="fas fa-coins fa-2xl"></i>\n                </button>\n                <div class="font-bold text-center pt-2">DOUBLE</div>\n            </div>\n        </div>\n        ';const v=[{selector:"#surrenderBtn",status:"SURRENDER"},{selector:"#standBtn",status:"STAND"},{selector:"#hitBtn",status:"HIT"},{selector:"#doubleBtn",status:"DOUBLE"}];e.getPlayers()[0].isBlackJack()&&(r.MainView.setStatusField("BLACKJACK","player"),h.setGameStatus("blackjack"),d.disableButtons(t),yield(0,o.DELAY)(1e3),e.allPlayerActionsResolved()&&l.Controller.houseActionPhase(e)),null===(n=t.querySelector("#surrenderBtn"))||void 0===n||n.addEventListener("click",(()=>{r.MainView.setStatusField("SURRENDER","player"),h.setGameStatus("surrender"),e.allPlayerActionsResolved()&&l.Controller.houseActionPhase(e)})),null===(i=t.querySelector("#standBtn"))||void 0===i||i.addEventListener("click",(()=>{r.MainView.setStatusField("STAND","player"),h.setGameStatus("stand"),e.allPlayerActionsResolved()&&l.Controller.houseActionPhase(e)})),null===(c=t.querySelector("#hitBtn"))||void 0===c||c.addEventListener("click",(()=>s(this,void 0,void 0,(function*(){d.addNewCardToPlayer(h,e,"player"),yield(0,o.DELAY)(500),a.CardView.rotateCards("userCardDiv"),r.MainView.setStatusField("HIT","player"),h.setGameStatus("hit"),yield(0,o.DELAY)(1e3),r.MainView.setPlayerScore(e);const n=h.getHandScore();n>21?(r.MainView.setStatusField("BUST","player"),h.setGameStatus("bust")):21===n?(r.MainView.setStatusField("STAND","player"),h.setGameStatus("stand")):d.ableButtons(t),yield(0,o.DELAY)(1500),e.allPlayerActionsResolved()&&l.Controller.houseActionPhase(e)})))),null===(u=t.querySelector("#doubleBtn"))||void 0===u||u.addEventListener("click",(()=>s(this,void 0,void 0,(function*(){d.addNewCardToPlayer(h,e,"player"),yield(0,o.DELAY)(500),a.CardView.rotateCards("userCardDiv");const t=h.getBet(),n=h.getChips();r.MainView.setPlayerBetAmount(h,2*t),r.MainView.setPlayerOwnChips(h,n-t),yield(0,o.DELAY)(1300),r.MainView.setPlayerScore(e);const s=h.getHandScore()<=21?"DOUBLE":"BUST";r.MainView.setStatusField(s,"player"),h.setGameStatus(s.toLowerCase()),e.allPlayerActionsResolved()&&l.Controller.houseActionPhase(e)}))));for(const e of v)this.bindAction(t,e.selector,e.status)}))}static bindAction(e,t,n){const s=e.querySelector(t);null==s||s.addEventListener("click",(()=>{r.MainView.setStatusField(n,"player"),this.disableButtons(e)}))}static disableButtons(e){Array.from(e.querySelectorAll(".btn")).forEach((e=>{e.disabled=!0,e.classList.add("opacity-60")}))}static ableButtons(e){Array.from(e.querySelectorAll(".btn-sp")).forEach((e=>{e.disabled=!1,e.classList.remove("opacity-60")}))}static addNewCardToPlayer(e,t,n){const s=null===i.MAINFIELD||void 0===i.MAINFIELD?void 0:i.MAINFIELD.querySelector(`#${{house:"houseCardDiv",player:"userCardDiv"}[n]}`),r=t.getDeck().drawOne();r&&s&&(e.addHand(r),s.innerHTML+=a.CardView.renderCard(r))}}t.ActionView=d},217:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BetView=void 0;const s=n(603),r=n(913),i=n(766);t.BetView=class{static render(e){var t,n;if(!r.MAINFIELD)return;const a=r.MAINFIELD.querySelector("#betOrActionDiv");a.innerHTML=`\n    <div class="flex flex-col justify-center items-center mt-7 px-7 py-4" style="box-shadow: 0px -8px 10px rgba(0, 228, 0), 0px 8px 10px rgba(0, 228, 0);">\n        <div class="flex justify-center">\n            <p class="px-5 text-3xl pb-1">BET: <span id="userBetAmount" class="text-4xl">${e.getPlayers()[0].getBet().toString()}</span></p>\n        </div>\n        <div class="flex justify-around py-6">\n            <div class="px-2">\n                <div class="chip w-16 h-16 bg-red-500 rounded-full shadow-xl flex justify-center items-center cursor-pointer hover:opacity-80" data-chips="${e.getBetDenomation()[0].toString()}">\n                <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">\n                    <p class="text-gray-800 text-lg font-bold pb-1">$${e.getBetDenomation()[0].toString()}</p>\n                </div>\n            </div>\n        </div>\n        <div class="px-2">\n            <div class="chip w-16 h-16 bg-green-500 rounded-full shadow-xl flex justify-center items-center cursor-pointer hover:opacity-80" data-chips="${e.getBetDenomation()[1].toString()}">\n                <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">\n                    <p class="text-gray-800 text-lg font-bold pb-1">$${e.getBetDenomation()[1].toString()}</p>\n                </div>\n            </div>\n        </div>\n        <div class="px-2">\n            <div class="chip w-16 h-16 bg-blue-700 rounded-full shadow-xl flex justify-center items-center cursor-pointer hover:opacity-80" data-chips="${e.getBetDenomation()[2].toString()}">\n                <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">\n                    <p class="text-gray-800 text-lg font-bold pb-1">$${e.getBetDenomation()[2].toString()}</p>\n                </div>\n            </div> \n        </div>\n        <div class="px-2">\n            <div class="chip w-16 h-16 bg-gray-800 rounded-full shadow-xl flex justify-center items-center cursor-pointer hover:opacity-80" data-chips="${e.getBetDenomation()[3].toString()}">\n                <div class="w-12 h-12 bg-white rounded-full flex justify-center items-center">\n                    <p class="text-gray-800 text-lg font-bold pb-1">$${e.getBetDenomation()[3].toString()}</p>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="flex justify-between">\n        <button id="clearBtn" class="bg-gradient-to-r from-lime-300 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-bold rounded-lg w-32 py-2.5 mx-3 text-gray-500">\n        CLEAR\n        </button>\n        <button id="dealBtn" class="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4      focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-bold rounded-lg w-32 py-2.5 mx-3 text-gray-600">DEAL\n        </button>\n    </div>\n            `;const o=a.querySelector("#userBetAmount"),l=r.MAINFIELD.querySelector("#ownChips");[...a.querySelectorAll(".chip")].forEach((t=>{t.addEventListener("click",(()=>{const n=parseInt(o.innerHTML||"0",10),s=t.getAttribute("data-chips");if(null!==s){const t=n+parseInt(s,10);t<=e.getPlayers()[0].getChips()&&(o.innerHTML=t.toString())}}))})),null===(t=a.querySelector("#clearBtn"))||void 0===t||t.addEventListener("click",(()=>{null!==o.innerHTML&&(o.innerHTML="0")})),null===(n=a.querySelector("#dealBtn"))||void 0===n||n.addEventListener("click",(()=>{const t=parseInt(o.innerHTML,10),n=parseInt(l.innerHTML,10)-t;0!==t&&(i.MainView.setPlayerBetAmount(e.getPlayers()[0],t),i.MainView.setPlayerOwnChips(e.getPlayers()[0],n),s.Controller.playerActingPhase(e,a))}))}static setTurnColor(e,t){const n=null===r.MAINFIELD||void 0===r.MAINFIELD?void 0:r.MAINFIELD.querySelector(`#${e}`),s=null===r.MAINFIELD||void 0===r.MAINFIELD?void 0:r.MAINFIELD.querySelector(`#${t}`);null!==n&&(n.classList.remove("text-red-600"),n.classList.add("text-yellow-300"),s.classList.remove("text-yellow-300"),s.classList.add("text-red-600"))}}},47:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CardView=void 0;const s=n(913);class r{static renderCard(e){const t=e.getSuit(),n=e.getRank(),s="H"===t||"D"===t?"text-red-600":"text-black",i=r.getSuitSymbol(t);return`\n    <div class="card h-36 w-28 relative mx-1 cursor-pointer">\n      <div class="back rounded shadow-xl absolute bg-gradient-to-br from-red-900 to-red-600 border-4 border-white flex justify-center items-center ${s}">\n        <div class="text-3xl text-white opacity-50">♦</div>\n      </div>\n      <div class="front rounded shadow-xl bg-white absolute flex justify-center items-center ${s}">\n        <div class="w-4 text-center absolute top-0 left-1">\n          <div class="h-4 text-l">${n}</div>\n          <div class="h-4 mt-1">${i}</div>\n        </div>\n        <div class="text-2xl">${i}</div>\n        <div class="w-4 text-center absolute bottom-0 right-1 rotate-180">\n          <div class="h-4 text-l">${n}</div>\n          <div class="h-4 mt-1">${i}</div>\n        </div>\n      </div>\n    </div>\n    `}static rotateCards(e,t="notInitial"){const n=null===s.MAINFIELD||void 0===s.MAINFIELD?void 0:s.MAINFIELD.querySelector(`#${e}`);if(!n)return;const r=Array.from(n.querySelectorAll(".card"));if("houseCardDiv"===e&&"initial"===t){const e=r[0];e&&(this.addRotateClass(e,".front","rotate-front"),this.addRotateClass(e,".back","rotate-back"))}else r.forEach((e=>{this.addRotateClass(e,".front","rotate-front"),this.addRotateClass(e,".back","rotate-back")}))}static addRotateClass(e,t,n){const s=e.querySelector(t);s&&s.classList.add(n)}static getSuitSymbol(e){switch(e){case"H":return"♥";case"D":return"♦︎";case"C":return"♣";default:return"♠"}}}t.CardView=r},766:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MainView=void 0;const s=n(913),r=n(913),i=n(47);class a{static render(e){s.MAINFIELD&&(a.displayBlock(s.MAINFIELD),s.MAINFIELD.innerHTML=`\n        <div class="h-screen flex justify-center" style="background: #1D4434; color: white;">            \n          <div class="container pt-6">\n            <p id="house" class="text-center text-red-600 text-3xl">House</p>\n            <div class="flex justify-center py-2">\n              <button class="bg-white value-circle rounded-full cursor-default" disabled>\n                <p id="houseScore" class="text-black mb-1 font-bold text-xl">0</p>\n              </button>\n            </div>\n            <div id="houseStatusDiv" class="flex justify-center pt-1 pb-2">\n              <button class="bg-gray-600 shadow-xl rounded-lg w-40 py-1 cursor-default" disabled>\n                WAITING\n              </button>\n            </div>\n            <div id="houseCardDiv" class="flex justify-center py-2"></div>\n\n            <div id="playersDiv" class="flex justify-center pt-7">\n              <div id="userDiv" class="flex flex-col items-center">\n                <p id="player" class="text-center text-red-600 text-3xl">${e.getPlayers()[0].getName()}</p>\n                <div id="playerChipDiv" class="text-center text-white flex p-1 justify-between">\n                  <p class="rem1 px-2 text-left">BET: <span id="onBetChips" class="text-xl">${e.getPlayers()[0].getBet()}</span></p>\n                  <p class="rem1 px-2 text-left">CHIP: <span id="ownChips" class="text-xl">${e.getPlayers()[0].getChips()}</span></p>\n                </div>\n                <div class="flex justify-center py-2">\n                  <button class="bg-white value-circle rounded-full cursor-default" disabled>\n                    <p id="playerScore" class="text-black mb-1 font-bold text-xl">0</p>\n                  </button>\n                </div>\n                <div id="playerStatusDiv" class="flex justify-center py-1">\n                  <button class="bg-gray-600 shadow-xl rounded-lg w-40 py-1 cursor-default" disabled>\n                    WAITING\n                  </button>\n                </div>\n                <div id="userCardDiv" class="flex justify-center pt-4"></div>\n                <div id="betOrActionDiv"></div>\n              </div>\n            </div>\n          </div>\n          <div id="modalContent" class="text-black"></div>\n        </div>\n      `,a.renderHand(e))}static setStatusField(e,t){if(!s.MAINFIELD)return;const n="house"===t?"houseStatusDiv":"playerStatusDiv",i=s.MAINFIELD.querySelector(`#${n}`);if(!i)return;const a=r.STATUSCOLOR[e]||"bg-gray-600";i.innerHTML=`\n      <button class="${a} rounded-lg w-40 py-1 cursor-default" disabled>\n        ${e}\n      </button>\n      `}static setHouseScore(e,t="notInitial"){const n=null===s.MAINFIELD||void 0===s.MAINFIELD?void 0:s.MAINFIELD.querySelector("#houseScore"),r="initial"===t?e.getHouse().getHand()[0].getRankNumber().toString():e.getHouse().getHandScore().toString();n&&(n.innerHTML=r)}static setPlayerScore(e){const t=null===s.MAINFIELD||void 0===s.MAINFIELD?void 0:s.MAINFIELD.querySelector("#playerScore");t&&(t.innerHTML=e.getPlayers()[0].getHandScore().toString())}static setPlayerBetAmount(e,t){const n=null===s.MAINFIELD||void 0===s.MAINFIELD?void 0:s.MAINFIELD.querySelector("#onBetChips");null!==n&&(n.innerHTML=t.toString(),e.setBet(t))}static setPlayerOwnChips(e,t){const n=null===s.MAINFIELD||void 0===s.MAINFIELD?void 0:s.MAINFIELD.querySelector("#ownChips");null!==n&&(n.innerHTML=t.toString(),e.setChips(t))}static renderHand(e){const t=null===s.MAINFIELD||void 0===s.MAINFIELD?void 0:s.MAINFIELD.querySelector("#houseCardDiv"),n=null===s.MAINFIELD||void 0===s.MAINFIELD?void 0:s.MAINFIELD.querySelector("#userCardDiv");if(t&&(t.innerHTML="",e.getHouse().getHand().forEach((e=>{t.innerHTML+=i.CardView.renderCard(e)}))),n){n.innerHTML="";for(const t of e.getPlayers())t.getHand().forEach((e=>{n.innerHTML+=i.CardView.renderCard(e)}))}}static displayNone(e){e.classList.remove("block"),e.classList.add("hidden")}static displayBlock(e){e.classList.remove("hidden"),e.classList.add("block")}}t.MainView=a},489:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ResultModalView=void 0;const s=n(603),r=n(913);class i{static render(e){const t=null===r.MAINFIELD||void 0===r.MAINFIELD?void 0:r.MAINFIELD.querySelector("#modalContent");if(!t)return;const n=i.compareScore(e);t.innerHTML=i.createModalContent(e,n);const a=t.querySelector("#modalOverlay"),o=t.querySelector("#modalDiv"),l=t.querySelector("#nextBtn"),d=t.querySelector("#quitBtn");i.showModal(a,o),null==l||l.addEventListener("click",(()=>{i.hideModal(a,o),s.Controller.roundOverPhase(e)})),null==d||d.addEventListener("click",(()=>{i.hideModal(a,o),s.Controller.renderStartPage()}))}static createModalContent(e,t){const n=e.getPlayers()[0].getBet(),s=i.judgeWinOrLose(t,n);return`\n        <div id="modalOverlay" class="fixed inset-0 bg-black opacity-70 z-10 hidden"></div>\n        <div id="modalDiv" class="fixed inset-0 flex items-center justify-center opacity-0 invisible transition-opacity z-20">\n            <div class="bg-white shadow-lg rounded-xl w-1/3 p-5">\n                <div class="text-3xl font-bold tracking-wider text-center mb-5">\n                    Round <span class="text-4xl">${e.getRound()}</span>\n                </div>\n                <table class="w-full mb-8">\n                    <thead class="flex w-full rounded-t-xl bg-zinc-100">\n                    <tr class="flex w-full border-b-2">\n                        <th class="py-4 w-4/12">NAME</th>\n                        <th class="py-4 w-4/12">WIN / LOSE</th>\n                        <th class="py-4 w-4/12">EARNINGS</th>\n                    </tr>\n                    </thead>\n                    <tbody class="flex flex-col items-center justify-between w-full rounded-b-xl">\n                        <tr class="flex w-full border-b">\n                            <td class="text-center py-4 w-4/12">${e.getPlayers()[0].getName()}</td>\n                            <td class="text-center py-4 w-4/12">${s}</td>\n                            <td class="text-center py-4 w-4/12">$${t-n}</td>\n                        </tr>\n                    </tbody>\n                </table>\n                <div class="flex justify-center">\n                    <button id="quitBtn" type="button"\n                    class="border-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">\n                    QUIT\n                    </button>\n                    <button id="nextBtn" type="button"\n                    class="bg-gray-900 hover:bg-gray-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">\n                    NEXT\n                    </button>\n                </div>\n            </div>\n        </div>\n    `}static createGameOverContent(){return'\n        <div id="modalOverlay" class="fixed inset-0 bg-black opacity-70 z-10 hidden"></div>\n        <div id="modalDiv" class="fixed inset-0 flex items-center justify-center opacity-0 invisible transition-opacity z-20">\n            <div class="bg-white shadow-lg rounded-xl w-1/4 p-8">\n                <div class="text-3xl font-bold tracking-wider text-center mb-5">\n                GAME OVER\n                </div>\n                <div class="flex justify-between">\n                    <div class="w-1/2 pr-2">\n                        <button type="button"\n                        class="w-full h-full border hover:bg-gray-200 border-gray-900 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">\n                        HOME\n                        </button>\n                    </div>\n                    <div class="w-1/2 pl-2">\n                        <button type="button"\n                        class="w-full h-full bg-green-500 hover:bg-green-400 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">\n                        CONTINUE\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    '}static compareScore(e){const t=e.getHouse(),n=e.getPlayers()[0],s=n.getBet();let r=0;const i=t.getGameStatus();switch(n.getGameStatus()){case"bust":r=0;break;case"surrender":r+=s/2;break;case"blackjack":r="blackjack"===i?s:Math.floor(2.5*s);break;case"double":r="bust"===i||n.getHandScore()>t.getHandScore()?2*s:n.getHandScore()===t.getHandScore()?s:0;break;case"stand":r=n.getHandScore()===t.getHandScore()?s:"bust"===i||t.getHandScore()<n.getHandScore()?2*s:0}const a=n.getChips();return n.setChips(r+a),r}static showModal(e,t){e.classList.remove("hidden"),t.classList.remove("invisible","opacity-0"),t.classList.add("opacity-1")}static hideModal(e,t){e.classList.add("hidden"),t.classList.add("invisible","opacity-0"),t.classList.remove("opacity-1")}static judgeWinOrLose(e,t){return e===t?"DRAW":e>t?"WIN":"LOSE"}}t.ResultModalView=i},693:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StartView=void 0;const s=n(913),r=n(766),i=n(603),a=n(430);t.StartView=class{static render(){s.STARTPAGE&&(r.MainView.displayBlock(s.STARTPAGE),s.STARTPAGE.innerHTML='\n        <div class="background-container flex items-center justify-center">\n            <form class="startGameForm">\n                <div class="mb-4">\n                    <label class="block mb-2 font-bold text-white text-xl">NAME</label>\n                    <input class="w-full px-3 py-2 border rounded-xl focus:outline-green-600 shadow-xl"\n                        id="userName"\n                        type="text"\n                        value="TERADAD"\n                        placeholder="Name"\n                        required\n                    >\n                </div>\n                <div class="mb-9">\n                    <label class="block mb-2 font-bold text-white text-xl">GAME</label>\n                    <select class="w-full px-3 py-3 border rounded-xl focus:outline-green-600 shadow-xl" id="gameType">\n                        <option value="blackjack">BlackJack</option>\n                        <option value="porker" disabled>Porker - coming soon -</option>\n                    </select>\n                </div>\n                <button id="startBtn" class="w-full mt-3 px-4 py-3 font-bold text-white bg-green-600 rounded-xl hover:bg-green-500 shadow-xl transition-colors duration-300"\n                    type="submit">\n                    START GAME\n                </button>\n            </form>\n        </div>\n      ',null===s.STARTPAGE||void 0===s.STARTPAGE||s.STARTPAGE.querySelector(".startGameForm").addEventListener("submit",(e=>{e.preventDefault();const t=null===s.STARTPAGE||void 0===s.STARTPAGE?void 0:s.STARTPAGE.querySelector("#userName"),n=null===s.STARTPAGE||void 0===s.STARTPAGE?void 0:s.STARTPAGE.querySelector("#gameType");s.STARTPAGE&&r.MainView.displayNone(s.STARTPAGE),i.Controller.startBlackJack(new a.Player(t.value,"user",n.value))})))}}}},t={};(function n(s){var r=t[s];if(void 0!==r)return r.exports;var i=t[s]={exports:{}};return e[s].call(i.exports,i,i.exports,n),i.exports})(603).Controller.renderStartPage()})();