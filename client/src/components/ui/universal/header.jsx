function Navigation({isLoggedin}) {
    return (
        <>
            <header className="my-nav">
                <a href="/">
                    <div className="bg-[url('/assets/Logo.png')] h-10 w-32 bg-center bg-no-repeat bg-contain"></div>
                </a>
                <div className="right flex justify-between w-fit items-center gap-4 pt-10 pb-10">
                    <div className="flex justify-between w-fit items-center gap-4">
                        <a href="/about" className='hover:underline text-md'>ABOUT</a>
                        <a href="/contactus" className='hover:underline text-md'>CONTACT US</a>
                    </div>
                    <div className="flex justify-between w-fit items-center gap-1">
                        <a href="/login">
                            <button className="my-btn">Login</button>
                        </a>
                        <a href="/submit-pg">
                            <button className="my-btn">Submit PG</button>
                        </a>
                    </div>
                </div>
            </header>
        </>
    )
}

export {
    Navigation
}