import classNames from "classnames"

const Button = ({ className, children, ...props }) => {
  const classes = classNames("button", className, {
    "disabled": props.disabled,
  })

  return (
    <button className={classes} {...props}>
      { children }
    </button>
  )
}

export default Button