import { Input } from "antd";
import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BlocksPage = () => {
    const [rowNumber, setRowNumber] = useState('')
    const [colNumber, setColNumber] = useState('')

    const savePage = useMutation({
        mutationFn: async (pageData) => {
            const response = axios.post('/api/save_page', pageData)
            const successRes = response.json()
            return successRes.success
        }
    })

    return (
        <div className="flex flex-col w-[70%] h-full px-8 pt-12">
            <h3>
                BlocksPage
            </h3>
            <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-2">
                    <h3>Number of columns:</h3>
                    <Input placeholder="enter a number" onChange={(e) => { setColNumber(e.target.value) }} value={colNumber} type="number" maxLength={2} />
                </div>
                <div className="flex flex-col gap-2">
                    <h3>Number of rows:</h3>
                    <Input placeholder="enter a number" onChange={(e) => { console.log((e.target.value).toString()), setRowNumber(e.target.value) }} value={rowNumber} type="number" maxLength={2} />
                </div>
            </div>
            <div className="flex flex-col overflow-scroll ">
                <div className={`pt-8 grid grid-cols-[repeat(${colNumber},minmax(0,1fr))] grid-rows-[repeat(${rowNumber},minmax(0,1fr))]`}>
                    <div
                        className="mb-4 flex flex-col justify-end max-w-[6rem] w-fit h-[4rem]  rounded-md bg-black text-white bg-gradient-to-br from-purple-400 to-purple-700">
                        <div className="flex flex-row px-6 pb-2 overflow-hidden">
                            Block Name
                        </div>
                    </div>
                    <div
                        className="mb-4 flex flex-col justify-end max-w-[6rem] w-fit h-[4rem]  rounded-md bg-black text-white bg-gradient-to-br from-purple-400 to-purple-700">
                        <div className="flex flex-row px-6 pb-2 overflow-hidden">
                            Block Name
                        </div>
                    </div>
                    <div
                        className="mb-4 flex flex-col justify-end max-w-[6rem] w-fit h-[4rem]  rounded-md bg-black text-white bg-gradient-to-br from-purple-400 to-purple-700">
                        <div className="flex flex-row px-6 pb-2 overflow-hidden">
                            Block Name
                        </div>
                    </div>
                    <div
                        className="mb-4 flex flex-col justify-end max-w-[6rem] w-fit h-[4rem]  rounded-md bg-black text-white bg-gradient-to-br from-purple-400 to-purple-700">
                        <div className="flex flex-row px-6 pb-2 overflow-hidden">
                            Block Name
                        </div>
                    </div>
                    <div
                        className="mb-4 flex flex-col justify-end max-w-[6rem] w-fit h-[4rem]  rounded-md bg-black text-white bg-gradient-to-br from-purple-400 to-purple-700">
                        <div className="flex flex-row px-6 pb-2 overflow-hidden">
                            Block Name
                        </div>
                    </div>
                    <div
                        className="mb-4 flex flex-col justify-end max-w-[6rem] w-fit h-[4rem]  rounded-md bg-black text-white bg-gradient-to-br from-purple-400 to-purple-700">
                        <div className="flex flex-row px-6 pb-2 overflow-hidden">
                            Block Name
                        </div>
                    </div>
                    <div
                        className="mb-4 flex flex-col justify-end max-w-[6rem] w-fit h-[4rem]  rounded-md bg-black text-white bg-gradient-to-br from-purple-400 to-purple-700">
                        <div className="flex flex-row px-6 pb-2 overflow-hidden">
                            Block Name
                        </div>
                    </div>
                    <div
                        className="mb-4 flex flex-col justify-end max-w-[6rem] w-fit h-[4rem]  rounded-md bg-black text-white bg-gradient-to-br from-purple-400 to-purple-700">
                        <div className="flex flex-row px-6 pb-2 overflow-hidden">
                            Block Name
                        </div>
                    </div>
                    <div
                        className="mb-4 flex flex-col justify-end max-w-[6rem] w-fit h-[4rem]  rounded-md bg-black text-white bg-gradient-to-br from-purple-400 to-purple-700">
                        <div className="flex flex-row px-6 pb-2 overflow-hidden">
                            Block Name
                        </div>
                    </div>
                </div>

                <div className="self-end">
                    <motion.button
                        // onClick={() => setCurrentStep(currentStep + 1)}
                        onClick={() => { savePage() }}
                        className="flex px-4 py-2 text-lg font-semibold text-white uppercase bg-blue-500 border rounded-lg place-self-end w-fit"> Complete </motion.button>
                </div>

            </div>
        </div>
    )
}

export default BlocksPage