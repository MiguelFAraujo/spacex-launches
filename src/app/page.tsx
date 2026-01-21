type Launch = {
  name: string;
  date_utc: string;
  links: {
    patch: {
      small: string | null;
    };
  };
};

export default async function Home() {
  const res = await fetch("https://api.spacexdata.com/v5/launches", {
    next: { revalidate: 60 },
  });

  const launches: Launch[] = await res.json();

  return (
    <main className="min-h-screen bg-slate-950 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 py-6">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
            SpaceX Launches
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Projeto criado com base em Next.js, TypeScript e Tailwind.
          </p>
        </div>
      </header>

      {/* Introdução */}
      <section className="max-w-5xl mx-auto px-4 mt-6 text-gray-400 text-sm">
        <p>
          O objetivo é simples: consumir a API pública da SpaceX e exibir alguns lançamentos recentes,
          com nome, data e imagem. Focado em praticar integração e layout responsivo.
        </p>
      </section>

      {/* Grid de cards */}
      <section className="max-w-5xl mx-auto p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {launches.slice(0, 9).map((launch) => (
          <div
            key={launch.name}
            className="bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-indigo-500/20 transition-all hover:scale-[1.02]"
          >
            {launch.links.patch.small ? (
              <img
                src={launch.links.patch.small}
                alt={launch.name}
                className="w-full h-44 object-contain bg-slate-900"
              />
            ) : (
              <div className="w-full h-44 flex items-center justify-center bg-slate-900 text-slate-500 text-sm">
                sem imagem
              </div>
            )}

            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1 text-indigo-300">{launch.name}</h2>
              <p className="text-slate-400 text-sm">
                {new Date(launch.date_utc).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-5 text-center text-slate-500 text-sm mt-auto">
        Feito com entusiasmo e curiosidade — Miguel Ferreira de Araujo
      </footer>
    </main>
  );
}
