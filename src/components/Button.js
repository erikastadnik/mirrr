const Button = ({text, onClick}) => {
  return(
    <div>
        <button onClick={onClick} className=" 
        py-2 px-4  text-md  font-sans font-semibold rounded-xl
        bg-text text-fill
        active:bg-click
        hover:bg-hover
        ">
          {text}
        </button>
    </div>
  )
}

export default Button