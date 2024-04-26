import classNames from "classnames"

const Container = ({ className, children, ...rest }) => {
  const classes = classNames("container", className)

  return (
    <div className={classes} { ...rest }>
      { children }
    </div>
  )
}

export default Container