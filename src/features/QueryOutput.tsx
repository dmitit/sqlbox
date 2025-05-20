const fakeUsers = [
   { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 30 },
   { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 25 },
   { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', age: 28 },
   { id: 4, name: 'Diana Prince', email: 'diana@example.com', age: 32 },
   { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', age: 35 },
];

const QueryOutput = () => {
   return (
      <div className="p-4 border rounded">
         <h3 className="text-lg font-semibold mb-2">Users</h3>
         <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
               <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Age</th>
               </tr>
            </thead>
            <tbody>
               {fakeUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                     <td className="border border-gray-300 px-4 py-2">
                        {user.id}
                     </td>
                     <td className="border border-gray-300 px-4 py-2">
                        {user.name}
                     </td>
                     <td className="border border-gray-300 px-4 py-2">
                        {user.email}
                     </td>
                     <td className="border border-gray-300 px-4 py-2">
                        {user.age}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default QueryOutput;
