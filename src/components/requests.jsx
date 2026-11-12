import { useAuth } from "../contexts/auth_context";
import Request from "./request";

export default function Requests() {
  const { loggedInUser } = useAuth();

  return (
    <div className="pt-8 max-w-5xl mx-auto sm:px-0">
      <div className="flex h-122 sm:h-112">
        <div className="flex-1 border-r border-r-black/10 dark:border-r-white/10 overflow-scroll">
          <div className="mb-8 text-center font-bold">Outgoing Requests</div>
          <div className="flex flex-col">
            {loggedInUser.sentRequests.map((request) => (
              <Request key={request.id} user={request.receiver}>
                <div className="bg-amber-100 dark:bg-amber-700 font-bold px-4 py-2 rounded-md text-[10px] sm:text-base self-start">
                  {request.status}
                </div>
              </Request>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-8 text-center font-bold">Incoming Requests</div>
          <div className="flex flex-col">
            {loggedInUser.receivedRequests.map((request) => (
              <Request key={request.id} user={request.sender}>
                <div className="flex gap-1">
                  <div className="bg-green-600 hover:bg-green-700 active:bg-green-600 font-bold px-4 py-2 rounded-md text-[10px] sm:text-base text-white">
                    ACCEPT
                  </div>
                  <div className="bg-red-600 hover:bg-red-700 active:bg-red-600 font-bold px-4 py-2 rounded-md text-[10px] sm:text-base text-white">
                    REJECT
                  </div>
                </div>
              </Request>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
