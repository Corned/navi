import { useState, useEffect, useRef } from "react"
import classNames from "classnames"

import {
  RiListView,
  RiGridFill,
  RiShapesLine,
  RiArrowDropDownLine,
} from "@remixicon/react"

import platformData from "platformData"

const PlatformPicker = ({ selected, setSelected }) => {
  const [ filter, setFilter ] = useState("")
  const [ isOpen, setOpen ] = useState(false)
  const [ isList, setList ] = useState(true)

  const pickerRef = useRef(null)

  const handleSelection = (platformName) => {
    setSelected(platformName)
    setOpen(false)
  }

  useEffect(() => {
    const clickEventHandler = (event) => {
      if (!event.target) return

      const contains = pickerRef.current.contains(event.target)
      if (contains) return

      setOpen(false)
    }

    if (pickerRef.current) {
      document.addEventListener("click", clickEventHandler)
    }

    return () => {
      document.removeEventListener("click", clickEventHandler)
    }
  }, [ pickerRef, isOpen ])

  const setOpenState = (newState) => () => setOpen(newState)
  const setListState = (newState) => () => setList(newState)
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  
  const listButtonClasses = classNames({ "selected": isList })
  const gridButtonClasses = classNames({ "selected": !isList })
  const optionButtonClasses = classNames({ "justify-left": isList })
  const optionClasses = classNames("platform-picker__options", {
    "list": isList,
    "grid": !isList,
  })

  const filteredServices = Object.values(platformData)
    .filter((serviceData) => {
      return serviceData.platform.toLowerCase()
        .includes(filter.toLowerCase())
    })
    .sort((a, b) => {
      if (a.platform < b.platform) return -1
      if (a.platform > b.platform) return 1
      return 0
    })

  return (
    <div className="platform-picker" ref={pickerRef}>
      <button className="platform-picker__open-button justify-left" onClick={setOpenState(true)}>
        { 
          selected?.platform 
          ? platformData[selected.platform.toLowerCase()].icon 
          : <RiShapesLine />
        }
        {
          selected?.platform
          ? <span>{ selected.platform }</span>
          : <span>Select a Platform</span>
        }
        
        <RiArrowDropDownLine />
      </button>

      {
        isOpen && (
          <div className="platform-picker__dropdown">
            <div className="platform-picker__format">
              <input
                value={filter}
                onChange={handleFilter}
                placeholder="e.g. LinkedIn"
              />
              <button
                className={listButtonClasses}
                onClick={setListState(true)}
              >
                <RiListView />
                <span>List</span>
              </button>
              <button
                className={gridButtonClasses}
                onClick={setListState(false)}
              >
                <RiGridFill />
                <span>Grid</span>
              </button>
            </div>

            <div className="divider"></div>

            <div className={optionClasses}>
              {
                filteredServices.map(({ platform, icon, color }) => {
                  return (
                    <button
                      className={optionButtonClasses}
                      style={{ color }}
                      onClick={() => handleSelection(platform)}
                      key={ platform }
                    >
                      { icon }
                      { isList && <span>{ platform }</span> }
                    </button>
                  )
                })
              }

            </div>

          </div>
        )
      }
    </div>
  )
}


export default PlatformPicker