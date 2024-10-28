import Sidebar from '../../components/Sidebar';
import HomeLayout from '../../layouts/PrivateLayout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { useEffect, useState } from 'react';
import { EventClickArg } from '@fullcalendar/core/index.js';
import { Link } from 'react-router-dom';
import VacationModal from '../../components/modals/VacationModal';
import useAxiosInstance from '../../utils/axiosInstance';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { Vacation } from '../../types/Vacation';

/**
 * Page component for the vacations page.
 */
const Vacations: React.FC = () => {
    const { user } = useAuth();
    const axiosInstance = useAxiosInstance();
    const [selectedVacation, setSelectedVacation] = useState<Vacation | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState<Array<{ title: string, date: string }>>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const handleDateClick = (arg: { dateStr: string }) => {
        setSelectedDate(arg.dateStr);   
        toggleModal();
    };
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        const buttons = document.querySelectorAll('.fc-button');
        buttons.forEach(button => {
            button.classList.add('bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded');
        });
        fetchVacations();
    }, []);

    const handleEventClick = (arg: EventClickArg) => {
        const event = arg.event;
        const vacationId = event.extendedProps.vacationId;
        if (user && user.role === 'admin') {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this vacation!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axiosInstance.delete(`/vacations/${vacationId}`);
                        if (response.data.status === 200) {
                            console.log(response.data);
                            refreshVacations();
                            toast.success('Vacation deleted successfully');
                        } else {
                            console.error("Failed to delete vacation:", response.data);
                            toast.error('Failed to delete vacation');
                        }
                    } catch (e) {
                        console.error("Failed to delete vacation:", e);
                        toast.error('Failed to delete vacation');
                    }
                } else if (result.isDismissed) {
                    toast.info('Vacation not deleted');
                }
            });            
        } else {
            const vacationDetails = {
                id: vacationId,
                description: event.extendedProps.description,
                title: event.title,
                startDate: event.start ? event.start.toISOString() : "",
                endDate: event.end ? event.end.toISOString() : "",
                status: event.extendedProps.status,
                userId: event.extendedProps.userId,
            };
            setSelectedVacation(vacationDetails);
        }
    };

    const fetchVacations = async () =>{
        try {
            const response = await axiosInstance.get('/vacations/my-vacations');
            if (response.data.status === 200) {
                console.log(response.data);
                const fetchedVacations = response.data.data.vacations;

                const mappedEvents = fetchedVacations.map((vacation: Vacation) => ({
                    title: vacation.title || 'Vacation',
                    vacationId: vacation.id,
                    start: vacation.startDate,         
                    end: vacation.endDate,
                    status: vacation.status
                }));
    
                setEvents(mappedEvents);
            } else {
                console.error("Failed to fetch vacations:", response.data);
            }
        }catch (e) {    
            console.error("Failed to fetch vacations:", e);
        }
    };

    const refreshVacations = () => {
        fetchVacations();
    };
    
    return (
        <HomeLayout sidebar={<Sidebar />}>
            <div className="flex justify-between items-center">
                <h1 className="mb-4 text-3xl font-bold">Vacations</h1>
                <div className="flex space-x-2">
                    <button type='button' onClick={toggleModal} className="px-4 py-2 text-white bg-green-500 rounded">
                        Create New Vacation
                    </button>
                    <Link to="/vacations/list" className="px-4 py-2 text-white bg-blue-500 rounded">My Vacations</Link>
                </div>
            </div>

            <FullCalendar
                plugins={[multiMonthPlugin, dayGridPlugin, interactionPlugin]}
                initialView="multiMonthYear"
                events={events}
                dateClick={handleDateClick}
                weekNumbers={true}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'multiMonthYear,dayGridMonth'
                }}
                eventClick={(arg) => handleEventClick(arg)}
                dayMaxEvents={true}
            />
            <VacationModal
                isOpen={isModalOpen}
                onClose={toggleModal}
                selectedDate={selectedDate}
                selectedVacation={selectedVacation}
                onVacationCreated={refreshVacations}
            />
        </HomeLayout>
    );
};
export default Vacations;
