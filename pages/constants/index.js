
    import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, shoe4, shoe5, shoe6, shoe7, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3, tradingm , tradingview, tradingm2 } from "../../public/assets/images";

    import { truckFast, shieldTick, support } from "../../public/assets/icons";
    // export const navLinks = [
    //     { href: "#home", label: "Home" },
    //     { href: "#about", label: "About Us" },
    //     { href: "#products", label: "Products" },
    //     { href: "#contact-us", label: "Contact Us" },
    //     { href: "login", label: "Login" },
    //     { href: "signup", label: "Signup" },
    // ];

    export const shoes = [
        {
            thumbnail: tradingm,
            bigShoe: tradingm,
        },
        {
            thumbnail: tradingm2,
            bigShoe: tradingm2,
        },
        {
            thumbnail: tradingview,
            bigShoe: tradingview,
        },
    ];

    export const statistics = [
        { value: '1k+', label: 'Brands' },
        { value: '500+', label: 'Shops' },
        { value: '250k+', label: 'Customers' },
    ];

    // export const products = [
    //     {
    //         imgURL: shoe4,
    //         name: "Stay Informed Its That Easy",
    //         price: "$200.20",
    //     },
    //     {
    //         imgURL: shoe5,
    //         name: "Nike Air Jordan-10",
    //         price: "$210.20",
    //     },
    //     {
    //         imgURL: shoe6,
    //         name: "Nike Air Jordan-100",
    //         price: "$220.20",
    //     },
    //     {
    //         imgURL: shoe7,
    //         name: "Nike Air Jordan-001",
    //         price: "$230.20",
    //     },
    // ];

    export const services = [
        {
            imgURL: truckFast,
            label2: "#1",
            label: "Stay Informed its that easy",
            subtext: "Vote for the right candidate and make your choice ."
        },
        {
            imgURL: shieldTick,
            label2: "#2",
            label: "Secure Voting",
            subtext: "The Lives of our voters is our number 1 priority"
        },
        {
            imgURL: support,
            label2: "#3",
            label: "Blockchain",
            subtext: "With the Blochchain Voting has been made more accurate"
        },
    ];

    export const reviews = [
        {
            imgURL: customer1,
            customerName: 'Morich Brown',
            rating: 4.5,
            feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
        },
        {
            imgURL: customer2,
            customerName: 'Lota Mongeskar',
            rating: 4.5,
            feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
        }
    ];


    export const footerLinks = [
        {
            title: "Products",
            links: [
                { name: "Air Force 1", link: "/" },
                { name: "Air Max 1", link: "/" },
                { name: "Air Jordan 1", link: "/" },
                { name: "Air Force 2", link: "/" },
                { name: "Nike Waffle Racer", link: "/" },
                { name: "Nike Cortez", link: "/" },
            ],
        },
        {
            title: "Help",
            links: [
                { name: "About us", link: "/" },
                { name: "FAQs", link: "/" },
                { name: "How it works", link: "/" },
                { name: "Privacy policy", link: "/" },
                { name: "Payment policy", link: "/" },
            ],
        },
        {
            title: "Get in touch",
            links: [
                { name: "customer@nike.com", link: "mailto:customer@nike.com" },
                { name: "+92554862354", link: "tel:+92554862354" },
            ],
        },
    ];

  