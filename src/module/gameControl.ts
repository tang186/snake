import Food from "./Food";
import Snake from "./Snake";
import scorePannel from "./scorePannel";

class gameControl {
  // 三个对象生成
  scorePannel: scorePannel
  Snake: Snake
  Food: Food

  // 先把isLive设置成false等点了newGame在设为true direction也是一样点了newGame之后再设置
  isLive: boolean = false;
  direction: string = ""
  
  // 将计分板记为每五分升一级 最高10级
  constructor() {
    this.scorePannel = new scorePannel(10, 5);
    this.Snake = new Snake();
    this.Food = new Food();
    this.init();
  }

  // 进行一场新游戏 但是如果蛇还没有死就不能进行新游戏 将所有东西重置
  newGame(e: Object) {
    if (this.isLive) { return }
    this.scorePannel.level.innerHTML = "1"
    this.scorePannel.score.innerHTML = "0"
    document.querySelector("#snake")!.innerHTML = "<div></div>"
    this.scorePannel = new scorePannel(10, 5);
    this.Snake = new Snake();
    this.Food = new Food();
    this.Snake.X = 0
    this.Snake.Y = 0
    this.isLive = true
    this.direction = "ArrowRight"
    this.run();
  }

  // 为按钮添加绑定事件
  init() {
    document.addEventListener('keydown', this.keyBoardhander.bind(this))

    let newGame = document.querySelector("#newGame")!
    newGame.addEventListener('click', this.newGame.bind(this))

    let add = document.querySelector("#add")!
    let sub = document.querySelector("#sub")!
    add.addEventListener('click', this.addSpeed.bind(this))
    sub.addEventListener('click', this.subSpeed.bind(this))
    this.run()
  } 

  addSpeed() {
    this.scorePannel.levelAdd();
  }

  subSpeed() {
    this.scorePannel.levelSub();
  }

  keyBoardhander(e: KeyboardEvent) {
    // 让蛇不能掉头
    if ((this.direction === "ArrowRight" && e.key === "ArrowLeft")
      || (this.direction === "ArrowLeft" && e.key === "ArrowRight")
      || (this.direction === "ArrowUp" && e.key === "ArrowDown")
      || (this.direction === "ArrowDown" && e.key === "ArrowUp")
    ) { return; }
    this.changeDirection(e.key)
    // console.log(e.key);
    
  }
  changeDirection(d:string) {
    this.direction = d;
  }
  run() {
    // 改变蛇头的位置
    
    let X = this.Snake.X;
    let Y = this.Snake.Y;
    switch (this.direction) {
        case "ArrowRight":
            X += 10;
            break;
        case "ArrowLeft":
            X -= 10;
            break;
        case "ArrowUp":
            Y -= 10;
            break;
        case "ArrowDown":
            Y += 10;
            break;
        default:
            break;
    }
    try { 
      this.Snake.X = X;
      this.Snake.Y = Y;
    } catch (e: any) {
      alert(e.message);
      this.isLive = false;
    }
    // 判断是否吃到了食物
    
    this.checkEat(X, Y)
    // 如果还存活就再走一格
    this.isLive && setTimeout(this.run.bind(this), 300 - (Number(this.scorePannel.level.innerHTML) - 1) * 30);
  }
  checkEat(X:number, Y: number) {
    if (X === this.Food.X && Y === this.Food.Y) {
      // 如果迟到了食物就新生成一个食物 加一分 身体长一个
      this.Food.change();
      this.scorePannel.scoreAdd();
      this.Snake.addEle();
  }
  }
}
export default gameControl;