import { useNavigate } from "react-router-dom";

export default function Manage() {
  const navigate = useNavigate();

  const manageOptions = [
    { id: 1, name: "Games", path: "/games/create" },
    { id: 2, name: "Genres", path: "/genres/create" },
  ];

  const handleContainerClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <h1 className="mb-4">Create new Data Here</h1>
      <div className="d-flex flex-column gap-3 w-100">
        {manageOptions.map((option) => (
          <div
            key={option.id}
            className="p-3 border rounded w-100 hover-lift d-flex justify-content-between align-items-center"
            onClick={() => handleContainerClick(option.path)}
          >
            <h2>{option.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
