import { Link } from "react-router-dom";
import { Project } from "../../types/Project";
import ProjectRow from "./ProjectRow";
import { HiOutlinePlus } from "react-icons/hi2";

interface ProjectsCardProps {
  projects: Project[];
}

const ProjectsCard: React.FC<ProjectsCardProps> = ({ projects = [] }) => (
  <div className="card">
    <div className="card-header">
      <h3 className="card-title">Projects</h3>
    </div>
    <div className="card-table scrollable-x-auto min-h-[400px] flex flex-col justify-between">
      <table className="table text-end">
        {projects.length > 0 && (
          <thead>
            <tr>
              <th className="text-start min-w-52 font-normal! text-gray-700!">Project Name</th>
              <th className="min-w-40 font-normal! text-gray-700!">Progress</th>
              <th className="min-w-32 font-normal! text-gray-700!">People</th>
              <th className="min-w-32 font-normal! text-gray-700!">Due Date</th>
              <th className="w-[30px]"></th>
            </tr>
          </thead>
        )}
        <tbody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectRow
                id={project.id}
                key={project.id}
                name={project.name}
                progress={project.progress || 0}
                members={project.members}
                dueDate={new Date(project.due_date).toLocaleDateString()}
              />
            ))
          ) : (
            <tr className="grow">
              <td colSpan={5} className="text-center pt-15 pb-15">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="max-w-md">
                    <img
                      src="/images/illustrations/17.svg"
                      alt="No projects"
                      className="max-w-full h-52 object-contain"
                    />
                  </div>
                  <div className="text-center mt-5">
                    <h4 className="text-gray-800 font-bold mb-3">No Projects Found</h4>
                    <p className="text-gray-600 text-sm font-semibold mb-6">
                      Start by creating a new project to organize<br />
                      your team's work effectively
                    </p>
                    <Link to={"/projects/create"} className="btn btn-primary px-6">
                      <HiOutlinePlus className="text-lg mr-2" />
                      Add Project
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {projects.length > 4 && (
        <div className="card-footer justify-center">
          <Link className="btn btn-link" to="/projects">All Projects</Link>
        </div>
      )}
    </div>
  </div>
);

export default ProjectsCard;

