export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50">
      <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-rose-500 animate-hue-rotate" />
      <div className="absolute top-1/4 -left-20 w-[800px] h-[800px] bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full opacity-50 blur-[100px]" />
      <div className="absolute bottom-0 -right-20 w-[700px] h-[700px] bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-50 blur-[100px]" />
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-r from-violet-400 to-indigo-500 rounded-full opacity-50 blur-[80px]" />
    </div>
  );
}
