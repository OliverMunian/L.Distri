import Login from "../Components/Admin/Login";

export default function Admin() {
  return (
    <div className="min-h-screen w-full h-full flex items-center justify-center flex-col bg-[#b6b6b6]">
      <div className="w-full flex flex-col items-center pb-5 border-b-zinc-300  border-b-[1px]">
        <h1 className="font-inter font-bold text-[#060b1f] text-5xl">
          LDISTRI{" "}
        </h1>
      </div>

      <Login />
    </div>
  );
}
