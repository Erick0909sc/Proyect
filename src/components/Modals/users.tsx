
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
    const { data: session, status } = useSession();

    const handleLogout = async () => {
        await signOut();
    };

    const renderUserName = () => {
        if (session?.user) {
            const names = session.user.name.split(' '); 
            if (names.length >= 2) {
                return `Welcome, ${names[0]} ${names[1]}`;
            } else {
                return `Welcome, ${session.user.name}`;
            }
        } else {
            return null;
        }
    };

    const renderContent = () => {
        if (session?.user) {
            return (
                <>
                    <h2 className="text-lg font-bold mb-2">{renderUserName()}</h2>
                    <ul className="space-y-3 text-center font-semibold">
                        <li className='hover:bg-blue-950 p-2 hover:text-white'>
                            <Link href="#">
                                <a onClick={onClose}>Perfil de Usuario</a>
                            </Link>
                        </li>
                        <li className='hover:bg-blue-950 p-2  hover:text-white'>
                            <Link href="/">
                                <a onClick={handleLogout}>Cerrar Sesión</a>
                            </Link>
                        </li>
                    </ul>
                </>
            );
        } else {
            return (
                <ul className="space-y-2 text-center font-semibold">
                    <li className='hover:bg-blue-950 p-2 hover:text-white rounded-[10px]'>
                        <Link href="#">
                            <a onClick={onClose}>Perfil de Usuario</a>
                        </Link>
                    </li>
                    <li className='hover:bg-blue-950 p-2 hover:text-white rounded-[10px]'>
                        <Link href="/login">
                            <a onClick={onClose}>Iniciar Sesión</a>
                        </Link>
                    </li>
                </ul>
            );
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed top-16 right-0 z-50">
            <div className="bg-white rounded-lg p-4 text-black text-[15px]">
                {renderContent()}
            </div>
        </div>
    );
};

export default UserModal;
