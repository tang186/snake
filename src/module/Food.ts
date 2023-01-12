class Food {
  element: HTMLElement;
  constructor() {
    //非空断言操作符会从变量中移除 undefined 和 null。只需在变量后面添加一个 ! 即可。
    this.element = document.querySelector("#food")!;
    this.change()
  }
  change() {
    // 获取活动范围的边长
    let edge = (document.querySelector("#stage")!).clientWidth / 10;
    // console.log(edge);
    
    // 随机生成food的x和y
    let left = Math.round(Math.random() * (edge - 1)) * 10
    let top = Math.round(Math.random() * (edge - 1)) * 10
    console.log(left);
    console.log(top);
    
    // 改变food的位置
    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }

  // 返回food现在的x
  get X() {
    return  this.element.offsetLeft
  }

  // 返回food现在的y
  get Y() {
    return  this.element.offsetTop
  }
}

export default Food;