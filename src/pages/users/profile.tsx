import { IoClose } from "react-icons/io5";

const UserProfile : React.FC = () => {
  return (
    <div className="grid gap-5 lg:gap-7.5 xl:w-[38.75rem] mx-auto">
      {/* General Settings Card */}
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
              <span className="text-2sm font-medium text-gray-600">150x150px JPEG, PNG Image</span>
              <input type="file" accept="image/*" style={{ display: "none" }} />
              <div className="image-input size-16">
                <button className="btn btn-icon btn-icon-xs btn-light shadow absolute z-1 size-5 -top-0.5 -end-0.5 rounded-full">
                  {/* <i className="ki-filled ki-cross"></i> */}
                  <IoClose className="w-4 h-4 text-black" />
                </button>
                <div
                  className="image-input-placeholder rounded-full border-2 border-success"
                  style={{ backgroundImage: "url('/images/blank.png')" }}
                >
                  {/* <img src="/metronic/tailwind/react/demo1/media/avatars/300-2.png" alt="avatar" /> */}
                  <img src="/images/300-2.png" alt="avatar" />
                </div>
              </div>
            </div>
          </div>

          {/* User Info Fields */}
          <div className="flex items-baseline lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-56">Name</label>
            <input type="text" className="input" readOnly value="Jason Tatum" />
          </div>

          <div className="flex items-baseline lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-56">Phone number</label>
            <input type="text" className="input" placeholder="Phone number" readOnly />
          </div>

          <div className="flex items-baseline lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-56">Email</label>
            <input type="text" className="input" readOnly value="jason@studio.io" />
          </div>

          <div className="flex items-baseline lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-56">Address</label>
            <input type="text" className="input" readOnly value="Avinguda Imaginària, 789" />
          </div>

          <div className="flex items-baseline lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-56">Country</label>
            <select className="select">
              <option>Spain</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>

          <div className="flex items-baseline lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-56">State</label>
            <input type="text" className="input" placeholder="State" readOnly />
          </div>

          <div className="flex items-baseline lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-56">City</label>
            <input type="text" className="input" readOnly value="Barcelona" />
          </div>

          <div className="flex items-baseline lg:flex-nowrap gap-2.5 mb-2.5">
            <label className="form-label max-w-56">Postcode</label>
            <input type="text" className="input" readOnly value="08012" />
          </div>

          <div className="flex justify-end">
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>

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

export default UserProfile;
