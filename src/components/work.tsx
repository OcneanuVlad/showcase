function Work({ title, link }: { title: string; link: string }) {
  return (
    <div className="work flex flex-col items-center justify-center p-5 w-full h-72">
      <p>{title}</p>
      <p>{link}</p>
    </div>
  );
}

export default Work;
