import { RiLink } from "@remixicon/react"

const Logo = ({ size = 30 }) => {
  return (
    <div className="logo">
      <RiLink size={size} />
      <p style={{ fontSize: size }}>navi</p>
    </div>
  )
}

export default Logo