import { useAuth } from "../contexts/auth_context";
import fetchCustom from "../utils/fetch_custom";
import Link from "./link";
import Request from "./request";

export default function OutgoingRequests() {
  const { loggedInUser, setUser } = useAuth();

  const deleteRequest = (event, id) => {
    event.preventDefault();
    fetchCustom(`requests/${id}`, true, "delete")
      .then((response) => response.json())
      .then((request) => {
        const array = loggedInUser.sentRequests.filter(
          (req) => req.id !== request.id,
        );
        setUser({
          ...loggedInUser,
          sentRequests: array,
        });
      });
  };

  return (
    <div className="flex-1 border-r border-r-black/10 dark:border-r-white/10 overflow-scroll">
      <div className="mb-8 text-center font-bold">Outgoing Requests</div>
      <div className="flex flex-col">
        {loggedInUser.sentRequests.length === 0 ? (
          <div className="text-black/50 dark:text-white/50 text-center mt-40 text-sm sm:text-base">
            You have not sent any follow requests yet. Find people{" "}
            <Link to="/search">here.</Link>
          </div>
        ) : (
          loggedInUser.sentRequests.map((request) => (
            <Request key={request.id} user={request.receiver}>
              <div
                onClick={(event) => deleteRequest(event, request.id)}
                className={`${request.status === "PENDING" ? "bg-amber-100 dark:bg-amber-700" : request.status === "REJECTED" ? "bg-red-500 text-white" : "bg-green-500 text-white"} font-bold px-4 py-2 rounded-md text-[10px] sm:text-base self-start sm:self-center`}
              >
                {request.status}
              </div>
            </Request>
          ))
        )}
      </div>
    </div>
  );
}
