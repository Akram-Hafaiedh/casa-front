import { HiMiniEllipsisVertical, HiOutlineCalendar, HiOutlineChatBubbleBottomCenterText, HiOutlineClock, HiOutlineLink } from "react-icons/hi2";
import { Task } from "../types/Task";
import { getInitials, getRelativeDate } from "../helpers/format";
import { Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";

interface TaskCardProps {
    task: Task;
    onDelete: (taskId: number) => void;
    onEdit: (task: Task) => void;
}
const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
    return (
        <div className="card">
            <div className="card-body p-5 lg:p-7.5">
                <div className="flex items-center justify-between mb-3 lg:mb-5">
                    <div className="badge badge-pill badge-outline badge-sm">
                        {task.status.name}
                    </div>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <MenuButton className="btn btn-sm btn-icon btn-clear btn-light">
                                <HiMiniEllipsisVertical className="size-6"/>
                            </MenuButton>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <MenuItems className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-2">
                                    <MenuItem>
                                        {({ focus }) => (
                                            <button
                                                type="button"
                                                title="edit-task"
                                                onClick={() => task.id && onEdit(task)}
                                                className={`${focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full text-left`}
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </MenuItem>
                                    <MenuItem>
                                        {({ focus }) => (
                                            <button
                                                title="delete-task"
                                                onClick={() => task.id && onDelete(task.id)}
                                                type="button"
                                                className={`${focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full text-left`}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Transition>
                    </Menu>
                </div>
                <div className="flex flex-col gap-1 lg:gap-2.5">
                    <a className="text-base font-medium text-gray-900 hover:text-primary-active" href="#">
                        {task.title}
                    </a>
                    <span className="text-2sm text-gray-700">{task.description}</span>
                    <div className="flex items-center gap-2 text-gray-700 text-2sm">
                        <HiOutlineCalendar className="size-4"/>
                        <span>{getRelativeDate(task.start_date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-2sm">
                        <HiOutlineClock className="size-4 text-danger"/>
                        <span>{getRelativeDate(task.due_date)}</span>
                    </div>
                </div>
            </div>
            <div className="card-footer justify-between items-center py-3.5">
                <div className="flex -space-x-2">
                    {task.assigned_to && (
                        <div className="flex">
                            {task.assigned_to.logo ? (
                                <img
                                    className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px]"
                                    src={task.assigned_to.logo}
                                    alt={task.assigned_to.full_name}
                                />
                            ) : (
                                <div className="hover:z-5 relative shrink-0 rounded-full ring-1 ring-light-light size-[30px] bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-900 text-base font-medium">
                                        {getInitials(task.assigned_to.full_name)}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-center flex-wrap gap-2 lg:gap-5 mb-3">
                    <div className="flex gap-1.5 border-[0.5px] border-dashed border-gray-400 rounded-md px-2.5 py-2 shrink-0 max-w-auto items-center">
                        <span className="text-gray-900 text-sm leading-none font-medium">
                            <HiOutlineLink className="size-4" />
                        </span>
                        <span className="text-gray-900 text-xs font-medium">
                            {task.links_count}
                        </span>
                    </div>
                    <button
                        type="button"
                        className="flex gap-1.5 border-[0.5px] border-dashed border-gray-400 rounded-md px-2.5 py-2 shrink-0 max-w-auto items-center">
                        <span className="text-gray-700 text-xs">
                            <HiOutlineChatBubbleBottomCenterText className="size-4" />
                        </span>
                        <span className="text-gray-900 text-xs leading-none font-medium">
                            {task.comments_count}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
