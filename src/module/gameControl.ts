import Food from "./Food";
import Snake from "./Snake";
import scorePannel from "./scorePannel";

class gameControl {
  scorePannel: scorePannel
  Snake: Snake
  Food: Food

  isLive: boolean = false;
  direction: string = ""
  
  constructor() {
    this.scorePannel = new scorePannel(10, 5);
    this.Snake = new Snake();
    this.Food = new Food();
    this.init();
  }

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
    // console.log(this.direction);
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
    // console.log("run");
    
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
    // console.log("run2");
    
    this.checkEat(X, Y)
    this.isLive && setTimeout(this.run.bind(this), 300 - (Number(this.scorePannel.level.innerHTML) - 1) * 30);
  }
  checkEat(X:number, Y: number) {
    if(X === this.Food.X && Y === this.Food.Y) {
      this.Food.change();
      this.scorePannel.scoreAdd();
      this.Snake.addEle();
  }
  }
}
export default gameControl;