// import { Link } from 'react-router-dom';
import InfoSection from '../layouts/Info';

const HomePage: React.FC = () => {
    return (
        <InfoSection
            title="Dashboard"
            description="Central Hub for Personal Customization"
            linkText="View Profile"
            linkTo="/profile"
        />
        

        
    );
};

export default HomePage;
