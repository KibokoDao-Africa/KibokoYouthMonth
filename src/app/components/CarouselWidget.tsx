"use client";

import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
    const sliderRef = useRef<Slider | null>(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const cards = [
        { title: "JOMO KENYATTA UNIVERSITY" },
        { title: "ZETECH UNIVERSITY" },
        { title: "MOUNT KENYA UNIVERSITY" },
        { title: "CHAVAKALI HIGH SCHOOL" },
        { title: "Riara Springs Girls High School" },
        { title: "PIONEER PRIMARY SCHOOL" },
    ];

    // Duplicate cards to ensure smooth infinite scrolling
    const extendedCards = [...cards, ...cards];

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            slider.slickPlay();
        }
    }, []);

    return (
        <div className="mx-auto min-w-4xl max-w-full px-4 py-8 overflow-hidden">
            <Slider ref={sliderRef} {...settings}>
                {extendedCards.map((card, index) => (
                    <div key={index} className="p-4">
                        <div 
                            className="bg-[rgba(2,3,33,0.81)] h-[200px] rounded-lg shadow-md shadow-gray-500 flex flex-row items-center justify-between"
                        >   
                            <div className="flex items-center justify-center w-2/3 h-full">
                                <h2 className="text-4xl font-extrabold text-center text-gray-400">
                                    {card.title}
                                </h2>
                            </div>
                            <div className="bg-gray-700 w-1/3 h-full"></div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;