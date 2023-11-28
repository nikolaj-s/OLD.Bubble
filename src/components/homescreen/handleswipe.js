

export const HandleSwipe = (props) => {
    let xDown = null;
    let yDown = null;

    const getTouches = (evt) => {
        return evt.touches;
    }

    const handleTouchStart = (evt) => {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    const handleTouchMove = (evt, func) => {
        if ( !xDown || !yDown ) {
            return;
        }

        let yUp = evt.touches[0].clientY;
        let xUp = evt.touches[0].clientX;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                
                props.open();
            } else {
                props.close();
            }
        } else {

        }
        xDown = null
        yDown = null
    }   
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    return null;
}


