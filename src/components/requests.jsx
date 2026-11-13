import IncomingRequests from "./incoming_requests";
import OutgoingRequests from "./outgoing_requests";

export default function Requests() {
  return (
    <div className="pt-8 max-w-5xl mx-auto sm:px-0">
      <div className="flex h-122 sm:h-112">
        <OutgoingRequests />
        <IncomingRequests />
      </div>
    </div>
  );
}
