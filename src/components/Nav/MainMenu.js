import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NavMenuItem from './NavMenuItem'
import { openDropDown } from '../../actions'


const actions = {
    openDropDown
}

const MainMenu = ({ nav, isMenuDrawOpened, openDropDown, dropDown }) => {

    const [touchDevice, setTouchDevice] = useState(false)

    const onFirstTouch = () => {
        setTouchDevice(true)
    }

    useEffect(() => {

        window.addEventListener('touchstart', onFirstTouch);
        return function cleanup() {
            window.removeEventListener('touchstart', onFirstTouch)
        }
    }, []);    

    const handleClickEvent = () => {
        openDropDown('')
    }

    const handleTouchStart = (category) => {
        openDropDown(category)
        // return dropDown ? openDropDown('') : openDropDown(category)
    }

    const handleUserEvent = (event, category) => {
        event.stopPropagation()
        openDropDown(category)
    }

        const actions = {
            handleClickEvent,
            handleTouchStart,
            handleUserEvent,
        }

        return (

            <nav id="mainNav" className={`overlay ${isMenuDrawOpened? "opened" : "closed"}`}  >
                <div className="overlay-content">
                    <ul
                        className={`navigation ${!touchDevice ? "non-touch" : ""}`}
                    >
                        {
                            Object.keys(nav).map(key => {
                                return <NavMenuItem key={key} category={key} menuItem={nav[key]} actions={actions}/>
                            })
                        }
                    </ul>
                </div>
            </nav>

        )
}

const mapStateToProps = state => {
    return {
        isMenuDrawOpened:state.menu.isDrawOpened
    }
}

export default connect(mapStateToProps,actions)(MainMenu)
