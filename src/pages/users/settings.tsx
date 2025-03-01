import { HiCamera, HiOutlineXMark } from "react-icons/hi2";
import { useOutletContext } from "react-router-dom";
import { User } from "../../types/User";
import { useRef, useState } from "react";
import useAxiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const UserSettings : React.FC = () => {
  const axiosInstance = useAxiosInstance();
  const [loading, setLoading] = useState(false);
  const {overviewUser, updateUser} = useOutletContext<{overviewUser:User, updateUser(u:User): void}>();
  const [userData, setUserData] = useState({
    firstName: overviewUser.first_name || "",
    lastName: overviewUser.last_name || "",
    phone: overviewUser.phone || "",
    email: overviewUser.email || "",
    birthday: overviewUser.birthday || "",
    address: overviewUser.address || "",
    postalCode: overviewUser.postal_code || "",
    city: overviewUser.city || "",
    ahvNumber: overviewUser.ahv_number || "",
    idPassport: overviewUser.id_passport || "",
  });
  const [userLogo, setUserLogo] = useState<string | null>(overviewUser.logo || null);
  const [userLogoFile, setUserLogoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    if (userLogoFile){
        data.append('logo', userLogoFile);
    }
    data.append('first_name', userData.firstName);
    data.append('last_name', userData.lastName);
    data.append('phone', userData.phone);
    data.append('email', userData.email);
    data.append('birthday', userData.birthday);
    data.append('address', userData.address);
    data.append('postal_code', userData.postalCode);
    data.append('city', userData.city);
    data.append('ahv_number', userData.ahvNumber);
    data.append('id_passport', userData.idPassport);

    
    try {
      const response  = await axiosInstance.post(`/users/${overviewUser.id}/settings`, data);
      if (response.data.status.code === 200) {
        toast.success(response.data.status.message);
        const updatedUser = response.data.data.user;
        updateUser(updatedUser);
      }
      if (response.data.status.code === 400) {
        Object.keys(response.data.errors).forEach((key) => {
            response.data.errors[key].forEach((error: string) => {
                toast.error(`${error}`);
            });
        });
      }
    } catch (error) {
      toast.error('Failed to update user please try again later');
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleUserLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];
    if(file){
        setUserLogoFile(file);
        const reader = new FileReader();
        reader.onload = () => {
            setUserLogo(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleRemoveUserLogo = () => {
    setUserLogo(null);
    setUserLogoFile(null);
  };

  
  return (
    <div className="grid gap-5 lg:gap-7.5 mx-auto">
      {/* General Settings Card */}
      <form onSubmit={handleSubmit}>
        <div className="card pb-2.5">
          <div className="card-header" id="general_settings">
            <h3 className="card-title">General Settings</h3>
            {/* <div className="flex items-center gap-2">
              <label className="switch switch-sm">
                <span className="switch-label">Public Profile</span>
                <input type="checkbox" name="check" readOnly value="1" defaultChecked />
              </label>
            </div> */}
          </div>

          <div className="card-body grid gap-5">
            {/* Profile Photo */}
            <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-56">Photo</label>
              <div className="flex items-center justify-between flex-wrap grow gap-2.5">
                <label className="text-2sm font-medium text-gray-600" htmlFor="logo">150x150px JPEG, PNG Image</label>
                <input 
                  id="logo"
                  className="hidden"
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleUserLogoChange}
                />
                <div className="image-input size-16">

                  <button
                    type="button" 
                    className="btn btn-icon btn-icon-xs btn-light shadow-sm absolute z-1 size-5! -top-0.5 -end-0.5 rounded-full"
                    onClick={handleRemoveUserLogo}
                    >
                    {/* <i className="ki-filled ki-cross"></i> */}
                    <HiOutlineXMark className="size-6" />
                  </button>

                  <div
                    className="image-input-placeholder rounded-full border-2 border-success"
                    style={{ backgroundImage: "url('/images/blank.png')" }}
                  >
                    {/* <img src="/metronic/tailwind/react/demo1/media/avatars/300-2.png" alt="avatar" /> */}
                    {userLogo && <img src={userLogo} alt="logo" />}

                      <div 
                        className="flex items-center justify-center cursor-pointer h-5 left-0 right-0 bottom-0 bg-dark-clarity absolute"
                        onClick={() => fileInputRef.current?.click()}
                      >
                          <HiCamera className="fill-light opacity-80" />
                      </div>
                    </div>
                </div>
              </div>
            </div>

            {/* User Info Fields */}
            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-56" htmlFor="first_name">First Name</label>
              <input
                title="First Name"
                id="firstName"
                type="text" 
                className="input"
                value={userData.firstName}
                onChange={handleChange} 
              />
            </div>
            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-56" htmlFor="last_name">Last Name</label>
              <input
                title="Last Name"
                id="lastName"
                type="text" 
                className="input"
                value={userData.lastName}
                onChange={handleChange} 
              />
            </div>

            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-56" htmlFor="phone">Phone number</label>
              <input 
                id="phone"
                type="text"
                className="input" 
                placeholder="Phone number"
                value={userData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-56" htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                className="input"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-56" htmlFor="birthday">Birthday</label>
              <input
                id="birthday"
                type="date"
                className="input"
                value={userData.birthday}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-56" htmlFor="address">Address</label>
              <input 
                id="address"
                type="text"
                className="input"
                value={userData.address}
                onChange={handleChange} 
              />
            </div>

            <div className="flex items-baseline lg:flex-nowrap gap-2.5 mb-2.5">
              <label className="form-label max-w-56" htmlFor="postalCode">Postcode</label>
              <input
                id="postalCode"
                type="text"
                className="input"
                readOnly
                value={userData.postalCode}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-56" htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                className="input"
                value={userData.city}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
                <label className="form-label max-w-56" htmlFor="id_passport">
                    ID / Passport
                </label>
                <input
                    title="ID / Passport" 
                    placeholder="Enter ID / Passport"
                    id="id_passport"
                    type="text"
                    className="input"
                    value={userData.idPassport}
                    onChange={handleChange}
                />
            </div>

            <div className="flex items-baseline lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-56">
                AHV Number
              </label>
              <input
                title="AHV Number" 
                id="ahvNumber"
                type="text"
                className="input"
                value={userData.ahvNumber}
                onChange={handleChange}
              />
            </div>


            <div className="flex justify-end">
              <button type="submit" 
                disabled={loading} 
                className="btn btn-primary">
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </form>


      {/* Password Settings Card */}

      
      <div className="card pb-2.5">
        <div className="card-header" id="password_settings">
          <h3 className="card-title">Password</h3>
        </div>

        <div className="card-body grid gap-5">
          <div className="flex items-baseline lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-56">Current Password</label>
            <input type="password" className="input" placeholder="Your current password" readOnly />
          </div>

          <div className="flex items-baseline lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-56">New Password</label>
            <input type="password" className="input" placeholder="New password" readOnly />
          </div>

          <div className="flex items-baseline lg:flex-nowrap gap-2.5 mb-2.5">
            <label className="form-label max-w-56">Confirm New Password</label>
            <input type="password" className="input" placeholder="Confirm new password" readOnly />
          </div>

          <div className="flex justify-end">
            <button className="btn btn-primary">Reset Password</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserSettings;
