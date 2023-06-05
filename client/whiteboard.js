export function ParentComponent(){

  const [statefulVariable, setStatefulVariable] = useState(true);

  return(
    <ChildComponent statefulVariable = {statefulVariable} setStatefulVariable = {setStatefulVariable}/>
  )
}


export function ChildComponent({statefulVariable, setStatefulVariable}){

  function handleClick(){
    setStatefulVariable((prevValue) => !prevValue);
  }

  return (
    <>
      <Mybutton onClick = {handleClick}>da</Mybutton>
      <p>{statefulVariable}</p>
    </>
  )

}




export function ParentComponent(){

  const [statefulVariable, setStatefulVariable] = useState(true);

  function wrapperFunction(){
    setStatefulVariable((prevValue) => !prevValue);
  }

  return(
    <ChildComponent statefulVariable = {statefulVariable} wrapperFunction = {wrapperFunction}/>
  )
}


export function ChildComponent({statefulVariable, wrapperFunction}){

  function handleClick(){
    wrapperFunction((prevValue) => !prevValue);
  }

  return (
    <>
      <Mybutton onClick = {handleClick}>da</Mybutton>
      <p>{statefulVariable}</p>
    </>
  )

}