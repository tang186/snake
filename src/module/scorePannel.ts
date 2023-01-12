class scorePannel {
  num: number = 0
  score: HTMLElement;
  level: HTMLElement;
  maxLevel : number;
  scoreFlag : number;
  constructor(maxLevel: number = 10, scoreFlag: number = 10) {
    //非空断言操作符会从变量中移除 undefined 和 null。只需在变量后面添加一个 ! 即可。
    this.score = document.querySelector("#score")!;
    this.level = document.querySelector("#level")!;
    console.log(Number(this.level.innerHTML));
    this.maxLevel = maxLevel;
    this.scoreFlag = scoreFlag;
  }

  // 加一分
  scoreAdd() {
    let s = Number(this.score.innerHTML) + Number(this.level.innerHTML)
    this.score.innerHTML = String(s)
    this.num++
    // 如果达到规定个数就加一个等级
    if (this.scoreFlag == this.num) {
      this.levelAdd()
      this.num = 0;
    }
  }

  levelAdd() {
    console.log(Number(this.level.innerHTML));
    let l = Number(this.level.innerHTML) + 1
    // 大于规定最大等级就不加了
    if (l <= this.maxLevel) {
      this.level.innerHTML = String(l)
    }
  }

  levelSub() {
    console.log(Number(this.level.innerHTML));
    
    let l = Number(this.level.innerHTML) - 1
    // 小于规定最小等级就不减了
    if (l > 0) {
      this.level.innerHTML = String(l)
    }
  }
}

export default scorePannel