/* @flow */
function square(n: number): number {
  return n * n;
}
console.log(square(2));

let arr: Array<number> = [1, 2, 3, 4];

function judge(x: number, y: number, z: boolean):number {
  if (z) {
    return x + y;
  } else {
    return x - y;
  }
}


judge(1,2,true)


function  contactStr(str:string):string {
    return 'Hello' +  str;
}
console.log(contactStr('flow'));