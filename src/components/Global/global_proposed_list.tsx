
import React from "react";
import { FaEllipsisH } from "react-icons/fa";
import Typography from "./typography";
import { ProposedModel, ServiceModel } from "../model/proposed_model";

interface ProposedListProps {
  proposals: ProposedModel[];
}

const ProposedList: React.FC<ProposedListProps> = ({ proposals }) => {
  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <div
          key={proposal.id}
          className="flex items-center justify-between p-4 bg-neutral-100 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <img
              src={proposal.image}
              alt={`${proposal.name}'s image`}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium">{proposal.name}</p>
              <span className="text-sm text-gray-500">{proposal.location}</span>
              <div className="mt-2 flex space-x-2">
                <span className="text-sm">{proposal.type}</span> {}
                {proposal.status && (
                  <span className="text-sm">{proposal.status}</span> 
                )}
              </div>
              <div className="mt-2 flex space-x-3">
                {proposal.services.map((service: ServiceModel, index: number) => (
                  <span key={index} className="text-sm text-gray-400">
                    {service.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Typography variant="p_medium" className="text-sm text-gray-500">
              {proposal.typeEvent}
            </Typography>
            <p className="text-xl font-semibold mt-2">{`$${proposal.price.toFixed(2)}`}</p>
          </div>
          <FaEllipsisH className="text-gray-500 cursor-pointer" />
        </div>
      ))}
    </div>
  );
};

export default ProposedList;
