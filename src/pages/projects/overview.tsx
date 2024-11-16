import { useState } from "react";
import DonutChart from "../../components/charts/Donut";

const ProjectOverview = () => {
    const [selectedDate, setSelectedDate] = useState('Mo 23');
    const events = [
        { time: '12:00 - 13:00 PM', title: 'Committee Review Approvals', lead: 'Kendell Trevor' },
        { time: '9:00 - 10:00 AM', title: '9 Degree Project Estimation Meeting', lead: 'Bob Harris' },
        { time: '12:00 - 13:00 PM', title: 'Marketing Campaign Discussion', lead: 'Naomi Hayabusa' }
    ];
    const data = [25, 0, 45, 30];
    const labels = ['Yet to start', 'Overdue', 'Completed', 'Active'];

    const dates = ['Su 22', 'Mo 23', 'Tu 24', 'We 25', 'Th 26', 'Fr 27', 'Sa 28', 'Su 29', 'Mo 30', 'Tu 31'];
    return (
        <div className="grid gap-5 lg:gap-7.5">
            <div className="grid lg:grid-cols-2 gap-5 lg:gap-7.5">
                <div className="col-span-1 lg:col-span-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="flex lg:px-10 py-1.5 gap-2">
                                <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                    <span className="text-gray-900 text-2xl lg:text-2.5xl leading-none font-semibold">
                                        624
                                    </span>
                                    <span className="text-gray-700 text-sm">
                                        Employees
                                    </span>
                                </div>
                                <span className="[&:not(:last-child)]:border-e border-e-gray-300 my-1"></span>
                                <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                    <span className="text-gray-900 text-2xl lg:text-2.5xl leading-none font-semibold">
                                        60.7M
                                    </span>
                                    <span className="text-gray-700 text-sm">
                                        Users
                                    </span>
                                </div>
                                <span className="[&:not(:last-child)]:border-e border-e-gray-300 my-1"></span>
                                <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                    <span className="text-gray-900 text-2xl lg:text-2.5xl leading-none font-semibold">
                                        369M
                                    </span>
                                    <span className="text-gray-700 text-sm">
                                        Revenue
                                    </span>
                                </div>
                                <span className="[&:not(:last-child)]:border-e border-e-gray-300 my-1"></span>
                                <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
                                    <span className="text-gray-900 text-2xl lg:text-2.5xl leading-none font-semibold">
                                        27
                                    </span>
                                    <span className="text-gray-700 text-sm">
                                        Company Rank
                                    </span>
                                </div>
                                <span className="[&:not(:last-child)]:border-e border-e-gray-300 my-1"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">
                            What's on the road?
                        </div>
                        <div className="flex">
                            <select className="select select-sm min-w-32" name="select">
                                <option value="1">1 month</option>
                                <option value="2">3 month</option>
                                <option value="3">6 month</option>
                                <option value="4">12 month</option>
                            </select>
                        </div>
                    </div>
                    <div className="card-body">
                        
                        <div className="flex gap-2 overflow-x-auto mb-4 mx-3">
                            {dates.map((date) => (
                                <button 
                                    key={date} 
                                    className={`px-1 py-2 rounded-full text-sm ${
                                    selectedDate === date ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                                    }`}
                                    onClick={() => setSelectedDate(date)}
                                >
                                    {date}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="border-l-5 border-gray-200">
                                <div className="flex gap-3 items-center ps-3 mb-0.5">
                                    <span className="text-2xs text-gray-600">
                                        10 Jan, 24
                                    </span>
                                    <div className="rounded-full w-1.5 h-1.5 bg-gray-300 gap-1.5"></div>
                                    <div className="flex gap-1 items-center">
                                        <i className="ki-filled ki-heart text-base text-gray-500"></i>
                                        <span className="text-2sm text-gray-600">
                                            24
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-800 leading-5.5 ps-3">
                                    Experienced UI/UX designer seeking new opportunities.
                                </p>
                            </div>
                            <div className="border-l-5 border-gray-200">
                                <div className="flex gap-3 items-center ps-3 mb-0.5">
                                    <span className="text-2xs text-gray-600">
                                        23 Jan, 24
                                    </span>
                                    <div className="rounded-full w-1.5 h-1.5 bg-gray-300 gap-1.5"></div>
                                    <div className="flex gap-1 items-center">
                                        <i className="ki-filled ki-heart text-base text-gray-500"></i>
                                        <span className="text-2sm text-gray-600">
                                            3
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-800 leading-5.5 ps-3">
                                    Include the name of the author of the blog post. This helps to build trust and credibility with readers.
                                </p>
                            </div>
                            <div className="border-l-5 border-gray-200">
                                <div className="flex gap-3 items-center ps-3 mb-0.5">
                                    <span className="text-2xs text-gray-600">
                                        4 Feb, 24
                                    </span>
                                    <div className="rounded-full w-1.5 h-1.5 bg-gray-300 gap-1.5"></div>
                                    <div className="flex gap-1 items-center">
                                        <i className="ki-filled ki-heart text-base text-gray-500"></i>
                                        <span className="text-2sm text-gray-600">
                                            89
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-800 leading-5.5 ps-3">
                                    Avoid using all caps or excessive punctuation.
                                </p>
                            </div>
                            <div className="border-l-5 border-gray-200">
                                <div className="flex gap-3 items-center ps-3 mb-0.5">
                                    <span className="text-2xs text-gray-600">
                                        17 Mar, 24
                                    </span>
                                    <div className="rounded-full w-1.5 h-1.5 bg-gray-300 gap-1.5"></div>
                                    <div className="flex gap-1 items-center">
                                        <i className="ki-filled ki-heart text-base text-gray-500"></i>
                                        <span className="text-2sm text-gray-600">
                                            32
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-800 leading-5.5 ps-3">
                                    You can use this example as a starting point to design your own blog post cards. Be sure to experiment with different layouts, fonts, and colors both visually appealing and informative.
                                </p>
                            </div>
                            <div className="border-l-5 border-gray-200">
                                <div className="flex gap-3 items-center ps-3 mb-0.5">
                                    <span className="text-2xs text-gray-600">
                                        9 Apr, 24
                                    </span>
                                    <div className="rounded-full w-1.5 h-1.5 bg-gray-300 gap-1.5"></div>
                                    <div className="flex gap-1 items-center">
                                        <i className="ki-filled ki-heart text-base text-gray-500"></i>
                                        <span className="text-2sm text-gray-600">
                                            57
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-800 leading-5.5 ps-3">
                                    Use high-quality images and graphics to capture the visual appeal of your cards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">
                            Tasks Summary
                        </div>
                    </div>
                    <div className="card-body card-body flex justify-center items-center px-3 py-1">
                        <DonutChart 
                            series={data}
                            labels={labels}
                            width={200}
                            height={200}
                            showTotalInCenter={true}
                            showCountsInLegend={true}
                        />
                    </div>
                </div>
            </div>
        </div>
        // <div className="card p-4 font-sans">
        //     <div className="card-header">
        //         <div className="card-title">
        //             What's on the road?
        //         </div>
        //         <select className="select select-sm w-28" name="select">
        //             <option value="1">1 month</option>
        //             <option value="2">3 month</option>
        //             <option value="3">6 month</option>
        //             <option value="4">12 month</option>
        //         </select>
        //     </div>
        //     <div className="flex justify-between items-center mb-4">
        //         <h3 className="text-lg font-semibold">What's on the road?</h3>
        //         <span className="text-sm text-gray-500">Total 482 participants</span>
        //     </div>
            
        //     <div className="flex gap-2 overflow-x-auto mb-4">
        //         {dates.map((date) => (
        //         <button 
        //             key={date} 
        //             className={`px-3 py-2 rounded-lg text-sm ${
        //             selectedDate === date ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
        //             }`}
        //             onClick={() => setSelectedDate(date)}
        //         >
        //             {date}
        //         </button>
        //         ))}
        //     </div>

        //     <div className="space-y-3">
        //         {events.map((event, index) => (
        //         <div key={index} className="p-3 border border-gray-200 rounded-lg flex flex-col space-y-1">
        //             <p className="text-xs text-gray-500">{event.time}</p>
        //             <h4 className="text-sm font-semibold">{event.title}</h4>
        //             <span className="text-xs text-gray-600">Lead by {event.lead}</span>
        //             <button className="self-end px-2 py-1 bg-blue-600 text-white text-xs rounded-md">View</button>
        //         </div>
        //         ))}
        //     </div>
        // </div>
    )
}

export default ProjectOverview