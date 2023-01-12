class Snake {
  element: HTMLElement
  head: HTMLElement
  bodies: HTMLCollection
  constructor() {
    this.element = document.getElementById("snake")!
    this.head = document.querySelector("#snake > div")!
    this.bodies = document.getElementById("snake")?.getElementsByTagName("div")!;
  }

  // 获取蛇头的x和y
  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  set X(value: number) {
    if (this.X === value) {
        return;
    }
    if (value < 0 || value > 290) {
        throw new Error("撞墙了！Game Over!");
    }

    // 禁止蛇掉头
    // if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft == value) {
    //     if (this.X > value) { // 正向右边走向左掉头
    //         value = this.X + 10;
    //     } else {
    //         value = this.X - 10;

    //     }
    // }

    this.moveBody();
    this.head.style.left = value + "px";
    this.checkHeadBody();
  }

  set Y(value: number) {
    if (this.Y === value) {
        return;
    }
    if (value < 0 || value > 290) {
        throw new Error("撞墙了！Game Over!");
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop == value) {
        if (this.Y > value) { // 正向下边走向上掉头
            value = this.Y + 10;
        } else {
            value = this.Y - 10;
        }
    }

    this.moveBody();
    this.head.style.top = value + "px";
    this.checkHeadBody();
  }

  addEle() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
    (this.bodies[this.bodies.length - 1] as HTMLElement).style.display = "none"
  }

  moveBody() {
    (this.bodies[this.bodies.length - 1] as HTMLElement).style.display = "block"
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }

  checkHeadBody() {
    for (let i = 2; i < this.bodies.length; i++) {
      let b = this.bodies[i] as HTMLElement;
      if (b.offsetLeft == this.X && b.offsetTop == this.Y) {
        throw new Error("撞到自己身体了！");
      }
    }
  }
}
export default Snake;