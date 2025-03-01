import { useState } from 'react';

type MenuItem = {
    title: string;
    icon?: string;
    href?: string;
    items?: MenuItem[];
};

export function Menu() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleDropdown = (title: string) => {
        setActiveDropdown(activeDropdown === title ? null : title);
    };

    const menuItems: MenuItem[] = [
        {
            title: 'Dashboard',
            icon: 'icon-dashboard',
            href: '/dashboard'
        },
        {
            title: 'Settings',
            icon: 'icon-settings',
            items: [
                { title: 'Profile', href: '/profile' },
                { title: 'Account', href: '/account' }
            ]
        }
    ];

    return (
        <nav className="menu">
            {menuItems.map((item) => (
                <MenuItem
                key={item.title}
                item={item}
                isOpen={activeDropdown === item.title}
                onToggle={toggleDropdown}
                />
            ))}
        </nav>
    );
}

function MenuItem({
    item,
    isOpen,
    onToggle
}: {
    item: MenuItem;
    isOpen: boolean;
    onToggle: (title: string) => void;
}) {
    const hasChildren = !!item.items?.length;

    return (
        <div className={`menu-item ${hasChildren ? 'has-dropdown' : ''} ${isOpen ? 'menu-item-active' : ''}`}>
            <a
                href={item.href || '#'}
                className="menu-link"
                onClick={(e) => {
                    if (hasChildren) {
                        e.preventDefault();
                        onToggle(item.title);
                    }
                }}
            >
                {item.icon && <i className={`menu-icon ${item.icon}`} />}
                <span className="menu-title">{item.title}</span>
                {hasChildren && (
                <span className="menu-arrow">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </span>
                )}
            </a>

            {hasChildren && (
                <div className={`menu-dropdown ${isOpen ? 'is-open' : ''}`}>
                {item.items?.map((child) => (
                    <a
                    key={child.title}
                    href={child.href}
                    className="menu-link"
                    >
                    {child.title}
                    </a>
                ))}
                </div>
            )}
        </div>
    );
}