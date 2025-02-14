import { Link } from "react-router-dom";

export interface ActionButtonProps {
    text: string;
    to?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    iconPosition?: 'start' | 'end';
    variant?: 'primary' | 'light' | 'danger';
}

const ActionButton: React.FC<ActionButtonProps> = ({
    text,
    to,
    onClick,
    icon,
    iconPosition,
    variant = "light",
}) => {
    const className = `btn btn-sm btn-${variant} flex items-center gap-1.5`;

    return to ? (
        <Link to={to} className={className} title={text}>
            {icon && iconPosition === 'start' && <span>{icon}</span>}
            {text}
            {icon && iconPosition === 'end' && <span>{icon}</span>}
        </Link>
    ) : (
        <button type="button" onClick={onClick} className={className} title={text}>
            {icon && iconPosition === 'start' && <span>{icon}</span>}
            {text}
            {icon && iconPosition === 'end' && <span>{icon}</span>}
        </button>
    );
};

export default ActionButton;
