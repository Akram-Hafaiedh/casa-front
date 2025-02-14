import React, { createContext, useState, ReactNode } from 'react';

type ModalContextType = {
    isModalOpen: boolean;
    openModal: (content: ModalContent ) => void;
    closeModal: () => void;
    modalContent: ModalContent | null;
};

type ModalContent = {
    title: string;
    size?: 'sm' | 'md' | 'lg';
    content: () => ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);

    const openModal = (content: ModalContent) => {
        setModalContent(content);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };


    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, modalContent  }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContext
