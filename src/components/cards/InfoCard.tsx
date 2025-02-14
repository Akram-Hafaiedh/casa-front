import React from 'react';

interface InfoCardProps {
    title: string;
    children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => (
    <div className="card">
        <div className="card-header">
            <h3 className="card-title">{title}</h3>
        </div>
        <div className="card-body pt-4 pb-3">
            <table className="table-auto">
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    </div>
);

interface DetailItemProps {
    label: string;
    value: string;
    isEmail?: boolean;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, isEmail = false }) => (
    <tr>
        <td className="text-sm text-gray-600 pb-3.5 pe-3">{label}</td>
        <td className="text-sm text-gray-900 pb-3.5">
            {isEmail ? (
            <a href={`mailto:${value}`} className="text-gray-800 hover:text-primary-active">
                {value}
            </a>
            ) : (
            value
            )}
        </td>
    </tr>
);

export { InfoCard, DetailItem };


