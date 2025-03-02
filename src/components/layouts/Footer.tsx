import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <div className="footer grid p-6 bg-aliceblue-100">
                
                <div className="section-2 flex flex-col md:flex-row justify-evenly gap-4 p-6 md:p-12 bg-white border">
                    <div className="block-s-1 flex flex-col space-y-4">
                        <div className="tab-1 flex items-center space-x-4">
                            <p className="text-2xl font-semibold">
                                <img src="./logos/blk.svg" alt="LOGO" className="h-20" />
                            </p>
                        </div>
                        <div className="tab-2 flex items-start space-x-2">
                            <img
                                width="16"
                                height="16"
                                src="https://img.icons8.com/tiny-color/16/home.png"
                                alt="home"
                            />
                            <p className="text-sm text-gray-400 font-semibold lg:w-72">
                                FIRST FLOOR, FLAT NO-103, BUILD NO-B/3, SENTOSA ENCLAVE, NEAR SHANTIKUNJ GARDEN, DINDOLI, SURAT, GUJARAT, PIN: 394210
                            </p>
                        </div>
                        <div className="tab-3 flex items-center space-x-2">
                            <img
                                width="16"
                                height="16"
                                src="https://img.icons8.com/ultraviolet/40/phone.png"
                                alt="phone"
                            />
                            <p className="text-sm text-gray-400 font-semibold">
                                +91 81601 85875
                            </p>
                        </div>
                        <div className="tab-4 flex items-center space-x-2">
                            <img
                                width="16"
                                height="16"
                                src="https://img.icons8.com/offices/30/new-post.png"
                                alt="new-post"
                            />
                            <p className="text-sm text-gray-400 font-semibold">
                                supatil1975@gmail.com
                            </p>
                        </div>
                    </div>
                    <div className="block-s-2 flex flex-col space-y-4">
                        <div className="tab-1 flex items-center space-x-4">
                            <p className="text-2xl font-semibold">Support</p>
                        </div>
                        <div className="tab-2 flex items-center space-x-2">
                            <p className="text-sm text-gray-400 font-semibold">
                                <Link to={"/contact"}>Contact Us</Link>
                            </p>
                        </div>
                        <div className="tab-2 flex items-center space-x-2">
                            <p className="text-sm text-gray-400 font-semibold">
                                <Link to={"policies"}>Policies</Link>
                            </p>
                        </div>
                        {/* <div className="tab-3 flex items-center space-x-2">
                            <p className="text-sm text-gray-400 font-semibold">
                                <Link to={"/orders"}>Track Order</Link>
                            </p>
                        </div> */}
                        <div className="tab-4 flex items-center space-x-2">
                            <p className="text-sm text-gray-400 font-semibold">
                                <Link to={"/faqs"}>FAQs</Link>
                            </p>
                        </div>
                    </div>
                    <div className="block-s-3 flex flex-col space-y-4">
                        {/* <div className="tab-1 flex items-center space-x-4">
              <p className="text-2xl font-semibold"><Link to={"policies"}>Policies</Link></p>
            </div> */}
                        <div>
                            <h1 className="text-2xl font-semibold">Socials</h1>
                            <div className="flex space-x-4">
                                <a href="https://instagram.com/varietyheaven.in" target="_blank" rel="noopener noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                                        <radialGradient id="yOrnnhliCrdS2gy~4tD8ma" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse">
                                            <stop offset="0" stopColor="#fd5"></stop>
                                            <stop offset=".328" stopColor="#ff543f"></stop>
                                            <stop offset=".348" stopColor="#fc5245"></stop>
                                            <stop offset=".504" stopColor="#e64771"></stop>
                                            <stop offset=".643" stopColor="#d53e91"></stop>
                                            <stop offset=".761" stopColor="#cc39a4"></stop>
                                            <stop offset=".841" stopColor="#c837ab"></stop>
                                        </radialGradient>
                                        <path fill="url(#yOrnnhliCrdS2gy~4tD8ma)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20 c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20 C42.014,38.383,38.417,41.986,34.017,41.99z"></path>
                                        <radialGradient id="yOrnnhliCrdS2gy~4tD8mb" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse">
                                            <stop offset="0" stopColor="#4168c9"></stop>
                                            <stop offset=".999" stopColor="#4168c9" stopOpacity="0"></stop>
                                        </radialGradient>
                                        <path fill="url(#yOrnnhliCrdS2gy~4tD8mb)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20 c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20 C42.014,38.383,38.417,41.986,34.017,41.99z"></path>
                                        <path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5 s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path>
                                        <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                                        <path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12 C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
                                    </svg>
                                </a>
                                <a href="https://wa.me/918160185875" target="_blank" rel="noopener noreferrer">
                                    <svg viewBox="0 0 32 32" className="whatsapp-ico" width="32" height="32">
                                        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z" fillRule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="block-s-3 flex flex-col space-y-4">
                        <div className="tab-1 flex items-center space-x-4">
                            <p className="text-2xl font-semibold">Marketplaces</p>
                        </div>
                        <div className="flex flex-col ms-3">
                            <div className="">
                                <img className="h-7" src="https://images.crowdspring.com/blog/wp-content/uploads/2023/07/03162944/amazon-logo-1.png" alt="amazon" />
                            </div>
                            <div className="">
                                <img className="h-16" src="https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png" alt="flipkart" />
                            </div>
                            {/* <div className="">
                                <img className="h-5" src="https://vectorseek.com/wp-content/uploads/2023/09/Limeroad-Logo-Vector.svg-.png" alt="flipkart" />
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
