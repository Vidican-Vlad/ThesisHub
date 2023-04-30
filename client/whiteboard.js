function toCamelCase(str){
  //console.log(str)
  if(str.trim() === "")
    return str
  let x = str.replace("-", "_");
  let words = x.split("_").reduce((acc, el, index)=>{
    if(index == 0 && el[0] === el[0].toLowerCase() && isNaN(el[0])){
        return acc+el;
    }
    return acc + el[0].toUpperCase() + el.substring(1);
  },"")
  return words
}
let string = "The-Stealth-Warrior"
console.log(toCamelCase(string));