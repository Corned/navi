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
  const filterRef = useRef(null)
  const dropdownRef = useRef(null)

  const handleSelection = (platformName) => {
    setSelected(platformName)
    setOpen(false)
  }

  // Register event listener for clicking so
  // you can close the menu by clicking outside
  // of it.
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

  // Focus on filter ref when isOpen changes.
  useEffect(() => {
    if (filterRef.current) {
      filterRef.current.focus()
    }
  }, [ isOpen ])

  // Move dropdownmenu up if it is outside of screen.
  useEffect(() => {
    if (dropdownRef.current) {
      const a = dropdownRef.current.getBoundingClientRect().bottom
      const b = window.innerHeight
  
      if (a > b) {
        dropdownRef.current.style.top = `-${a-b + 20}px`
      } else {
        dropdownRef.current.style.top = `0px`
      }
    }
  }, [ isOpen ])

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
      <button
        className="platform-picker__open-button justify-left"
        onClick={setOpenState(true)}
        tabIndex={0}
      >
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
          <div className="platform-picker__dropdown" ref={dropdownRef}>
            <div className="platform-picker__format">
              <input
                value={filter}
                onChange={handleFilter}
                placeholder="e.g. LinkedIn"
                ref={filterRef}
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
                      tabIndex={0}
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