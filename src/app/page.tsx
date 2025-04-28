import AdvocateTable from './components/AdvocateTable';
import { Advocate } from './types';

async function getAdvocates(): Promise<Advocate[]> {
  const res = await fetch('http://localhost:3000/api/advocates', {
    cache: 'no-store',
  });
  const json = await res.json();
  return json.data;
}

export default async function Home() {
  const advocates = await getAdvocates();

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-solaceGreen mb-6">
          Solace Advocates
        </h1>
        <AdvocateTable initialAdvocates={advocates} />
      </div>
    </main>
  );
}
