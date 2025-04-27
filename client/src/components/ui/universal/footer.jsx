function Footer() {
    return (
        <>
            <footer className="my-footer flex-col justify-center items-center bg-gray-600 text-gray-100 pl-20 pr-20">
                <div className="flex flex-wrap justify-center items-start gap-4 p-4">
                    <div className="flex flex-col justify-between w-64 items-center gap-4">
                        <a href="/">
                            <div className="bg-[url('/assets/Logo.png')] h-10 w-32 bg-center bg-no-repeat bg-contain"></div>
                        </a>
                        <a href="" className="text-sm text-gray-300  hover:text-gray-200">
                            Find the perfect mess or room with ease! Our platform connects you to the best accommodations in your area. Simplify your search with detailed listings and user reviews.
                        </a>
                    </div>
                    <div className="flex flex-wrap justify-center text-center items-start gap-4">
                        <div className="flex flex-col justify-center gap-4 items-center w-64">
                            <span className="text-xl font-bold">Quick Links</span>
                            <div className="grid grid-cols-2 justify-center items-center gap-1 text-gray-300 text-sm text-justify">
                                <a href="/login" className='hover:underline text-md'>HOME</a>
                                <a href="/register" className='hover:underline text-md'>Submit PG</a>
                                <a href="/dashboard" className='hover:underline text-md'>Privacy Policy</a>
                                <a href="/about" className='hover:underline text-md'>About</a>
                                <a href="/faqs" className='hover:underline text-md'>FAQs</a>
                                <a href="/contactus" className='hover:underline text-md'>Contact Us</a>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between w-64 items-center gap-4">
                            <span className="text-xl font-bold">Contact US</span>
                            <div className="flex flex-col text-gray-300 text-sm text-justify">
                                <span className="text-gray-300 text-sm">Bankura Sammilani College, Kenduadihi, Bankura, West Bengal - 722102,</span>
                                <span className="text-gray-300 text-sm">E-Mail: <a href="mailto:susantamandi.user@gmail.com" className="hover:underline">susantamandi.user@gmail.com</a></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom flex justify-center items-center">
                    <span className="p-4 text-sm">© MessFinder All Rights Reserved, 2025</span>
                </div>
            </footer>
        </>
    )
}

export {
    Footer
}