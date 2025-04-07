interface NewUser {
  name: string;
  joinedAt: string;
  avatar: string;
}

interface NewUserListProps {
  users: NewUser[];
}

const NewUserList = ({ users }: NewUserListProps) => {
  return (
    <ul className="mt-4 space-y-3">
      {users.map((user, index) => (
        <li
          key={index}
          className="flex items-center justify-between p-3 bg-neutral-100 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{user.name}</p>
              <span className="text-sm text-gray-500">
                Joined {user.joinedAt}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NewUserList;
