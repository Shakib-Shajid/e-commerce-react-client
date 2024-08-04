import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
// import bag from "/bag.jpg"
// import cap from "/cap.jpg"
// import shoe from "/shoe.jpg"

import bag from '/bag.jpg'
import pair from '/pair-shoe.jpg'
import bike from '/bike.jpg'
import shoe from '/shoe.jpg'

const Banner = () => {
    const [sliderRef] = useKeenSlider({
        slides: {
          perView: 2,
        },
      })

    return (
        <div ref={sliderRef} className="keen-slider ">
            <div className="keen-slider__slide number-slide1">
                <img src={bag} alt="" className="h-96" />
            </div>
            <div className="keen-slider__slide number-slide2">
                <img src={bike} alt="" className="h-96" />
            </div>
            <div className="keen-slider__slide number-slide3">
                <img src={pair} alt="" className="h-96" />
            </div>
            <div className="keen-slider__slide number-slide4">
                <img src={bike} alt="" className="h-96" />
            </div>
            <div className="keen-slider__slide number-slide5">
                <img src={shoe} alt="" className="h-96" />
            </div>
            <div className="keen-slider__slide number-slide6">
                <img src={bike} alt="" className="h-96" />
            </div>
        </div>
    );
};

export default Banner;