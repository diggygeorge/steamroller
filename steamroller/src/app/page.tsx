import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#262A37] grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="m-auto">
          <h1 className="text-6xl pb-[20px]">Steamroller</h1>
          <div className="m-auto">
            <button className="m-auto bg-[#1B1D25] rounded-sm border-1 p-2 hover:bg-[#111215] hover:cursor-pointer">
              Sign in With Steam
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
