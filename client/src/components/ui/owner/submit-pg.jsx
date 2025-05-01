import { InputField } from "../universal/input";

function SubmitPG() {
    return (
        <div className="flex flex-col items-center justify-center bg-[url(/assets/rooms-cover.png)] bg-cover bg-center bg-no-repeat  min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-80px)] bg-gray-100 px-3 py-6">
            <form className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl text-center font-bold mb-4">Submit Your PG</h1>
                <div className="mb-4">
                    <InputField
                        label="Name"
                        type="text"
                        placeholder="Enter your name"
                        value=""
                        onChange={() => {}}
                    />
                </div>
                <div className="mb-4">
                    <InputField
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value=""
                        onChange={() => {}}
                    />
                </div>
                <div className="mb-4">
                    <InputField
                        label="Phone Number"
                        type="tel"
                        placeholder="Enter your phone number"
                        value=""
                        onChange={() => {}}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export { SubmitPG };
