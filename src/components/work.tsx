function Work({ name, client, link }: { name: string; client: string; link: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-5 bg-black my-3 w-full h-72">
      <p>{name}</p>
      <p>{client}</p>
      <p>{link}</p>
    </div>
  );
}

export default Work;