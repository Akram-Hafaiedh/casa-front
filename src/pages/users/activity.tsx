import { FaStar } from "react-icons/fa6"
import { HiOutlineAdjustments } from "react-icons/hi"
import { HiMiniSquaresPlus, HiOutlineBeaker, HiOutlineCake, HiOutlineCodeBracketSquare, HiOutlineMap, HiOutlineShare, HiOutlineTrophy, HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi2"
import Hexagon from "../../components/Hexagon"

const UserActivity: React.FC = () => {
  return (
    <>
      <div className="container-fixed">
        <div className="flex gap-5 lg:gap-7 5">
          <div className="card grow" id="activity_2017">
            <div className="card-header">
              <h3 className="card-title">
                Activity
              </h3>
            </div>
            <div className="card-body">
              <div className="flex items-start relative">
                <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-gray-300"></div>
                <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
                  {/* <i className="ki-filled ki-share text-base"></i> */}
                  <HiOutlineShare className="size-5" />
                </div>
                <div className="ps-2.5 mb-7 text-md grow">
                  <div className="flex flex-col">
                    <div className="text-sm text-gray-800">
                      I couldn't resist sharing a sneak peek of our
                      <a className="text-sm link" href="/metronic/tailwind/react/demo1/public-profile/profiles/blogger">
                        &nbsp;upcoming content
                      </a>
                    </div>
                    <span className="text-xs text-gray-600">
                      5 days ago, 4:07 PM
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start relative">
                <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-gray-300"></div>
                <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
                  {/* <i className="ki-filled ki-coffee text-base"></i> */}
                  <HiOutlineCake className="size-5" />
                </div>
                <div className="ps-2.5 mb-7 text-md grow">
                  <div className="flex flex-col">
                    <div className="text-sm text-gray-900">
                      Reaching the milestone of
                      <a className="text-sm font-medium link" href="/metronic/tailwind/react/demo1/public-profile/profiles/feeds">
                        &nbsp;10,000 followers&nbsp;
                      </a>
                      on the blog was a dream come true
                    </div>
                    <span className="text-xs text-gray-600">
                      5 days ago, 4:07 PM
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start relative">
                <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-gray-300"></div>
                <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
                  <i className="ki-filled ki-design-1 text-base"></i>
                  <HiOutlineAdjustments className="size-5" />
                </div>
                <div className="ps-2.5 mb-7 text-md grow">
                  <div className="flex flex-col">
                    <div className="text-sm text-gray-800">
                      Onboarded a talented designer to our creative team, adding valuable expertise to upcoming projects.
                    </div>
                    <span className="text-xs text-gray-600">
                      2 weeks ago, 10:45 AM
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start relative">
                <div className="w-9 start-0 top-9 absolute bottom-0 rtl:-translate-x-1/2 translate-x-1/2 border-s border-s-gray-300">
                </div>
                <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
                  {/* <i className="ki-filled ki-code text-base"></i> */}
                  <HiOutlineCodeBracketSquare className="size-5" />
                </div>
                <div className="ps-2.5 mb-7 text-md grow">
                  <div className="grow">
                    <div className="flex flex-col pb-2.5">
                      <div className="text-sm text-gray-800">
                        A new team
                        <a href="#" className="text-sm font-medium text-gray-900 hover:text-primary-active">
                          &nbsp;Market Mavericks&nbsp;
                        </a>joined community
                      </div>
                      <span className="text-xs text-gray-600">
                        1 month ago, 11:45 AM</span>
                      </div>
                      <div className="card shadow-none p-4">
                        <div className="flex flex-wrap justify-between items-center gap-7">
                          <div className="flex items-center gap-4">
                            <Hexagon 
                                  icon={HiOutlineMap}
                                  strokeClass="stroke-red-300"
                                  fillClass="fill-gray-100"
                                  size={50}
                                  iconClassName="text-red-300"
                                  iconSize={20}
                              />
                            <div className="flex flex-col gap-1.5">
                              <a href="#" className="text-base font-medium hover:text-primary text-gray-900">
                                Market Mavericks
                              </a>
                              <p className="text-2sm text-gray-700">
                                Navigating markets with strategic solutions
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-6 lg:gap-12">
                                <div className="flex flex-col items-end gap-5">
                                <span className="text-2xs text-gray-600 uppercase">
                                    rating
                                </span>
                                <div className="rating">
                                    <div className="rating-label checked">
                                        <FaStar className="rating-off"/>
                                        <FaStar className="rating-on" />
                                    </div>
                                    <div className="rating-label checked">
                                        <FaStar className="rating-off"/>
                                        <FaStar className="rating-on" />
                                    </div>
                                    <div className="rating-label checked">
                                        <FaStar className="rating-off"/>
                                        <FaStar className="rating-on" />
                                    </div>
                                    <div className="rating-label checked">
                                        <FaStar className="rating-off"/>
                                        <FaStar className="rating-on" />
                                    </div>
                                    <div className="rating-label indeterminate">
                                        <FaStar className="rating-off"/>
                                        <FaStar className="rating-on" />
                                    </div>
                                    <div className="relative inline-block">
                                        <FaStar className="rating-off text-gray-300" />
                                        <div className="absolute top-0 left-0 overflow-hidden" 
                                            style={{ width: '50%' }} 
                                        >
                                            <FaStar className="rating-on text-yellow-500" />
                                    </div>
                                  </div>
                              </div>
                          </div>
                          <div className="flex flex-col items-end gap-3 lg:min-w-24 shrink-0 max-w-auto">
                            <span className="text-2xs text-gray-600 uppercase">
                              members
                            </span>
                            <div className="flex -space-x-2">
                              <div className="flex">
                                <img src="/images/avatars/300-4.png" 
                                  className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-7" alt=""
                                />
                              </div>
                              <div className="flex">
                                <img src="/images/avatars/300-1.png"
                                  className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-7" alt=""
                                />
                              </div>
                              <div className="flex">
                                <img src="/images/avatars/300-2.png"
                                  className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-7" alt=""
                                />
                              </div>
                              <div className="flex">
                                <span className="hover:z-5 relative inline-flex items-center justify-center shrink-0 rounded-full ring-1 font-semibold leading-none text-3xs size-7 text-primary-inverse ring-primary-light bg-primary">
                                  S
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="grid justify-end min-w-20">
                            <a className="btn btn-sm btn-primary">
                              {/* <i className="ki-filled ki-people"></i> */}
                              <HiOutlineUserGroup className="size-4" />
                              Join
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start relative">
                <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
                  <i className="ki-filled ki-like-shapes text-base"></i>
                  <HiOutlineUsers className="size-4" />
                </div>
                <div className="ps-2.5 mb-7 text-md grow">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-800">
                      Hosted a virtual
                      <a className="text-sm font-medium link" href="/metronic/tailwind/react/demo1/public-profile/profiles/creator">
                        &nbsp;team-building event
                      </a>
                      , fostering collaboration and strengthening bonds among team members.
                    </div>
                    <span className="text-xs font-medium text-gray-500">
                      1 month ago, 13:56 PM
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start relative">
                <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 size-9 text-gray-600">
                  {/* <i className="ki-filled ki-cup text-base"></i> */}
                  <HiOutlineTrophy className="size-5" />
                </div>
                <div className="ps-2.5  text-md grow">
                  <div className="flex flex-col">
                    <div className="text-sm text-gray-800">
                      We recently
                      <a className="text-sm font-medium link" href="/metronic/tailwind/react/demo1/public-profile/profiles/nft">
                        &nbsp;celebrated&nbsp;
                      </a>
                      the blog's 1-year anniversary
                    </div>
                    <span className="text-xs text-gray-600">
                      3 months ago, 4:07 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer justify-center!">
              <a href="#" className="btn btn-link">All-time Activity</a>
            </div>
          </div>
          <div className="flex flex-col gap-2.5" data-tabs="true">
            <a href="#" data-tab-toggle="#activity_2024" className="btn btn-sm text-gray-600 hover:text-primary tab-active:bg-primary-light tab-active:text-primary ">
              2024
            </a>
            <a href="#" data-tab-toggle="#activity_2023" className="btn btn-sm text-gray-600 hover:text-primary tab-active:bg-primary-light tab-active:text-primary ">
              2023
            </a>
            <a href="#" data-tab-toggle="#activity_2022" className="btn btn-sm text-gray-600 hover:text-primary tab-active:bg-primary-light tab-active:text-primary ">
              2022
            </a>
            <a href="#" data-tab-toggle="#activity_2021" className="btn btn-sm text-gray-600 hover:text-primary tab-active:bg-primary-light tab-active:text-primary ">
              2021
            </a>
            <a href="#" data-tab-toggle="#activity_2020" className="btn btn-sm text-gray-600 hover:text-primary tab-active:bg-primary-light tab-active:text-primary ">
              2020
            </a>
            <a href="#" data-tab-toggle="#activity_2019" className="btn btn-sm text-gray-600 hover:text-primary tab-active:bg-primary-light tab-active:text-primary ">
              2019
            </a>
            <a href="#" data-tab-toggle="#activity_2018" className="btn btn-sm text-gray-600 hover:text-primary tab-active:bg-primary-light tab-active:text-primary ">
              2018
            </a>
            <a href="#" data-tab-toggle="#activity_2017" className="btn btn-sm text-gray-600 hover:text-primary tab-active:bg-primary-light tab-active:text-primary active">
              2017
            </a>
          </div>
        </div>
      </div>
      {/* Empty */}
      {/* <div className="container-fixed">
        <div className="card p-8 lg:p-12">
          <div className="card-body">
            <div className="grid justify-center py-5">
              <img src="/images/illustrations/11.svg"
               className="max-h-[170px]" alt=""
              />
            </div>
            <div className="text-lg font-medium text-gray-900 text-center">
              Upload Item to Get Started
            </div>
            <div className="text-sm text-gray-700 text-center gap-1">
              Begin by crafting your inaugural list in minutes.&nbsp;
              <a className="text-sm font-medium link"
               href="/metronic/tailwind/react/demo1/account/billing/plans">
                Get Started!
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default UserActivity