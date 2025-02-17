import React from 'react';

const applications = [
  {
    id: 1,
    name: 'Sophia Doe',
    position: 'General Cleaner',
    time: '2h ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    id: 2,
    name: 'Mason Clark',
    position: 'Cafe Teller',
    time: '3h ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  {
    id: 3,
    name: 'Emily Paton',
    position: 'Tray Collector',
    time: '5h ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  },
  {
    id: 4,
    name: 'Daniel Broth',
    position: 'Kitchen Staff',
    time: '6h ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  },
];

const NewApplications = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">New Applications</h3>
        <button className="text-blue-500 text-sm">View all</button>
      </div>
      <div className="space-y-4">
        {applications.map((application) => (
          <div key={application.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <img
              src={application.avatar}
              alt={application.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium">{application.name}</h4>
              <p className="text-sm text-gray-500">Applied for: {application.position}</p>
            </div>
            <span className="text-sm text-gray-500">{application.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewApplications;