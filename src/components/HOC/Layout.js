import React from 'react';
import Header from '../Header';
import Footer from '../Footer'
import ScrollToTopButton from '../ui/ScrollToTopButton'
import { mainNavMenu } from '../../menus' 

const Layout = (props) => {

    return (
            <div>
                {/* <AnimateHeader> */}
                    <Header nav={mainNavMenu} />
                {/* </AnimateHeader> */}
                {props.children}
                <Footer/>
                <ScrollToTopButton />
            </div>

    )
}

export default Layout