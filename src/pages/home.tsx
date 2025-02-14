// import { Link } from 'react-router-dom';
import { HiMiniEllipsisVertical } from 'react-icons/hi2';
import InfoSection from '../layouts/Info';
import DonutChart from '../components/charts/Donut';
{/* <style>
    .entry-callout-bg {
        background-image: url('/metronic/tailwind/react/demo1/media/images/2600x1600/2.png');
    }
    .dark .entry-callout-bg {
        background-image: url('/metronic/tailwind/react/demo1/media/images/2600x1600/2-dark.png');
    }
</style>

<style>
    .channel-stats-bg {
        background-image: url('/metronic/tailwind/react/demo1/media/images/2600x1600/bg-3.png');
    }
    .dark .channel-stats-bg {
        background-image: url('/metronic/tailwind/react/demo1/media/images/2600x1600/bg-3-dark.png');
    }
</style> */}
const HomePage: React.FC = () => {
    const data = [10, 40, 35, 50, 49, 60, 70];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
        <>
            <div className="container-fixed">

                <InfoSection
                    title="Dashboard"
                    description="Central Hub for Personal Customization"
                />
            </div>

            <div className="container-fixed mb-7.5">
                <div className="grid lg:grid-cols-3 gap-y-5 lg:gap-7.5 items-stretch">
                    <div className="lg:col-span-1">
                        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 h-full items-stretch" style={{backgroundImage: 'url("/images/2600x1600/bg-3.png")'}}>
                            <div className="card flex-col justify-center gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg">
                                {/* <img src="images/brand-logos/linkedin-2.svg" 
                                    className="w-7 mt-4 ms-5" alt="" 
                                /> */}
                                <div className="flex flex-col gap-1 pb-4 px-5">
                                    <span className="text-3xl font-semibold text-gray-900">
                                        96
                                    </span>
                                    <span className="text-2sm font-normal text-gray-700">
                                        Active projects
                                    </span>
                                </div>
                            </div>
                            <div className="card flex-col justify-center gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg">
                                {/* <img src="images/brand-logos/youtube-2.svg"
                                    className="w-7 mt-4 ms-5" alt="" 
                                /> */}
                                <div className="flex flex-col gap-1 pb-4 px-5">
                                    <span className="text-3xl font-semibold text-gray-900">
                                        15
                                    </span>
                                    <span className="text-2sm font-normal text-gray-700">
                                        Professionals
                                    </span>
                                </div>
                            </div>
                            <div className="card flex-col justify-center gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg">
                                {/* <img src="images/brand-logos/instagram-03.svg"
                                    className="w-7 mt-4 ms-5" alt=""
                                /> */}
                                <div className="flex flex-col gap-1 pb-4 px-5">
                                    <span className="text-3xl font-semibold text-gray-900">
                                        45
                                    </span>
                                    <span className="text-2sm font-normal text-gray-700">
                                        Clients
                                    </span>
                                </div>
                            </div>
                            <div className="card flex-col justify-center gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat channel-stats-bg">
                                {/* <img src="images/brand-logos/tiktok.svg"
                                    className="dark:hidden w-7 mt-4 ms-5"
                                    alt="" 
                                /> */}
                                {/* <img src="/metronic/tailwind/react/demo1/media/brand-logos/tiktok-dark.svg"
                                    className="light:hidden w-7 mt-4 ms-5"
                                    alt=""
                                /> */}
                                <div className="flex flex-col gap-1 pb-4 px-5">
                                    <span className="text-3xl font-semibold text-gray-900">
                                        60
                                    </span>
                                    <span className="text-2sm font-normal text-gray-700">
                                        Tasks
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">
                                    Projects
                                </h3>
                                <div className="menu">
                                    <div className="menu-item menu-item-dropdown">
                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                            <HiMiniEllipsisVertical />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-table scrollable-x-auto">
                                <table className="table text-end">
                                    <thead>
                                        <tr>
                                            <th className="text-start min-w-52 !font-normal !text-gray-700">
                                                Project Name
                                            </th>
                                            <th className="min-w-40 !font-normal !text-gray-700">
                                                Progress
                                            </th>
                                            <th className="min-w-32 !font-normal !text-gray-700">
                                                People
                                            </th>
                                            <th className="min-w-32 !font-normal !text-gray-700">
                                                Due Date
                                            </th>
                                            <th className="w-[30px]"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-start">
                                                <a href="#" className="text-sm font-medium text-gray-900 hover:text-primary">
                                                    Acme software development
                                                </a>
                                            </td>
                                            <td>
                                                <div className="progress progress-primary">
                                                    <div className="progress-bar" style={{width: '60%'}}></div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex justify-end rtl:justify-start shrink-0">
                                                    <div className="flex -space-x-2">
                                                        <div className="flex">
                                                            <img src="images/avatars/300-4.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-6" alt="" 
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <img src="images/avatars/300-1.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-6" alt=""
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <img src="images/avatars/300-2.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-6" alt=""
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <span className="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs undefined size-6 text-success-inverse ring-success-light bg-success">
                                                                +3
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-sm font-medium text-gray-700">24 Aug, 2024</td>
                                            <td className="text-start">
                                                <div className="menu">
                                                    <div className="menu-item menu-item-dropdown">
                                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                                            <HiMiniEllipsisVertical />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-start">
                                                <a href="#" className="text-sm font-medium text-gray-900 hover:text-primary">
                                                    Strategic Partnership Deal
                                                </a>
                                            </td>
                                            <td>
                                                <div className="progress ">
                                                    <div className="progress-bar" style={{width: '100%'}}></div>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="flex justify-end rtl:justify-start shrink-0">
                                                    <div className="flex -space-x-2">
                                                        <div className="flex">
                                                            <img src="images/avatars/300-1.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-6" alt=""
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <img src="images/avatars/300-2.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-6" alt=""
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-6 text-danger-inverse ring-danger-light bg-danger">
                                                                M
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-sm font-medium text-gray-700">
                                                10 Sep, 2024
                                            </td>
                                            <td className="text-start">
                                                <div className="menu">
                                                    <div className="menu-item menu-item-dropdown">
                                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                                            <HiMiniEllipsisVertical />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-start">
                                                <a href="#" className="text-sm font-medium text-gray-900 hover:text-primary">
                                                    Client Onboarding
                                                </a>
                                            </td>
                                            <td>
                                                <div className="progress progress-primary">
                                                    <div className="progress-bar" style={{width: '20%'}}></div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex justify-end rtl:justify-start shrink-0">
                                                    <div className="flex -space-x-2">
                                                        <div className="flex">
                                                            <img src="images/avatars/300-20.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-6" alt=""
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <img src="images/avatars/300-7.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-6" alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-sm font-medium text-gray-700">19 Sep, 2024</td>
                                            <td className="text-start">
                                                <div className="menu">
                                                    <div className="menu-item menu-item-dropdown">
                                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                                            <HiMiniEllipsisVertical />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-start">
                                                <a href="#" className="text-sm font-medium text-gray-900 hover:text-primary">
                                                    Widget Supply Agreement
                                                </a>
                                            </td>
                                            <td>
                                                <div className="progress progress-success">
                                                    <div className="progress-bar" style={{width: '100%'}}></div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex justify-end rtl:justify-start shrink-0">
                                                    <div className="flex -space-x-2">
                                                        <div className="flex">
                                                            <img src="images/avatars/300-6.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-6" alt=""
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <img src="images/avatars/300-23.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-6" alt=""
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <img src="images/avatars/300-12.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-6" alt=""
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <span className="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs undefined size-6 text-primary-inverse ring-primary-light bg-primary">
                                                                +1
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-sm font-medium text-gray-700">
                                                5 May, 2024
                                            </td>
                                            <td className="text-start">
                                                <div className="menu">
                                                    <div className="menu-item menu-item-dropdown">
                                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                                            <HiMiniEllipsisVertical />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-start">
                                                <a href="#" className="text-sm font-medium text-gray-900 hover:text-primary">
                                                    Project X Redesign
                                                </a>
                                            </td>
                                            <td>
                                                <div className="progress progress-primary">
                                                    <div className="progress-bar" style={{width: '80%'}}></div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex justify-end rtl:justify-start shrink-0">
                                                    <div className="flex -space-x-2">
                                                        <div className="flex">
                                                            <img src="images/avatars/300-2.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-6" alt=""
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <img src="images/avatars/300-15.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-6" alt=""
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <img src="images/avatars/300-18.png"
                                                                className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-6" alt=""
                                                            />
                                                        </div>
                                                        <div className="flex">
                                                            <span className="relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs undefined size-6 text-success-inverse ring-success-light bg-success">
                                                                +2
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-sm font-medium text-gray-700">
                                                1 Feb, 2025
                                            </td>
                                            <td className="text-start">
                                                <div className="menu">
                                                    <div className="menu-item menu-item-dropdown">
                                                        <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                                            {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                                            <HiMiniEllipsisVertical />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer justify-center">
                                <a className="btn btn-link" href="/metronic/tailwind/react/demo1/public-profile/projects/3-columns">All Projects</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="container-fixed">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
                    <div className="card">
                        <div className="card-header gap-2">
                            <h3 className="card-title">
                                Contributors
                            </h3>
                            <div className="menu">
                                <div className="menu-item menu-item-dropdown">
                                    <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                        {/* <i className="ki-filled ki-dots-vertical"></i> */}
                                        <HiMiniEllipsisVertical />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="flex flex-col gap-2 lg:gap-5">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center grow gap-2.5">
                                        <img src="images/avatars/300-3.png"
                                            className="rounded-full size-9 shrink-0" alt=""
                                        />
                                        <div className="flex flex-col">
                                            <a href="#" className="text-sm font-medium text-gray-900 hover:text-primary-active mb-px">
                                                Tyler Hero
                                            </a>
                                            <span className="text-xs text-gray-700">
                                                6 clients
                                            </span>
                                        </div>
                                    </div>
                                    <button title="users-options" type="button" className="btn btn-xs btn-icon btn-primary btn-outline rounded-full">
                                        <HiMiniEllipsisVertical />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center grow gap-2.5">
                                    <img src="images/avatars/300-1.png"
                                        className="rounded-full size-9 shrink-0" alt=""
                                    />
                                    <div className="flex flex-col">
                                        <a href="#" className="text-sm font-medium text-gray-900 hover:text-primary-active mb-px">
                                            Esther Howard
                                        </a>
                                        <span className="text-xs text-gray-700">
                                            29 Clients
                                        </span>
                                    </div>
                                    </div>
                                    <button className="btn btn-xs btn-icon btn-primary btn-outline rounded-full active">
                                        <i className="ki-filled ki-check"></i>
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center grow gap-2.5">
                                        <img src="images/avatars/300-14.png"
                                            className="rounded-full size-9 shrink-0" alt=""
                                        />
                                        <div className="flex flex-col">
                                            <a href="#" className="text-sm font-medium text-gray-900 hover:text-primary-active mb-px">
                                                Cody Fisher
                                            </a>
                                            <span className="text-xs text-gray-700">
                                                34 Clients
                                            </span>
                                        </div>
                                    </div>
                                    <button className="btn btn-xs btn-icon btn-primary btn-outline rounded-full">
                                        <i className="ki-filled ki-plus"></i>
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center grow gap-2.5">
                                        <img src="images/avatars/300-7.png"
                                            className="rounded-full size-9 shrink-0" alt=""
                                        />
                                        <div className="flex flex-col">
                                            <a href="#" className="text-sm font-medium text-gray-900 hover:text-primary-active mb-px">
                                                Arlene McCoy
                                            </a>
                                            <span className="text-xs text-gray-700">
                                                1 Clients
                                            </span>
                                        </div>
                                    </div>
                                    <button className="btn btn-xs btn-icon btn-primary btn-outline rounded-full active">
                                        <i className="ki-filled ki-check"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer justify-center">
                            <a className="btn btn-link"
                                href="/metronic/tailwind/react/demo1/public-profile/network">
                                All Contributors
                            </a>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                Tasks
                            </h3>
                            <div className="menu">
                                <div className="menu-item menu-item-dropdown">
                                    <div className="menu-toggle btn btn-sm btn-icon btn-light btn-clear">
                                        <HiMiniEllipsisVertical />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body flex justify-center items-center px-3 py-1">
                            <DonutChart 
                                series={data}
                                labels={labels}
                                width={300}
                                height={300}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;