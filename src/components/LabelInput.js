






const LabelInput = ({ label, ...rest }) => {
  return (
    <div className="label-input">
      { label && <p>{ label }</p>}
      <input
        { ...rest }
      />
    </div>
  )
}

export default LabelInput