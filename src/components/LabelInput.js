import { RiThumbUpLine } from "@remixicon/react";
import classNames from "classnames";
import { useState } from "react";

const LabelInput = ({ label, onChange, validate, ...rest }) => {
  const [ validationMessage, setValidationMessage ] = useState(null)
  const labelInputClasses = classNames(
    "label-input"
  )

  const handleValidation = (event) => {
    if (!validate) {
      return onChange(event)
    }

    const { valid, errorMessage } = validate(event)
    setValidationMessage(!valid ? errorMessage : undefined)
    onChange(event)
  }

  return (
    <div className={labelInputClasses}>
      { label && <p className="label-input__label">{ label }</p>}
      <input
        onChange={handleValidation}
        { ...rest }
      />

      { validationMessage && validate && (
        <p className="label-input__validation-message error">{ validationMessage }</p>
      ) }    

      { !validationMessage && validate && (
        <RiThumbUpLine className="label-input__validation-message" />
      ) }   
    </div>
  )
}

export default LabelInput