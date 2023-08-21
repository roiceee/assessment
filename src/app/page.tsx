import image from "public/space.jpg";

export default function Home() {
  return (
    <main
      className="flex min-h-screen w-screen justify-center md:justify-end items-center"
      style={{
        backgroundImage: `url('${image.src}')`,
        backgroundSize: "cover",
      }}
    >
      <section className="py-12 m-2 rounded-sm bg-black bg-opacity-30 bg-rounded-md">
        <div className="prose text-center">
          <h1>You need to sign in to continue.</h1>
          <div>
            <button className="btn btn-primary btn-wide">Sign in</button>
          </div>
        </div>
      </section>
    </main>
  );
}
