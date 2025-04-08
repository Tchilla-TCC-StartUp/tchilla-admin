import { GlobalTable } from "./global_table";
import { AppGlobalUserAvatarName } from "./global_user_avatar_name";
interface NewUser {
  name: string;
  joinedAt: string;
  avatar: string;
}

interface NewUserListProps {
  users: NewUser[];
}

const NewUserList = ({ users }: NewUserListProps) => {
  const columns = [
    {
      key: "avatar",
      title: "Avatar",
      render: (item: any) =>
        item.avatar ? (
          <AppGlobalUserAvatarName size={30} name={item.name} />
        ) : null,
    },
    { key: "name", title: "Nome" },
    { key: "email", title: "Email" },

    { key: "joinedAt", title: "Aderiu" },
  ];
  return (
    <GlobalTable
      data={users}
      columns={columns}
      selectable
      paginated
      styleVariant="clean"
      withCheckbox={false}
      itemsPerPage={5}
    />
  );
};

export default NewUserList;
