"use strict";(()=>{var e=class{static{this.GRID_SIZE_X=480}static{this.GRID_SIZE_Y=854}static{this.OBSTACLE_OPENING=226}static{this.OBSTACLE_WIDTH=95}static{this.OBSTACLE_VELOCITY=-200}static{this.GROUND_HEIGHT=100}static{this.GRAVITY=-2e3}static{this.JUMP_VELOCITY=750}};var S=class{constructor(t){this.game=t,this.canvas=document.getElementById("game-canvas"),this.ctx=this.canvas.getContext("2d");let i=this.canvas.width/e.GRID_SIZE_X,r=this.canvas.height/e.GRID_SIZE_Y;this.ctx.scale(i,r),this.canvas.addEventListener("touchstart",s=>{t.getInputHandler().processClick(),s.preventDefault()}),this.canvas.addEventListener("mousedown",()=>t.getInputHandler().processClick())}toScreenWidth(t){return t}toScreenHeight(t){return-t}toScreenX(t){return t}toScreenY(t){return e.GRID_SIZE_Y-t}canvasRenderingContext2D(){return this.ctx}render(){this.drawBackground(),this.game.getGround().render(this,this.game.getTimeDelta());let t=this.game.getObstacleManager().getObstacles();for(let i=0;i<t.length;i++)t[i].getRenderer().render(this);this.game.getPlayer().getRenderer().render(this,this.game.getTimeDelta()),this.game.gameState()!==2?this.renderScore():this.renderGameOverScreen(),this.renderDebug()}getGame(){return this.game}renderDebug(){this.ctx.textAlign="left",this.ctx.fillStyle="black",this.ctx.font="24px 'Roboto'",this.ctx.fillText(`FPS: ${Math.floor(1/this.game.getTimeDelta())}`,10,30)}renderGameOverScreen(){let t=this.game.getPlayer(),i=this.toScreenWidth(e.GRID_SIZE_X/2),r=this.toScreenHeight(e.GRID_SIZE_Y/5),s=this.toScreenX(e.GRID_SIZE_X/2)-i/2,o=this.toScreenY(e.GRID_SIZE_Y/2)+this.toScreenHeight(e.GROUND_HEIGHT)-r/2;this.ctx.textAlign="center",this.ctx.font="42px 'Rainy Hearts'",this.ctx.fillStyle="#c99868",this.ctx.beginPath(),this.ctx.roundRect(s,o,i,r,5),this.ctx.fill(),this.ctx.stroke(),this.ctx.fillStyle="white",this.ctx.save(),this.ctx.translate(s,o),this.ctx.fillText("Score:",i/2,r/2-30),this.ctx.strokeText("Score:",i/2,r/2-30),this.ctx.fillText(`${t.getScore()}`,i/2,r/3),this.ctx.strokeText(`${t.getScore()}`,i/2,r/3),this.ctx.restore()}renderScore(){let t=this.game.getPlayer();this.ctx.textAlign="center",this.ctx.fillStyle="white",this.ctx.font="68px 'Rainy Hearts'",this.ctx.fillText(`${t.getScore()}`,e.GRID_SIZE_X/2,e.GRID_SIZE_Y/8),this.ctx.strokeText(`${t.getScore()}`,e.GRID_SIZE_X/2,e.GRID_SIZE_Y/8)}drawBackground(){this.ctx.lineWidth=2,this.ctx.strokeStyle="#121212",this.ctx.fillStyle="#8dcdff",this.ctx.fillRect(0,0,e.GRID_SIZE_X,e.GRID_SIZE_Y)}};var G=class{constructor(t){this.game=t}processClick(){this.game.gameState()===0&&this.game.setGameState(1),this.game.gameState()!==2?this.game.getPlayer().movement().setVelocityY(e.JUMP_VELOCITY):this.game.restart()}};var R=class{constructor(t,i){this.x=t,this.y=i}getX(){return this.x}getY(){return this.y}setX(t){this.x=t}setY(t){this.y=t}moveX(t){this.x+=t}moveY(t){this.y+=t}};var p=class{constructor(t,i,r,s){this.velocityX=0;this.velocityY=0;this.accelerationX=0;this.accelerationY=0;this.position=new R(t,i),this.width=r,this.height=s}updatePosition(t){if(this.velocityX+=this.accelerationX*t,this.velocityY+=this.accelerationY*t,this.velocityY<-750&&(this.velocityY=-750),this.position.moveX(this.velocityX*t),this.position.getY()+this.velocityY*t>e.GRID_SIZE_Y){this.position.setY(e.GRID_SIZE_Y);return}if(this.position.getY()+this.velocityY*t<e.GROUND_HEIGHT){this.position.setY(e.GROUND_HEIGHT);return}this.position.moveY(this.velocityY*t)}intersects(t){let i=this.position.getX(),r=this.position.getY(),s=this.position.getX()+this.width,o=this.position.getY()+this.height,a=t.getPosition().getX(),c=t.getPosition().getY(),l=t.getPosition().getX()+t.getWidth(),m=t.getPosition().getY()+t.getHeight();return i<=l&&s>=a&&r<=m&&o>=c}setVelocityX(t){this.velocityX=t}setVelocityY(t){this.velocityY=t}setAccelerationX(t){this.accelerationX=t}setAccelerationY(t){this.accelerationY=t}getWidth(){return this.width}getHeight(){return this.height}getPosition(){return this.position}getAccelerationY(){return this.accelerationY}getVelocityY(){return this.velocityY}};var _=class{constructor(t){this.player=t;let i=new Image;i.src="./images/birb_1.png";let r=new Image;r.src="./images/birb_2.png",this.sprites=new Array(i,r),this.spriteSwitchTimer=0,this.spriteIndex=0}render(t,i){let r=this.player.movement(),s=t.canvasRenderingContext2D(),o=t.toScreenWidth(r.getWidth()),a=t.toScreenHeight(r.getHeight()),c=t.toScreenX(r.getPosition().getX()),l=t.toScreenY(r.getPosition().getY());s.save(),s.translate(c+o/2,l+a/2),s.rotate(this.getRotation()),s.drawImage(this.sprites[this.spriteIndex],-(o/2),-(a/2),o,a),t.getGame().gameState()!==2&&(this.spriteSwitchTimer+=i,this.spriteSwitchTimer>=.1&&(this.spriteIndex=(this.spriteIndex+1)%this.sprites.length,this.spriteSwitchTimer=0)),s.restore()}getRotation(){let t=this.player.movement().getVelocityY();return t>200?-(Math.PI/6):t<-700?Math.PI/3:(t<-600,0)}};var b=class{constructor(){this.score=0;this.pointAwarded=!1;this.renderer=new _(this),this.movableComponent=new p(e.GRID_SIZE_X/4,e.GRID_SIZE_Y/2,68,48),this.movableComponent.setAccelerationY(e.GRAVITY)}getScore(){return this.score}increaseScore(){this.score+=1}movement(){return this.movableComponent}setPointAwarded(t){this.pointAwarded=t}getPointAwarded(){return this.pointAwarded}getX(){return this.movableComponent.getPosition().getX()}getRenderer(){return this.renderer}};var E=class{constructor(t){this.obstacle=t}render(t){this.renderObstacle(t),this.renderObstacleEntrance(t)}renderObstacle(t){let i=t.canvasRenderingContext2D(),r=this.obstacle.position(),s=this.obstacle.movement(),o=t.toScreenX(r.getX()),a=t.toScreenY(r.getY()),c=t.toScreenWidth(s.getWidth()),l=t.toScreenHeight(s.getHeight()),m=i.createLinearGradient(o,0,o+c,0);m.addColorStop(0,"#84c887"),m.addColorStop(.2,"#6fbf73"),m.addColorStop(.3,"#6fbf73"),m.addColorStop(.5,"#4caf50"),m.addColorStop(.8,"#357a38"),m.addColorStop(1,"#4caf50"),i.fillStyle=m,i.fillRect(o,a,c,l),i.strokeRect(o,a,c,l)}renderObstacleEntrance(t){let i=t.canvasRenderingContext2D(),r=this.obstacle.position(),s=this.obstacle.movement(),o=t.toScreenY(r.getY()),a=t.toScreenHeight(s.getHeight()),c=e.OBSTACLE_WIDTH+10,l=(c-e.OBSTACLE_WIDTH)/2,m=r.getX()-l,f=t.toScreenX(m),I=t.toScreenWidth(c),g=t.toScreenHeight(30);if(r.getY()===e.GROUND_HEIGHT){let Y=o+a-g;i.fillRect(f,Y,I,g),i.strokeRect(f,Y,I,g)}else i.fillRect(f,o,I,g),i.strokeRect(f,o,I,g)}};var u=class{constructor(t,i,r,s){this.renderer=new E(this),this.movableComponent=new p(t,i,r,s),this.movableComponent.setVelocityX(e.OBSTACLE_VELOCITY)}movement(){return this.movableComponent}position(){return this.movableComponent.getPosition()}width(){return this.movableComponent.getWidth()}height(){return this.movableComponent.getHeight()}getRenderer(){return this.renderer}};var d=class{constructor(t){this.game=t,this.obstacles=new Array,this.obstacleTimer=0}getObstacles(){return this.obstacles}update(t){this.game.gameState()===1&&this.processObstacles(t)}processObstacles(t){let i=this.game.getPlayer();for(let r=this.obstacles.length-1;r>=0;r--){let s=this.obstacles[r];if(s.position().getX()+s.width()<=0){this.obstacles.splice(r,1);continue}if(r<2&&s.movement().intersects(this.game.getPlayer().movement())){this.game.setGameState(2);continue}r==0&&(!i.getPointAwarded()&&i.getX()>s.position().getX()&&i.getX()<s.position().getX()+s.width()?(i.setPointAwarded(!0),i.increaseScore()):i.getX()>s.position().getX()+s.width()&&i.setPointAwarded(!1)),s.movement().updatePosition(t)}this.handleObstacleSpawning(t)}handleObstacleSpawning(t){this.obstacleTimer+=t,this.obstacleTimer>=1.5&&(this.spawnObstacle(),this.obstacleTimer=0)}spawnObstacle(){let i=e.GRID_SIZE_Y-e.OBSTACLE_OPENING-e.GROUND_HEIGHT-160,r=Math.floor(Math.random()*(i+1)),s=80+r%i,o=80+i-r%i,a=new u(e.GRID_SIZE_X,0,e.OBSTACLE_WIDTH,s),c=new u(e.GRID_SIZE_X,e.GRID_SIZE_Y-o,e.OBSTACLE_WIDTH,o);this.obstacles.push(a),this.obstacles.push(c)}};var v=class{constructor(t){this.game=t}update(t){let i=this.game.getPlayer();this.game.gameState()!==0&&i.movement().updatePosition(t),this.game.gameState()!==2&&i.movement().getPosition().getY()<=e.GROUND_HEIGHT&&this.game.setGameState(2)}};var x=class{constructor(t){this.game=t,this.movableComponent=new p(0,e.GROUND_HEIGHT,0,0),this.movableComponent.setVelocityX(e.OBSTACLE_VELOCITY),this.sprite=new Image,this.sprite.src="./images/ground.svg"}update(t){this.game.gameState()!==2&&this.movableComponent.updatePosition(t),this.movableComponent.getPosition().getX()<-158&&this.movableComponent.getPosition().setX(0)}render(t,i){let r=t.canvasRenderingContext2D();r.fillStyle="#ffe284",r.fillRect(0,e.GRID_SIZE_Y-e.GROUND_HEIGHT,e.GRID_SIZE_X,e.GROUND_HEIGHT),r.drawImage(this.sprite,this.movableComponent.getPosition().getX(),t.toScreenY(e.GROUND_HEIGHT)),r.strokeRect(0,e.GRID_SIZE_Y-e.GROUND_HEIGHT,e.GRID_SIZE_X,e.GROUND_HEIGHT)}};var y=class{constructor(){this.tick=t=>{this.deltaTime=(t-this.timestampOld)/1e3,this.timestampOld=t,this.playerManager.update(this.deltaTime),this.obstacleManager.update(this.deltaTime),this.ground.update(this.deltaTime),this.gameRenderer.render(),window.requestAnimationFrame(this.tick)};this.player=new b,this.inputHandler=new G(this),this.gameRenderer=new S(this),this.obstacleManager=new d(this),this.playerManager=new v(this),this.ground=new x(this),this.state=0,this.deltaTime=0,this.timestampOld=0}restart(){this.player=new b,this.state=0,this.obstacleManager=new d(this),this.playerManager=new v(this),this.deltaTime=0,this.timestampOld=0}getPlayer(){return this.player}getInputHandler(){return this.inputHandler}gameState(){return this.state}setGameState(t){this.state=t}getTimeDelta(){return this.deltaTime}getObstacleManager(){return this.obstacleManager}getPlayerManager(){return this.playerManager}getGround(){return this.ground}renderer(){return this.gameRenderer}};var C;function O(){C=new y,window.requestAnimationFrame(C.tick)}window.onload=O;})();
