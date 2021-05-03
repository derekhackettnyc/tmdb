import React from 'react';
import Header from '../Header';
import Footer from '../Footer'
import ScrollToTopButton from '../ui/ScrollToTopButton'
import { mainNavMenu } from '../../menus'
import AnimateHeader from '../ui/AnimateHeader';

const Layout = ({ children }) => {

    return (
        <>
            <AnimateHeader>
                <Header nav={mainNavMenu} />
            </AnimateHeader>
            {children}
            <Footer />
            <ScrollToTopButton />
        </>
    )
}

export default Layout