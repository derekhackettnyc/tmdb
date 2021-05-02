
import React, { useState, useEffect, useRef } from 'react'

const bellowRefs = []


const Bellow = ({ bellow, identifier, active, handleClick }) => {

  const boxHeight = useRef(null);

  useEffect(() => {
    bellowRefs.push(`${boxHeight.current.scrollHeight}px`)
  }, []);

  // const identifier = index //`bellow${index}`

  return(
    <li className="collapsible-box" datatype={active}>
    <button
      onClick={() => handleClick(identifier)}
      className={`collapsible-box__button ${identifier === active ? 'active' : ''} ${identifier}`}
    >
      {bellow.title}
    </button>
    <div ref={boxHeight} className="collapsible-box__content" style={identifier === active ? { height: bellowRefs[identifier]} : { height: "0" }}>
      <p>{bellow.panel}</p>
    </div>
  </li>
  )
}

const Accordion = ({ accordion }) => {


  const [active, setActive] = useState(null)

  const handleClick = (identifier) => {
    setActive(active === identifier ? null : identifier)
  }  
  return (
      <ul className="accordion">
        {
          accordion.map((bellow, index) => <Bellow bellow={bellow} active={active} identifier={index} handleClick={handleClick} key={index} />)
        }
      </ul>
  )

}

export default Accordion