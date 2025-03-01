import { HiOutlineXMark } from 'react-icons/hi2';
import { useModal } from "../hooks/useModal";


const GlobalModal: React.FC = () => {
    const { isModalOpen, closeModal, modalContent } = useModal();
    if (!isModalOpen || !modalContent) return null;
    const renderedContent = modalContent.content();

    const getSizeClass = () => {
        if (!modalContent.size) return 'max-w-[800px]'; // default size
        switch(modalContent.size) {
            case 'sm': return 'max-w-[400px]';
            case 'md': return 'max-w-[600px]';
            case 'lg': return 'max-w-[800px]';
            default: return 'max-w-[800px]';
        }
    };

    return (
        <>
        {/* Backdrop */}
        <div
            style={{ zIndex: 89 }}
            className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={closeModal}
        ></div>

        {/* Modal */}
        <div
            className={`z-90 fixed inset-0 flex items-center justify-center p-4 ${isModalOpen ? 'block' : 'hidden' }`}
            role="dialog"
            aria-modal="true"
        >
            <div className={`modal-content modal-center-y modal-center-x bg-white rounded-lg shadow-lg w-full mx-2 ${getSizeClass()}`}>
                <div className="modal-header">
                    <h3 className="modal-title">
                        {modalContent?.title}
                    </h3>
                    <button title="Close" type="button" onClick={closeModal} className="btn btn-xs btn-icon btn-light" data-modal-dismiss="true">
                        <HiOutlineXMark className="size-6" />
                    </button>
                </div>
                {renderedContent}
            </div>
        </div>
        </>
    );
};

export default GlobalModal;
