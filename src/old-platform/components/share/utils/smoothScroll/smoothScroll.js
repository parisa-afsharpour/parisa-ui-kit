
import  Scroll from 'react-scroll';
const animatedScroll = Scroll.animateScroll;

export function customScrollTo(target) {
    animatedScroll.scrollTo(target, { duration: 1000,
        delay: 10,
        smooth: true,});

}