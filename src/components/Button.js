const Button = ({text, onClick}) => {
  return(
    <div>
        <button onClick={onClick} className=" py-2 px-4 border-2 border-white bg-fill hover:border-selection text-sm text-light_text font-sans font-semibold rounded-xl">{text}</button>
    </div>
  )
}

export default Button