import classNames from "classnames"

const View = ({ className, children, ...rest }) => {
  const classes = classNames("view", className)


  return (
    <div className={classes} {...rest}>
      { children }
    </div>
  )
}

export default View