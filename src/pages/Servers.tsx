import { useQuery } from "@tanstack/react-query";

const getServers = () => ["server", "server2"];

export const Servers = () => {
    const servers = useQuery({ queryKey: ['todos'], queryFn: getServers })
    console.log(servers.data);

    return <div>Servers world!</div>
}