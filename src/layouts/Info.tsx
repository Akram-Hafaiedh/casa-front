import { HiOutlineFilter } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { useState } from "react";

interface HeaderProps {
    title: string;
    description: string;
    showFilterButton?: boolean;
    onFilterButtonClick?: (selectedStatus?: number | null) => void;
    filterButtonTitle?: string;
    statuses?: { value: number | null; label: string }[];
    actions?: Array<{
        type: 'link' | 'button';
        text: string;
        icon?: React.ReactNode;
        iconPosition?: 'start' | 'end';
        onClick?: () => void;
        to?: string;
    }>;
}

const InfoSection : React.FC<HeaderProps> = ({
    title,
    description,
    showFilterButton = false,
    onFilterButtonClick,
    filterButtonTitle = 'Filter',
    statuses,
    actions
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<number | null>(null);

    const handleFilterButtonClick = () => {
        setIsOpen(!isOpen);
        onFilterButtonClick?.();
    };



    return (
        <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
            <div className="flex flex-col justify-center gap-2">
                <h1 className="text-xl font-medium leading-none text-gray-900">
                    {title}
                </h1>
                <div className="flex items-center gap-2 text-sm font-normal text-gray-700">
                    {description}
                </div>
            </div>
            <div className="flex items-center gap-2.5">
                {showFilterButton && (
                    <Menu as="div" className="relative inline-block text-left">
                        <MenuButton
                            onClick={handleFilterButtonClick}
                            className="btn btn-sm btn-light flex items-center gap-1.5"
                        >
                            <HiOutlineFilter className="size-5" />
                            {filterButtonTitle}
                        </MenuButton>
                        <Transition
                            show={isOpen}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <MenuItems className="origin-top-right absolute right-0 mt-2 w-62 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {statuses?.map((status, index) => (
                                    <MenuItem
                                        as="button"
                                        className={`
                                            w-full text-left block px-4 py-2 text-sm cursor-pointer
                                            ${index === 0 ? 'rounded-t-md' : ''}
                                            ${selectedStatus === status.value ? 'bg-blue-600 text-white' : 'hover:bg-light'}
                                        `}
                                        key={status.value}
                                        onClick={() => {
                                            setSelectedStatus(status.value);
                                        }}
                                    >
                                        {status.label}
                                    </MenuItem>
                                ))}
                                 <div className="border-t mt-2 p-2 flex justify-between gap-2">
                                    <button
                                        className="btn btn-sm btn-primary w-full"
                                        onClick={() => {
                                            setIsOpen(false);
                                            onFilterButtonClick?.(selectedStatus);
                                        }}
                                    >
                                        Apply
                                    </button>
                                    <button
                                        className="btn btn-sm btn-light w-full"
                                        onClick={() => {
                                            setSelectedStatus(null);
                                            onFilterButtonClick?.(null);
                                            setIsOpen(false);
                                        }}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </MenuItems>
                        </Transition>
                    </Menu>
                )}

                {actions?.map((action, index) => {
                    if (action.type === 'link') {
                        return (
                            <Link
                                key={index}
                                to={action.to || '#'}
                                className="btn btn-sm btn-light flex items-center gap-1.5"
                            >
                                {action.icon && (action.iconPosition ?? 'start') === 'start' && (
                                    <span>{action.icon}</span>
                                )}
                                {action.text}
                                {action.icon && (action.iconPosition ?? 'start') === 'end' && (
                                    <span>{action.icon}</span>
                                )}
                            </Link>
                        );
                    } else if (action.type === 'button') {
                        return (
                            <button
                                key={index}
                                onClick={action.onClick}
                                className="btn btn-sm btn-light flex items-center gap-1.5"
                                type="button"
                            >
                                {action.icon && (action.iconPosition ?? 'start') === 'start' && (
                                    <span>{action.icon}</span>
                                )}
                                {action.text}
                                {action.icon && (action.iconPosition ?? 'start') === 'end' && (
                                    <span>{action.icon}</span>
                                )}
                            </button>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default InfoSection
