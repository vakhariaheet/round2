import { Tabs, TabsList, TabsTrigger,TabsContent } from "../components/ui/tabs"

// interface User {
//     id: string;
//     username: string;
//     email: string;
//     phone: string;
//     role: string;
//     createdAt:string

// }


const AllUsers = () => { 
    return (
        <div className="flex justify-center">
            <Tabs className="w-full flex items-center flex-col" defaultValue="ALL_USERS">
                <TabsList className="max-w-max">
                    <TabsTrigger value="ALL_USERS">All Users</TabsTrigger>
                    <TabsTrigger value="INVITED_USERS">Invited Users</TabsTrigger>
                </TabsList>
                <TabsContent value="ALL_USERS">

                </TabsContent>
                <TabsContent value="INVITED_USERS">Invited Users</TabsContent>
            </Tabs>
        </div>
    )
}

export default AllUsers;