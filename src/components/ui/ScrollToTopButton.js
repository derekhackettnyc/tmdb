import React, { useState, useEffect } from 'react'
import { debounce } from '../utils'

const ScrollToTopButton = () => {

    const [isVisable, setIsVisable] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', handleScrollY)
        return function cleanup() {
            window.removeEventListener('scroll', handleScrollY)
        }
    }, []);

    const handleScrollY = debounce(() => {
        window.scrollY > 500 ? setIsVisable(true) : setIsVisable(false)
    }, 500)


    const onButtonClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className="scroll-to-top">
            <button
                className="scroll-to-top__button"
                style={{ right: isVisable ? '2rem' : '-6rem' }}
                onClick={() => onButtonClick()}
            >
                <i className="fas fa-arrow-up"></i>
            </button>
        </div>
    )

}

export default ScrollToTopButton;
