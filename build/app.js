"use strict";(()=>{var e=class{static{this.GRID_SIZE_X=576}static{this.GRID_SIZE_Y=1024}static{this.OBSTACLE_OPENING=250}static{this.OBSTACLE_WIDTH=120}static{this.OBSTACLE_VELOCITY=-250}static{this.GROUND_HEIGHT=100}static{this.GRAVITY=-2250}static{this.JUMP_VELOCITY=850}};var S=class{constructor(t){this.game=t,this.canvas=document.getElementById("game-canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.addEventListener("mousedown",()=>t.getInputHandler().processClick());let i=this.canvas.width/e.GRID_SIZE_X,r=this.canvas.height/e.GRID_SIZE_Y;this.ctx.scale(i,r)}toScreenWidth(t){return t}toScreenHeight(t){return-t}toScreenX(t){return t}toScreenY(t){return e.GRID_SIZE_Y-t}canvasRenderingContext2D(){return this.ctx}render(){this.drawBackground();let t=this.game.getObstacleManager().getObstacles();for(let i=t.length-1;i>=0;i--)t[i].getRenderer().render(this);this.game.getPlayer().getRenderer().render(this,this.game.getTimeDelta()),this.game.gameState()!==2?this.renderScore():this.renderGameOverScreen(),this.renderDebug()}renderDebug(){this.ctx.textAlign="left",this.ctx.fillStyle="black",this.ctx.font="24px 'Roboto'",this.ctx.fillText(`FPS: ${Math.floor(1/this.game.getTimeDelta())}`,10,30),this.ctx.fillText(`Accel: ${this.game.getPlayer().getMovableComponent().getAccelerationY()}, Velocity: ${this.game.getPlayer().getMovableComponent().getVelocityY()}`,10,60),this.ctx.fillText(`Pos: ${this.game.getPlayer().getMovableComponent().getPosition().getX()}, ${this.game.getPlayer().getMovableComponent().getPosition().getY()}`,10,90)}renderGameOverScreen(){let t=this.game.getPlayer(),i=this.toScreenWidth(e.GRID_SIZE_X/2),r=this.toScreenHeight(e.GRID_SIZE_Y/5),o=this.toScreenX(e.GRID_SIZE_X/2)-i/2,s=this.toScreenY(e.GRID_SIZE_Y/2)+this.toScreenHeight(e.GROUND_HEIGHT)-r/2;this.ctx.textAlign="center",this.ctx.font="64px 'Impact'",this.ctx.fillStyle="#c99868",this.ctx.beginPath(),this.ctx.roundRect(o,s,i,r,5),this.ctx.fill(),this.ctx.stroke(),this.ctx.fillStyle="white",this.ctx.save(),this.ctx.translate(o,s),this.ctx.fillText("Score:",i/2,r/2),this.ctx.strokeText("Score:",i/2,r/2),this.ctx.fillText(`${t.getScore()}`,i/2,r/4),this.ctx.strokeText(`${t.getScore()}`,i/2,r/4),this.ctx.restore()}renderScore(){let t=this.game.getPlayer();this.ctx.textAlign="center",this.ctx.fillStyle="white",this.ctx.font="96px 'Impact'",this.ctx.fillText(`${t.getScore()}`,e.GRID_SIZE_X/2,e.GRID_SIZE_Y/8),this.ctx.strokeText(`${t.getScore()}`,e.GRID_SIZE_X/2,e.GRID_SIZE_Y/8)}drawBackground(){this.ctx.lineWidth=2,this.ctx.strokeStyle="#121212",this.ctx.fillStyle="#8dcdff",this.ctx.fillRect(0,0,e.GRID_SIZE_X,e.GRID_SIZE_Y),this.ctx.fillStyle="#ffe284",this.ctx.fillRect(0,e.GRID_SIZE_Y-e.GROUND_HEIGHT,e.GRID_SIZE_X,e.GROUND_HEIGHT),this.ctx.strokeRect(0,e.GRID_SIZE_Y-e.GROUND_HEIGHT,e.GRID_SIZE_X,e.GROUND_HEIGHT)}};var G=class{constructor(t){this.game=t}processClick(){this.game.gameState()===0&&this.game.setGameState(1),this.game.gameState()!==2?this.game.getPlayer().jump():this.game.restart()}};var R=class{constructor(t,i){this.x=t,this.y=i}getX(){return this.x}getY(){return this.y}setX(t){this.x=t}setY(t){this.y=t}moveX(t){this.x+=t}moveY(t){this.y+=t}};var h=class{constructor(t,i,r,o){this.velocityX=0;this.velocityY=0;this.accelerationX=0;this.accelerationY=0;this.position=new R(t,i),this.width=r,this.height=o}updatePosition(t){if(this.velocityX+=this.accelerationX*t,this.velocityY+=this.accelerationY*t,this.velocityY<-1e3&&(this.velocityY=-1e3),this.position.moveX(this.velocityX*t),this.position.getY()+this.velocityY*t>e.GRID_SIZE_Y){this.position.setY(e.GRID_SIZE_Y);return}if(this.position.getY()+this.velocityY*t<e.GROUND_HEIGHT){this.position.setY(e.GROUND_HEIGHT);return}this.position.moveY(this.velocityY*t)}intersects(t){let i=this.position.getX(),r=this.position.getY(),o=this.position.getX()+this.width,s=this.position.getY()+this.height,n=t.getPosition().getX(),l=t.getPosition().getY(),m=t.getPosition().getX()+t.getWidth(),c=t.getPosition().getY()+t.getHeight();return i<=m&&o>=n&&r<=c&&s>=l}setVelocityX(t){this.velocityX=t}setVelocityY(t){this.velocityY=t}setAccelerationX(t){this.accelerationX=t}setAccelerationY(t){this.accelerationY=t}getWidth(){return this.width}getHeight(){return this.height}getPosition(){return this.position}getAccelerationY(){return this.accelerationY}getVelocityY(){return this.velocityY}};var _=class{constructor(t){this.player=t;let i=new Image;i.src="./images/birb_1.png";let r=new Image;r.src="./images/birb_2.png",this.sprites=new Array(i,r),this.spriteSwitchTimer=0,this.spriteIndex=0}render(t,i){let r=this.player.getMovableComponent(),o=t.canvasRenderingContext2D(),s=t.toScreenWidth(r.getWidth()),n=t.toScreenHeight(r.getHeight()),l=t.toScreenX(r.getPosition().getX()),m=t.toScreenY(r.getPosition().getY());o.save(),o.translate(l+s/2,m+n/2),o.rotate(this.getRotation()),o.drawImage(this.sprites[this.spriteIndex],-(s/2),-(n/2),s,n),this.spriteSwitchTimer+=i,this.spriteSwitchTimer>=.1&&(this.spriteIndex=(this.spriteIndex+1)%this.sprites.length,this.spriteSwitchTimer=0),o.restore()}getRotation(){let t=this.player.getMovableComponent().getVelocityY();return t>200?-(Math.PI/6):t<-700?Math.PI/3:(t<-600,0)}};var g=class{constructor(){this.score=0;this.pointAwarded=!1;this.renderer=new _(this),this.movableComponent=new h(e.GRID_SIZE_X/4,e.GRID_SIZE_Y/2,68,48),this.movableComponent.setAccelerationY(e.GRAVITY)}getScore(){return this.score}increaseScore(){this.score+=1}getMovableComponent(){return this.movableComponent}setPointAwarded(t){this.pointAwarded=t}getPointAwarded(){return this.pointAwarded}getX(){return this.movableComponent.getPosition().getX()}getRenderer(){return this.renderer}jump(){this.movableComponent.setVelocityY(e.JUMP_VELOCITY)}};var x=class{constructor(t){this.obstacle=t}render(t){this.renderObstacle(t),this.renderObstacleEntrance(t)}renderObstacle(t){let i=t.canvasRenderingContext2D(),r=this.obstacle.getPosition(),o=this.obstacle.getMovableComponent(),s=t.toScreenX(r.getX()),n=t.toScreenY(r.getY()),l=t.toScreenWidth(o.getWidth()),m=t.toScreenHeight(o.getHeight()),c=i.createLinearGradient(s,0,s+l,0);c.addColorStop(0,"#84c887"),c.addColorStop(.2,"#6fbf73"),c.addColorStop(.3,"#6fbf73"),c.addColorStop(.5,"#4caf50"),c.addColorStop(.8,"#357a38"),c.addColorStop(1,"#4caf50"),i.fillStyle=c,i.lineWidth=2,i.fillRect(s,n,l,m),i.strokeRect(s,n,l,m)}renderObstacleEntrance(t){let i=t.canvasRenderingContext2D(),r=this.obstacle.getPosition(),o=this.obstacle.getMovableComponent(),s=t.toScreenY(r.getY()),n=t.toScreenHeight(o.getHeight()),l=e.OBSTACLE_WIDTH+10,m=(l-e.OBSTACLE_WIDTH)/2,c=r.getX()-m,v=t.toScreenX(c),I=t.toScreenWidth(l),p=t.toScreenHeight(30);if(r.getY()===e.GROUND_HEIGHT){let y=s+n-p;i.fillRect(v,y,I,p),i.strokeRect(v,y,I,p)}else i.fillRect(v,s,I,p),i.strokeRect(v,s,I,p)}};var b=class{constructor(t,i,r,o){this.renderer=new x(this),this.movableComponent=new h(t,i,r,o),this.movableComponent.setVelocityX(e.OBSTACLE_VELOCITY)}getMovableComponent(){return this.movableComponent}getPosition(){return this.movableComponent.getPosition()}getWidth(){return this.movableComponent.getWidth()}getHeight(){return this.movableComponent.getHeight()}getRenderer(){return this.renderer}};var u=class{constructor(t){this.game=t,this.obstacles=new Array,this.obstacleTimer=0}getObstacles(){return this.obstacles}update(t){this.game.gameState()===1&&this.processObstacles(t)}processObstacles(t){let i=this.game.getPlayer();for(let r=this.obstacles.length-1;r>=0;r--){let o=this.obstacles[r];if(o.getPosition().getX()+o.getWidth()<=0){this.obstacles.splice(r,1);continue}if(r<2&&o.getMovableComponent().intersects(this.game.getPlayer().getMovableComponent())){this.game.setGameState(2);continue}r==0&&(!i.getPointAwarded()&&i.getX()>o.getPosition().getX()&&i.getX()<o.getPosition().getX()+o.getWidth()?(i.setPointAwarded(!0),i.increaseScore()):i.getX()>o.getPosition().getX()+o.getWidth()&&i.setPointAwarded(!1)),o.getMovableComponent().updatePosition(t)}this.handleObstacleSpawning(t)}handleObstacleSpawning(t){this.obstacleTimer+=t,this.obstacleTimer>=2&&(this.spawnObstacle(),this.obstacleTimer=0)}spawnObstacle(){let t=e.OBSTACLE_OPENING+40,i=e.GRID_SIZE_Y-e.GROUND_HEIGHT-e.OBSTACLE_OPENING,r=Math.floor(Math.random()*(i-t+1)+t),o=e.GRID_SIZE_Y-e.GROUND_HEIGHT-r,s=new b(e.GRID_SIZE_X,e.GRID_SIZE_Y-o,e.OBSTACLE_WIDTH,o),n=new b(e.GRID_SIZE_X,e.GROUND_HEIGHT,e.OBSTACLE_WIDTH,r-e.OBSTACLE_OPENING);this.obstacles.push(s),this.obstacles.push(n)}};var d=class{constructor(t){this.game=t}update(t){let i=this.game.getPlayer();this.game.gameState()!==0&&i.getMovableComponent().updatePosition(t),this.game.gameState()!==2&&i.getMovableComponent().getPosition().getY()<=e.GROUND_HEIGHT&&this.game.setGameState(2)}};var E=class{constructor(){this.tick=t=>{this.deltaTime=(t-this.timestampOld)/1e3,this.timestampOld=t,this.playerManager.update(this.deltaTime),this.obstacleManager.update(this.deltaTime),this.gameRenderer.render(),window.requestAnimationFrame(this.tick)};this.player=new g,this.inputHandler=new G(this),this.gameRenderer=new S(this),this.obstacleManager=new u(this),this.playerManager=new d(this),this.state=0,this.deltaTime=0,this.timestampOld=0}restart(){this.player=new g,this.state=0,this.obstacleManager=new u(this),this.playerManager=new d(this),this.deltaTime=0,this.timestampOld=0}getPlayer(){return this.player}getInputHandler(){return this.inputHandler}gameState(){return this.state}setGameState(t){this.state=t}getTimeDelta(){return this.deltaTime}getObstacleManager(){return this.obstacleManager}getPlayerManager(){return this.playerManager}renderer(){return this.gameRenderer}};var C;function Y(){C=new E,window.requestAnimationFrame(C.tick)}window.onload=Y;})();
