import { useAuth } from "../contexts/auth_context";
import Request from "./request";
import fetchCustom from "../utils/fetch_custom";

export default function IncomingRequests() {
  const { loggedInUser, setUser } = useAuth();

  const rejectRequest = (event, id) => {
    event.preventDefault();
    fetchCustom(
      `requests/${id}`,
      true,
      "put",
      JSON.stringify({ status: "REJECTED" }),
    )
      .then((response) => response.json())
      .then((request) => {
        const array = loggedInUser.receivedRequests.map((req) =>
          req.id === request.id ? request : req,
        );
        setUser({
          ...loggedInUser,
          receivedRequests: array,
        });
      });
  };

  return (
    <div className="flex-1">
      <div className="mb-8 text-center font-bold">Incoming Requests</div>
      <div className="flex flex-col">
        {loggedInUser.receivedRequests.filter((req) => req.status === "PENDING")
          .length === 0 ? (
          <div className="text-black/50 dark:text-white/50 text-center mt-40 text-sm sm:text-base">
            You have not received any requests yet.
          </div>
        ) : (
          loggedInUser.receivedRequests
            .filter((req) => req.status === "PENDING")
            .map((request) => (
              <Request key={request.id} user={request.sender}>
                <div className="flex gap-1">
                  <div className="bg-[#4a5df9] hover:bg-[#4150f7] font-bold px-4 py-2 rounded-md text-[10px] sm:text-base text-white">
                    ACCEPT
                  </div>
                  <div
                    onClick={(event) => rejectRequest(event, request.id)}
                    className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 hover:dark:bg-white/20 font-bold px-4 py-2 rounded-md text-[10px] sm:text-base"
                  >
                    REJECT
                  </div>
                </div>
              </Request>
            ))
        )}
      </div>
    </div>
  );
}
