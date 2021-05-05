import React, { useState, useEffect, useRef } from 'react'
import { debounce } from '../utils'


const AnimateHeader = ( { children }) => {

    const [topValue, setTopValue] = useState(0)
    const headerRef = useRef(null);

    let prevScrollPos = 0

    useEffect(() => {
        window.addEventListener('scroll', animateHeader);
        // console.log("window.innerHeight ", window.innerHeight)

        return function cleanup () {
            window.removeEventListener('scroll', animateHeader)
          }
      }, []);

      const animateHeader = debounce(() => {
        // console.log("AnimateHeader-SCROLLING")
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
            setTopValue(0)
        else {
            const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop
            prevScrollPos > currentScrollPos ? setTopValue(0) : setTopValue(`-${headerRef.current.clientHeight}px`)
            prevScrollPos = currentScrollPos <= 0 ? 0 : currentScrollPos; // For Mobile or negative scrolling                
        }
    }, 250);      


    return (
        <div
            className="aninmate-header"
            ref={headerRef}
            style={{ top: topValue }}
        >
            {children}
        </div>
    )




    
}

export default AnimateHeader



// Class Based Componet -----

// import React from 'react'

// function debounce(func, wait, immediate) {
//     var timeout;
//     return function () {
//         var context = this,
//             args = arguments;
//         var later = function () {
//             timeout = null;
//             if (!immediate) func.apply(context, args);
//         };
//         var callNow = immediate && !timeout;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//         if (callNow) func.apply(context, args);
//     };
// };


// class AnimateHeader extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             topValue: '0px'
//         }
//         this.prevScrollPos = 0
//         this.headerRef = React.createRef()
//     }



//     componentDidMount() {
//         window.addEventListener('scroll', this.myEfficientFn);

//         console.log("window.innerHeight ", window.innerHeight)
//         // console.log("document.body.offsetHeight", document.body.offsetHeight)
//     }

//     componentWillUnmount() {
//         window.removeEventListener('scroll', this.myEfficientFn)
//     }

//     myEfficientFn = debounce(() => {
//         console.log("AnimateHeader-SCROLLING")

//         if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
//             this.setState({ topValue: '0' })
//         else {
//             const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop
//             this.prevScrollPos > currentScrollPos ? this.setState({ topValue: '0' }) : this.setState({ topValue: `-${this.headerRef.current.clientHeight}px` })
//             this.prevScrollPos = currentScrollPos <= 0 ? 0 : currentScrollPos; // For Mobile or negative scrolling                
//         }


//     }, 250);

//     render() {
//         const { children } = this.props
//         return (
//             <header
//                 className="aninmate-header"
//                 ref={this.headerRef}
//                 style={
//                     { top: this.state.topValue }
//                 }
//             >
//                 {children}
//             </header>
//         )
//     }
// }

// export default AnimateHeader