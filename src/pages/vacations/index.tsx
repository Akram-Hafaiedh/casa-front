import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { useEffect, useState, Fragment } from 'react';
import { EventClickArg } from '@fullcalendar/core/index.js';
import VacationModal from '../../components/modals/VacationModal';
import useAxiosInstance from '../../utils/axiosInstance';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { Vacation } from '../../types/Vacation';
import InfoSection from '../../layouts/Info';
import { HiOutlineCalendar, HiOutlinePlus } from 'react-icons/hi2';


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
        fetchVacations();
    }, []);

    const handleEventClick = (arg: EventClickArg) => {
        const event = arg.event;
        const vacationId = event.extendedProps.vacationId;
        if (user && (user.roles.includes('admin') || user.roles.includes('developer'))) {
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
                        if (response.data.status.code === 200) {
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
                start: event.start ? event.start.toISOString() : "",
                end: event.end ? event.end.toISOString() : "",
                status: event.extendedProps.status,
                user_id: event.extendedProps.userId,
            };
            setSelectedVacation(vacationDetails);
        }
    };

    const fetchVacations = async () =>{
        try {
            const response = await axiosInstance.get('/vacations');
            if (response.data.status.code === 200) {
                console.log(response.data);
                const fetchedVacations = response.data.data.vacations;

                const mappedEvents = fetchedVacations.map((vacation: Vacation) => ({
                    title: vacation.title || 'Vacation',
                    vacationId: vacation.id,
                    start: vacation.start,
                    end: vacation.end,
                    status: vacation.status,
                    classNames: vacation.status === 1 
                        ? 'bg-success text-white' 
                        : vacation.status === 2 
                        ? 'bg-warning text-dark border-none' 
                        : vacation.status === 3 
                        ? 'bg-danger hover:text-dark text-white border-none text-center'
                        : ''
                }));
                
    
                setEvents(mappedEvents);
            } else {
                console.error("Failed to fetch vacations:", response.data.vacations);
            }
        }catch (e) {    
            console.error("Failed to fetch vacations:", e);
        }
    };

    const refreshVacations = () => {
        fetchVacations();
    };
    
    return (
        <div className='container-fixed'>
            {/* <div className="flex justify-between items-center">
                <h1 className="mb-4 text-3xl font-bold">Vacations</h1>
                <div className="flex space-x-2">
                    <button type='button' onClick={toggleModal} className="px-4 py-2 text-white bg-green-500 rounded">
                        Create New Vacation
                    </button>
                    <Link to="/vacations/list" className="px-4 py-2 text-white bg-blue-500 rounded">{user?.role === 'Administrator' ? 'Process Vacations' : 'My Vacations'}
                    </Link>
                </div>
            </div> */}

            <InfoSection 
                title="Vacations" 
                description="Manage your vacations"
                actions={[
                    {
                        type: 'button',
                        text: 'Create New Vacation',
                        onClick: toggleModal,
                        icon: <HiOutlinePlus />,
                        iconPosition: 'start'
                    },
                    {
                        type: 'link',
                        text: 'Vacations',
                        to: '/vacations/list',
                        icon: <HiOutlineCalendar />,
                        iconPosition: 'start'
                    },
                ]}
            />

            <FullCalendar
                plugins={[ listPlugin, dayGridPlugin, interactionPlugin]}
                initialDate={new Date()}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,listWeek,listDay'
                }}
                views={{ 
                    listWeek: { buttonText: 'Week' },
                    listMonth: { buttonText: 'Month' },
                    listDay: { buttonText: 'Day' },
                    dayGridMonth: { buttonText: 'Month' }  // other views are also available, just uncomment the ones you want to use
                }}
                height={800}
                contentHeight={780}
                aspectRatio={3}
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
        </div>
    );
};
export default Vacations;
